const jwt = require('jsonwebtoken')

export const secretKey = 'secret-key' 

interface Payload {
	userId: string
	username: string
	roleId: number
}

export function  generateToken(payload: Payload): string {
	return jwt.sign(payload, secretKey, { expiresIn: '1h' })
}

export function verifyToken(token: string): Payload | null {
	try {
		const decodedPayload = jwt.verify(token, secretKey) as Payload
		return decodedPayload
	} catch (error) {
		console.error('Error during token verification:', error)
		return null
	}
}

