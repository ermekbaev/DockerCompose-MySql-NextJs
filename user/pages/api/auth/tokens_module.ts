const jwt = require('jsonwebtoken')

export const secretKey = 'secret-key' // Замените на свой секретный ключ

interface Payload {
	userId: string
	username: string
	// другие поля по необходимости
}

export function  generateToken(payload: Payload): string {
	 console.log('Generating token with payload:', payload)
	return jwt.sign(payload, secretKey, { expiresIn: '1h' })
}

export function verifyToken(token: string): Payload | null {
	try {
		console.log('Verifying token:', token)
		const decodedPayload = jwt.verify(token, secretKey) as Payload
		console.log('Decoded payload:', decodedPayload)
		return decodedPayload
	} catch (error) {
		console.error('Error during token verification:', error)
		return null
	}
}

