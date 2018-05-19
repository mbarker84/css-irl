import React from 'react'
import variables from '../globals/variables.scss'
import globals from '../globals/globals.module.scss'
import styles from './styles.module.scss'
import Link from 'gatsby-link'

// import { rhythm } from "../utils/typography";

export default ({ children, data }) => (
	<div className={styles.body}>
		<header className={styles.header} data-header>
			<Link className={styles.link} to={`/`}>
				<h1 className={styles.siteTitle}>
					<span className={styles.mainTitle}>
						{data.site.siteMetadata.title}
					</span>
					<span className={styles.subheading}>
						{data.site.siteMetadata.subheading}
					</span>
				</h1>
			</Link>
			<Link className={styles.link} to={`/about/`}>
				<span className={globals.hl}>About</span>
			</Link>
		</header>
		<div className={styles.content}>{children()}</div>
	</div>
)

export const query = graphql`
	query LayoutQuery {
		site {
			siteMetadata {
				title
				subheading
			}
		}
	}
`
