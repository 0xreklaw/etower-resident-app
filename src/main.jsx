import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./AuthProvider"
import { ResidentProvider } from "./ResidentProvider";
import "./index.css";

// @pages
import Root from "./routes/root";
import Residents from "./routes/residents/all";
import Resident from "./routes/residents/index";
import Create from "./routes/residents/create";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/residents",
    element: <Residents />,
  },
  {
    path: "/residents/:id",
    element: <Resident />,
  },
  {
    path: "/residents/create",
    element: <Create />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ResidentProvider>
      <RouterProvider router={router} />
      </ResidentProvider>
    </AuthProvider>
  </React.StrictMode>
);
