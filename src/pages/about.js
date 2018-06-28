import React from 'react'
import Layout from '../components/layout'
import layout from '../layouts/layout.module.scss'

export default ({ data }) => (
	<Layout>
		<div className={layout.postContent}>
			<h1>About</h1>
			<p>
				CSS In Real Life is a blog covering CSS topics and useful snippets on
				the web’s most beautiful language.
			</p>
			<p>
				Published by{' '}
				<a href="https://twitter.com/mbarker_84">Michelle Barker</a>, front end
				developer at <a href="http://ournameismud.co.uk">Mud</a> and CSS
				superfan.
			</p>
		</div>
	</Layout>
)

export const query = graphql`
	query AboutQuery {
		site {
			siteMetadata {
				title
				subheading
			}
		}
	}
`
