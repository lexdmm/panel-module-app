import { User } from '../../user/entities/user.entity'

export class AuthTypeDto {
    user: User
    token: string
}
