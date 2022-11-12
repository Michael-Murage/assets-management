import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Link } from '@inertiajs/inertia-react'
import React, { useState } from 'react'
import { toast } from 'react-toastify';

function AllocationForm(props) {
	const [status, setStatus] = useState('Pending');
	const [data, setData] = useState({
		official_id: props?.official.id,
		user_id: parseInt(props?.user_id),
		comment: '',
		amount_allocated: ''
	});

	const notifyWithToast = (message) => toast.success(message, {
		position: "top-center",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "light",
	});

	function updateApplication(){
		fetch('/api/applications', {
			method: "PATCH", headers: {"content-type": "application/json"},
			body: JSON.stringify({
				id: props?.application_id,
				status: status
			})
		})
		.then(res => {
			if(res.ok){
				res.json().then(message => notifyWithToast(message.success));
			}else{
				res.json().then(console.log);
			}
		})
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		// try {
		// 	const resp = await fetch(`/api/allocations`, {
		// 		method: "POST",
		// 		headers: {
		// 			"Content-Type": "application/json"
		// 		},
		// 		body: JSON.stringify({
		// 			official_id: data.official_id,
		// 			user_id: data.user_id,
		// 			comment: data.comment,
		// 			amount_allocated: status === "Accepted" ? data.amount_allocated : null
		// 		})
		// 	})
		// 	if(resp.ok){
		// 		const jsonResponse = await resp.json();
		// 		console.log(jsonResponse);
		// 	}
		// } catch (error) {
		// 	toast(error.message)
		// }
		fetch('/api/allocations',{
			method: "POST", headers:{'Content-Type': 'application/json'},
			body: JSON.stringify(data)
		})
		.then(res=>{
			if(res.ok){
				res.json().then((message)=>	notifyWithToast(message.success));
				setData({ ...data,
						comment: '',
						amount_allocated: ''
				});
				updateApplication();
			}else{
				res.json().then(console.log);
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
					href={route('official-dashboard')}
					className='text-gray-700 text-xs font-bold mb-2 mt-6'
					>
					BACK
				</Link>
				<form className="w-full">

					<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
						Please update the status of the application
					</label>
					<select value={status} onChange={(event)=>setStatus(event.target.value)} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
          				<option value='Pending'>Pending</option>
          				<option value='Rejected'>Rejected</option>
          				<option value='Accepted'>Accepted</option>
        			</select>

					{/* <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0"> */}
						<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
						  You can leave a comment (optional)
						</label>
						<textarea name='comment' onChange={handleChange} value={data.comment} rows='4' className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" placeholder="Highlight reasons here..."/>

					{/* </div> */}

					{/* <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 mt-7"> */}
					<div style={{display: status === "Accepted" ? "block" : "none"}}>
						<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
						    How much has been allocated?
						</label>
						<input name='amount_allocated' onChange={handleChange} value={data.amount_allocated} className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="number" placeholder="Enter amount"/>
					</div>

					<div className='text-center'>
						<input type='submit' onClick={(event)=>handleSubmit(event)} className='submit-application px-3 py-2 rounded'/>
					</div>
					{/* </div> */}

				</form>
			</div>
		</Authenticated>
	)
}

export default AllocationForm