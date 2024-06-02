import { IsEmail, IsNotEmpty, IsNumber, IsNumberString } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    username: string;

    @IsEmail()
    email: string

    @IsNotEmpty()
    age: number
}