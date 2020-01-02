import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import layout from "../layouts/layout.module.scss";
import styles from "../templates/blog-post.module.scss";
import globals from "../layouts/styles.module.scss";

export default ({ data }) => (
  <Layout>
    <div className={layout.postContent}>
      <h1>404</h1>
      <div className={styles.richtext}>
        <p>Sorry, this page doesn’t exist</p>
      </div>
      <div className={globals.linkWrapper}>
        <Link to={`/`} className={globals.link}>
          <span>Return to homepage</span>
        </Link>
      </div>
    </div>
  </Layout>
);
