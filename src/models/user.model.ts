export interface User {
    id: string
    citizenId: string
    mobile: string
    password: string
    createdAt: Date
    updatedAt: Date,
    role: string,
    firstTime: boolean,
    ssoStartDate: string
}
