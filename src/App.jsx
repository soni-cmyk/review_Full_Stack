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
import TemplateViewer from "./pages/TemplateViewer";
import PageEditor from "./pages/admin/PageEditor";
import AdminSettings from "./pages/admin/settings/AdminSettings";
import NotFound from "./components/NotFound";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";

const Layout = () => {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/" || location.pathname === "/signup";

  return (
    <div className="w-full bg-gray-100">
      {!hideNavbar && !location.pathname.includes("/admin") && <Navbar />}
      <Routes>
        {/* Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/404" element={<NotFound />} />

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

        {/* ADMIN WITH SIDEBAR */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="categories" element={<div>Admin Categories</div>} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="add-product/:productId" element={<AddProduct />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="banner-upload" element={<BannerUpload />} />
          <Route path="template" element={<PageEditor />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
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
