import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import AddProductsPage from "./admin/AddProductsPage";
import ContactUsPage from "./pages/ContactUsPage";
import ShowCategoryPage from "./pages/ShowCategoryPage";
import AddCategoryPage from "./admin/AddCategoryPage";
import AddSubCategoryPage from "./admin/AddSubCategoryPage";
import ProductPage from "./pages/ProductPage";
import ShowProductPage from "./pages/ShowProductPage";
import CartPage from "./pages/CartPage";
import AddVariantsPage from "./admin/AddVariantsPage";
import AddAttributesPage from "./admin/AddAttributesPage";
import CheckOutPage from "./pages/checkout/CheckOutPage";
import ProtectedRoute from "./routing/ProtectedRoutes";
import {CheckOutError, CheckOutSuccess} from "./pages/checkout/CheckOutSuccess";
import Footer from "./components/Footer";


function App() {
  return (
    <div>
      <main>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<HomePage />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route path="/contactUs" element={<ContactUsPage />} />
            <Route path="/showCategoryPage" element={<ShowCategoryPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/showProduct/:id" element={<ShowProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckOutPage />} />
            <Route path="/checkout-success" element={<CheckOutSuccess />} />
            <Route path="/checkout-error" element={<CheckOutError />} />
            {/* Admin Routes */}
            <Route path="/addProducts" element={<AddProductsPage />} />
            <Route path="/addCategory" element={<AddCategoryPage />} />
            <Route path="/addSubCategory" element={<AddSubCategoryPage />} />
            <Route path="/addVariant" element={<AddVariantsPage />} />
            <Route path="/addAttributes" element={<AddAttributesPage />} />
          </Routes>
        </BrowserRouter>
        <div>
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default App;
