import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs, Navigation } from "swiper/modules";
import { imgs_product } from "../../../../data/ImgsProduct";

export default function ImgThumbnail({product}) {
    const anhmotasp = imgs_product.filter(item => item.idproduct === product.id && item.hinhanh && item.hinhanh !== "");
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [currentImage, setCurrentImage] = useState(product.hinhanhsp);

    return (
        <div className="lg:col-span-5 space-y-4">
            {/* Slider Ảnh lớn */}
            <Swiper modules={[FreeMode, Thumbs, Navigation]} navigation thumbs={{ swiper: thumbsSwiper }} className="rounded-xl overflow-hidden box" >
                <SwiperSlide>
                    <img src={product.hinhanhsp} onClick={() => setCurrentImage(product.hinhanhsp)} className="w-full h-full object-contain cursor-pointer" />
                </SwiperSlide>
                {anhmotasp.map(img => (
                    <SwiperSlide key={img.idhinhanh}>
                        <img src={img.hinhanh} onClick={() => setCurrentImage(img.hinhanh)} className="w-full h-full object-contain cursor-pointer" />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Slider thumbnail */}
            <Swiper onSwiper={setThumbsSwiper} modules={[FreeMode, Thumbs, Navigation]} navigation slidesPerView={4} spaceBetween={10} freeMode watchSlidesProgress className="box" >
                <SwiperSlide onClick={() => setCurrentImage(product.hinhanhsp)} className={`aspect-square rounded-lg border p-1 cursor-pointer transition ${currentImage === product.hinhanhsp ? "border-2 border-red-900" : "border-gray-200"}`}>
                        <img src={product.hinhanhsp} alt={product.hinhanhsp} className="w-full h-full object-cover rounded-md" />
                </SwiperSlide>
                {anhmotasp.map(img => (
                    <SwiperSlide key={img.idhinhanh}>
                        <img src={img.hinhanh} alt={img.hinhanh} onClick={() => setCurrentImage(img.hinhanh)} className={`rounded-lg border cursor-pointer ${ currentImage === img.hinhanh ? "border-2 border-red-900" : "border-gray-200"}`} />
                    </SwiperSlide>
                ))}
            </Swiper> 
        </div>
    )
}