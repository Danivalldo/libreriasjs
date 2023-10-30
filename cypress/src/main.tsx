import React from "react";
import ReactDOM from "react-dom/client";
import "./index.sass";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./components/views/Root.tsx";
import Login from "./components/views/Login/index.tsx";
import Home from "./components/views/Home/index.tsx";
import View404 from "./components/views/View404/index.tsx";
import SignUp from "./components/views/SignUp/index.tsx";
import { TokenContextProvider } from "./context/TokenContext.tsx";

const root = ReactDOM.createRoot(document.getElementById("root")!);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "*",
    element: <View404 />,
  },
]);

root.render(
  // <React.StrictMode>
  <TokenContextProvider>
    <RouterProvider router={router} />
  </TokenContextProvider>
  // </React.StrictMode>
);
