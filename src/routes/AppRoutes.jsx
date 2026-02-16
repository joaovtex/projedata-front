import { BrowserRouter, Routes, Route } from "react-router-dom";

import Menu from "../pages/menu/index.jsx";
import Products from "../pages/products/index.jsx";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Menu />} />
                <Route path="/products" element={<Products />} />
            </Routes>
        </BrowserRouter>
    );
}