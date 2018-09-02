import React from 'react'
import globals from '../globals/globals.module.scss'
import styles from '../layouts/styles.module.scss'
import { StaticQuery, graphql, Link } from 'gatsby'
import Helmet from 'react-helmet'
import { StickyHeader } from '../components/sticky-header/sticky-header'

export default ({ children }) => (
	<StaticQuery
		query={graphql`
			query LayoutQuery {
				site {
					siteMetadata {
						title
						description
						subheading
					}
				}
			}
		`}
		render={data => (
			<div className={styles.body}>
				<Helmet title={data.site.siteMetadata.title}>
					<html lang="en-gb" />
					<meta
						name="description"
						content={data.site.siteMetadata.description}
					/>
					<meta
						name="keywords"
						content="css, front end, web development, web design"
					/>
					<link
						rel="apple-touch-icon"
						sizes="57x57"
						href="icons/apple-icon-57x57.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="60x60"
						href="icons/apple-icon-60x60.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="72x72"
						href="icons/apple-icon-72x72.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="76x76"
						href="icons/apple-icon-76x76.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="114x114"
						href="icons/icon-114x114.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="120x120"
						href="icons/icon-120x120.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="144x144"
						href="icons/icon-144x144.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="152x152"
						href="icons/icon-152x152.png"
					/>
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="icons/icon-180x180.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="192x192"
						href="icons/icon-192x192.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="96x96"
						href="icons/icon-96x96.png"
					/>
					<link rel="manifest" href="/manifest.json" />>
					<meta name="msapplication-TileColor" content="#ffffff" />
					<meta name="msapplication-TileImage" content="/icon-144x144.png" />
					<meta name="theme-color" content="#ffffff" />
				</Helmet>

				<StickyHeader styles={styles} />

				<nav className={styles.menu}>
					<Link className={styles.link} to={`/about/`}>
						<span className={globals.hl}>About</span>
					</Link>
					<a
						className={styles.linkWithIcon}
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
				</nav>
				<div className={styles.content}>{children}</div>
				<footer className={styles.footer}>&copy; Michelle Barker 2018</footer>
			</div>
		)}
	/>
)
