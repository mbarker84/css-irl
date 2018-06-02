module.exports = {
	siteMetadata: {
		title: `CSS`,
		subheading: `{ In Real Life }`
	},
	plugins: [
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `src`,
				path: `${__dirname}/src/`
			}
		},
		`gatsby-plugin-glamor`,
		`gatsby-transformer-remark`,
		`gatsby-plugin-sass`,
		{
			resolve: `gatsby-plugin-typography`,
			options: {
				pathToConfigModule: `src/utils/typography`
			}
		},
		{
			resolve: `gatsby-plugin-feed`,
			options: {
				query: `
					{
						site {
							siteMetadata {
								title
								description
								siteUrl
								site_url: siteUrl
							}
						}
					}
				`,
				feeds: [
					{
						serialize: ({ query: { site, allMarkdownRemark } }) => {
							return allMarkdownRemark.edges.map(edge => {
								return Object.assign({}, edge.node.frontmatter, {
									description: edge.node.excerpt,
									url: site.siteMetadata.siteUrl + edge.node.fields.slug,
									guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
									custom_elements: [{ 'content:encoded': edge.node.html }]
								})
							})
						},
						query: `
							{
								allMarkdownRemark(
									limit: 1000,
									sort: { order: DESC, fields: [frontmatter___date] },
									filter: {frontmatter: { draft: { ne: true } }}
								) {
									edges {
										node {
											excerpt
											html
											fields { slug }
											frontmatter {
												title
												date
											}
										}
									}
								}
							}
						`,
						output: '/rss.xml'
					}
				]
			}
		}
	]
}
