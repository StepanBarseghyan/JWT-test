import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import PrivateRoute from "../components/PrivateRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth/register",
    element: <Register />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/Dashboard",
    element: <Dashboard />,
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
]);

export default routes;
