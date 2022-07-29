import { IResponseError } from '../../common/interface/response.error'
import { CreateUserDto } from '../dto/create.user.dto'
import { UpdateUserDto } from '../dto/update.user.dto'

export abstract class IUserRepository<T> {
    abstract findById(id: string): Promise<T>
    abstract findByEmail(email: string): Promise<T>
    abstract findAll(): Promise<T[]>

    abstract create(data: CreateUserDto): Promise<T>
    abstract delete(id: string): Promise<T | IResponseError>
    abstract update(id: string, data: UpdateUserDto): Promise<T>
}
