import { useParams, Navigate } from "react-router-dom";
import { products } from "../../data/Product";
import { useState } from "react";
import Notification from "../../components/Notification";
import SubInputFlus from "../../components/SubInputFlus";
import Breadcrumb from "../../components/Breadcrumb";
import { useCart } from "../../context/CartProvider";
import { danhmucs } from "../../data/Categories";
import ImgThumbnail from "../../components/pages/user/ProductPage/ImgThumbnail";
import { tinhgiamgia } from "../../until/giasp_giamgiasp";
import TitleSection from "../../components/TitleSection";
import Recently from "../../components/pages/user/Recently";
import { useAuth } from "../../context/AuthProvider";
import VariantProduct from "../../components/pages/user/ProductPage/VariantProduct";

export default function ProductPage() {
    const { user } = useAuth();
    const { nameAndId } = useParams();
    // Lấy id (số ở cuối chuỗi slug-id)
    const id = Number(nameAndId?.split("-").pop());
    const product = products.find((p) => p.id === id);

    document.title = product.tensp + ' | H2T Shopp';

    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState("");
    const [type, setType] = useState("");
    const { addToCart } = useCart();

    // State cho biến thể sản phẩm
    const [selectedVariants, setSelectedVariants] = useState({});

    if(!product) return <Navigate to="/*" replace />;

    const tendanhmuc = danhmucs.filter(item => item.iddanhmuc === product.iddanhmuc).map(item => item.tendanhmuc);

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

    const variantPrice = calculateVariantPrice(selectedVariants, product);
    const giasp = tinhgiamgia(variantPrice, product.giamgia);
    return (
        <>
            {show && (<Notification type={ type } message={ msg } onClose={()=> setShow(false)}></Notification>)}
            <div className="min-h-[500px] bg-gray-50">
                {!product ? (
                    <div className="max-w-6xl mx-auto p-6">
                        <div className="bg-white rounded-lg shadow-lg p-6 text-center text-gray-600">
                            Không tìm thấy sản phẩm.
                        </div>
                    </div>
                ) : (
                    <>
                        <Breadcrumb category={tendanhmuc} tensp={product.tensp} />
                        <div className="mb-2"></div>
                        <div className="max-w-6xl mx-auto px-4">                           
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                                {/* Cột 1: Ảnh + thumbnail */}
                                <div className="lg:col-span-5 lg:xl:sticky top-24 h-fit">
                                    <div className="bg-white rounded-lg p-4 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100">
                                        <ImgThumbnail product={product} />
                                    </div>
                                </div>

                                {/* Cột 2: Thông tin sản phẩm */}
                                <div className="lg:col-span-7 space-y-4">
                                    <div className="bg-white rounded-xl shadow-lg p-5 space-y-3">
                                        <h1 className="text-2xl font-bold text-gray-900">
                                            {product.tensp}
                                        </h1>

                                        <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-slate-400 pt-2">
                                            <div className="flex items-center gap-1.5 bg-amber-50 text-amber-600 px-3 py-1 rounded-full">
                                                <span className="font-black text-amber-700">{product.sao}</span>
                                                <svg xmlns="www.w3.org" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                                <span className="text-[11px] opacity-70 border-l border-amber-200 pl-2 ml-1">1.2k Đánh giá</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-slate-800">Đã bán {product.daban || 0}</span>
                                            </div>
                                        </div>

                                        <div className="mt-4 space-y-2">
                                            {
                                                (product.giamgia || (selectedVariants && variantPrice !== product.giasp)) &&
                                                <div className="text-sm text-gray-400 line-through">
                                                    {variantPrice.toLocaleString("vi-VN")} <sup>đ</sup>
                                                </div>
                                            }
                                            <div className="flex items-end gap-3">
                                                <div className="text-3xl font-bold text-red-900">
                                                    {giasp}
                                                    <sup>đ</sup>
                                                </div>
                                                {
                                                    product.giamgia &&
                                                    <span className="px-2 py-1 rounded-md bg-red-100 tshadow-sm00 text-xs font-semibold">
                                                        -{product.giamgia}%
                                                    </span>
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hiển thị biến thể sản phẩm nếu có */}
                                    {product.hasVariants && product.variants && (
                                        <div className="bg-white rounded-xl shadow-lg p-5 space-y-4">
                                            <div className="space-y-4">
                                                {product.variants.color && (
                                                    <VariantProduct
                                                        a="Màu sắc"
                                                        b={product.variants.color}
                                                        selected={selectedVariants.color || (product.variants.color[0]?.name || product.variants.color[0])}
                                                        onChange={(value) => setSelectedVariants(prev => ({ ...prev, color: value }))}
                                                    />
                                                )}
                                                {product.variants.storage && (
                                                    <VariantProduct
                                                        a="Dung lượng"
                                                        b={product.variants.storage}
                                                        selected={selectedVariants.storage || (product.variants.storage[0]?.name || product.variants.storage[0])}
                                                        onChange={(value) => setSelectedVariants(prev => ({ ...prev, storage: value }))}
                                                    />
                                                )}
                                                {product.variants.capacity && (
                                                    <VariantProduct
                                                        a="Dung lượng"
                                                        b={product.variants.capacity}
                                                        selected={selectedVariants.capacity || (product.variants.capacity[0]?.name || product.variants.capacity[0])}
                                                        onChange={(value) => setSelectedVariants(prev => ({ ...prev, capacity: value }))}
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    <div className="bg-white rounded-xl shadow-lg p-5 space-y-4">
                                        <div className="space-y-3">
                                            <SubInputFlus></SubInputFlus>

                                            <div className="text-xs text-gray-500">
                                                Sản phẩm có sẵn: {" "} <span className="font-medium text-gray-700">Còn hàng</span>
                                            </div>
                                        </div>

                                        <div className="pt-4 flex gap-3 flex-col sm:flex-row w-full">
                                            {/* Nút THÊM VÀO GIỎ - Secondary Action */}
                                            <button
                                                onClick={
                                                    user
                                                        ? () => {
                                                            // Tạo object sản phẩm với biến thể đã chọn và giá đã tính
                                                            const productWithVariants = {
                                                                ...product,
                                                                selectedVariants: selectedVariants,
                                                                variantPrice: variantPrice,
                                                                discountedPrice: giasp
                                                            };
                                                            addToCart(
                                                                productWithVariants,
                                                                (successMsg) => { setMsg(successMsg); setType("success"); setShow(true); },
                                                                (errorMsg) => { setMsg(errorMsg); setType("error"); setShow(true); }
                                                            );
                                                        }
                                                        : () => { window.location.href = "/sign-in"; }
                                                }
                                                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-red-800 text-red-800 bg-white rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:bg-red-50 hover:shadow-md active:scale-95"
                                            >
                                                <i className="fa fa-shopping-cart text-lg"></i>
                                                <span>Thêm vào giỏ</span>
                                            </button>

                                            {/* Nút MUA NGAY - Primary Action (Call to Action) */}
                                            <button className="flex-1 px-6 py-3 bg-red-800 text-white rounded-xl text-sm font-bold uppercase tracking-wider shadow-lg shadow-red-900/20 transition-all duration-300 hover:bg-red-900 hover:shadow-red-900/40 active:scale-95 animate-pulse-subtle">
                                                Mua ngay
                                            </button>
                                        </div>


                                        <div className="pt-2 space-y-1 text-xs text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <span className="w-shadow-sm rounded-full bg-green-500" />
                                                <span>Thanh toán an toàn, bảo mật</span>
                                            </div>
                                            <div>Hỗ trợ nhiều phương thức thanh toán</div>
                                        </div>
                                    </div>  

                                    <div className="bg-white rounded-xl shadow-lg p-5 space-y-3 text-sm">
                                        <div className="flex items-start gap-3">
                                            <span className="w-24 text-gray-500">Vận chuyển</span>
                                            <div className="space-y-1">
                                                <div className="font-medium text-gray-800">
                                                    Miễn phí vận chuyển
                                                </div>
                                                <div className="text-gray-500">
                                                    Áp dụng cho đơn từ 50.000đ, tối đa 30k / đơn
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <span className="w-24 text-gray-500">Đổi trả</span>
                                            <div className="space-y-1">
                                                <div className="font-medium text-gray-800">
                                                    Đổi trả trong 7 ngày
                                                </div>
                                                <div className="text-gray-500">
                                                    Hỗ trợ đổi trả nếu sản phẩm lỗi do nhà sản xuất
                                                </div>
                                            </div>
                                        </div>
                                    </div>        
                                </div>
                            </div>

                            {/* Mô tả sản phẩm */}
                            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 space-y-4 text-sm text-gray-700">
                                    <TitleSection> Mô tả sản phẩm </TitleSection>
                                    <div className="group">
                                        <div dangerouslySetInnerHTML={{ __html: product.mota }} />
                                    </div>
                                </div>

                                {/* Cột phụ bên phải giữ lại khối chính sách */}
                                <div className="bg-white rounded-xl shadow-lg p-6 space-y-3 text-sm max-h-[200px] sticky top-10">
                                    <TitleSection> Chính sách & cam kết </TitleSection>
                                    <ul className="space-y-2 text-gray-700">
                                        <li>✔ Hàng mới 100%, nguyên seal (nếshadow-smt bị).</li>
                                        <li>✔ Hỗ trợ tư vấn trước và sau khi mua.</li>
                                        <li>✔ Đóng gói cẩn thận, giao hàng nhanh.</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Đánh giá sản phẩm */}
                            <div className="mt-12 bg-white rounded-lg p-8 md:p-10 shadow-[0_30px_60px_rgba(0,0,0,0.02)] border border-slate-100">
                                <TitleSection> Đánh giá sản phẩm </TitleSection>
                                <div className="mb-3"></div>
                            {/* Tóm tắt Rating & Bộ lọc */}
                            <div className="flex flex-col md:flex-row gap-8 mb-8">
                                
                                {/* Điểm trung bình */}
                                <div className="md:w-1/3 flex flex-col items-center justify-center rounded-[24px] bg-slate-50 p-6 border border-slate-100">
                                <div className="text-6xl font-black text-slate-900">
                                    {product.sao}
                                </div>
                                <div className="flex items-center gap-1.5 text-amber-500 mt-2">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                    <svg key={index} xmlns="www.w3.org" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={`${index + 1 <= Math.round(product.sao) ? "text-amber-500" : "text-slate-200"}`}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                    ))}
                                </div>
                                <div className="text-xs text-slate-500 mt-2 font-medium">
                                    1.2k lượt đánh giá & 400+ hình ảnh
                                </div>
                                </div>

                                {/* Thanh filter số sao (Bento Style) */}
                                <div className="md:w-2/3 space-y-3 text-xs text-slate-600">
                                {[5, 4, 3, 2, 1].map((star) => (
                                    <div key={star} className="flex items-center gap-3">
                                    <span className="w-16 flex items-center gap-1 font-black text-sm text-slate-700">
                                        {star} <svg xmlns="www.w3.org" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                    </span>
                                    <div className="flex-1 h-3 rounded-full bg-slate-100 overflow-hidden shadow-inner">
                                        <div
                                        className="h-full bg-amber-500 rounded-full"
                                        style={{ width: `${star * 15}%` }}
                                        />
                                    </div>
                                    <span className="w-24 text-right text-slate-500 font-bold">{star * 20} đánh giá</span>
                                    </div>
                                ))}
                                </div>
                            </div>

                            {/* Button viết đánh giá */}
                            <div className="pt-6 border-t border-slate-50">
                                <button className="bg-red-900 hover:bg-black text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-red-900/30 active:scale-95 transition-all text-sm flex items-center gap-3">
                                    <svg xmlns="www.w3.org" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                                    Viết đánh giá của bạn
                                </button>
                            </div>

                            {/* Danh sách Review Chi tiết */}
                            <div className="mt-8 space-y-6">
                                {[1, 2].map((i) => (
                                <div
                                    key={i}
                                    className="border-b border-slate-100 pb-6 last:border-b-0"
                                >
                                    <div className="flex items-center gap-4 mb-3">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-600 shadow-sm">
                                        K{i}
                                    </div>
                                    <div>
                                        <div className="text-sm font-black text-slate-800">
                                        Khách hàng ẩn danh {i}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs">
                                        <div className="flex items-center gap-0.5 text-amber-500">
                                            {Array.from({ length: 5 }).map((_, index) => (
                                                <svg key={index} xmlns="www.w3.org" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className={`${index < 4 ? "text-amber-500" : "text-slate-300"}`}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                                            ))}
                                        </div>
                                        <span className="font-bold text-slate-400">4.0 sao</span>
                                        </div>
                                    </div>
                                    </div>

                                    <p className="text-sm text-slate-700 leading-relaxed mb-4 font-medium">
                                    Hàng đẹp, đóng gói chắc chắn, giao nhanh. Sản phẩm đúng như mô tả. Rất hài lòng với trải nghiệm mua sắm này tại **H2T SHOPP**!
                                    </p>

                                    {/* Hình ảnh đính kèm (Photo Reviews) */}
                                    <div className="flex gap-3 mt-1">
                                    {[1, 2].map((imgIndex) => (
                                        <div
                                        key={imgIndex}
                                        className="w-20 h-20 rounded-xl overflow-hidden border border-slate-100 bg-slate-50 shadow-md group hover:shadow-xl transition-all cursor-pointer"
                                        >
                                        <img
                                            src={product.hinhanhsp}
                                            alt={`review ${imgIndex}`}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        </div>
                                    ))}
                                    </div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-3">Đã mua 1 ngày trước • Phân loại: Xám Space</p>

                                </div>
                                ))}
                                {/* Thêm nút xem thêm đánh giá nếu cần */}
                                <div className="pt-6 text-center">
                                    <button className="text-sm font-bold text-red-900 hover:text-black transition-colors">Xem tất cả 1.2k đánh giá →</button>
                                </div>
                            </div>
                            </div>

                        </div>
                    </>
                )}
            </div>

            <Recently/>
        </>
    );
}
