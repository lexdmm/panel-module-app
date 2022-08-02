import { ApiProperty, refs } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
    IsBoolean,
    IsDefined,
    IsNotEmpty,
    IsNotEmptyObject,
    IsObject,
    IsString,
    ValidateNested
} from 'class-validator'
import { CreateFormsDataDto } from './create.forms.data.dto'

export class CreateFormDto {
    @ApiProperty({
        example: 'pepe@test.com',
        description: 'Owner form email'
    })
    @IsString()
    @IsNotEmpty({ message: 'The e-mail in the form cannot be empty!' })
    email?: string

    @ApiProperty({
        example: 'Traffic quiz',
        description: 'Form name'
    })
    @IsString()
    @IsNotEmpty({ message: 'The name in the form cannot be empty!' })
    name?: string

    @ApiProperty({
        example: 'Research about traffic questions',
        description: 'Full description of the purpose of the form'
    })
    @IsString()
    @IsNotEmpty({ message: 'The description in the form cannot be empty!' })
    description?: string

    @ApiProperty({
        description:
            'If set to true, the form will become a fixed-use application module.'
    })
    @IsBoolean()
    isModule: boolean

    @ApiProperty({
        description:
            'Array with the dataset of each field chosen by the user in the form',
        type: () => Object
    })
    @IsDefined()
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => CreateFormsDataDto)
    formData: CreateFormsDataDto[]

    @IsNotEmpty({ message: 'The created date cannot be empty!' })
    createdDate?: Date

    @IsNotEmpty({ message: 'The updated date cannot be empty!' })
    updatedDate?: Date

    @IsNotEmpty({ message: 'The deleted date cannot be empty!' })
    deletedDate?: Date
}
