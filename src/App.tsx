import { Header } from "./components/header/header";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SignUpPage from "./pages/Auth/SignUp";
import SignInPage from "./pages/Auth/SignIn";
import { useEffect } from "react";
import Store from "./redux/store";
import { loadUser } from "./redux/actions/user";
import { getAllProducts } from "./redux/actions/product";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
  },
  {
    path: "signup",
    element: <SignUpPage />,
  },
  {
    path: "signin",
    element: <SignInPage />,
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
    </>
  );
}

export default App;
