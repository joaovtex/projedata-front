import { BrowserRouter, Routes, Route } from "react-router-dom";

import Menu from "../pages/menu/index.jsx";
import Products from "../pages/products/index.jsx";
import RegisterProduct from "../pages/registerProduct/index.jsx";
import RawMaterials from "../pages/rawMaterials/index.jsx";
import RegisterRawMaterial from "../pages/registerRawMaterial/index.jsx";
import EditRawMaterial from "../pages/editRawMaterial/index.jsx";
import EditProduct from "../pages/editProduct/index.jsx";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Menu />} />
                <Route path="/products" element={<Products />} />
                <Route path="/register-product" element={<RegisterProduct />} />
                <Route path="/products/edit/:id" element={<EditProduct/>} />
                <Route path="/raw-materials" element={<RawMaterials />} />
                <Route path="/register-raw-material" element={<RegisterRawMaterial />} />
                <Route path="/raw-materials/edit/:id" element={<EditRawMaterial />} />
            </Routes>
        </BrowserRouter>
    );
}