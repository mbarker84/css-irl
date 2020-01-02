import React from "react";
import Helmet from "react-helmet";
import styles from "../layouts/styles.module.scss";
import { StaticQuery, graphql } from "gatsby";
import StickyHeader from "../components/sticky-header/sticky-header";
import metaImg from "../images/social_1200x630_02.png";

const img = `https://css-irl.info${metaImg}`;

const d = new Date();
const currentYear = d.getFullYear();

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        site {
          siteMetadata {
            title
            description
            subheading
            siteUrl
          }
        }
      }
    `}
    render={data => (
      <div className={styles.body}>
        <Helmet title={data.site.siteMetadata.title}>
          <html lang="en-gb" />
          <meta
            name="description"
            content={data.site.siteMetadata.description}
          />
          <meta
            name="keywords"
            content="css, front end, web development, web design"
          />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="icons/apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="icons/apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="icons/apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="icons/apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="icons/icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="icons/icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="icons/icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="icons/icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="icons/icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="icons/icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="icons/icon-96x96.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content="/icon-144x144.png" />
          <meta name="theme-color" content="#ffffff" />
          <meta property="og:title" content={data.site.siteMetadata.title} />
          <meta
            property="og:description"
            content={data.site.siteMetadata.description}
          />
          <meta property="og:image" content={img} />

          <meta property="og:url" content={data.site.siteMetadata.siteUrl} />
          <meta
            property="og:site_name"
            content={data.site.siteMetadata.title}
          />
          <meta name="twitter:card" content="summary_large_image" />
        </Helmet>

        <StickyHeader />

        <main className={styles.content}>{children}</main>
        <footer className={styles.footer}>
          &copy; Michelle Barker {currentYear}
        </footer>
      </div>
    )}
  />
);
