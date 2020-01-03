import React from "react";
import { Link } from "gatsby";
import styles from "./home-link.module.scss";

const HomeLink = () => {
  return (
    <Link to={`/`} className={styles.link}>
      <span>Return to homepage</span>
    </Link>
  );
};

export default HomeLink;
