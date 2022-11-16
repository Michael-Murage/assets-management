import React from 'react'

function Loading() {
	return (
		<div className='d-flex justify-content-center vh-100 align-items-top'>
			<div className="spinner-grow text-warning" role="status">
  			{/* <span className="sr-only">Loading...</span> */}
			</div>
		</div>
	)
}

export default Loading
