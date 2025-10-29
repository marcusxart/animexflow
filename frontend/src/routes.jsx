import { createBrowserRouter } from "react-router-dom";

import AppContainer from "./components/AppContainer";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Filter from "./pages/Filter";
import AnimeDetails from "./pages/AnimeDetails";
import WatchAnime from "./pages/WatchAnime";

const routes = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <Landing /> },

      {
        element: <AppContainer />,
        children: [
          { path: "home", element: <Home /> },
          { path: "search", element: <Filter /> },
          { path: ":anime_id", element: <AnimeDetails /> },
          {
            path: "watch",
            children: [
              { index: true, element: <div>fsds</div> },
              { path: ":anime_id", element: <WatchAnime /> },
            ],
          },
        ],
      },
    ],
  },
]);

export default routes;
