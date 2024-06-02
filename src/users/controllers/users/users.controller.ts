import {
    Body, Controller, Get,
    HttpException,
    HttpStatus,
    Param, ParseBoolPipe, ParseIntPipe, Post, Query,
    UsePipes, ValidationPipe
} from '@nestjs/common';

import { UsersService } from 'src/users/services/users/users.service';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { ValidateCreateUserPipe } from 'src/users/pipes/validate-create-user/validate-create-user.pipe';


@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) { }

    @Post('create')
    @UsePipes(new ValidationPipe())
    createUser(@Body(ValidateCreateUserPipe) userData: CreateUserDto) {
       return this.userService.createUser(userData)
    }

    @Get('health')
    getHealth() {
        return {
            live: 1
        }
    }

    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number) {
        const user = this.userService.fetchUserById(id)
        if(!user){
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST)
        }
        return user
    }

    @Get()
    getUsers(@Query('sortDesc', new ParseBoolPipe({ optional: true })) sortDesc: boolean) {
        // Fetch the users
        const users = this.userService.fetchUsers();

        if (sortDesc === undefined) {
            sortDesc = true; // Default value if not provided
        }

        // Sort the users based on the sortDesc
        const sortedUsers = users.sort((a, b) => {
            if (sortDesc) {
                return b.id - a.id; // Sort in descending order
            } else {
                return a.id - b.id; // Sort in ascending order
            }
        });
        return sortedUsers;
    }

    @Get('posts')
    getPosts() {
        return [{
            username: 'Sankar',
            email: 'sankarbiswas07@gmail.com',
            posts: [{
                id: 1,
                title: 'post 1'
            }, {
                id: 2,
                title: 'post 2'
            },
            {
                id: 3,
                title: 'post 3'
            },
            ]
        }]
    }
}
