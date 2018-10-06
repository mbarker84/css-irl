import React from 'react'
import Headroom from 'react-headroom'
import { Link } from 'gatsby'
import styles from './sticky-header.module.scss'

export const StickyHeader = () => {
	return (
		<Headroom className={styles.header} disableInlineStyles>
			<header>
				<Link className={styles.link} to={`/`}>
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
		</Headroom>
	)
}
