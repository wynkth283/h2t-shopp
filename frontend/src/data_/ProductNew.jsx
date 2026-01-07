import { products } from "./Product";

function updateNewFlag(products) {
    const FIVE_DAYS = 5 * 24 * 60 * 60 * 1000; // ms
    const now = Date.now();

    return products.map(product => {
        const created = new Date(product.createdAt).getTime();
        const isNew = (now - created) <= FIVE_DAYS;

        return {
            ...product,
            spmoi: isNew
        };
    });
}

const products_new = updateNewFlag(products);

export { products_new }