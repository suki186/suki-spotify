import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LodingSpinner from "./components/common/LodingSpinner";

// 필요한 순간에만 불러와서 초기 로딩 빠름 -> 로딩 처리 필수(Suspense)
const AppLayout = React.lazy(() => import("./components/layout/AppLayout"));
const HomePage = React.lazy(() => import("./pages/Homepage"));
const SearchPage = React.lazy(() => import("./pages/SearchPage"));
const SearchResultPage = React.lazy(() => import("./pages/SearchResultPage"));
const PlaylistDetailPage = React.lazy(
  () => import("./pages/PlaylistDetailPage")
);
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "search/:keyword",
        element: <SearchResultPage />,
      },
      {
        path: "playlist/:id",
        element: <PlaylistDetailPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

const App = () => (
  <Suspense fallback={<LodingSpinner />}>
    <RouterProvider router={router} />
  </Suspense>
);

export default App;
