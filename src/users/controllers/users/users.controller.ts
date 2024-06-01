import { 
    Body, Controller, Get, 
    Param, ParseBoolPipe, ParseIntPipe, Post, Query,
    UsePipes, ValidationPipe 
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';

@Controller('users')
export class UsersController {



    // One way to implement POST and access the body
    // @Post()
    // createUser(@Req() req: Request, @Res() res: Response){
    //     console.log(req.body)
    //     res.send('Created')
    // }

    // Another effective way of POST and accessing body
    // Now it is not validating by default.
    // I will implement the validation later.
    @Post('create')
    @UsePipes(new ValidationPipe())
    createUser(@Body() userData: CreateUserDto){
        console.log(userData)
        return{}
    }

    @Get('health')
    getHealth() {
        return {
            live: 1
        }
    }

    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number) {
        return [{ id:id ,username: 'Sankar', email: 'sankarbiswas07@gmail.com' }]
    }

    @Get()
    getUsers(@Query('sortDesc', ParseBoolPipe) sortDesc: boolean) {
        console.log("sortDesc : ", sortDesc)
        return [{ username: 'Sankar', email: 'sankarbiswas07@gmail.com' }]
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
