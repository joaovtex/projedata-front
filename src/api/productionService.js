import api from "./axiosConfig";

export const getProduction = () => {
    return api.get("/production");
}