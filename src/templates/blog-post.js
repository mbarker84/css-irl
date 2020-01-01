import React from "react";
import Helmet from "react-helmet";
import Layout from "../components/layout";
import styles from "./blog-post.module.scss";
import layout from "../layouts/layout.module.scss";
import { SourceDetails } from "../components/post-source/post-source";
import { Tags } from "../components/tags/tags";

const renderSrc = (srcUrl, source) => {
  if (!srcUrl) return;

  return <SourceDetails url={srcUrl} text={source} />;
};

export default ({ data, location }) => {
  const post = data.markdownRemark;
  const { series, srcUrl, source } = post.frontmatter;
  const tags = post.frontmatter.tags;

  const renderSeriesTitle = () => {
    if (series) {
      return <h4 className={styles.seriesTitle}>{series}</h4>;
    }
  };

  return (
    <Layout>
      <Helmet
        title={`${data.site.siteMetadata.title} | ${series || ""} ${
          post.frontmatter.title
        }`}
      >
        <meta property="og:title" content={post.frontmatter.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta
          property="og:url"
          content={`${data.site.siteMetadata.siteUrl}${location.pathname}`}
        />
      </Helmet>
      <div className={layout.postContent}>
        <header className={styles.postHeader}>
          <Tags group={tags} className={styles.tagList} />
          {renderSeriesTitle()}
          <h2 className={styles.postHeading}>{post.frontmatter.title}</h2>
          <time className={styles.src} dateTime={post.frontmatter.date}>
            {post.frontmatter.date}
          </time>
          {renderSrc(srcUrl, source)}
        </header>
        <div className={layout.articleBody}>
          <article
            dangerouslySetInnerHTML={{ __html: post.html }}
            className={styles.richtext}
          />
          <div className={styles.ad}>
            {
              <script
                async
                type="text/javascript"
                src="//cdn.carbonads.com/carbon.js?serve=CE7D62J7&placement=css-irlinfo"
                id="_carbonads_js"
              ></script>
            }
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "DD MMMM, YYYY")
        source
        srcUrl
        externalLink
        series
        tags
      }
      excerpt
    }
    site {
      siteMetadata {
        title
        description
        subheading
        siteUrl
      }
    }
  }
`;
