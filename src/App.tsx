import React, { Suspense, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoadingSpinner from "./components/common/components/LoadingSpinner";
import useExchangeToken from "./hooks/useExchangeToken";

// 필요한 순간에만 불러와서 초기 로딩 빠름 -> 로딩 처리 필수(Suspense)
const AppLayout = React.lazy(() => import("./components/layout/AppLayout"));
const HomePage = React.lazy(() => import("./pages/homepage/Homepage"));
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

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const codeVerifier = localStorage.getItem("code_verifier");
  const { mutate: exchangeToken } = useExchangeToken();

  useEffect(() => {
    if (code && codeVerifier) {
      exchangeToken({ code, codeVerifier });
    }
  }, [code, codeVerifier, exchangeToken]);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
