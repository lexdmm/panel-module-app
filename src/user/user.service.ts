import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { IResponseError } from '../common/interface/response.error'
import { CreateUserDto } from './dto/create.user.dto'
import { UpdateUserDto } from './dto/update.user.dto'
import { User } from './entities/user.entity'
import { IUserRepository } from './repository/user.repository'

@Injectable()
export class UserService implements IUserRepository<User> {
    constructor(
        @InjectRepository(User) //Ta dizendo que o papel de criar a instancia é do repositório
        private userRepository: Repository<User>
    ) {}

    async findAll(): Promise<User[]> {
        const users = await this.userRepository.find()
        return users
    }

    async findById(id: string): Promise<User> {
        const user = await this.userRepository.findOneBy({ id })
        if (!user) {
            throw new InternalServerErrorException('User not found')
        }
        return user
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { email } })
        if (!user) {
            throw new InternalServerErrorException('User not found')
        }
        return user
    }

    async update(id: string, data: UpdateUserDto): Promise<User> {
        const user = await this.findById(id)
        await this.userRepository.update(user, { ...data })

        const userUpdated = this.userRepository.create({ ...user, ...data })
        return userUpdated
    }

    async create(data: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(data)
        const userSaved = await this.userRepository.save(user)

        if (!userSaved) {
            throw new InternalServerErrorException(
                'There was an error creating the user'
            )
        }
        return userSaved
    }

    async delete(id: string): Promise<IResponseError> {
        const user = await this.findById(id)
        const deleted = await this.userRepository.delete(user)

        if (deleted) {
            return { status: true, message: 'Deleted success!' }
        }
        return { status: false, message: 'Could not delete user!' }
    }
}
