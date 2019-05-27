import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'

export default () => {
	return (
		<Layout>
			<h1>Page</h1>
		</Layout>
	)
}

export const pageQuery = graphql`
	query blogPageQuery($skip: Int!, $limit: Int!) {
		allMarkdownRemark(
			sort: { fields: [frontmatter___date], order: DESC }
			limit: $limit
			skip: $skip
		) {
			edges {
				node {
					excerpt
					frontmatter {
						date(formatString: "DD MMMM, YYYY")
						title
					}
				}
			}
		}
	}
`
