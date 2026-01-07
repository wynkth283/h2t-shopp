import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Alert from '../../components/Alert';
import FadeIn from '../../components/animation/FadeIn';
import { useCart } from '../../context/CartProvider';
import Notification from '../../components/Notification';
import { so } from '../../until/giasp_giamgiasp';
import Checkbox from '../../components/Checkbox';
import TitleSection from '../../components/TitleSection';
import { products } from '../../data/Product';


export default function CartPage() {
    document.title = 'Giỏ hàng | H2T Shopp';
    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState("");
    const [type, setType] = useState("");

    // Alert state cho việc xóa sản phẩm
    const [showAlert, setShowAlert] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    // State cho các sản phẩm được check
    const [checkedItems, setCheckedItems] = useState([]);

    const { itemcart, setItemCart } = useCart();

    // Function to get product data by ID
    const getProductById = (id) => {
        return products.find(product => product.id === id);
    };

    // Đồng bộ checkedItems với itemcart khi itemcart thay đổi
    useEffect(() => {
        setCheckedItems(prev =>
            prev.filter(checkedItem =>
                itemcart.some(cartItem => cartItem.uniqueId === checkedItem.uniqueId)
            ).map(checkedItem => {
                // Cập nhật thông tin item mới nhất từ itemcart
                const updatedItem = itemcart.find(cartItem => cartItem.uniqueId === checkedItem.uniqueId);
                return updatedItem || checkedItem;
            })
        );
    }, [itemcart]);
    
    const updateQuantity = (uniqueId, newQuantity) => {
        if (newQuantity < 1) {
            removeItem(uniqueId);
            return;
        }
        const updatedItem = itemcart.find(item => item.uniqueId === uniqueId);
        if (updatedItem) {
            const newItem = { ...updatedItem, slsp: newQuantity };
            const updatedCart = itemcart.map(item =>
                item.uniqueId === uniqueId ? newItem : item
            );
            setItemCart(updatedCart);

            // Cập nhật đồng bộ checkedItems nếu item này đang được check
            setCheckedItems(prev =>
                prev.map(item =>
                    item.uniqueId === uniqueId ? newItem : item
                )
            );

            // Cập nhật localStorage cho giỏ hàng
            window.localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    };

    const handlesub = (uniqueId, slsp) => {
        if (slsp > 1) {
            return updateQuantity(uniqueId, slsp - 1);
        }
    };

    const handleplus = (uniqueId, slsp, max) => {
        if (slsp >= max) {
            setType("error");
            setMsg("Hết hàng");
            setShow(true);
            return updateQuantity(uniqueId, slsp);
        }
        return updateQuantity(uniqueId, slsp + 1);
    };

    const handleInputQuantity = (uniqueId, value, max) => {
        let qty = parseInt(value);

        // Nếu không phải số hoặc nhỏ hơn 1 thì set về 1
        if (isNaN(qty) || qty < 1) qty = 1;

        // Nếu vượt quá số lượng kho thì set bằng max
        if (qty > max) {
            setType("error");
            setMsg("Hết hàng");
            setShow(true);
            qty = max;
        }

        updateQuantity(uniqueId, qty);
    };

    const removeItem = (uniqueId) => {
        const item = itemcart.find(item => item.uniqueId === uniqueId);
        if (item) {
            setItemToDelete(item);
            setShowAlert(true);
        }
    };

    const confirmRemove = () => {
        if (itemToDelete) {
            setItemCart(itemcart.filter(item => item.uniqueId !== itemToDelete.uniqueId));
            // Loại bỏ item khỏi checkedItems nếu nó đang được check
            setCheckedItems(prev => prev.filter(item => item.uniqueId !== itemToDelete.uniqueId));
            setShowAlert(false);
            setItemToDelete(null);
        }
    };

    const formatPrice = (price) => {
        if (isNaN(price) || price === null || price === undefined) {
            return '0';
        }
        return price.toLocaleString('vi-VN');
    };

    // xử lý check sản phẩm
    const handleCheck = (item) => {
        setCheckedItems(prev => {
            const isChecked = prev.some(i => i.uniqueId === item.uniqueId);
            if (isChecked) {
                // Bỏ check: loại bỏ item khỏi danh sách checked
                return prev.filter(i => i.uniqueId !== item.uniqueId);
            } else {
                // Check: thêm item vào danh sách checked
                return [...prev, item];
            }
        });
    };

    // xử lý check tất cả sản phẩm
    const handleCheckAll = () => {
        if (checkedItems.length === itemcart.length) {
            // Nếu đã check tất cả, bỏ check tất cả
            setCheckedItems([]);
        } else {
            // Check tất cả sản phẩm
            setCheckedItems([...itemcart]);
        }
    };
    
    // Đồng bộ id trong checkedItems với id products để lấy thông tin khác
    const calculateSubtotal = () => {
        return checkedItems.reduce((total, item) => {
            if (!item || !item.id) return total;

            // Sử dụng giá đã lưu trong cart item, nếu không có thì tính lại
            let giasp = item.discountedPrice;
            if (!giasp || isNaN(giasp)) {
                const product = products.find(p => p.id === item.id);
                if (product && product.giasp) {
                    giasp = so(product.giasp, product.giamgia);
                }
            }

            // Đảm bảo giasp là số hợp lệ
            if (!giasp || isNaN(giasp)) {
                giasp = 0;
            }

            return total + giasp * item.slsp;
        }, 0);
    };

    const calculateTax = () => {
        return Math.round(calculateSubtotal() * 0.1); // 10% tax
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateTax();
    };

    const totalItems = itemcart.reduce((total, item) => total + item.slsp, 0);


    const cancelRemove = () => {
        setShowAlert(false);
        setItemToDelete(null);
    };
    if (itemcart.length === 0) {
        return (
            <>
                {/* <Alert></Alert> */}
                <div className="max-w-5xl mx-auto py-16 px-4">
                <FadeIn>
                    <div className="bg-gray-50 rounded-[40px] p-12 text-center border border-white shadow-inner">
                        <div className="mb-8 inline-block p-8 bg-white rounded-full shadow-sm">
                            <i className="fa-solid fa-ghost text-6xl text-gray-200 animate-float"></i>
                        </div>
                        
                        <h1 className="text-3xl font-bold text-gray-900 mb-3">Ồ! Giỏ hàng trống trơn</h1>
                        <p className="text-gray-500 mb-8">Bạn muốn tìm kiếm điều gì đó đặc biệt hôm nay?</p>
                        <div className="flex flex-wrap justify-center gap-3 mb-12">
                            {['Sản phẩm mới', 'Bán chạy', 'Khuyến mãi', 'Xu hướng'].map((tag) => (
                            <button key={tag} className="px-5 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:border-red-900 hover:text-red-900 transition-colors">
                                {tag}
                            </button>
                            ))}
                        </div>

                        <NavLink
                            to="/"
                            className="inline-flex items-center gap-3 bg-red-900 text-white px-10 py-4 rounded-2xl font-bold hover:shadow-2xl hover:shadow-red-900/30 transition-all active:scale-95"
                        >
                            <i className="fa-solid fa-house text-xs"></i>
                            <span>Về trang chủ</span>
                        </NavLink>
                    </div>
                </FadeIn>
                </div>
            </>
        );
    }

    return (
        <>
            <Alert
                show={showAlert}
                title="Xác nhận xóa"
                message={`Bạn có chắc chắn muốn xóa sản phẩm "${itemToDelete ? getProductById(itemToDelete.id)?.tensp : ''}" khỏi giỏ hàng?`}
                onConfirm={confirmRemove}
                onCancel={cancelRemove}
            />
            {show && (<Notification type={type} message={msg} onClose={() => setShow(false)} />)}
            <div className="max-w-7xl mx-auto py-8 px-4">
                <div className="flex items-center justify-center gap-4 mb-12">
                    <div className="flex items-center gap-2 text-red-900">
                        <span className="w-6 h-6 rounded-full bg-red-900 text-white flex items-center justify-center text-xs font-bold shadow-lg shadow-red-200">1</span>
                        <span className="text-xs font-bold uppercase tracking-widest">Giỏ hàng</span>
                    </div>
                    <div className="w-12 h-px bg-slate-200"></div>
                    <div className="flex items-center gap-2 text-slate-400">
                        <span className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center text-xs font-bold">2</span>
                        <span className="text-xs font-bold uppercase tracking-widest">Thanh toán</span>
                    </div>
                    <div className="w-12 h-px bg-slate-200"></div>
                    <div className="flex items-center gap-2 text-slate-300">
                        <span className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center text-xs font-bold">3</span>
                        <span className="text-xs font-bold uppercase tracking-widest">Hoàn tất</span>
                    </div>
                </div>
                {/* Header */}
                <div className="mb-8">
                    <p className="text-gray-600">
                        {totalItems} {totalItems === 1 ? 'sản phẩm' : 'sản phẩm'} trong giỏ hàng
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div className="flex-1">
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            {/* Select All Header */}
                            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <Checkbox
                                            checked={checkedItems.length === itemcart.length && itemcart.length > 0}
                                            onChange={handleCheckAll}
                                            
                                        />
                                        <span className="text-sm font-medium text-gray-700">
                                            Chọn tất cả ({itemcart.length} sản phẩm)
                                        </span>
                                    </label>
                                </div>
                            </div>
                            {/* Cart Items List */}
                            <div className="divide-y divide-gray-200">
                                {itemcart.map((cartItem) => {
                                    const product = getProductById(cartItem.id);
                                    if (!product || !product.giasp) return null; // Skip if product not found or price is missing

                                    // Sử dụng giá đã lưu trong cart item (bao gồm giá biến thể và giảm giá)
                                    let giasp = cartItem.discountedPrice;
                                    if (!giasp || isNaN(giasp)) {
                                        giasp = so(product.giasp, product.giamgia);
                                    }
                                    // Đảm bảo giasp luôn là số hợp lệ
                                    if (!giasp || isNaN(giasp)) {
                                        giasp = 0;
                                    }
                                    const itemTotal = giasp * cartItem.slsp;
                                    return (
                                        <div key={cartItem.uniqueId} className="p-6 hover:bg-gray-50 transition-colors">
                                            <div className="flex flex-col sm:flex-row gap-4">
                                                <div className="flex items-center" title={"Chọn"}>
                                                    <label className="relative cursor-pointer">
                                                        <Checkbox
                                                            checked={checkedItems.some(i => i.uniqueId === cartItem.uniqueId)}
                                                            onChange={() => handleCheck(cartItem)}
                                                        />
                                                    </label>
                                                </div>

                                                {/* Product Image */}
                                                <Link
                                                    to={`/product/${product.slug}-${product.id}`}
                                                    className="flex-shrink-0"
                                                >
                                                    <img
                                                        src={product.hinhanhsp}
                                                        alt={product.tensp}
                                                        className="w-30 h-30 sm:w-32 sm:h-32 object-cover rounded-md border border-gray-200 hover:opacity-90 transition-opacity"
                                                    />
                                                </Link>

                                                {/* Product Details */}
                                                <div className="flex-1 flex flex-col md:flex-row md:justify-between gap-6 items-start">
                                                    {/* THÔNG TIN SẢN PHẨM & GIÁ */}
                                                    <div className="flex-1 space-y-4 w-full">
                                                        <div>
                                                            <Link
                                                                to={`/product/${product.slug}-${product.id}`}
                                                                className="text-xl font-black text-slate-800 hover:text-red-900 transition-all duration-300 leading-tight block mb-1 group"
                                                            >
                                                                {product.tensp}
                                                            </Link>

                                                            {/* Hiển thị biến thể nếu có */}
                                                            {cartItem.selectedVariants && (
                                                                <div className="flex flex-wrap gap-1 mt-2">
                                                                    {cartItem.selectedVariants.color && (
                                                                        <span className="inline-flex items-center px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md">
                                                                            {cartItem.selectedVariants.color}
                                                                        </span>
                                                                    )}
                                                                    {cartItem.selectedVariants.storage && (
                                                                        <span className="inline-flex items-center px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md">
                                                                            {cartItem.selectedVariants.storage}
                                                                        </span>
                                                                    )}
                                                                    {cartItem.selectedVariants.capacity && (
                                                                        <span className="inline-flex items-center px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md">
                                                                            {cartItem.selectedVariants.capacity}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            )}
                                                            <div className="flex items-center gap-3">
                                                                <span className="text-2xl font-black text-red-900 tracking-tighter">
                                                                    {formatPrice(giasp)}<span className="text-sm ml-0.5">đ</span>
                                                                </span>
                                                                {cartItem.variantPrice && cartItem.variantPrice !== product.giasp && (
                                                                    <span className="text-xs font-bold text-slate-400 line-through decoration-slate-300">
                                                                        {formatPrice(cartItem.variantPrice)}đ
                                                                    </span>
                                                                )}
                                                                {product.giamgia && !cartItem.variantPrice && (
                                                                    <span className="text-xs font-bold text-slate-400 line-through decoration-slate-300">
                                                                        {(product.giasp).toLocaleString("vi-VN")}đ
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* BỘ ĐIỀU KHIỂN SỐ LƯỢNG */}
                                                        <div className="flex items-center gap-4">
                                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Số lượng</span>
                                                            <div className="flex items-center gap-3">
                                                                <div className="inline-flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200 shadow-inner transition-all duration-300 focus-within:ring-4 focus-within:ring-red-900/5 focus-within:border-red-200">
                                                                    <button
                                                                        onClick={() => {handlesub(cartItem.uniqueId, cartItem.slsp);}}
                                                                        className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all duration-200 active:scale-90 ${cartItem.slsp <= 1 ? "text-slate-300 cursor-not-allowed" : "bg-white text-slate-600 shadow-sm hover:text-red-900 hover:shadow-md"}`}
                                                                        aria-label="Giảm số lượng"
                                                                    >
                                                                        <i className="fa-solid fa-minus text-xs"></i>
                                                                    </button>
                                                                    <input
                                                                        type="number"
                                                                        value={cartItem.slsp}
                                                                        onChange={(e) => handleInputQuantity(cartItem.uniqueId, e.target.value, product.sl_ton)}
                                                                        min="1"
                                                                        className="w-16 px-2 py-1.5 text-center border-0 focus:ring-0"
                                                                    />
                                                                    <button
                                                                        onClick={() => {handleplus(cartItem.uniqueId, cartItem.slsp, product.sl_ton);}}
                                                                        className="w-9 h-9 flex items-center justify-center bg-white text-slate-600 rounded-xl shadow-sm transition-all duration-200 hover:text-red-900 hover:shadow-md active:scale-90"
                                                                        aria-label="Tăng số lượng"
                                                                    >
                                                                        <i className="fa-solid fa-plus text-xs"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* TỔNG TIỀN & THAO TÁC XÓA */}
                                                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-50">
                                                        <div className="md:text-right">
                                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Thành tiền</p>
                                                            <p className="text-2xl font-black text-slate-900 tracking-tighter leading-none">
                                                                {itemTotal}<sup className="text-sm ml-0.5">đ</sup>
                                                            </p>
                                                            <p className="text-[11px] font-bold text-slate-500 mt-1">
                                                                {formatPrice(giasp)} đ × {cartItem.slsp}
                                                            </p>
                                                        </div>

                                                        <button
                                                        onClick={() => removeItem(cartItem.uniqueId)}
                                                        className="group flex items-center gap-2 px-4 py-2.5 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all duration-300 active:scale-95"
                                                        >
                                                        <svg xmlns="www.w3.org" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                                                            <span className="text-xs font-black uppercase tracking-widest">Loại bỏ</span>
                                                        </button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Continue Shopping */}
                        <div className="mt-6">
                        <NavLink 
                            to="/"
                            className="group inline-flex items-center gap-3 py-2 px-1 text-slate-500 hover:text-red-900 transition-all duration-300 font-bold text-sm uppercase tracking-widest"
                        >
                            <div className="relative overflow-hidden w-5 h-5 flex items-center justify-center">
                                <i className="fa-solid fa-arrow-left transition-transform duration-300 group-hover:-translate-x-1"></i>
                            </div>
                            <div className="relative">
                                <span>Tiếp tục mua sắm</span>
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-900 transition-all duration-300 group-hover:w-full"></span>
                            </div>
                        </NavLink>

                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-96">
                        <div className="sticky top-0 h-[550px] bg-white/80 backdrop-blur-xl rounded-xl border border-slate-200/60 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.04)] sticky top-8 transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
                            {/* TITLE */}
                            <TitleSection>Tóm tắt đơn hàng</TitleSection>
                            <div className="mb-4"></div>
                            
                            <div className="space-y-5 mb-8">
                                {/* SUB-TOTAL */}
                                <div className="flex justify-between items-center group">
                                    <span className="text-slate-500 font-medium group-hover:text-slate-900 transition-colors">Tạm tính ({checkedItems.length} sản phẩm)</span>
                                    <span className="text-slate-900 font-bold tracking-tight">{formatPrice(calculateSubtotal())}đ</span>
                                </div>
                                
                                {/* TAX */}
                                <div className="flex justify-between items-center group">
                                    <span className="text-slate-500 font-medium group-hover:text-slate-900 transition-colors">Thuế VAT (10%)</span>
                                    <span className="text-slate-900 font-bold tracking-tight">{formatPrice(calculateTax())}đ</span>
                                </div>

                                {/* TOTAL DIVIDER */}
                                <div className="pt-5 border-t border-dashed border-slate-200">
                                    <div className="flex justify-between items-end">
                                        <span className="text-slate-900 font-black text-lg uppercase tracking-wider">Tổng cộng</span>
                                        <div className="text-right">
                                            <span className="block text-3xl font-black text-red-900 leading-none mb-1 tracking-tighter">
                                                {formatPrice(calculateTotal())}đ
                                            </span>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">(Đã bao gồm VAT)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* CHECKOUT BUTTON */}
                            <button
                                className="group relative w-full bg-red-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] overflow-hidden shadow-2xl shadow-red-900/30 transition-all active:scale-95 disabled:bg-slate-200 disabled:shadow-none disabled:cursor-not-allowed mb-6"
                                onClick={() => window.location.href = '/checkout'}
                                disabled={checkedItems.length === 0}
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    Thanh toán ngay
                                    <i className="fa-solid fa-chevron-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
                                </span>
                                {/* Glossy Overlay effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                            </button>

                            {/* TRUST BADGES */}
                            <div className="space-y-4">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="flex items-center gap-2 px-4 py-1.5 bg-green-50 text-green-700 rounded-full border border-green-100">
                                        <i className="fa-solid fa-shield-check text-sm animate-pulse"></i>
                                        <span className="text-[10px] font-black uppercase tracking-widest">Bảo mật thanh toán 100%</span>
                                    </div>
                                    
                                    <div className="flex justify-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        <div className="flex items-center gap-1.5 hover:text-red-900 transition-colors cursor-default">
                                            <i className="fa-solid fa-truck-fast"></i>
                                            <span>Free Ship</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 hover:text-red-900 transition-colors cursor-default">
                                            <i className="fa-solid fa-rotate-left"></i>
                                            <span>Đổi trả tận nơi</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* PROMO BOX: Nâng cấp thành phong cách Glassmorphism mượt mà hơn */}
                            <div className="mt-8 relative group cursor-pointer overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-4 border border-slate-200/50 transition-all hover:border-red-200">
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-red-900 transition-transform group-hover:rotate-12">
                                        <i className="fa-solid fa-ticket"></i>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-black text-slate-900 uppercase tracking-tighter mb-0.5">Bạn có mã giảm giá?</p>
                                        <p className="text-[11px] text-slate-500 leading-tight">Nhập mã tại bước thanh toán cuối cùng.</p>
                                    </div>
                                </div>
                                {/* Decor circle */}
                                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-red-900/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    );
}

