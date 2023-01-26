import React from 'react'

export const Error: React.FC<{ message: string | undefined }> = ({
	message,
}) => {
	const style = {
		color: `red`,
		fontSize: `14px`,
		marginBottom: `2rem`,
		marginLeft: `0.7rem`,
	}

	return <div style={style}>{message}</div>
}
