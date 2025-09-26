import jwt from 'jsonwebtoken'
import type { User } from '../models/user.model.js'

export const generateToken = (user: User): string => {

    const jwtSecret = process.env.JWT_SECRET || 'default-secret-key'

    const token = jwt.sign({
        id: user.id,
        citizenId: user.citizenId,
        role: user.role
    }, jwtSecret, {
        expiresIn: '24h'
    });
    return token
}

export const generateOTP = () => {

    const refCodeText = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const otp = Math.floor(100000 + Math.random() * 900000).toString().slice(0, 6)

    let refCode = ''
    for (let i = 0; i < 6; i++) {
        const index = Math.floor(Math.random() * refCodeText.length)
        refCode += refCodeText[index]
    }

    const minutes = 5
    const expiresAt = new Date(Date.now() + minutes * 60 * 1000)

    return {
        otp,
        refCode,
        expiresAt
    }
}