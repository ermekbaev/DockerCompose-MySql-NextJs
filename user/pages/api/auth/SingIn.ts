import { createPool } from 'mysql2/promise'
import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next'
import { generateToken, verifyToken } from './tokens_module' 

const pool = createPool({
	host: 'mysql',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'users',
	connectionLimit: 25,
})

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		try {
			const { name, password } = req.body

			if (!name || !password) {
				return res
					.status(400)
					.json({ error: 'Username and password are required' })
			}

			const connection = await pool.getConnection()
			const [user] = await connection.query(
				'SELECT * FROM users WHERE name = ?',
				[name]
			)
			connection.release()

            //@ts-ignore
			if (user.length === 0) {
				return res.status(401).json({ error: 'Invalid name ' })
			}

			const isPasswordValid = await bcrypt.compare(
				password,
				//@ts-ignore
				user[0].password_hash
			)

			if (!isPasswordValid) {
				return res.status(401).json({ error: 'Invalid name or password' })
			}

			const token = generateToken({
                //@ts-ignore
				userId: user[0].id,
                //@ts-ignore
				username: user[0].name,
				//@ts-ignore
				roleId: user[0].role_id
			})

			res.status(200).json({ token })
		} catch (error) {
			console.error('Error during login:', error)
			res
				.status(500)//@ts-ignore
				.json({ error: 'Internal Server Error', details: error.message })
		}
	} else {
		res.status(405).end() 
	}
}
