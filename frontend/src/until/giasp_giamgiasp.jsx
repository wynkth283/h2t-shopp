// a: giá gốc sản phẩm
// b: giá trị giảm
// c: giá đã áp dụng giá trị giảm
function tinhgiamgia(a, b) {
    // Kiểm tra a có tồn tại và là số hợp lệ
    if (a === undefined || a === null || isNaN(a)) {
        return "0";
    }

    if(b===0 || !b) return a.toLocaleString("vi-VN");
    const c = a - a * (b/100);
    return c.toLocaleString("vi-VN");
}

function so(a, b) {
    // Kiểm tra a có tồn tại và là số hợp lệ
    if (a === undefined || a === null || isNaN(a)) {
        return 0;
    }

    if(b===0 || !b) return a;
    const c = a - a * (b/100);
    return c;
}

function giatridagiam(a, b) {
    // Kiểm tra a và b có tồn tại và là số hợp lệ
    if (a === undefined || a === null || isNaN(a) || b === undefined || b === null || isNaN(b)) {
        return 0;
    }

    const c = a *(b/100);
    return c
}

export { tinhgiamgia, so, giatridagiam}
