import React from 'react'
import globals from '../../globals/globals.module.scss'
import styles from './post-preview.module.scss'

export const PostPreview = props => {
	return (
		<div className={styles.postPreview}>
			<h2 className={styles.title}>
				<span className={globals.hl}>{props.title}</span>
			</h2>
			<time className={styles.date} dateTime={props.date}>
				{props.date}
			</time>
			<div className={styles.content}>{props.excerpt}</div>
		</div>
	)
}
