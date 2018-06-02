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
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-plugin-typography`,
			options: {
				pathToConfigModule: `src/utils/typography`
			}
		}
	]
}
