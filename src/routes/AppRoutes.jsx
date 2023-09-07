import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/Login/index";
import Animal from "../pages/LoaiNguyCap";
import LayOutAddAnimal from "../pages/LoaiNguyCap/components/LayOutAddAnimal";
import UpdateLoaiLayout from "../pages/LoaiNguyCap/components/feature/UpdateLoai/UpdateLoaiLayout";

function AppRoutes() {
  return (
    <>
      <Routes path="/">
        <Route path="" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="loai" element={<Animal />} />
        <Route path="loai/them-moi" element={<LayOutAddAnimal />} />
        <Route path="loai/update/:id" element={<UpdateLoaiLayout />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
