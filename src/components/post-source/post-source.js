import React, { Component } from 'react'
import styles from './post-source.module.scss'

export const SourceDetails = props => {
	const hasSrc = props.url
	if (hasSrc) {
		return (
			<p className={styles.src}>
				<a href={props.url}>{props.text}</a>
			</p>
		)
	}
}
