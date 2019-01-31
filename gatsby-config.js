module.exports = {
	siteMetadata: {
		title: `CSS { In Real Life }`,
		subheading: `{ In Real Life }`,
		description: `CSS In Real Life is a blog covering CSS topics and useful snippets on the web’s most beautiful language. Published by Michelle Barker, front end developer at Ordoo and CSS superfan.`,
		siteUrl: `https://css-irl.info`
	},
	plugins: [
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `src`,
				path: `${__dirname}/src/`
			}
		},
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: 'CSS {In Real Life}',
				short_name: 'CSS',
				start_url: '/',
				background_color: '#fcfdff',
				theme_color: '#95e8ed',
				display: 'minimal-ui',
				icon: 'src/images/icon_512.png'
			}
		},
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					`gatsby-remark-copy-images`,
					'gatsby-remark-copy-linked-files',
					{
						resolve: `gatsby-remark-images`,
						options: {
							maxWidth: 800
						}
					},
					{
						resolve: `gatsby-remark-prismjs`,
						options: {
							classPrefix: 'language-'
						}
					}
				]
			}
		},
		`gatsby-plugin-sass`,
		`gatsby-plugin-react-helmet`,
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
