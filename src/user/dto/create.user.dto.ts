import { IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDto {
    @IsString()
    @IsNotEmpty({ message: 'The name is not empty' })
    name: string

    @IsString()
    @IsNotEmpty({ message: 'The e-mail is not empty' })
    email: string

    @IsString()
    @IsNotEmpty({ message: 'The password is required' })
    password: string
}
