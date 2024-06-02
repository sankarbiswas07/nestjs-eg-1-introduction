import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: CreateUserDto, metadata: ArgumentMetadata) {
    console.log('Inside ValidateCreateUserPipe');
    console.log(value)
    console.log(metadata)

    const parseAgeToInt = parseInt(value.age.toString())
    if (isNaN(parseAgeToInt)) {
      console.log(`${value.age} si not a number!`);
      throw new HttpException('Invalid data type for property age. Expectred number', HttpStatus.BAD_REQUEST)
    }

    return { ...value, age: parseAgeToInt };
  }
}
