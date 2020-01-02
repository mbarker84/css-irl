import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";
import { PostPreview } from "../components/post-preview/post-preview";

import globals from "../globals/globals.module.scss";
import styles from "./listing-page.module.scss";
import layout from "../layouts/layout.module.scss";

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext;
  const { edges, totalCount } = data.allMarkdownRemark;
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`;

  return (
    <Layout>
      <header className={styles.header}>
        <div className={styles.searchTags}>
          <Link to="/tags" className={globals.link}>
            Search by topic
          </Link>
        </div>
      </header>
      <div className={layout.mainContent}>
        <h2 className={styles.resultTitle}>{tagHeader}</h2>
        <ul className={layout.postsGrid}>
          {edges.map(({ node }) => {
            const { slug } = node.fields;
            const { title, date, externalLink, series } = node.frontmatter;
            return (
              <li key={slug} className={styles.listItem}>
                <PostPreview
                  to={slug}
                  title={title}
                  excerpt={node.excerpt}
                  date={date}
                  externalLink={externalLink}
                  series={series}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
};

export default Tags;

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
          }
          html
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            series
            externalLink
          }
        }
      }
    }
  }
`;
