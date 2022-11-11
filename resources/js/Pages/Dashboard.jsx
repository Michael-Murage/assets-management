import React, { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/inertia-react';

export default function Dashboard(props) {

	useEffect(()=>{
		fetch(`/api/applications`)
		.then(res=>res.json().then(console.log))
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
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
