import { Head } from '@inertiajs/inertia-react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useEffect, useState } from 'react'

function ViewApplicationDetails(props) {
	const [application, setApplication] = useState({});
	const [official, setOfficial] = useState({});
	const [allocationState, setAllocationState] = useState({});

	const fetchOfficial = (id) =>{
		fetch(`/api/officials/${id}`)
		.then(resp => {
			if(resp.ok) resp.json().then(setOfficial);
		})
	}

	useEffect(()=>{
		fetch(`/api/applications/${props?.id}`)
		.then(resp => {
			if(resp.ok) resp.json().then(setApplication)
		})
	},[]);

	useEffect(()=>{
		fetch(`/api/allocations-show/${application?.id}`)
		.then(resp => {
			if(resp.ok) resp.json()
			.then((allocation) => {
				setAllocationState(allocation);
				fetchOfficial(allocation?.official_id);
			});
		})
	},[application?.status]);

	return (
		<AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Application Details" />

			<div className="flex justify-center m-3 border single-card" key={application.id}>
				<div className="block rounded-lg shadow-lg bg-white max-w-sm text-center">
					<div className="py-3 px-6 border-b border-gray-300">
				    	Status: {application.status ? application.status : "Initiated"}
					</div>
					<div className="p-6">
				    	<h5 className="text-gray-900 text-xl font-medium mb-2">{application.amount_requesting}</h5>

				    	<textarea 
				 			className='description block w-full text-gray-700 rounded px-4 leading-tight'
				 			value={application.description} 
							rows='3'
							disabled
						/>

						<input 
							value="Ammend" 
							style={{display: allocationState?.amount_allocated ? "none" : "inline-block"}} 
							type="button" 
							className=" px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
						/>

			    	</div>
	
			  	</div>
			</div>

			<div>
				<p>Reviewed by: {official?.first_name} {official?.last_name}</p>
				<p>Comment: {allocationState?.comment}</p>
				<p>Amount allocated: {allocationState?.amount_allocated}</p>
			</div>
		</AuthenticatedLayout>
	)
}

export default ViewApplicationDetails