import api from './axiosConfig';

export const getProductRawMaterials = () => {
    return api.get("/product-raw-material");
}

export const createProductRawMaterial = (data) => {
    return api.post("/product-raw-material/new", data);
}

export const updateProductRawMaterial = (id, data) => {
    return api.put(`/product-raw-material/edit=${id}`, data);
}

export const deleteProductRawMaterial = (id) => {
    return api.delete(`/product-raw-material/delete=${id}`);
}