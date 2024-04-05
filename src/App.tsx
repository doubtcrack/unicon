import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import SignUpPage from "./pages/Auth/SignUpPage";
import SignInPage from "./pages/Auth/SignInPage";
import { useEffect } from "react";
import Store from "./redux/store";
import { loadUser } from "./redux/actions/user";
import { getAllProducts } from "./redux/actions/product";
import HomePage from "./pages/HomePage";
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
import ChatBoxPage from "./pages/Profile/ChatBoxPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import EachOrderTrackPage from "./pages/Profile/EachOrderTrackPage";

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
        element: <HomePage />,
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
        path: "chat",
        element: <ChatBoxPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
    ],
  },
]);
function App() {
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(getAllProducts());
  }, [loadUser, getAllProducts]);
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
