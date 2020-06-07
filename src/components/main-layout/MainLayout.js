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

const styleClass = (theme) => {
  if (!theme) return null;

  if (theme === "dark") {
    return styles.dark;
  }

  if (theme === "light") {
    return styles.light;
  }
};

const userPrefersDark = () =>
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;
const userPrefersLight = () =>
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: light)").matches;

const MainLayout = (props) => {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    const localThemePref = localStorage.getItem("theme");

    if (localThemePref) {
      return setTheme(localThemePref);
    }

    // if (userPrefersDark()) {
    //   return setTheme("dark");
    // }

    // if (userPrefersLight()) {
    //   return setTheme("light");
    // }
  }, []);

  return (
    <div className={styleClass(theme)}>
      <StickyHeader />
      <ThemeToggle
        theme={theme}
        setTheme={setTheme}
        userPrefersDark={userPrefersDark}
      />

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
