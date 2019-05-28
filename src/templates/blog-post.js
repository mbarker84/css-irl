import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import styles from './blog-post.module.scss'
import layout from '../layouts/layout.module.scss'
import { SourceDetails } from '../components/post-source/post-source'
import { Location } from '@reach/router'

export default ({ data, location }) => {
	const post = data.markdownRemark
	const seriesTitle = post.frontmatter.series
		? `${post.frontmatter.series} – `
		: ''

	return (
		<Layout>
			<Helmet
				title={`${data.site.siteMetadata.title} | ${seriesTitle}${
					post.frontmatter.title
				}`}
			>
				<meta property="og:title" content={post.frontmatter.title} />
				<meta property="og:description" content={post.excerpt} />
				<meta
					property="og:url"
					content={`${data.site.siteMetadata.siteUrl}${location.pathname}`}
				/>
			</Helmet>
			<div className={layout.postContent}>
				<header>
					<h4 className={styles.seriesTitle}>{post.frontmatter.series}</h4>
					<h1 className={styles.postHeading}>{post.frontmatter.title}</h1>
					<time className={styles.src} dateTime={post.frontmatter.date}>
						{post.frontmatter.date}
					</time>
					<SourceDetails
						url={post.frontmatter.srcUrl}
						text={post.frontmatter.source}
					/>
				</header>
				<div
					dangerouslySetInnerHTML={{ __html: post.html }}
					className={styles.richtext}
				/>
			</div>
		</Layout>
	)
}

export const query = graphql`
	query BlogPostQuery($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			html
			frontmatter {
				title
				date(formatString: "DD MMMM, YYYY")
				source
				srcUrl
				externalLink
				series
				tags
			}
			excerpt
		}
		site {
			siteMetadata {
				title
				description
				subheading
				siteUrl
			}
		}
	}
`
