import { Route, Routes, Navigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import HomeRoutes from "./HomeRoutes";
import AdminRoutes from "./admin/AdminRoutes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {



  return (
    <>
      <Routes>
        <Route path="/*" element={<HomeRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
