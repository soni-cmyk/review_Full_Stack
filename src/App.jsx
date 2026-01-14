import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Products from "./pages/Product";
import Reviews from "./pages/Reviews";
import AddProduct from "./pages/admin/AddProducts";
import AdminReviews from "./pages/admin/AdminReviews";
import UserRoute from "./routes/UserRoute";
import AdminRoute from "./routes/AdminRoute";
import Navbar from "./components/Navbar";
import AdminProducts from "./pages/admin/AdminProducts";
import ProductView from "./pages/ProductView";
import Banner from "./components/Banner";
import BannerUpload from "./pages/admin/BannerUpload";
import "quill/dist/quill.snow.css";

import TemplateViewer from "./pages/TemplateViewer";
import PageEditor from "./pages/admin/PageEditor";
import AdminSettings from "./pages/admin/settings/AdminSettings";

const Layout = () => {
  const location = useLocation();

  // Hide navbar on auth pages
  const hideNavbar =
    location.pathname === "/" || location.pathname === "/signup";

  return (
    <div className="w-full bg-gray-100">
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* User */}
        <Route
          path="/products"
          element={
            <UserRoute>
              <Banner />
              <Products />
            </UserRoute>
          }
        />
        <Route
          path="/products/:productId"
          element={
            <UserRoute>
              <ProductView />
            </UserRoute>
          }
        />
        <Route
          path="/reviews/:productId"
          element={
            <UserRoute>
              <Reviews />
            </UserRoute>
          }
        />
        <Route
          path="/template/:slug"
          element={
            <UserRoute>
             <TemplateViewer />
            </UserRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin/products"
          element={
            <AdminRoute>
              <AdminProducts />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/add-product"
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/add-product/:productId"
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/reviews"
          element={
            <AdminRoute>
              <AdminReviews />
            </AdminRoute>
          }
        />
        <Route path="/admin/banner-upload"
          element={
            <AdminRoute>
              <BannerUpload />
            </AdminRoute>
          }
        />
        <Route path="/admin/template"
          element={
            <AdminRoute>
              <PageEditor />
            </AdminRoute>
          }
        />
        <Route path="/admin/settings"
          element={
            <AdminRoute>
              <AdminSettings />
            </AdminRoute>
          }
        />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;