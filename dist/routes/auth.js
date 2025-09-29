import { Hono } from 'hono';
import { login, sendOTP, verifyOTP } from '../controllers/auth.js';
const router = new Hono();
router.post('/login', login);
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);
export default router;
