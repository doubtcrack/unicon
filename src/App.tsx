import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import SignUpPage from "./pages/Auth/SignUpPage";
import SignInPage from "./pages/Auth/SignInPage";
import { useEffect } from "react";
import Store from "./redux/store";
import { loadSeller, loadUser } from "./redux/actions/user";
import { getAllProducts } from "./redux/actions/product";
import LandingPage from "./pages/LandingPage";
import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import Layout from "./pages/Layout";
import { ToastContainer } from "react-toastify";
import ProfilePage from "./pages/Profile/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage";
import ProfileLayout from "./pages/Profile/ProfileLayout";
import OrdersPage from "./pages/Profile/OrdersPage";
import TrackOrdersPage from "./pages/Profile/TrackOrdersPage";
import SettingsPage from "./pages/Profile/SettingsPage";
import InboxPage from "./pages/Profile/InboxPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import EachOrderTrackPage from "./pages/Profile/EachOrderTrackPage";
import ActivationPage from "./pages/Auth/ActivationPage";
import NotFoundPage from "./pages/NotFoundPage";
import ShopLayout from "./pages/Shop/ShopLayout";
import ShopDashboardPage from "./pages/Shop/ShopDashboardPage";
import ShopAllOrdersPage from "./pages/Shop/ShopAllOrdersPage";
import ShopAllProductsPage from "./pages/Shop/ShopAllProductsPage";
import ShopCreateProductPage from "./pages/Shop/ShopCreateProductPage";
import ShopSettingsPage from "./pages/Shop/ShopSettingsPage";
import ShopInboxPage from "./pages/Shop/ShopInboxPage";

const router = createBrowserRouter([
  {
    path: "signup",
    element: <SignUpPage />,
  },
  {
    path: "signin",
    element: <SignInPage />,
  },
  {
    path: "/",
    element: (
      <>
        <Layout>
          <Outlet />
        </Layout>
      </>
    ),
    children: [
      {
        path: "",
        element: <LandingPage />,
      },
      {
        path: "product",
        element: <ProductPage />,
      },
      {
        path: "product/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "user/order/:id",
        element: <OrderDetailsPage />,
      },
      {
        path: "activation/:activation_token",
        element: <ActivationPage />,
      },
      {
        path: "seller/activation/:activation_token",
        element: <ActivationPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <>
        <ProfileLayout>
          <Outlet />
        </ProfileLayout>
      </>
    ),
    children: [
      {
        path: "",
        element: <ProfilePage />,
      },
      {
        path: "orders",
        element: <OrdersPage />,
      },
      {
        path: "ordertrack",
        element: <TrackOrdersPage />,
      },
      {
        path: "order/:id",
        element: <EachOrderTrackPage />,
      },
      {
        path: "inbox",
        element: <InboxPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
  {
    path: "/shop/dashboard",
    element: (
      <>
        <ShopLayout>
          <Outlet />
        </ShopLayout>
      </>
    ),
    children: [
      {
        path: "",
        element: <ShopDashboardPage />,
      },
      {
        path: "orders",
        element: <ShopAllOrdersPage />,
      },
      {
        path: "products",
        element: <ShopAllProductsPage />,
      },
      {
        path: "create-product",
        element: <ShopCreateProductPage />,
      },
      {
        path: "inbox",
        element: <ShopInboxPage />,
      },
      {
        path: "settings",
        element: <ShopSettingsPage />,
      },
    ],
  },
]);
function App() {
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
  }, [loadUser, loadSeller, getAllProducts]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
