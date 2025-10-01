import type { User } from '../models/user.model.js'

const users: User[] = [
    {
        id: '1',
        citizenId: '1539900766532',
        name: 'คนหล่อ หน้าหล่อ',
        mobile: "0972542733",
        nickName: 'คนหล่อ',
        currentAddress: 'บ้านเลขที่ 123 หมู่ 1 ตำบล ดาวพุธ อำเภอ ดาวอังคาร จังหวัด กรุงเทพมหานคร',
        permanentAddress: 'บ้านเลขที่ 123 หมู่ 1 ตำบล ดาวพุธ อำเภอ ดาวอังคาร จังหวัด กรุงเทพมหานคร',
        incomeType: 'ค่าคอมมิชชั่น / โบนัส',
        password: '123456',
        createdAt: new Date(),
        updatedAt: new Date(),
        role: 'user',
        firstTime: true,
        ssoStartDate: '2025-01-01',
        picture: 'https://i.pinimg.com/736x/28/e0/73/28e07334993313c020c6c4486a794f08.jpg'
    },
    {
        id: '2',
        citizenId: '1539900766541',
        name: 'คนสวย หน้าสวย',
        mobile: "0972542735",
        nickName: 'คนสวย',
        currentAddress: 'บ้านเลขที่ 123 หมู่ 1 ตำบล ดาวพุธ อำเภอ ดาวอังคาร จังหวัด กรุงเทพมหานคร',
        permanentAddress: 'บ้านเลขที่ 123 หมู่ 1 ตำบล ดาวพุธ อำเภอ ดาวอังคาร จังหวัด กรุงเทพมหานคร',
        incomeType: 'ค่าคอมมิชชั่น / โบนัส',
        password: '123456',
        createdAt: new Date(),
        updatedAt: new Date(),
        role: 'agent',
        firstTime: false,
        ssoStartDate: '2025-08-01',
        picture: 'https://i.pinimg.com/736x/c3/d7/93/c3d793ad88d60c7f5c5149977dde9954.jpg'
    },
    {
        id: '3',
        citizenId: '1539900766544',
        name: 'คนรวย รวยมาก',
        mobile: "0972542736",
        nickName: 'คนรวย',
        currentAddress: 'บ้านเลขที่ 123 หมู่ 1 ตำบล ดาวพุธ อำเภอ ดาวอังคาร จังหวัด กรุงเทพมหานคร',
        permanentAddress: 'บ้านเลขที่ 123 หมู่ 1 ตำบล ดาวพุธ อำเภอ ดาวอังคาร จังหวัด กรุงเทพมหานคร',
        incomeType: 'ค่าคอมมิชชั่น / โบนัส',
        password: '123123',
        createdAt: new Date(),
        updatedAt: new Date(),
        role: 'user',
        firstTime: false,
        ssoStartDate: '2025-09-01',
        picture: 'https://i.pinimg.com/736x/4c/5d/16/4c5d16197decb768eb867e1435d8fa35.jpg'
    }
]

export class UserService {
    private users: User[] = users

    async createUser(user: User) {
        this.users.push(user)
    }

    async findOne(id: string) {
        return this.users.find(user => user.id === id)
    }

    async findAll() {
        return this.users
    }
    async findById(id: string) {
        return this.users.find(user => user.id === id)
    }

    async findByCitizenId(citizenId: string) {
        return this.users.find(user => user.citizenId === citizenId)
    }
    async findByMobilePhone(mobilePhone: string) {
        return this.users.find(user => user.mobile === mobilePhone)
    }
}