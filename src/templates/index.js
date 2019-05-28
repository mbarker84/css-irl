import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import globals from '../globals/globals.module.scss'
import layout from '../layouts/layout.module.scss'

import { PostPreview } from '../components/post-preview/post-preview'
import styles from './listing-page.module.scss'

export default props => {
	const { data } = props
	const { currentPage, numPages } = props.pageContext
	const isFirst = currentPage === 1
	const isLast = currentPage === numPages
	const prevPage = currentPage - 1 === 1 ? '/' : (currentPage - 1).toString()
	const nextPage = (currentPage + 1).toString()

	return (
		<Layout>
			<div>
				<h4 className={globals.postsCount}>
					{data.allMarkdownRemark.totalCount} Posts
				</h4>
				<ul className={layout.postsGrid}>
					{data.allMarkdownRemark.edges.map(({ node }) => (
						<li key={node.id}>
							<PostPreview
								to={node.fields.slug}
								title={node.frontmatter.title}
								excerpt={node.excerpt}
								date={node.frontmatter.date}
								externalLink={node.frontmatter.externalLink}
								series={node.frontmatter.series}
							/>
						</li>
					))}
				</ul>
			</div>
			<nav className={styles.pagination}>
				{!isFirst && (
					<Link
						to={prevPage}
						rel="prev"
						className={styles.paginationLinkPrevious}
					>
						← Previous Page
					</Link>
				)}
				{!isLast && (
					<Link to={nextPage} rel="next" className={styles.paginationLinkNext}>
						Next Page →
					</Link>
				)}
			</nav>
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
			totalCount
			edges {
				node {
					excerpt
					fields {
						slug
					}
					frontmatter {
						title
						date(formatString: "DD MMMM, YYYY")
						externalLink
						series
						tags
					}
				}
			}
		}
	}
`
