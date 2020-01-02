import React from "react";
import Helmet from "react-helmet";
import Layout from "../components/layout";
import styles from "./blog-post.module.scss";
import layout from "../layouts/layout.module.scss";
import { SourceDetails } from "../components/post-source/post-source";
import { Tags } from "../components/tags/tags";
import metaImg from "../images/social_1200x630_03.png";

const renderSrc = (srcUrl, source) => {
  if (!srcUrl) return;

  return <SourceDetails url={srcUrl} text={source} />;
};

const img = `https://css-irl.info${metaImg}`;

export default ({ data, location }) => {
  const post = data.markdownRemark;
  const { series, srcUrl, source, title, tags, date } = post.frontmatter;

  const renderSeriesTitle = () => {
    if (series) {
      return <h4 className={styles.seriesTitle}>{series}</h4>;
    }
  };

  return (
    <Layout>
      <Helmet
        title={`${data.site.siteMetadata.title} | ${series || ""} ${title}`}
      >
        <meta property="og:title" content={title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={img} />
        <meta
          property="og:url"
          content={`${data.site.siteMetadata.siteUrl}${location.pathname}`}
        />
      </Helmet>
      <div className={layout.postContent}>
        <header className={styles.postHeader}>
          <Tags group={tags} className={styles.tagList} />
          {renderSeriesTitle()}
          <h2 className={styles.postHeading}>{title}</h2>
          <time className={styles.src} dateTime={date}>
            {date}
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
