import React from "react";
import Layout from "../components/layout";
import layout from "../layouts/layout.module.scss";
import styles from "../templates/blog-post.module.scss";

export default ({ data }) => (
  <Layout>
    <div className={layout.mainContent}>
      <div className={layout.pageContent}>
        <h1>About</h1>
        <div className={styles.richtext}>
          <p>
            CSS In Real Life is a blog covering CSS topics and useful snippets
            on the web’s most beautiful language.
          </p>
          <p>
            Published by{" "}
            <a href="http://www.michellebarker.co.uk">Michelle Barker</a>, front
            end developer at{" "}
            <a href="https://www.atomicsmash.co.uk/">Atomic Smash</a> and CSS
            superfan.
          </p>
          <p>
            <a href="mailto:contact@michellebarker.co.uk">
              contact@michellebarker.co.uk
            </a>
          </p>
        </div>
      </div>
    </div>
  </Layout>
);

export const query = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
        subheading
      }
    }
  }
`;
