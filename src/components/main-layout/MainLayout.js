import React, { useState, useEffect } from "react";
import StickyHeader from "../sticky-header/sticky-header";
import ThemeToggle from "../theme-toggle/ThemeToggle";
import styles from "../../layouts/styles.module.scss";
import layout from "../../layouts/layout.module.scss";
import "../global.css";

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

const d = new Date();
const currentYear = d.getFullYear();

const MainLayout = (props) => {
  const localThemePref = localStorage.getItem("theme");
  const [theme, setTheme] = useState(localThemePref ? localThemePref : "light");

  // if (localStorage.getItem("darkTheme") === true) {
  //   setDarkTheme(true);
  //   console.log("dark");
  // } else {
  //   setDarkTheme(false);
  //   console.log("light");
  // }

  useEffect(() => {
    console.log(localStorage.getItem("theme"), theme);
    // if (localStorage.getItem("darkTheme") === true) {
    //   setDarkTheme(true);
    //   console.log("dark");
    // } else {
    //   setDarkTheme(false);
    //   console.log("light");
    // }
    // if (localStorage.getItem("darkTheme") === false) {
    //   return setDarkTheme(true);
    // }
  }, []);

  return (
    <div className={theme === "dark" ? styles.dark : styles.light}>
      <StickyHeader />
      <ThemeToggle theme={theme} setTheme={setTheme} />

      <div className={layout.mainContent}>
        <main className={layout.pageContent}>{props.children}</main>
        <footer className={styles.footer}>
          &copy; Michelle Barker {currentYear}
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;
