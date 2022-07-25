import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { BaseEntity } from '../common/entities/base.entity'
import { FormRoles } from '../common/enum/EnumForms'
import { Form } from './form.entity'


@Entity()
export class FormData extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ length: 300, nullable: false })
    question: string

    @Column({ type: 'enum', enum: FormRoles, default: FormRoles.SHORT_ANSWER })
    formType: FormRoles

    // Allow add a form field dynamic
    @Column({ type: 'boolean', default: false })
    isDynamic: boolean

    // Many FormsData to one Form
    @ManyToOne(() => Form, (form: Form) => form.formData)
    form: Form
}
