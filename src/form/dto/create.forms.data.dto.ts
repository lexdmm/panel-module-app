import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'
import { FormRoles } from '../common/enum/EnumForms'

export class CreateFormsDataDto {
    @ApiProperty({
        example: 'Looking at the list, do you consider yourself a good driver?',
        description: 'Form question. A form can have one or more questions'
    })
    @IsString()
    @IsNotEmpty({ message: 'The question in the form cannot be empty!' })
    question: string

    @ApiProperty({
        description: 'Type form choice by user',
        type: () => [FormRoles]
    })
    @IsString()
    @IsNotEmpty({ message: 'The field  in the form cannot be empty!' })
    formType: FormRoles

    @ApiProperty({
        description:
            'so it is unlocked for the user to be able to enter several answers of the same question'
    })
    @IsBoolean()
    isDynamic: boolean

    @IsNotEmpty({ message: 'The created date cannot be empty!' })
    createdDate?: Date

    @IsNotEmpty({ message: 'The updated date date cannot be empty!' })
    updatedDate?: Date

    @IsNotEmpty({ message: 'The deleted date date cannot be empty!' })
    deletedDate?: Date
}
