import { successResponse, errorResponse } from '../middlewares/response.js';
import { UserService } from '../services/user.js';
import { generateToken } from '../middlewares/auth.js';
import { OtpService } from '../services/otp.js';
import moment from 'moment';
export const login = async (c) => {
    try {
        const { citizenId, password } = await c.req.json();
        if (!citizenId || !password) {
            return errorResponse(c, null, 400, 'Citizen ID and password are required');
        }
        const userService = new UserService();
        const user = await userService.findByCitizenId(citizenId);
        if (!user) {
            return errorResponse(c, null, 401, 'Invalid citizen ID or password');
        }
        if (user.password !== password) {
            return errorResponse(c, null, 401, 'Invalid citizen ID or password');
        }
        const token = generateToken(user);
        let isPassed = false;
        const startDate = moment(user.ssoStartDate);
        const currentDate = moment();
        const monthsDiff = currentDate.diff(startDate, 'months');
        const daysDiff = currentDate.diff(startDate, 'days');
        if (monthsDiff >= 6) {
            isPassed = true;
        }
        else {
            isPassed = false;
        }
        const userResponse = {
            id: user.id,
            citizenId: user.citizenId,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            firstTime: user.firstTime,
            ssoStartDate: user.ssoStartDate,
            isPassed: isPassed,
            daysDiff: daysDiff,
            monthsDiff: monthsDiff,
        };
        return successResponse(c, {
            token,
            user: userResponse
        }, 200, 'Login successful');
    }
    catch (error) {
        console.error('Login error:', error);
        return errorResponse(c, null, 500, 'Internal server error');
    }
};
export const sendOTP = async (c) => {
    try {
        const { mobilePhone } = await c.req.json();
        if (!mobilePhone) {
            return errorResponse(c, null, 400, 'Mobile phone is required');
        }
        const userService = new UserService();
        const user = await userService.findByMobilePhone(mobilePhone);
        if (!user) {
            return errorResponse(c, null, 401, 'Invalid mobile phone');
        }
        const otpService = new OtpService();
        const otp = await otpService.create();
        return successResponse(c, {
            refCode: otp.refCode,
            otp: otp.otp,
            expiresAt: otp.expiresAt
        }, 200, 'OTP generated successfully');
    }
    catch (error) {
        console.error('Send OTP error:', error);
        return errorResponse(c, null, 500, 'Internal server error');
    }
};
export const verifyOTP = async (c) => {
    try {
        const { otp, refCode } = await c.req.json();
        if (!otp || !refCode) {
            return errorResponse(c, null, 400, 'OTP and refCode are required');
        }
        const otpService = new OtpService();
        const found = await otpService.findByRefCode(refCode);
        if (!found) {
            return errorResponse(c, null, 400, 'Invalid OTP or refCode');
        }
        if (new Date(found.expiresAt).getTime() < Date.now()) {
            return errorResponse(c, null, 400, 'OTP expired');
        }
        return successResponse(c, { verified: true }, 200, 'OTP verified successfully');
    }
    catch (error) {
        console.error('Verify OTP error:', error);
        return errorResponse(c, null, 500, 'Internal server error');
    }
};
