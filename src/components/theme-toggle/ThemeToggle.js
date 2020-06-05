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

const ThemeToggle = ({ darkTheme, setDarkTheme }) => {
  useEffect(() => {
    if (localStorage.getItem("darkTheme") === true) {
      setDarkTheme(true);
    }
  }, []);

  return (
    <div className={styles.toggle}>
      <label for="theme">
        Switch to {darkTheme ? "light theme" : "dark theme"}
      </label>
      <input
        type="checkbox"
        id="theme"
        checked={darkTheme}
        name="theme"
        value={darkTheme}
        onChange={() => {
          if (localStorage.getItem("darkTheme") == true) {
            localStorage.setItem("darkTheme", false);
          } else {
            localStorage.setItem("darkTheme", true);
          }

          setDarkTheme(!darkTheme);
        }}
      />
    </div>
  );
};

export default ThemeToggle;
