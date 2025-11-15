import { createBrowserRouter, Navigate } from "react-router-dom";

import AppContainer from "./components/AppContainer";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Filter from "./pages/Filter";
import AnimeDetails from "./pages/AnimeDetails";
import WatchAnime from "./pages/WatchAnime";
import ErrorPage from "./pages/Error";

const routes = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage type={500} />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <ErrorPage type={500} />,
      },

      {
        element: <AppContainer />,
        errorElement: <ErrorPage type={500} />,
        children: [
          { path: "home", element: <Home /> },
          { path: "search", element: <Filter /> },
          {
            path: "anime",
            children: [
              { index: true, element: <Navigate to="/404" replace /> },
              { path: ":anime_id", element: <AnimeDetails /> },
            ],
          },
          {
            path: "watch",
            children: [
              { index: true, element: <Navigate to="/404" replace /> },
              { path: ":anime_id", element: <WatchAnime /> },
            ],
          },

          { path: "401", element: <ErrorPage type={401} /> },
          { path: "500", element: <ErrorPage type={500} /> },

          { path: "*", element: <ErrorPage type={404} /> },
        ],
      },
    ],
  },
]);

export default routes;
