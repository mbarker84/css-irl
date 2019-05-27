import React from 'react'

import Layout from '../components/layout'
import globals from '../globals/globals.module.scss'
import layout from '../layouts/layout.module.scss'

import { PostPreview } from '../components/post-preview/post-preview'

export default ({ data }) => {
	return <Layout />
}

export const query = graphql`
	query IndexQuery {
		site {
			siteMetadata {
				title
			}
		}
		allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
			totalCount
			edges {
				node {
					id
					frontmatter {
						title
						date(formatString: "DD MMMM, YYYY")
						externalLink
						series
					}
					fields {
						slug
					}
					excerpt
				}
			}
		}
	}
`
