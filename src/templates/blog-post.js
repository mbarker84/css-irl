import React from "react";
import Helmet from "react-helmet";
import loadable from "@loadable/component";
import Layout from "../components/layout";
import PostPaginate from "../components/post-paginate/post-paginate";
import styles from "./blog-post.module.scss";
import layout from "../layouts/layout.module.scss";
import { SourceDetails } from "../components/post-source/post-source";
import { Tags } from "../components/tags/tags";
import metaImg from "../images/social_1200x630_03.png";

const LoadableAdBlock = loadable(() =>
  import("../components/ad-block/AdBlock")
);

const renderSrc = (srcUrl, source) => {
  if (!srcUrl) return;

  return <SourceDetails url={srcUrl} text={source} />;
};

const renderExternalLink = (srcUrl) => {
  if (!srcUrl) return;

  return (
    <a className={styles.link} href={srcUrl}>
      Go to article
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.2 12.2">
        <path d="M5.7 0v1.5h4L4.5 6.7l1 1.1 5.3-5.2v3.9h1.4V0z" />
        <path fill="none" d="M3.4 6.7l3-2.9H1.5v7h7V5.9l-3 2.9z" />
        <path d="M8.5 5.9v4.9h-7v-7h4.9l1.5-1.6H0v10h10V4.4z" />
      </svg>
    </a>
  );
};

const img = `https://css-irl.info${metaImg}`;

export default ({ data, location, pageContext }) => {
  const post = data.markdownRemark;
  const { series, srcUrl, source, title, tags, date } = post.frontmatter;
  const { next, previous } = pageContext;

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
          {renderExternalLink(srcUrl)}

          <LoadableAdBlock />

          <PostPaginate previous={previous} next={next}></PostPaginate>
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
