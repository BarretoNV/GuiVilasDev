import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./error-page";
import Home from "./pages/home";
import FunWithAPIs from "./pages/funWithApis";
import NewsList from "./pages/scienceNewsList";
import TechNewsList from "./pages/technologyNewsList";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/funwithapis",
    element: <FunWithAPIs />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/sciencenewslist",
    element: <NewsList/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/technologynewslist",
    element: <TechNewsList/>,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
