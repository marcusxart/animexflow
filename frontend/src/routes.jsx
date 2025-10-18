import { createBrowserRouter } from "react-router-dom";

import AppContainer from "./components/AppContainer";
import Landing from "./pages/Landing";
import Home from "./pages/home";

const routes = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <Landing /> },

      {
        element: <AppContainer />,
        children: [{ path: "home", element: <Home /> }],
      },
    ],
  },
]);

export default routes;
