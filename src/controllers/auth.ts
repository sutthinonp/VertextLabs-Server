import type { Context } from 'hono'
import { successResponse, errorResponse } from '../middlewares/response.js'
import { UserService } from '../services/user.js'
import { generateToken } from '../middlewares/auth.js'

/**
 * ฟังก์ชันสำหรับ login ผู้ใช้
 * @param c - Hono context
 * @returns JSON response พร้อม JWT token หากสำเร็จ
 */
export const login = async (c: Context) => {
    const userService = new UserService()
    
    try {
        // รับข้อมูล username และ password จาก request body
        const { username, password } = await c.req.json()
        
        // ตรวจสอบว่ามีข้อมูลครบถ้วน
        if (!username || !password) {
            return errorResponse(c, null, 400, 'Username and password are required')
        }
        
        // ค้นหาผู้ใช้จาก username
        const user = await userService.findByUsername(username)
        if (!user) {
            return errorResponse(c, null, 401, 'Invalid username or password')
        }
        
        // ตรวจสอบรหัสผ่าน (ในการใช้งานจริงควรใช้ bcrypt)
        if (user.password !== password) {
            return errorResponse(c, null, 401, 'Invalid username or password')
        }
        
        // สร้าง JWT token โดยส่ง user object
        const token = generateToken(user)
        
        // ส่งข้อมูลผู้ใช้กลับไป (ไม่รวมรหัสผ่าน)
        const userResponse = {
            id: user.id,
            username: user.username,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
        
        return successResponse(c, { 
            token, 
            user: userResponse 
        }, 200, 'Login successful')
        
    } catch (error) {
        console.error('Login error:', error)
        return errorResponse(c, null, 500, 'Internal server error')
    }
}

/**
 * ฟังก์ชันสำหรับ logout ผู้ใช้
 * @param c - Hono context
 * @returns JSON response
 */
export const logout = async (c: Context) => {
    try {
        // ใน JWT ไม่สามารถ revoke token ได้จริงๆ 
        // ในการใช้งานจริงควรใช้ blacklist หรือ refresh token
        return successResponse(c, null, 200, 'Logout successful')
    } catch (error) {
        return errorResponse(c, null, 500, 'Internal server error')
    }
}