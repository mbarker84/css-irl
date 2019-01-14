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
				pinStart={200}
				disableInlineStyles
			>
				<Link className={styles.homeLink} to={`/`}>
					<h3>
						CSS {`{`} IRL {`}`}
					</h3>
				</Link>
			</Headroom>
			<Link to={`/`} style={{ textDecoration: `none`, color: `inherit` }}>
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
