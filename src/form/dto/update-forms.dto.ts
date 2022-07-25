import { Type } from 'class-transformer'
import {
    IsBoolean,
    IsDefined,
    IsNotEmpty,
    IsNotEmptyObject,
    IsObject,
    IsOptional,
    IsString,
    ValidateNested
} from 'class-validator'
import { UpdateFormsDataDto } from './update.forms.data.dto'

export class UpdateFormDto {
    @IsString()
    @IsNotEmpty({ message: 'The e-mail in the form cannot be empty!' })
    @IsOptional()
    email?: string

    @IsString()
    @IsNotEmpty({ message: 'The name in the form cannot be empty!' })
    @IsOptional()
    name?: string

    @IsString()
    @IsNotEmpty({ message: 'The description in the form cannot be empty!' })
    @IsOptional()
    description?: string

    @IsBoolean()
    isModule: boolean

    @IsDefined()
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => UpdateFormsDataDto)
    dataForms: UpdateFormsDataDto[]

    @IsNotEmpty({ message: 'The created date cannot be empty!' })
    @IsOptional()
    createdDate?: Date

    @IsNotEmpty({ message: 'The updated date cannot be empty!' })
    @IsOptional()
    updatedDate?: Date

    @IsNotEmpty({ message: 'The deleted date cannot be empty!' })
    @IsOptional()
    deletedDate?: Date
}
