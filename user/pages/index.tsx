import { useEffect, useState } from 'react'
import Edit from '@/components/CRUD/Edit'
import Preview from '@/components/CRUD/Read'
import Delete from '@/components/CRUD/Delete'
import Navbar from '@/components/Navbar'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Home({
	classname = 'dropdown',
	users,
	departments,
	roles,
}: any) {
	const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
		null
	)
	const [selectedRole, setSelectedRole] = useState<string | null>(null)
	const [searchQuery, setSearchQuery] = useState<string>('')
	const [userData, setUserData] = useState(null)

	const [openUserMenus, setOpenUserMenus] = useState<any>({})
	const router = useRouter()

	const toggleMenu = (userId: any) => {
		setOpenUserMenus((prevOpenMenus: any) => {
			const newOpenMenus = { ...prevOpenMenus }
			//@ts-ignore
			newOpenMenus[userId] = !newOpenMenus[userId]
		return newOpenMenus
	})

	}
	const userExistsInList = (userId: any) => {
		return users.some((user: any) => user.id === userId)
	}

	const handleDeleteUser = async (userId: any) => {
		try {
			console.log('Deleting user wit ID:', userId)
			await axios.delete(`/api/users/${userId}`)
			console.log('User deleted successfully')
		} catch (error) {
			router.reload()
			console.error('Error deleting user:', error)
		}
	}

	const handleDepartmentChange = (departmentId: string | null) => {
		setSelectedDepartment(departmentId)
	}

	const handleRoleChange = (roleId: string | null) => {
		setSelectedRole(roleId)
	}

	const filteredUsers = users.filter((user: any) => {
		if (selectedDepartment && user.department_id !== selectedDepartment) {
			return false
		}
		if (selectedRole && user.role_id !== selectedRole) {
			return false
		}
		if (
			searchQuery &&
			!user.name.toLowerCase().includes(searchQuery.toLowerCase())
		) {
			return false
		}
		return true
	})

	useEffect(() => {
    const checkUserAuthentication = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const response = await axios.get('/api/user-info', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          // Если запрос успешен, у вас есть информация о пользователе
          const fetchedUserData = response.data;
          setUserData(fetchedUserData);
        } catch (error) {
          // Если запрос не удался, возможно, токен устарел или недействителен
          console.error('Error fetching user info:', error);
          // Очистить токен и установить состояние, что пользователь не авторизован
          localStorage.removeItem('token');
          setUserData(null);
        }
      } else {
        // Состояние, что пользователь не авторизован
        setUserData(null);
      }
    };

	checkUserAuthentication();
}, []);

	return (
		<>
			<Navbar
				departments={departments}
				roles={roles}
				selectedDepartment={selectedDepartment}
				selectedRole={selectedRole}
				handleDepartmentChange={handleDepartmentChange}
				handleRoleChange={handleRoleChange}
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				userData={userData}
			/>
			<div className='overflow-x-auto'>
				<table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
					<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
						<tr>
							<th scope='col' className='px-4 py-4'>
								Full name
							</th>
							<th scope='col' className='px-4 py-3'>
								Email
							</th>
							<th scope='col' className='px-4 py-3'>
								Number
							</th>
							<th scope='col' className='px-4 py-3'>
								Departament
							</th>
							<th scope='col' className='px-4 py-3'>
								Role
							</th>
							<th scope='col' className='px-4 py-3'>
								Address
							</th>
							<th scope='col' className='px-4 py-3'>
								<span className='sr-only'>Actions</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{filteredUsers.map((user: any) => (
							<tr key={user.id} className='border-b dark:border-gray-700'>
								<th
									scope='row'
									className='px-4 py-3 font-medium  whitespace-nowrap dark'
								>
									{user.name}
								</th>
								<td className='px-4 py-3'>{user.email}</td>
								<td className='px-4 py-3'>{user.number}</td>
								<td className='px-4 py-3 max-w-[12rem] truncate'>
									{departments.length > 0 &&
										user.department_id &&
										departments.find(
											(dept: any) => dept.id === user.department_id
										)?.name}
								</td>
								<td className='px-4 py-3'>
									{user.role_id &&
										roles.find((role: any) => role.id === user.role_id)?.name}
								</td>
								<td className='px-4 py-3'>{user.address}</td>
								<td className='px-4 py-3 flex items-center justify-end'>
									<div
										className={classname}
										onClick={() => toggleMenu(user.id)}
									>
										<button
											className='inline-flex items-center text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 dark:hover-bg-gray-800 text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100'
											type='button'
										>
											<svg
												className='w-5 h-5'
												aria-hidden='true'
												fill='currentColor'
												viewBox='0 0 20 20'
												xmlns='http://www.w3.org/2000/svg'
											>
												<path d='M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z' />
											</svg>
										</button>
									</div>
								</td>
								{openUserMenus[user.id] && userExistsInList(user.id) && (
									<div
										className={classname}
										style={{
											position: 'absolute',
											right: '45px',
											zIndex: 1000,
											background: '#1F2937',
											borderRadius: '10px',
										}}
									>
										<ul className='py-1 text-sm w-48 flex flex-wrap'>
											<li> 
												{userData && userData.role_id == 3 ? (
													<Edit
														user={user}
														departments={departments}
														roles={roles}
													/>
												) : (
													<p></p>
												)}
											</li>
											<li>
												<Preview userMenu={openUserMenus} user={user} userData={userData} />
											</li>
											<li>
												{userData && userData.role_id == 3 ? (
													<Delete
														onDeleteUser={handleDeleteUser}
														user={user}
														roles={roles}
													/>
												) : (
													<p></p>
												)}
											</li>
										</ul>
									</div>
								)}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	)
}

export async function getServerSideProps() {
	try {
		const { data: users } = await axios.get('http://localhost:3000/api/users')
		const { data: departments } = await axios.get(
			'http://localhost:3000/api/departments'
		)
		const { data: roles } = await axios.get('http://localhost:3000/api/roles')

		return {
			props: {
				users,
				departments,
				roles,
			},
		}
	} catch (error) {
		console.error('Error fetching data:', error)
		return {
			props: {
				users: [],
				departments: [],
				roles: [],
			},
		}
	}
}
