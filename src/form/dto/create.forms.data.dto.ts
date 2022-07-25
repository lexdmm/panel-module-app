import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'
import { FormRoles } from '../common/enum/EnumForms'

export class CreateFormsDataDto {
    @IsString()
    @IsNotEmpty({ message: 'The question in the form cannot be empty!' })
    question: string

    @IsString()
    @IsNotEmpty({ message: 'The field  in the form cannot be empty!' })
    formType: FormRoles

    @IsBoolean()
    isDynamic: boolean

    @IsNotEmpty({ message: 'The created date cannot be empty!' })
    createdDate?: Date

    @IsNotEmpty({ message: 'The updated date date cannot be empty!' })
    updatedDate?: Date

    @IsNotEmpty({ message: 'The deleted date date cannot be empty!' })
    deletedDate?: Date
}
