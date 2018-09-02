import React from 'react'
import { Link } from 'gatsby'

export const StickyHeader = ({ props, styles }) => {
	// const $link = document.querySelector('[data-header-link]')
	// const sticky = () => {
	// 	window.addEventListener('scroll', () => {
	// 		const posY = window.scrollY
	// 		if (posY > 60) {
	// 			$link.style.cssText = `transform: scale(0.5);
	//                             left: 1rem;
	//                             top: 0.5rem;
	//                             position: fixed;`
	// 		} else {
	// 			$link.style.cssText = ''
	// 		}
	// 	})
	// }
	// if (window.matchMedia('(min-width: 1100px)').matches) {
	// 	sticky()
	// }
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
