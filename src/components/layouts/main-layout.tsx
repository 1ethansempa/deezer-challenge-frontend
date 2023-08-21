import React from "react";
import { ChildrenProps } from "../../types/html-types";
import MainNav from "./main-nav";
import { useSelector } from "react-redux";
import { RootState } from "src/store";

function MainLayout({ children }: ChildrenProps) {
  const darkMode = useSelector((state: RootState) => state.mode.darkMode);

  return (
    <div
      className={`min-h-screen bg-dark-white  text-primary-black dark:text-white dark:bg-smoky-black shadow-bottom ${
        darkMode ? "dark" : ""
      }`}
    >
      <MainNav />
      <div className="pt-24 px-12 dark:text-zinc-50">{children}</div>
    </div>
  );
}

export default MainLayout;
