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

export default async function handler(req: any, res: any) {
	try {
		if (req.method === 'POST') {
			const { name, email, password, departmentId, roleId, address, number } =
				req.body

			const hashedPassword = hashSync(password, 10)

			const [existingDepartment] = await pool.query(
				'SELECT * FROM departments WHERE id = ? LIMIT 1',
				[departmentId]
			)
			const [existingRole] = await pool.query(
				'SELECT * FROM roles WHERE id = ? LIMIT 1',
				[roleId]
			)

			//@ts-ignore
			if (existingDepartment.length === 0 || existingRole.length === 0) {
				res.status(400).json({ error: 'Department or role does not exist' })
				return
			}

			const connection = await pool.getConnection()
			const result = await connection.query(
				'INSERT INTO users (name, email, password_hash, department_id, role_id, address, number) VALUES (?, ?, ?, ?, ?, ?, ?)',
				[name, email, hashedPassword, departmentId, roleId, address, number]
			)
			//@ts-ignore
			const userId = result[0].insertId

			const token = generateToken({
				userId,
				username: 'username',
				roleId,
			})

			await connection.query(
				'UPDATE users SET token = ?, role_id = ? WHERE id = ?',
				[token, roleId, userId]
			)
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
		console.error('Error during registration:', error)
		res.status(500).json({ error: 'Internal Server Error' })
	}
}
