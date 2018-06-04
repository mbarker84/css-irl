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
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: 'CSS {In Real Life}',
				short_name: 'CSS',
				start_url: '/',
				background_color: '#fcfdff',
				theme_color: '#95e8ed',
				display: 'browser',
				icon: 'src/images/icon_512.png'
			}
		},
		`gatsby-plugin-glamor`,
		`gatsby-transformer-remark`,
		`gatsby-plugin-sass`,
		`gatsby-plugin-offline`,
		{
			resolve: `gatsby-plugin-typography`,
			options: {
				pathToConfigModule: `src/utils/typography`
			}
		}
	]
}
