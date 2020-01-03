import React from "react";
import HomeLink from "../components/home-link/home-link";
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
      <div class={globals.bottomNav}>
        <HomeLink />
      </div>
    </div>
  </Layout>
);
