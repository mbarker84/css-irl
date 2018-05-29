import React from 'react'
import globals from '../../globals/globals.module.scss'
import styles from './post-source.module.scss'

export const PostSource = props => {
	const hasSrc = props.hasSrc
	if (hasSrc) {
		return <SourceDetails />
	}
	return null
}

export const SourceDetails = props => {
	return (
		<p className={styles.date}>
			First published on &nbsp;
			<a href={props.srcUrl}>{props.source}</a>
		</p>
	)
}
