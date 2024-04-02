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
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
    ],
  },
  {
    path: "/profile",
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
    ],
  },
]);
function App() {
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(getAllProducts());
  }, []);
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
