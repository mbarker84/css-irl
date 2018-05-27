import React from 'react'
import styles from './blog-post.module.scss'
import layout from '../layouts/layout.module.scss'

export default ({ data }) => {
	const post = data.markdownRemark
	return (
		<div className={layout.postContent}>
			<h1>{post.frontmatter.title}</h1>
			<div dangerouslySetInnerHTML={{ __html: post.html }} />
		</div>
	)
}

export const query = graphql`
	query BlogPostQuery($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			html
			frontmatter {
				title
			}
		}
	}
`
