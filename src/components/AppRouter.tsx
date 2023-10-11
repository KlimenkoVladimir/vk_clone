import React, { FC, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { routes } from "../routes";
import { useAuth } from "./hooks/useAuth";

const AppRouter: FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {routes.map((route) => {
        if (route.auth && !user) {
          return null;
        }
        return (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          ></Route>
        );
      })}
    </Routes>
  );
};

export default AppRouter;
