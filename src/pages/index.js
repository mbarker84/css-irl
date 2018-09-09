import React from 'react'
// import { Link } from 'gatsby'

import Layout from '../components/layout'
import globals from '../globals/globals.module.scss'
import layout from '../layouts/layout.module.scss'

import { PostPreview } from '../components/post-preview/post-preview'

export default ({ data }) => {
	return (
		<Layout>
			<div>
				<h4 className={globals.postsCount}>
					{data.allMarkdownRemark.totalCount} Posts
				</h4>
				<div className={layout.postsGrid}>
					{data.allMarkdownRemark.edges.map(({ node }) => (
						<div key={node.id}>
							<PostPreview
								to={node.fields.slug}
								title={node.frontmatter.title}
								excerpt={node.excerpt}
								date={node.frontmatter.date}
								externalLink={node.frontmatter.externalLink}
							/>
						</div>
					))}
				</div>
			</div>
		</Layout>
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
						externalLink
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
