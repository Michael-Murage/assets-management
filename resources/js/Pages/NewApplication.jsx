import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Link } from '@inertiajs/inertia-react';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

function NewApplication(props) {
	const [data, setData] = useState({
		user_id: props?.auth.user.id,
		description: '',
		amount_requesting: ''
	});

	function handleSubmit(event) {
		event.preventDefault()
		fetch('/api/applications',{
			method: "POST", headers:{'Content-Type': 'application/json'},
			body: JSON.stringify(data)
		})
		.then(res=>{
			if(res.ok){
				res.json().then((message)=>toast.success(message.success, {
						position: "top-center",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "light",
					})
				)
				setData({
					user_id: props?.auth.user.id,
					description: '',
					amount_requesting: ''
				})
			}else{
				res.json().then(console.log)
			}
		})
	}

	function handleChange(event){
		setData({...data, [event.target.name]:event.target.value})
	}

	return (
	<Authenticated>
		<div className="px-12">
			<Link 
				href={route('dashboard')}
				className='text-gray-700 text-xs font-bold mb-2 mt-6'
				>
				BACK
			</Link>
			<form className="w-full">
				
				<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-7">
				  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
				    How much are you requesting
				  </label>
				  <input name='amount_requesting' onChange={handleChange} value={data.amount_requesting} className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="number" placeholder="Enter amount"/>
				  
				</div>
				<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
					<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
					  Description
					</label>
					<textarea name='description' onChange={handleChange} value={data.description} rows='4' className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" placeholder="Highlight reasons here..."/>
				
					 <div className='text-center'>
						<input type='submit' onClick={(event)=>handleSubmit(event)} className='submit-application px-3 py-2 rounded'/>
					</div>
				</div>
				
			</form>
		</div>
	</Authenticated>
  )
}

export default NewApplication