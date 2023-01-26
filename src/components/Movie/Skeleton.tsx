import React from 'react'
import ContentLoader from 'react-content-loader'

export const Skeleton: React.FC = () => (
	<ContentLoader
		speed={2}
		width={321}
		height={426}
		viewBox='0 0 321 426'
		backgroundColor='#514E4E'
		foregroundColor='#514E4E'
	>
		<rect x='0' y='0' rx='0' ry='0' width='321' height='350' />
		<rect x='0' y='365' rx='0' ry='0' width='70' height='18' />
		<rect x='0' y='395' rx='0' ry='0' width='120' height='17' />
		<rect x='260' y='374' rx='0' ry='0' width='65' height='35' />
	</ContentLoader>
)
