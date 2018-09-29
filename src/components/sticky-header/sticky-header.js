import React from 'react'
import { Link } from 'gatsby'

export const StickyHeader = ({ props, styles }) => {
	return (
		<header className={styles.header} data-header>
			<Link className={styles.link} to={`/`} data-header-link>
				<h1 className={styles.siteTitle}>
					<span className={styles.mainTitle}>CSS</span>
					<span className={styles.subheading}>
						{`{`}
						In Real Life
						{`}`}
					</span>
				</h1>
			</Link>
		</header>
	)
}
