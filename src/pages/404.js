import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import styles from '../layouts/styles.module.scss'
import layout from '../layouts/layout.module.scss'
import globals from '../globals/globals.module.scss'

export default ({ data }) => (
	<Layout>
		<div className={layout.postContent}>
			<h1>404</h1>
			<p>
				Uh-oh, looks like the page you’re looking for doesn’t exist. Sorry about
				that.
			</p>
			<Link to={`/`} className={styles.link}>
				<span className={globals.hl}>Return to homepage</span>
			</Link>
		</div>
	</Layout>
)
