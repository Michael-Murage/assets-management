import { Head, Link } from '@inertiajs/inertia-react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { toast } from 'react-toastify';

function ViewApplicationDetails(props) {
	const [application, setApplication] = useState({});
	const [official, setOfficial] = useState({});
	const [allocationState, setAllocationState] = useState({});
	const [editState, setEditState] = useState(false);
	const [editedInfo, setEditedInfo] = useState({
		amount_requesting: '',
		description: ''
	});

	const fetchOfficial = (id) =>{
		fetch(`/api/officials/${id}`)
		.then(resp => {
			if(resp.ok) resp.json().then(setOfficial);
		})
	}

	const fetchAllocation = (id) =>{
		fetch(`/api/allocations-show/${id}`)
		.then(resp => {
			if(resp.ok) resp.json()
			.then((allocation) => {
				setAllocationState(allocation);
				fetchOfficial(allocation?.official_id);
			});
		})
	}

	useEffect(()=>{
		// Fetch an application from the application_id foreign key of an allocation
		fetch(`/api/applications/${props?.id}`)
		.then(resp => {
			if(resp.ok) resp.json()
			.then((applicationData)=>{
				setApplication(applicationData)
				fetchAllocation(applicationData.id)
			})
		})
	},[]);

	const handleEditedApplication = () =>{
		const time = moment().format("MMMM Do YYYY")
		const newDesc = application.description.concat(`\n\n${time} - ${application.amount_requesting}`).concat(`\n\n${editedInfo.description}`)
		
		// Patch the application's details
		fetch(`/api/application/${application.id}`,{
			method: "PATCH", headers: {'content-type': 'application/json'},
			body: JSON.stringify({
				amount_requesting: editedInfo.amount_requesting ? editedInfo.amount_requesting : application.amount_requesting,
				description: newDesc
			})
		})
		.then(resp => {
			if(resp.ok){
				resp.json().then(mes => toast(mes.success));
			}
			else {
				resp.json().then(mes => toast(mes.errors || mes.message));
			}
			setEditState(()=> !editState)
		})
	}

	const handleChange = (event) =>{
		setEditedInfo({...editedInfo, [event.target.name]: event.target.value})
	}

	return (
		<AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
        >
        <Head title="Application Details" />
		<div className="px-12">
			<Link 
				href={route('dashboard')}
				className='text-gray-700 text-xs font-bold mb-2 mt-6'
			>
				BACK
			</Link>
			<div className='flex-wrap'>
				<div className="flex justify-center m-3 border single-card" key={application.id}>
					<div className="block rounded-lg shadow-lg bg-white max-w-sm text-center">
						<div className="py-3 px-6 border-b border-gray-300">
					    	Status: {application.status ? application.status : "Initiated"}
						</div>
						<div className="p-6">
					    	<h5 
								className="text-gray-900 text-xl font-medium mb-2"
								style={{display: editState ? "none" : "block"}}
							>
								{application.amount_requesting}
							</h5>
							<input
								type='number'
								name='amount_requesting'
								className="text-gray-900 text-l font-medium mb-1 rounded"
								value={editedInfo.amount_requesting}
								onChange={handleChange}
								style={{display: editState ? "block" : "none"}}
							/>

					    	<textarea 
					 			className={`block w-full text-gray-700 rounded px-4 leading-tight ${editState ? "description-edit rounded" : "description"}`}
					 			value={editState ? editedInfo.description : application.description} 
								onChange={handleChange}
								name='description'
								rows='3'
								disabled={editState ? false : true}
							/>

							<div style={{display: !allocationState?.amount_allocated && !editState ? "block" : "none"}} >
								<input 
									value="Ammend"
									readOnly={true}
									type="button" 
									onClick={()=>setEditState(()=> !editState)}
									className=" px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
								/>
							</div>

							<div className='edit-buttons' style={{display: !editState ? "none" : "inline-block"}} >
								<input 
									value="Revert"
									readOnly={true}
									onClick={()=>setEditState(()=> !editState)}
									type="button" 
									className=" px-4 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
								/>

								<input 
									value="OK" 
									readOnly={true}
									style={{display: !editState ? "none" : "inline-block"}} 
									type="button" 
									className=" px-4 ml-2 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
									onClick={handleEditedApplication}
								/>
							</div>

				    	</div>
		
				  	</div>
				</div>

				<div className='py-2 px-6'>
					<p>
						<span 
						className="block uppercase text-gray-700 text-xl font-bold"
						>
							Reviewed by:
						</span> 
						{official?.first_name} {official?.last_name}
					</p>
					<br/>

					<p>
						<span
						className="block uppercase text-gray-700 text-xl font-bold"
						>
							Comment: 
						</span>
						{allocationState?.comment}
					</p>
					<br/>

					<p>
						<span
						className="block uppercase text-gray-700 text-xl font-bold"
						>
							Amount allocated: 
						</span>
						{allocationState?.amount_allocated}
					</p>
					<br/>

					<p>
						<span
						className="block uppercase text-gray-700 text-xl font-bold"
						>
							Time: 
						</span>
						{allocationState?.updated_at
						.slice(0, 10)
						.split('-')
						.reverse()
						.join('-')
						.concat(' at ')
						}
						{allocationState?.updated_at.slice(10)}
					</p>
				</div>
			</div>
		</div>
		</AuthenticatedLayout>
	)
}

export default ViewApplicationDetails