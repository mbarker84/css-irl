import React from "react";
import { Link } from "gatsby";
import globals from "../../globals/globals.module.scss";
import styles from "./post-preview.module.scss";

const renderFeatured = (featured) => {
  if (!featured) return;

  return <h3 className={styles.featured}>Lastest article</h3>;
};

export const PostPreview = (props) => {
  const externalLink = props.externalLink;
  const seriesTitle = () => {
    if (props.series) {
      return <h4 className={styles.seriesTitle}>{props.series}</h4>;
    }
  };

  const contentStyle = props.featured ? styles.featuredContent : styles.content;
  const postStyle = props.featured ? styles.featuredPost : styles.regularPost;

  if (!externalLink) {
    return (
      <div className={postStyle}>
        <div className={styles.postPreview}>
          {renderFeatured(props.featured)}
          {seriesTitle()}
          <h2 className={styles.title}>
            <Link
              to={props.to}
              style={{ textDecoration: `none` }}
              className={styles.postLink}
            >
              <span>{props.title}</span>
            </Link>
          </h2>
          <time className={styles.date} dateTime={props.date}>
            {props.date}
          </time>
          <p className={contentStyle}>{props.excerpt}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={postStyle}>
      <div className={styles.postPreview}>
        {renderFeatured(props.featured)}
        {seriesTitle()}
        <h2 className={styles.title}>
          <a
            href={props.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.postLink}
          >
            <span>{props.title}</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.2 12.2">
              <path d="M5.7 0v1.5h4L4.5 6.7l1 1.1 5.3-5.2v3.9h1.4V0z" />
              <path fill="none" d="M3.4 6.7l3-2.9H1.5v7h7V5.9l-3 2.9z" />
              <path d="M8.5 5.9v4.9h-7v-7h4.9l1.5-1.6H0v10h10V4.4z" />
            </svg>
          </a>
        </h2>
        <time className={styles.date} dateTime={props.date}>
          {props.date}
        </time>
        <div className={contentStyle}>{props.excerpt}</div>
      </div>
    </div>
  );
};
