import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'

interface FormInput {
	name: string
	password: string
	confirmPassword: string
}

const Register = () => {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
		watch,
	} = useForm<FormInput>()
	const router = useRouter()

	const onSubmit: SubmitHandler<FormInput> = async data => {
		try {
			const response = await axios.post('/api/auth/registration', data)
			console.log(response, "==================response==================");
			
			console.log('Registration successful:', response.data)

			const {userId, username, token} = response.data

			// const payload = {
			// 		userId,
			// 		username
			// 	}
			localStorage.setItem('token', token)
			
			
			console.log(localStorage, "==============localStoroge===========");
			router.push('/')
		} catch (error) {
			console.error('Error during registration:', error)
			//@ts-ignore
			if (error.response && error.response.data && error.response.data.error) {
				//@ts-ignore
				const serverErrors = error.response.data.error
				Object.keys(serverErrors).forEach(field => {
					//@ts-ignore
					setError(field, {
						type: 'manual',
						message: serverErrors[field],
					})
				})
				//@ts-ignore
				console.error('Server error:', error.response.data)
			}
		}
	}

	const password = watch('password', '') // Получаем значение поля password



	return (
		<div className='flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 text-white'>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
				<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight'>
					Sign in to your account
				</h2>
			</div>

			<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
				<form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
					<div>
						<label
							htmlFor='name'
							className='block text-sm font-medium leading-6'
						>
							Name
						</label>
						<div className='mt-2'>
							<input
								id='name'
								type='text'
								autoComplete='name'
								required
								{...register('name')}
								className='block w-full rounded-md border-0 py-1.5 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-black'
							/>
						</div>
					</div>

					<div>
						<div className='flex items-center justify-between'>
							<label
								htmlFor='password'
								className='block text-sm font-medium leading-6'
							>
								Password
							</label>
							<div className='text-sm'>
								<a href='#' className='font-semibold'>
									Forgot password?
								</a>
							</div>
						</div>
						<div className='mt-2'>
							<input
								id='password'
								type='password'
								autoComplete='current-password'
								required
								{...register('password', { minLength: 8 })}
								className='block w-full rounded-md border-0 py-1.5 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-black'
							/>
						</div>
						{errors.password && (
							<p className='text-red-500'>{errors.password.message}</p>
						)}
					</div>

					<div>
						<label
							htmlFor='confirmPassword'
							className='block text-sm font-medium leading-6'
						>
							Confirm Password
						</label>
						<div className='mt-2'>
							<input
								id='confirmPassword'
								type='password'
								autoComplete='current-password'
								required
								{...register('confirmPassword', {
									validate: value =>
										value === password || 'Passwords do not match',
								})}
								className='block w-full rounded-md border-0 py-1.5 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 text-black'
							/>
						</div>
						{errors.confirmPassword && (
							<p className='text-red-500'>{errors.confirmPassword.message}</p>
						)}
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
