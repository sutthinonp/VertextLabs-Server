import { Hono } from 'hono'
import { login, logout } from '../controllers/auth.js'
import { authMiddleware } from '../middlewares/auth.js'

const router = new Hono()

router.post('/login', login)

router.post('/logout', authMiddleware, logout)

export default router