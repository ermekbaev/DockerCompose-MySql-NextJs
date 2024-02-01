// pages/api/user-info.js

import { verifyToken } from './auth/tokens_module' // Замените на правильный путь
import { createPool } from 'mysql2/promise'

const pool = createPool({
	host: 'mysql',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'users',
	connectionLimit: 25,
})

export default async function handler(req:any, res:any) {
	if (req.method !== 'GET') {
		return res.status(405).json({ error: 'Method Not Allowed' })
	}

	const token = req.headers.authorization?.split(' ')[1]

	if (!token) {
		return res.status(401).json({ error: 'Unauthorized' })
	}

	try {
		// Проверка валидности токена
		const decodedToken = verifyToken(token)

		// Извлечение информации о пользователе из базы данных
		const connection = await pool.getConnection()
		const [userDataRows] = await connection.query(
			'SELECT id, name, email, role_id FROM users WHERE id = ?', //@ts-ignore
			[decodedToken.userId]
		)
		connection.release()
        //@ts-ignore
		if (userDataRows.length === 0) {
			return res.status(404).json({ error: 'User not found' })
		}
        //@ts-ignore
		const userData = userDataRows[0]

		// Отправка данных пользователя в ответе
		res.status(200).json(userData)
	} catch (error) {
		console.error('Error verifying token:', error)
		res.status(401).json({ error: 'Unauthorized' })
	}
}
