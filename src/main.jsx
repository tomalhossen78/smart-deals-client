import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./Componets/Home/Home.jsx";
import MainLayout from "./Layout/MainLayout.jsx";
import AllProducts from "./Componets/Home/AllProducts/AllProducts.jsx";
import AuthProvider from "./Context/AuthProvider.jsx";
import Register from "./Componets/Register/Register.jsx";
import MyProducts from "./Componets/MyProducts/MyProducts.jsx";
import Mybids from "./Componets/Mybids/Mybids.jsx";
import PrivateRoutes from "./Routes/PrivateRoutes.jsx";
import ProductDetails from "./Componets/ProductDetails/ProductDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "allProducts",
        Component: AllProducts,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "myProducts",
        element: (
          <PrivateRoutes>
            <MyProducts></MyProducts>
          </PrivateRoutes>
        ),
      },
      {
        path: "myBids",
        element: <Mybids></Mybids>,
      },
      {
        path: "productDetails/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/products/${params.id}`),
        element: <ProductDetails />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);
