import React from "react";
import { Link } from "gatsby";
import styles from "./sticky-header.module.scss";
import Logo from "../logo/logo";
import Navigation from "../navigation/navigation";

const StickyHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <Link className={styles.homeLink} to={`/`}>
          <Logo />
        </Link>
      </div>
      <div className={styles.headerRight}>
        <Navigation />
      </div>
    </header>
  );
};

export default StickyHeader;
