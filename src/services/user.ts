import type { User } from '../models/user.model.js'

const users: User[] = [
    {
        id: '1',
        username: 'admin',
        password: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
        role: 'admin'
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
    async findByUsername(username: string) {
        return this.users.find(user => user.username === username)
    }

}