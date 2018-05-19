import React from 'react'
import Link from 'gatsby-link'

import globals from '../globals/globals.module.scss'
import layout from '../layouts/layout.module.scss'

// import { rhythm } from '../utils/typography'
import { PostPreview } from '../components/post-preview/post-preview'

export default ({ data }) => {
	return (
		<div>
			<h4 className={globals.postsCount}>
				{data.allMarkdownRemark.totalCount} Posts
			</h4>
			<div className={layout.postsGrid}>
				{data.allMarkdownRemark.edges.map(({ node }) => (
					<div key={node.id}>
						<Link
							to={node.fields.slug}
							css={{ textDecoration: `none`, color: `inherit` }}
						>
							<PostPreview
								title={node.frontmatter.title}
								excerpt={node.excerpt}
								date={node.frontmatter.date}
							/>
						</Link>
					</div>
				))}
			</div>
		</div>
	)
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
