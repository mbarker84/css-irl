import React, { useEffect } from "react";
import styles from "./theme-toggle.module.scss";

const ThemeToggle = ({ theme, setTheme }) => {
  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      setTheme("dark");
    }
  }, []);

  return (
    <div className={styles.toggle}>
      <button
        onClick={() => {
          if (localStorage.getItem("theme") === "dark") {
            localStorage.setItem("theme", "light");
            setTheme("light");
          } else {
            localStorage.setItem("theme", "dark");
            setTheme("dark");
          }
        }}
        className={styles.button}
      >
        Switch to {theme == "dark" ? "light theme" : "dark theme"}
      </button>
    </div>
  );
};

export default ThemeToggle;
