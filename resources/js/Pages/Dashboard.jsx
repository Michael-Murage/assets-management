import React, { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/inertia-react';
import moment from 'moment';

export default function Dashboard(props) {
	const [data, setData] = useState([]);
	
	useEffect(()=>{
		fetch(`/api/applications`)
		.then(res=>{
			if(res.ok){
				res.json().then((items)=>{
					setData(items.filter(item=> item.user_id === props.auth.user.id));
				})
			}else{
				res.json().then(console.log)
			}
		})
	},[])

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">Recent Applications</div>
						<Link
                        	href={route('newapplication')}
                            className="ml-4 text-sm text-gray-700 dark:text-gray-500 underline"
                            >
                                New application
                        </Link>
						<hr/>
						<div className='application-cards'>
							{
								(Array.isArray(data) ? data : []).map((application) => {
									let date = new Date(application.created_at)
									let differenceInMs = Math.abs(new Date() - date)
									let newFormat = new moment.duration(differenceInMs)
									return (
									<div className="flex justify-center m-3 border single-card" key={application.id}>
									  <div className="block rounded-lg shadow-lg bg-white max-w-sm text-center">
									    <div className="py-3 px-6 border-b border-gray-300">
									      Status: {application.status ? application.status : "Initiated"}
									    </div>
									    <div className="p-2">
									      <h5 className="text-gray-900 text-xl font-medium">{application.amount_requesting}</h5>
										  {/* <div className="description">
											<p className="text-gray-700 text-base mb-4">
									        	{application.description}
									      	</p>
										  </div> */}
									      <textarea 
										  	className='description block text-gray-700 rounded px-4 leading-tight'
										  	value={application.description} 
											rows='3'
											disabled
											/>

											<Link
                        						href={route(`application`)}
												as="button"
												method='post'
												data={application.id}
                        					    className="ml-4 text-sm text-gray-700 dark:text-gray-500 underline"
                        					    >
                        					        <input type="button" value="View" className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"/>
                        					</Link>

									    </div>
									    <div className="py-3 px-6 border-t border-gray-300 text-gray-600">
									      {newFormat._data.days} days ago at {application.created_at.slice(11, 16)} hrs
									    </div>
									  </div>
									</div>
									)
								})
							}
						</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
