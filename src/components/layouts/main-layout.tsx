import React, { useEffect, useState } from "react";
import { ChildrenProps } from "../../types/children";
import MainNav from "./main-nav";

function MainLayout({ children }: ChildrenProps) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("mode", !darkMode ? "dark" : "light");
  };

  useEffect(() => {
    const mode = localStorage.getItem("mode");

    if (mode === "dark") {
      setDarkMode(true);
    }
  }, []);

  return (
    <div
      className={`min-h-screen bg-dark-white  text-primary-black dark:text-white dark:bg-smoky-black shadow-bottom ${
        darkMode ? "dark" : ""
      }`}
    >
      <MainNav toggleMode={toggleDarkMode} mode={darkMode} />
      <div className="pt-32 px-12 dark:text-zinc-50">{children}</div>
    </div>
  );
}

export default MainLayout;
