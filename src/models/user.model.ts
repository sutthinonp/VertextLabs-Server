export interface User {
    id: string
    citizenId: string
    name: string
    mobile: string
    password: string
    createdAt: Date
    updatedAt: Date,
    role: string,
    firstTime: boolean,
    ssoStartDate: string,
    picture: string
    currentAddress: string
    permanentAddress: string
    incomeType: string
    nickName: string
}
