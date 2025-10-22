import { createBrowserRouter } from "react-router-dom";

import AppContainer from "./components/AppContainer";
import Landing from "./pages/Landing";
import Home from "./pages/home";
import Filter from "./pages/Filter";

const routes = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <Landing /> },

      {
        element: <AppContainer />,
        children: [
          { path: "home", element: <Home /> },
          { path: "filter", element: <Filter /> },
        ],
      },
    ],
  },
]);

export default routes;
