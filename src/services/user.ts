import type { User } from '../models/user.model.js'

const users: User[] = [
    {
        id: '1',
        citizenId: '1539900766532',
        mobile: "0972542733",
        password: '123456',
        createdAt: new Date(),
        updatedAt: new Date(),
        role: 'user',
        firstTime: true,
        ssoStartDate: '2025-01-01'
    },
    {
        id: '2',
        citizenId: '1539900766541',
        mobile: "0972542735",
        password: '123456',
        createdAt: new Date(),
        updatedAt: new Date(),
        role: 'agent',
        firstTime: false,
        ssoStartDate: '2025-08-01'
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