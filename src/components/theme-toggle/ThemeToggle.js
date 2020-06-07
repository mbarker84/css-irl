import React, { useState, useEffect } from "react";
import styles from "./theme-toggle.module.scss";

/*
  Local storage should override system pref.

  States:
  - No system preference
  - localStorage empty

  - No system preference
  - localStorage = dark

  - No system preference
  - localStorage = light - same as default

  - Dark theme system pref
  - localStorage empty

  - Light theme system pref
  - localStorage empty

  - Dark theme system pref
  - localStorage = dark

  - Dark theme system pref
  - localStorage = light

  - Light theme system pref
  - localStorage = dark

  - Light theme system pref
  - localStorage = light
*/

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
