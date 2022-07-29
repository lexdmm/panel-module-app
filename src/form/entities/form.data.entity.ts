import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { BaseEntity } from '../../common/entities/baseentity'
import { FormRoles } from '../common/enum/EnumForms'
import { Form } from './form.entity'

@Entity()
export class FormData extends BaseEntity {
    @Column({ length: 300, nullable: false })
    question: string

    @Column({ default: FormRoles.SHORT_ANSWER })
    formType: FormRoles

    // Allow add a form field dynamic
    @Column({ type: 'boolean', default: false })
    isDynamic: boolean

    @Column({ nullable: false })
    formId: string

    // Many FormsData to one Form
    @ManyToOne(() => Form, (form) => form.formData, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        eager: true
    })
    @JoinColumn({ referencedColumnName: 'id', name: 'formId' })
    form: Form
}
