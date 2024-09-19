import { lazy, Suspense, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { userExist, userNotExist } from "@/features/userSlice.js";

import Navbar2 from "./Components/Navbar2.jsx";
import Footer from "./Components/Footer.jsx";
import Loading from "./Components/Loading/Loading.jsx";
import ProtectedRoute from "./Components/ProtectedRoute";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { useDispatch, useSelector } from "react-redux";
const Home = lazy(() => import("./Pages/Home.jsx"));
const Mens = lazy(() => import("./Pages/Mens.jsx"));
const Womens = lazy(() => import("./Pages/Womens.jsx"));
const Kids = lazy(() => import("./Pages/Kids.jsx"));
const Products = lazy(() => import("./Pages/Products.jsx"));
const Product = lazy(() => import("./Pages/Product.jsx"));
const Cart = lazy(() => import("./Pages/Cart.jsx"));
const Login = lazy(() => import("./Pages/Login.jsx"));
const Orders = lazy(() => import("./Pages/Orders/Orders.jsx"));
const ConfirmUser = lazy(() => import("./Pages/UserConfirmation"));
const EnterPassword = lazy(()=>import('./Pages/EnterPassword'))
const Register = lazy(() => import("./Pages/Register.jsx"));
const NotFound = lazy(() => import("./Components/NotFound.jsx"));
const Dashboard = lazy(() => import("./Admin/Dashboard.jsx"));
const Overview = lazy(() => import("./Admin/Pages/Overview.jsx"));
const AdminProducts = lazy(() => import("./Admin/Pages/Products.jsx"));
const AdminUsers = lazy(() => import("./Admin/Pages/Users.jsx"));
const AdminSales = lazy(() => import("./Admin/Pages/Sales.jsx"));
const AdminOrders = lazy(() => import("./Admin/Pages/Orders.jsx"));
const AdminAnalysis = lazy(() => import("./Admin/Pages/Analysis.jsx"));
const AdminSettings = lazy(() => import("./Admin/Pages/Settings.jsx"));

function App() {
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state) => state.userReducer);
  const { confirm } = useSelector((state) => state.confirmUserReducer);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) {
      console.log("logged in");
      dispatch(userExist(user));
      return;
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("logged in");
        dispatch(
          userExist({
            userId: user._id,
            name: user.displayName,
            email: user.email,
            gender: user.gender,
            phone: user?.phoneNumber || null,
            isAdmin: user.isAdmin,
            profileUrl: user?.photoURL || null,
            googleId: user?.uid || null,
          })
        );
      } else {
        console.log("not logged in");
        dispatch(userNotExist());
      }
    });
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <>
      <div className="App">
        <Router>
          {/* Navbar */}
          <Navbar2 user={user} />
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/mens" element={<Mens />} />
              <Route path="/womens" element={<Womens />} />
              <Route path="/kids" element={<Kids />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<Product />} />

              {/* Not logged in route */}
              <Route
                element={
                  <ProtectedRoute isAuthenticated={user ? false : true} />
                }
              >
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>

              {/* confirm user route */}
              <Route element={<ProtectedRoute confirmUser={confirm} />}>
                <Route path="/confirm-user" element={<ConfirmUser />} />
                <Route path="/enter-pass" element={<EnterPassword />} />
              </Route>

              {/* Logged in user Route */}
              <Route
                element={
                  <ProtectedRoute isAuthenticated={user ? true : false} />
                }
              >
                <Route path="/orders" element={<Orders />} />
              </Route>

              <Route path="/admin" element={<Dashboard />}>
                <Route path="" element={<Overview />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="sales" element={<AdminSales />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="analytics" element={<AdminAnalysis />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Footer />
          <Toaster position="top-center" />
        </Router>
      </div>
    </>
  );
}

export default App;
