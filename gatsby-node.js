const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const _ = require("lodash");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const blogListingTemplate = path.resolve("src/templates/index.js");
  const blogPostTemplate = path.resolve("src/templates/blog-post.js");
  const tagTemplate = path.resolve("src/templates/tags.js");
  const aboutTemplate = path.resolve("src/pages/about.js");

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                tags
                title
                date
              }
            }
          }
        }
      }
    `).then((result) => {
      const posts = result.data.allMarkdownRemark.edges;

      // Post detail pages
      posts.forEach((post, index) => {
        const previous =
          index === posts.length - 1 ? null : posts[index + 1].node;
        const next = index === 0 ? null : posts[index - 1].node;

        createPage({
          path: post.node.fields.slug,
          component: blogPostTemplate,
          context: {
            slug: post.node.fields.slug,
            previous,
            next,
          },
        });

        const postsPerPage = 12;
        const numPages = Math.ceil(posts.length / postsPerPage);

        // Listing page (index)
        Array.from({ length: numPages }).forEach((_, i) => {
          const postsToShow = i === 0 ? 13 : 12;
          const skip = i === 0 ? 0 : i * postsPerPage + 1;
          createPage({
            path: i === 0 ? `/` : `/${i + 1}`,
            component: blogListingTemplate,
            context: {
              limit: postsToShow,
              skip,
              numPages,
              currentPage: i + 1,
            },
          });
        });

        // Tag pages:
        let tags = [];
        _.each(posts, (edge) => {
          if (_.get(edge, "node.frontmatter.tags")) {
            tags = tags.concat(edge.node.frontmatter.tags);
          }
        });
        tags = _.uniq(tags);

        tags.forEach((tag) => {
          createPage({
            path: `/tags/${_.kebabCase(tag)}/`,
            component: tagTemplate,
            context: {
              tag,
            },
          });
        });

        createPage({
          path: `/about/`,
          component: aboutTemplate,
          context: {},
        });
      });
      resolve();
    });
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};
