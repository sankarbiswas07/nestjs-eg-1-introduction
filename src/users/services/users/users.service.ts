import { Injectable } from '@nestjs/common';
import { CreateUserType } from 'src/utils/types';

/**
 * Every single provider should have a Injectable, So it can injected.
 * other services can inject user service, no need to create an object
 * 
 */
@Injectable()
export class UsersService {

    private fakeUsers = [
        { id: 1, username: 'Sankar', email: 'sankarbiswas07@gmail.com' },
        { id: 2, username: 'jhon', email: 'jhon@gmail.com' },
        { id: 3, username: 'madhu', email: 'madhu07@gmail.com' },
    ]

    fetchUsers() {
        return this.fakeUsers
    }

    createUser(userDetials: CreateUserType) {
        const newUser = {
            id: this.fakeUsers.length + 1,
            ...userDetials
        }
        this.fakeUsers.push(newUser)
        return newUser
    }

    fetchUserById(id: number) {
        const [user] = this.fakeUsers.filter(user => user.id === id)
        return user
    }
}
