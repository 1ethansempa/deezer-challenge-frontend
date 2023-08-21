import React from "react";
import { Link } from "react-router-dom";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { toggleMode } from "../../slices/modeSlice";

function MainNav() {
  const darkMode = useSelector((state: RootState) => state.mode.darkMode);

  const dispatch = useDispatch();

  return (
    <nav className="p-6 flex justify-between bg-dark-white dark:bg-smoky-black shadow-bottom dark:shadow-bottom-white">
      <Link to="/">
        <span className="italic font-bold text-xl text-primary-black dark:text-zinc-50">
          discover.
        </span>
      </Link>
      <Toggle
        onChange={() => dispatch(toggleMode())}
        checked={darkMode}
        icons={{
          checked: <Sun color="#0E0F09" />,
          unchecked: <Moon color="#0E0F09" />,
        }}
      />
    </nav>
  );
}

export default MainNav;
