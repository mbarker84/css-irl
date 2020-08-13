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
        <h1>About</h1>
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
          <h2>Origins of this blog</h2>
          <p>
            I’ve always loved writing, even before my web development days.
            While learning web development, sites like <a href="">CSS Tricks</a>
            , <a href="">Smashing Magazine</a> and <a href="">A List Apart</a>{" "}
            were an enormous help and inspiration to me, and I appreciated the
            clear, high-quality articles, written by some of the best minds in
            the business. (I’ve been lucky enough to write for two of those
            three publications!)
          </p>
          <p>
            One of the things I love about being a web developer is the great
            sense of community. Although it’s not without its problems, for the
            most part people love sharing knowledge and are willing to help each
            other out. I started writing for the web partly to be be a part of
            this knowledge-sharing community, and partly to help with my own
            learning. Many of my articles came about through learning something
            new and wanting to record it, and they are resources that I refer
            back to.
          </p>
          <p>
            In 2018 I got really interested in CSS Grid Layout and custom
            properties, and wrote an article on using them together, which I
            published as a post on Codepen. It ended up being a really popular
            article (certainly by my standards at the time, anyway!). I was
            excited that I was able to help people discover new things to do
            with CSS. A couple more articles later, I got the idea of starting
            my own blog. While publishing on Codepen was a good way to reach a
            lot of people, I liked the idea of having my own little corner of
            the internet to publish on.
          </p>
          <p>
            Thus, CSS In Real Life was born, as both a website and a Twitter
            handle, with the goal of sharing my front-end learnings (and leaning
            heavily towards CSS).
          </p>
          <h2>Why “in real life”?</h2>
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
