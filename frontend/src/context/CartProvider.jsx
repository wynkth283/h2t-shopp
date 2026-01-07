import { createContext, useContext, useState } from "react";
import { cart } from "../data/Cart";
import { useAuth } from "./AuthProvider";

const CartContext = createContext();

export function CartProvider({ children }) {
    const { user } = useAuth();
    const [itemcart, setItemCart] = useState(cart);

    const [qty, setQty] = useState(1);

    const handlePlus = () => setQty(q => q + 1);

    const handleSub = () => setQty(q => Math.max(1, q - 1));

    const handleChangeQty = (e) => {
        const value = e.target.value;
        if(value === '' || isNaN(value) || parseInt(value) <= 0 || !Number.isInteger(parseFloat(value))) {
            setQty(1);
        } else {
            setQty(parseInt(value));
        }
    }

    // Hàm tính giá dựa trên biến thể được chọn
    const calculateVariantPrice = (selectedVariants, product) => {
        let basePrice = product.giasp;

        if (selectedVariants) {
            // Tính giá dựa trên màu sắc
            if (selectedVariants.color && product.variants?.color) {
                const colorVariant = product.variants.color.find(c => c.name === selectedVariants.color);
                if (colorVariant) {
                    basePrice = colorVariant.price;
                }
            }

            // Tính giá dựa trên dung lượng (ghi đè lên giá màu nếu có)
            if (selectedVariants.storage && product.variants?.storage) {
                const storageVariant = product.variants.storage.find(s => s.name === selectedVariants.storage);
                if (storageVariant) {
                    basePrice = storageVariant.price;
                }
            }

            // Tính giá dựa trên capacity
            if (selectedVariants.capacity && product.variants?.capacity) {
                const capacityVariant = product.variants.capacity.find(c => c.name === selectedVariants.capacity);
                if (capacityVariant) {
                    basePrice = capacityVariant.price;
                }
            }
        }

        return basePrice;
    };

    const addToCart = (item, onSuccess, onError) => {
        const slthem = qty;

        if (slthem <= 0 || isNaN(slthem) || !Number.isInteger(slthem)) {
            if (onError) onError("Số lượng không hợp lệ");
            return;
        }

        if (item.sl_ton < slthem || item.sl_ton <= 0) {
            if (onError) onError("Hết hàng");
            return;
        }

        setItemCart(p => {
            // Tạo unique key cho sản phẩm dựa trên biến thể (nếu có)
            const variantKey = item.selectedVariants ?
                Object.values(item.selectedVariants).join('-') :
                'default';

            const uniqueId = `${item.id}-${variantKey}`;

            const sp = p.find((i) => i.uniqueId === uniqueId);

            if(sp) {
                const slmoi = sp.slsp + slthem;
                if(slmoi > item.sl_ton) {
                    if (onError) onError("Hết hàng");
                    return p;
                }
                return p.map(i => i.uniqueId === uniqueId ? { ...i, slsp: slmoi } : i);
            }

            // Sử dụng giá đã được tính sẵn hoặc tính lại nếu chưa có
            const variantPrice = item.variantPrice || calculateVariantPrice(item.selectedVariants, item);
            const discountedPrice = item.discountedPrice || Math.round(variantPrice * (1 - (item.giamgia || 0) / 100));

            // Store product with variant information and price
            const newCartItem = {
                id: item.id,
                uniqueId: uniqueId,
                slsp: slthem,
                idnd: user.userData.id,
                selectedVariants: item.selectedVariants || null,
                variantPrice: variantPrice,
                discountedPrice: discountedPrice
            };

            const updatedCart = [...p, newCartItem];
            window.localStorage.setItem("cart", JSON.stringify(updatedCart));
            return updatedCart;
        });

        if (onSuccess) onSuccess("Đã thêm sản phẩm vào giỏ hàng");
    }

    return (
        <CartContext.Provider value={{ itemcart, setItemCart, addToCart, qty, setQty, handlePlus, handleSub, handleChangeQty }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);