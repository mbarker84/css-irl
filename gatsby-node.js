const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
	const { createPage } = actions
	return new Promise((resolve, reject) => {
		graphql(`
			{
				allMarkdownRemark {
					edges {
						node {
							fields {
								slug
							}
						}
					}
				}
			}
		`).then(result => {
			const posts = result.data.allMarkdownRemark.edges
			posts.forEach((post, index) => {
				const previous =
					index === posts.length - 1 ? null : posts[index + 1].node
				const next = index === 0 ? null : posts[index - 1].node

				createPage({
					path: post.node.fields.slug,
					component: path.resolve(`./src/templates/blog-post.js`),
					context: {
						slug: post.node.fields.slug,
						previous,
						next
					}
				})

				const postsPerPage = 6
				const numPages = Math.ceil(posts.length / postsPerPage)

				Array.from({ length: numPages }).forEach((_, i) => {
					createPage({
						path: i === 0 ? `/` : `/${i + 1}`,
						component: path.resolve('./src/templates/index.js'),
						context: {
							limit: postsPerPage,
							skip: i * postsPerPage,
							numPages,
							currentPage: i + 1
						}
					})
				})
			})
			resolve()
		})
	})
}

exports.onCreateNode = ({ node, getNode, actions }) => {
	const { createNodeField } = actions
	if (node.internal.type === `MarkdownRemark`) {
		const slug = createFilePath({ node, getNode, basePath: `pages` })
		createNodeField({
			node,
			name: `slug`,
			value: slug
		})
	}
}
