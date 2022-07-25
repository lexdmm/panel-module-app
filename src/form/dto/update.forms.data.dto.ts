import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { FormRoles } from '../common/enum/EnumForms'

export class UpdateFormsDataDto {
    @IsString()
    @IsNotEmpty({ message: 'The question in the form cannot be empty!' })
    @IsOptional()
    question: string

    @IsString()
    @IsNotEmpty({ message: 'The field in the form cannot be empty!' })
    @IsOptional()
    formType: FormRoles

    @IsBoolean()
    isDynamic: boolean

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
