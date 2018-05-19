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
		// {
		// 	resolve: `gatsby-plugin-postcss-sass`,
		// 	options: {
		// 		postCssPlugins: [],
		// 		precision: 8 // SASS default: 5
		// 	}
		// },
		`gatsby-plugin-glamor`,
		`gatsby-transformer-remark`,
		`gatsby-plugin-sass`,
		{
			resolve: `gatsby-plugin-typography`,
			options: {
				pathToConfigModule: `src/utils/typography`
			}
		}
	]
}
