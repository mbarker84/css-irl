import React from 'react'
import { Link } from 'gatsby'
import globals from '../../globals/globals.module.scss'
import styles from './navigation.module.scss'

export const Navigation = props => {
	return (
		<nav className={styles.menu}>
			<ul className={styles.menuList}>
				<li className={styles.menuItem}>
					<Link
						className={styles.headerLink}
						to={`/about/`}
						style={{ textDecoration: `none`, backgroundImage: `none` }}
					>
						<span className={globals.hl}>About</span>
					</Link>
				</li>
				<li className={styles.menuItem}>
					<a
						className={styles.headerLink}
						style={{ textDecoration: `none`, backgroundImage: `none` }}
						href="https://twitter.com/CSSInRealLife"
					>
						<svg
							className={styles.linkIcon}
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 250 203.2"
						>
							<path d="M78.6 203.2c94.3 0 145.9-78.2 145.9-145.9 0-2.2 0-4.4-.1-6.6 10-7.2 18.7-16.3 25.6-26.6-9.2 4.1-19.1 6.8-29.5 8.1 10.6-6.3 18.7-16.4 22.6-28.4-9.9 5.9-20.9 10.1-32.6 12.4C201.2 6.2 187.8 0 173.1 0c-28.3 0-51.3 23-51.3 51.3 0 4 .5 7.9 1.3 11.7C80.5 60.8 42.7 40.4 17.4 9.4 13 17 10.5 25.8 10.5 35.2c0 17.8 9.1 33.5 22.8 42.7-8.4-.3-16.3-2.6-23.3-6.4v.7c0 24.8 17.7 45.6 41.1 50.3-4.3 1.2-8.8 1.8-13.5 1.8-3.3 0-6.5-.3-9.6-.9 6.5 20.4 25.5 35.2 47.9 35.6-17.6 13.8-39.7 22-63.7 22-4.1 0-8.2-.2-12.2-.7 22.7 14.4 49.7 22.9 78.6 22.9" />
						</svg>
						<span className={globals.hl}>Twitter</span>
					</a>
				</li>
				<li className={styles.menuItem}>
					<a
						className={styles.headerLink}
						href={`/rss.xml`}
						style={{ textDecoration: `none`, backgroundImage: `none` }}
					>
						<span className={globals.hl}>RSS</span>
					</a>
				</li>
			</ul>
		</nav>
	)
}
