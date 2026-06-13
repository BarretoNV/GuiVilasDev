/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./error-page";
import Loader from "./components/Loader";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = React.lazy(() => import("./pages/home"));
const FunWithAPIs = React.lazy(() => import("./pages/funWithApis"));
const NewsList = React.lazy(() => import("./pages/scienceNewsList"));
const TechNewsList = React.lazy(() => import("./pages/technologyNewsList"));
const WeatherInfo = React.lazy(() => import("./pages/weatherApi"));
const Projects = React.lazy(() => import("./pages/projects"));
const Blog = React.lazy(() => import("./pages/blog"));
const BlogPost = React.lazy(() => import("./pages/blogPost"));
const Astrophotography = React.lazy(() => import("./pages/astrophotography"));
const AstrophotographyPost = React.lazy(
  () => import("./pages/astrophotographyPost")
);

const withPageLoader = (page) => (
  <React.Suspense fallback={<Loader />}>{page}</React.Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: withPageLoader(<Home />),
    errorElement: <ErrorPage />,
  },
  {
    path: "/funwithapis",
    element: withPageLoader(<FunWithAPIs />),
    errorElement: <ErrorPage />,
  },
  {
    path: "/projects",
    element: withPageLoader(<Projects />),
    errorElement: <ErrorPage />,
  },
  {
    path: "/blog",
    element: withPageLoader(<Blog />),
    errorElement: <ErrorPage />,
  },
  {
    path: "/blog/:slug",
    element: withPageLoader(<BlogPost />),
    errorElement: <ErrorPage />,
  },
  {
    path: "/astrofotografia",
    element: withPageLoader(<Astrophotography />),
    errorElement: <ErrorPage />,
  },
  {
    path: "/astrofotografia/:slug",
    element: withPageLoader(<AstrophotographyPost />),
    errorElement: <ErrorPage />,
  },
  {
    path: "/sciencenewslist",
    element: withPageLoader(<NewsList />),
    errorElement: <ErrorPage />,
  },
  {
    path: "/technologynewslist",
    element: withPageLoader(<TechNewsList />),
    errorElement: <ErrorPage />,
  },
  {
    path: "/weatherinfos",
    element: withPageLoader(<WeatherInfo />),
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Analytics />
  </React.StrictMode>
);
