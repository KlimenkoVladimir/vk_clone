import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "../routes";

const AppRouter: FC = () => {
  const isAuth = true;

  return (
    <Routes>
      {routes.map((route) => {
        if (route.auth && !isAuth) {
          return null;
        }
        return <Route path={route.path} element={route.element}></Route>;
      })}
    </Routes>
  );
};

export default AppRouter;
