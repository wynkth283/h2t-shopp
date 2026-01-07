// const cart = [
//     // {
//     //     id: 1,
//     //     tensp: "Apple iPhone 17 Pro Max 1TB Chính hãng",
//     //     slug: "apple-iphone-17-pro-max-1tb-chinh-hang",
//     //     giasp: 200000,
//     //     hinhanhsp: "https://down-vn.img.susercontent.com/file/vn-11134207-820l4-megm9h242p6q9f.webp",
//     //     slsp: 3
//     // },
//     // {
//     //     id: 2,
//     //     tensp: "iPhone 17 Pro Max 1TB Chính Hãng",
//     //     slug: "iphone-17-pro-max-1tb-chinh-hang",
//     //     giasp: 500000,
//     //     hinhanhsp: "https://down-vn.img.susercontent.com/file/vn-11134207-820l4-megm9h2acumd01.webp",
//     //     slsp: 2
//     // },
//     // {
//     //     id: 3,
//     //     tensp: "Ốp lưng iPhone trong suốt hít nam châm siêu chặt, viền silicon chống sốc, lưng nhựa cứng chống ố",
//     //     slug: "op-lung-iphone-trong-suot-hit-nam-cham-sieu-chat-vien-silicon-chong-soc-lung-nhua-cung-chong-o",
//     //     giasp: 500000,
//     //     hinhanhsp: "https://down-vn.img.susercontent.com/file/vn-11134207-820l4-mgrh1ap89xxr44.webp",
//     //     slsp: 2
//     // },
//     // {
//     //     id: 4,
//     //     tensp: "Cáp Sạc OPPO Micro USB DL109 - Hàng Chính Hãng",
//     //     slug: "cap-sac-oppo-micro-usb-dl109-hang-chinh-hang",
//     //     giasp: 100000,
//     //     hinhanhsp: "https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-ljxjievx8gea83.webp",
//     //     slsp: 2
//     // }
// ]
let cart = [];

try {
  const userStr = window.localStorage.getItem('user');
  const cartStr = window.localStorage.getItem('cart');

  if (userStr && cartStr) {
    const userData = JSON.parse(userStr);
    const cartArr = JSON.parse(cartStr);

    // Chỉ lấy cart theo đúng user hiện tại (nếu userData có id)
    if (userData && userData.userData && userData.userData.id) {
      cart = cartArr.filter(item => item.idnd === userData.userData.id);
    } else {
      cart = [];
    }
  }
} catch (err) {
  console.error('Lỗi xử lý dữ liệu giỏ hàng từ localStorage:', err);
  cart = [];
}

export { cart };
