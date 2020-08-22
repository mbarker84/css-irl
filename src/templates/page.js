import React from "react";
import { Link } from "gatsby";
import Layout from "../components/layout";
import HomeLink from "../components/home-link/home-link";
import layout from "../layouts/layout.module.scss";
import styles from "../templates/blog-post.module.scss";
import globals from "../layouts/styles.module.scss";

export default ({ data }) => (
  <Layout>
    <div className={layout.postContent}>
      <header className={styles.postHeader}>
        <h1>{data.markdownRemark.frontmatter.title}</h1>
      </header>
      <div className={styles.richtext}>
        <div className={styles.intro}>
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

        <div className={layout.articleBody}>
          <div
            dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
            className={styles.richtext}
          />
        </div>
      </div>
    </div>
  </Layout>
);

export const query = graphql`
  query TestQuery {
    markdownRemark {
      frontmatter {
        title
      }
      html
    }
  }
`;
