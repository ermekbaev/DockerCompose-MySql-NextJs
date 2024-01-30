// api/auth/registration.js
import { createPool } from 'mysql2/promise'
import { hashSync } from 'bcrypt'
import { generateToken } from './tokens_module'

const pool = createPool({
	host: 'mysql',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'users',
	connectionLimit: 25,
})

export default async function handler(req:any, res:any) {
	try {
		if (req.method === 'POST') {
			const { name, password } = req.body

			// Хеширование пароля перед сохранением в базе данных
			const hashedPassword = hashSync(password, 10)

			const connection = await pool.getConnection()
			const result = await connection.query(
				'INSERT INTO users (name, password_hash) VALUES (?, ?)',
				[name, hashedPassword]
			)
			//@ts-ignore
			const userId = result[0].insertId

			const token = generateToken({
				userId,
				username: 'username',
			})

			await connection.query('UPDATE users SET token = ? WHERE id = ?', [
				token,
				userId,
			])
			connection.release()

			res.status(200).json({
				message: 'User added successfully',
				userId,
				username: name,
				token,
			})
		} else {
			res.status(405).end()
		}
	} catch (error) {
		console.error('Error during login:', error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
}
