import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty({ message: 'The name is not empty' })
    @IsOptional()
    name?: string

    @IsString()
    @IsNotEmpty({ message: 'The e-mail is not empty' })
    @IsOptional()
    email?: string

    @IsString()
    @IsNotEmpty({ message: 'The password is required' })
    @IsOptional()
    password: string
}
