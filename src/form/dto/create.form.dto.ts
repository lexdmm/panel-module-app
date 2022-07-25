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
    @IsString()
    @IsNotEmpty({ message: 'The e-mail in the form cannot be empty!' })
    email?: string

    @IsString()
    @IsNotEmpty({ message: 'The name in the form cannot be empty!' })
    name?: string

    @IsString()
    @IsNotEmpty({ message: 'The description in the form cannot be empty!' })
    description?: string

    @IsBoolean()
    isModule: boolean

    @IsDefined()
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => CreateFormsDataDto)
    dataForms: CreateFormsDataDto[]

    @IsNotEmpty({ message: 'The created date cannot be empty!' })
    createdDate?: Date

    @IsNotEmpty({ message: 'The updated date cannot be empty!' })
    updatedDate?: Date

    @IsNotEmpty({ message: 'The deleted date cannot be empty!' })
    deletedDate?: Date
}
