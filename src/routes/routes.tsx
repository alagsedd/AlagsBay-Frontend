import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import ExploreMore from "../components/ExploreMore";
import UserAccount from "../pages/UserAccount";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Reviews from "../components/Reviews";
import Shipping from "../components/Shipping";
import MainLayout from "./MainLayout";
import ProductDetailLayout from "./ProductDetailLayout";
import ProductDescription from "../components/ProductDescription";
import ThankYou from "../components/ThankYou";
import PaystackPaymentButton from "../components/PaystackCheckout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "cart", element: <Cart /> },
      { path: "products", element: <ExploreMore /> },
      {
        path: "products/:id",
        element: <ProductDetailLayout />,
        children: [
          { index: true, element: <ProductDescription /> },
          { path: "reviews", element: <Reviews /> },
          { path: "shipping", element: <Shipping /> },
        ],
      },
      { path: "user-account", element: <UserAccount /> },
      { path: "sign-in", element: <SignIn /> },
      { path: "sign-up", element: <SignUp /> },
      { path: "thank-you", element: <ThankYou /> },
      { path: "checkout", element: <PaystackPaymentButton /> },
    ],
  },
]);
