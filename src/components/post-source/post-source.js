import React from "react";
import styles from "./post-source.module.scss";

export const SourceDetails = props => {
  const hasSrc = props.url;
  if (hasSrc !== false) {
    return (
      <a className={styles.src} href={props.url}>
        {props.text}
      </a>
    );
  }
};
