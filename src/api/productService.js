import api from "./axiosConfig";

export const getProducts = (params = {}) => {
    return api.get("/products", {params});
}

export const getProductById = (id) => {
    return api.get(`/products/id=${id}`);
}

export const createProduct = (data) => {
    return api.post("/products/new", data);
}

export const updateProduct = (id, data) => {
    return api.put(`/products/edit=${id}`, data);
}

export const deleteProduct = (id) => {
    return api.delete(`/products/delete=${id}`);
}