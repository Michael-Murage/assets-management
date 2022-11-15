import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';

export default function Welcome(props) {
    return (
        <>
            <Head title="Welcome" />
            <div className=" flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 items-center sm:pt-0">
                
				<div className="col welcome-cont" style={{borderRadius: '0.8em'}}>
				{props.auth.user ? (
					<div className="row">
                        <Link href={route('dashboard')} className="text-xl">
								<div className="row official-btn border rounded color-blue px-20 py-3 mb-3">
									Back To Dashboard
								</div>
                        </Link>
					</div>
                    ) : (
                        <>
						
                            <Link href={route('register')} className="text-xl ">
								<div className="row register-btn border rounded color-blue px-20 py-3 mb-3">
									Register
								</div>
                            </Link>
						

							<Link href={route('login')} className="text-xl ">
								<div className="row login-btn border rounded color-blue px-20 py-3 mb-3">
									Log in
								</div>
                            </Link>

							<Link href={route('official-login')} className="text-xl">
								<div className="row official-btn border center rounded color-blue px-20 py-3 mb-3">
									Log in as an Official
								</div>
                            </Link>
                        </>
                    )}
					
					
					
				</div>
            </div>
        </>
    );
}
