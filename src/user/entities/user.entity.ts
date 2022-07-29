import { Column, Entity } from 'typeorm'
import { hashPasswordTransform } from '../../common/auth/crypto'
import { BaseEntity } from '../../common/entities/baseentity'

@Entity()
export class User extends BaseEntity {
    @Column()
    name: string

    @Column()
    email: string

    @Column({
        transformer: hashPasswordTransform
    })
    password: string
}
