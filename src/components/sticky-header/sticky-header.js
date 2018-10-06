import React from 'react'
import Headroom from 'react-headroom'
import { Link } from 'gatsby'
import styles from './sticky-header.module.scss'
import headroom from './headroom.scss'

export const StickyHeader = () => {
	return (
		<header className={styles.header}>
			<Headroom
				className={headroom.headroom}
				pinStart={100}
				disableInlineStyles
			>
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
			</Headroom>
		</header>
	)
}
