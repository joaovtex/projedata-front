import api from './axiosConfig';

export const getRawMaterials = (params = {}) => {
    return api.get("/raw-materials", {params});
}

export const getRawMaterialById = (id) => {
    return api.get(`/raw-materials/id=${id}`);
}

export const createRawMaterial = (data) => {
    return api.post("/raw-materials/new", data);
}

export const updateRawMaterial = (id, data) => {
    return api.put(`/raw-materials/edit=${id}`, data);
}

export const deleteRawMaterial = (id) => {
    return api.delete(`/raw-materials/delete=${id}`);
}