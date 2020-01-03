import React from "react";
import { Link } from "gatsby";
import styles from "./post-paginate.module.scss";

const PostPaginate = props => {
  const { previous, next } = props;
  return (
    <nav className={styles.paginationNav}>
      {previous && (
        <Link to={previous.fields.slug} className={styles.paginationLink}>
          <span>← Previous</span>
          <h3 className={styles.linkTitle}>
            <span>{previous.frontmatter.title}</span>
          </h3>
        </Link>
      )}
      {next && (
        <Link to={next.fields.slug} className={styles.paginationLink}>
          <span>Next →</span>
          <h3 className={styles.linkTitle}>
            <span>{next.frontmatter.title}</span>
          </h3>
        </Link>
      )}
    </nav>
  );
};

export default PostPaginate;
