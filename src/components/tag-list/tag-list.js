import React from 'react'
import { Link } from 'gatsby'
import kebabCase from 'lodash/kebabCase'
import styles from './tag-list.module.scss'

export const TagList = props => {
	return (
		<ul className={styles.tagList}>
			{props.group.map(tag => (
				<li key={tag.fieldValue} className={styles.tagItem}>
					<Link
						to={`/tags/${kebabCase(tag.fieldValue)}/`}
						className={styles.tagName}
					>
						{tag.fieldValue}
					</Link>
					<span className={styles.numberOfPosts}>({tag.totalCount} posts)</span>
				</li>
			))}
		</ul>
	)
}
