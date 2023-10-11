import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { AuthProvider } from "./components/providers/AuthProvider";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
