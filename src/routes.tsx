import { ReactElement } from "react";
import Home from "./components/pages/Home";
import Friends from "./components/pages/Friends";
import Auth from "./components/pages/Auth";
import Messages from "./components/pages/Messages";
import Profile from "./components/pages/Profile";
import News from "./components/pages/News";
import Edit from "./components/pages/Edit";

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
    path: "/auth",
    element: <Auth />,
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
