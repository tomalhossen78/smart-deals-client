import React from "react";
import Navbar from "../Componets/Home/Navbar/Navbar";
import { Outlet } from "react-router";
import Home from "../Componets/Home/Home";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
