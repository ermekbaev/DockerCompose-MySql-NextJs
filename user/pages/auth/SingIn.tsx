import React from 'react'
import { useForm } from 'react-hook-form'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/router'

const Login = () => {
	const { register, handleSubmit } = useForm()
	const router = useRouter()

	const onSubmit = async (data: any) => {
		try {
			const response = await axios.post('/api/auth/SingIn', data)
			const { token } = response.data

			localStorage.setItem('token', token)

			router.push('/')
		} catch (error) {
			console.error('Error during login:', error)
			if (axios.isAxiosError(error)) {
				const axiosError = error as AxiosError
				console.error('Axios Error Details:', axiosError.response?.data)
			}
		}
	}

	return (
		<div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 text-white'>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
				<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight'>
					Sign in to your account
				</h2>
			</div>
			<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='grid gap-4 mb-4 '>
						<div>
							<label
								htmlFor='name'
								className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
							>
								Name
							</label>
							<input
								{...register('name')}
								placeholder='Name'
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
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
								{...register('password')}
								type='password'
								placeholder='Password'
								className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
							/>
						</div>
						<button
							type='submit'
							className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						>
							Login
						</button>
					</div>
				</form>
				<a
					href='/auth/Registration'
					className='mt-10 text-center text-md font-bold leading-9 tracking-tight'
				>
					Don't have an account? register
				</a>
			</div>
		</div>
	)
}

export default Login
