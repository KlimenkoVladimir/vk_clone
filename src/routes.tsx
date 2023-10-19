import { ReactElement } from "react";
import Home from "./components/pages/Home";
import Friends from "./components/pages/Friends";
import Messages from "./components/pages/Messages";
import Profile from "./components/pages/Profile";
import News from "./components/pages/News";
import Edit from "./components/pages/Edit";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";

interface Iroute {
  path: string;
  element: ReactElement;
  auth: boolean;
}

export const routes: Iroute[] = [
  {
    path: "/",
    element: <Home />,
    auth: false,
  },
  {
    path: "/news",
    element: <News />,
    auth: false,
  },
  {
    path: "/login",
    element: <Login />,
    auth: false,
  },
  {
    path: "/register",
    element: <Register />,
    auth: false,
  },
  {
    path: "/profile/:id",
    element: <Profile />,
    auth: true,
  },
  {
    path: "/edit",
    element: <Edit />,
    auth: true,
  },
  {
    path: "/messages",
    element: <Messages />,
    auth: true,
  },
  {
    path: "/friends",
    element: <Friends />,
    auth: true,
  },
];
