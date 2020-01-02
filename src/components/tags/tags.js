import React from "react";
import { Link } from "gatsby";
import kebabCase from "lodash/kebabCase";
import styles from "./tags.module.scss";

export const Tags = props => {
  return (
    <ul className={styles.tagList}>
      {props.group.map(tag => (
        <li key={tag} className={styles.tagItem}>
          <Link
            to={`/tags/${kebabCase(tag)}/`}
            style={{ textDecoration: `none`, color: `inherit` }}
            styles={styles.link}
          >
            <span className={styles.tagName}>{tag}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};
