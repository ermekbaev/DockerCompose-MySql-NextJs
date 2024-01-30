// login.js
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

			// Сохранение токена в localStorage
			localStorage.setItem('token', token)

			// Дополнительные действия при успешном входе, например, перенаправление
			// или обновление состояния приложения
			router.push('/')
		} catch (error) {
			console.error('Error during login:', error)
			if (axios.isAxiosError(error)) {
				const axiosError = error as AxiosError
				console.error('Axios Error Details:', axiosError.response?.data)
			}
			// Обработка ошибок
		}
	}

	// const handleLoginClick = () => {
	// 	// Переход на страницу регистрации
	// 	router.push('/auth/Registration')
	// }


	return (
		<div>
			<h1>Login Page</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input {...register('name')} placeholder='Name' className='text-black'/>
				<input
					{...register('password')}
					type='password'
					placeholder='Password'
					className='text-black'
				/>
				<button type='submit'>Login</button>
			</form>
				<a href="/auth/Registration">Already have an account</a>
		</div>
	)
}

export default Login
