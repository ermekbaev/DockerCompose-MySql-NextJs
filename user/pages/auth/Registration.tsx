import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'

const Register = () => {
	const [departments, setDepartments] = useState([])
	const [roles, setRoles] = useState([])
	const [user, setUser] = useState({
		name: '',
		password: '',
		email:'',
		confirmPassword: '',
		departmentId: '',
		roleId: '',
		address: '',
		number: '',
	})
	const router = useRouter()

	useEffect(() => {
		const fetchDepartmentsAndRoles = async () => {
			try {
				const { data: departmentsData } = await axios.get('/api/departments')
				const { data: rolesData } = await axios.get('/api/roles')
				setDepartments(departmentsData)
				setRoles(rolesData)
			} catch (error) {
				console.error('Error fetching departments and roles:', error)
			}
		}
		fetchDepartmentsAndRoles()
	}, [])

	const handleChange = (fieldName:any, value:any) => {
		setUser(prevUser => ({ ...prevUser, [fieldName]: value }))
	}

	const handleSubmit = async (e:any) => {
		e.preventDefault()

		if (user.password !== user.confirmPassword) {
			toast.error('Passwords do not match')
			return
		}

		try {
			const response = await axios.post('/api/auth/registration', {
				...user,
				departmentId: parseInt(user.departmentId),
				roleId: parseInt(user.roleId),
			})

			const { token } = response.data
			console.log(response.data, "data");
			
			localStorage.setItem('token', token)

			toast.success('User Registered', {
				position: 'bottom-center',
			})
			router.push('/')
		} catch (error) {
			//@ts-ignore
			toast.error(error.response.data.error)
		}
	}

	return (
		<div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 text-white'>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
				<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight'>
					Register
				</h2>
			</div>

			<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
				<form onSubmit={handleSubmit}>
					<div className='grid gap-4 mb-4 sm:grid-cols-2'>
						<div>
							<label
								htmlFor='name'
								className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
							>
								Name
							</label>
							<input
								onChange={e => handleChange(e.target.name, e.target.value)}
								value={user.name}
								type='text'
								name='name'
								id='name'
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
								placeholder='Name'
							/>
						</div>
						<div>
							<label
								htmlFor='email'
								className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
							>
								Email
							</label>
							<input
								onChange={e => handleChange(e.target.name, e.target.value)}
								value={user.email}
								type='text'
								name='email'
								id='email'
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
								placeholder='Email'
							/>
						</div>
						<div>
							<label
								htmlFor='password'
								className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
							>
								Password
							</label>
							<input
								onChange={e => handleChange(e.target.name, e.target.value)}
								value={user.password}
								type='password'
								name='password'
								id='password'
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
								placeholder='Password'
							/>
						</div>
						<div>
							<label
								htmlFor='confirmPassword'
								className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
							>
								Confirm Password
							</label>
							<input
								onChange={e => handleChange(e.target.name, e.target.value)}
								value={user.confirmPassword}
								type='password'
								name='confirmPassword'
								id='confirmPassword'
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
								placeholder='Confirm Password'
							/>
						</div>

						<div>
							<label
								htmlFor='number'
								className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
							>
								Number
							</label>
							<input
								onChange={e => handleChange(e.target.name, e.target.value)}
								value={user.number}
								type='number'
								name='number'
								id='number'
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
								placeholder='Number'
							/>
						</div>
						<div>
							<label
								htmlFor='department'
								className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
							>
								Department
							</label>
							<select
								value={user.departmentId}
								onChange={e => handleChange('departmentId', e.target.value)}
								name='departmentId'
								id='departmentId'
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
							>
								<option value=''>Select Department</option>
								{departments.map((department: any) => (
									<option key={department.id} value={department.id}>
										{department.name}
									</option>
								))}
							</select>
						</div>
						<div>
							<label
								htmlFor='role'
								className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
							>
								Role
							</label>
							<select
								value={user.roleId}
								onChange={e => handleChange('roleId', e.target.value)}
								name='roleId'
								id='roleId'
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
							>
								<option value=''>Select Role</option>
								{roles.map((role: any) => (
									<option key={role.id} value={role.id}>
										{role.name}
									</option>
								))}
							</select>
						</div>
						<div>
							<label
								htmlFor='address'
								className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
							>
								Role
							</label>
							<input
								onChange={e => handleChange(e.target.name, e.target.value)}
								value={user.address}
								type='text'
								name='address'
								id='address'
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
								placeholder='Address'
							/>
						</div>
					</div>
					<div>
						<button
							type='submit'
							className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						>
							Register
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Register
