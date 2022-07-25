import { Column, Entity, JoinColumn, OneToMany } from 'typeorm'
import { BaseEntity } from '../common/entities/baseentity'
import { FormData } from './form.data.entity'

@Entity()
export class Form extends BaseEntity {
    @Column({ length: 150, nullable: false })
    email: string

    @Column({ length: 200, nullable: false })
    name: string

    @Column({ length: 400, nullable: false })
    description: string

    @Column({ type: 'boolean', default: false })
    isModule: boolean

    @OneToMany(() => FormData, (formData) => formData.form, {
        onDelete: 'CASCADE',
        nullable: false
    })
    @JoinColumn()
    formData: FormData[]
}
