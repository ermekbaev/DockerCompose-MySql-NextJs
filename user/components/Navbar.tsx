import { useState } from "react";
import Add from "./CRUD/Add";
import FilterSwitcher from "./Filter/FilterSwitcher";
import { useRouter } from 'next/router'

function Navbar({ departments, roles, selectedDepartment, selectedRole, handleDepartmentChange, handleRoleChange, searchQuery, setSearchQuery, userData }: any) {

   const [isLoggedIn, setIsLoggedIn] = useState(false)
   const router = useRouter()

   const handleLogout = () => {
			localStorage.removeItem('token')
			setIsLoggedIn(false)

			router.reload()
		}

  const handleLoginClick = () => {
		router.push('/auth/SingIn')
	}

  

  return (
		<nav className='bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800'>
			<div className='container flex flex-wrap justify-between items-center mx-auto px-7'>
				<div className='w-full md:w-1/2'>
					<form className='flex items-center'>
						<label htmlFor='simple-search' className='sr-only'>
							Search
						</label>
						<div className='relative w-full'>
							<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
								<svg
									aria-hidden='true'
									className='w-5 h-5 text-gray-500 dark:text-gray-400'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										fillRule='evenodd'
										d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
										clipRule='evenodd'
									/>
								</svg>
							</div>
							<input
								value={searchQuery}
								onChange={e => setSearchQuery(e.target.value)}
								type='text'
								id='simple-search'
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
								placeholder='Search'
							/>
						</div>
					</form>
				</div>
				<button
					type='button'
					className='inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
					aria-controls='mobile-menu-2'
					aria-expanded='false'
				>
					<span className='sr-only'>Open main menu </span>
					<svg
						className='w-6 h-6'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							fillRule='evenodd'
							d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
							clipRule='evenodd'
						></path>
					</svg>
					<svg
						className='hidden w-6 h-6'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							fillRule='evenodd'
							d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
							clipRule='evenodd'
						></path>
					</svg>
				</button>
				<div className='hidden w-full md:block md:w-auto' id='mobile-menu'>
					<ul className='flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium'>
						<li>
							<FilterSwitcher
								departments={departments}
								roles={roles}
								selectedDepartment={selectedDepartment}
								selectedRole={selectedRole}
								handleDepartmentChange={handleDepartmentChange}
								handleRoleChange={handleRoleChange}
							/>
						</li>
						<li>
							{userData && userData.role_id == 3?(
								<Add />
								):(<p>
									У вас нет доступа на добавление
								</p>)
							}
						</li>
						<li>
							{userData ? (
								<div>
									<p className='text-black'>{userData.name}</p>
									<button onClick={handleLogout}>Выйти</button>
								</div>
							) : (
								<p onClick={handleLoginClick}>Войти</p>
							)}
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default Navbar;
