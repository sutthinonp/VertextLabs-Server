import { generateOTP } from '../middlewares/auth.js';
const otps = [
    {
        id: '1',
        otp: '903456',
        refCode: 'ABCD12',
        expiresAt: new Date()
    }
];
export class OtpService {
    otps = otps;
    async findByRefCode(refCode) {
        return this.otps.find(otp => otp.refCode === refCode);
    }
    async create() {
        const { otp, refCode } = generateOTP();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
        const newOtp = {
            id: Date.now().toString(),
            otp,
            refCode,
            expiresAt
        };
        this.otps.push(newOtp);
        return newOtp;
    }
}
