import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compareSync } from 'bcrypt'
import { User } from '../user/entities/user.entity'
import { UserService } from '../user/user.service'
import { AuthDto } from './dto/auth.dto'
import { AuthTypeDto } from './dto/auth.type.dto'

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(data: AuthDto): Promise<AuthTypeDto> {
        const user = await this.userService.findByEmail(data.email)
        const validPassword = compareSync(data.password, user.password)

        if (!validPassword) {
            throw new UnauthorizedException('Incorect Password')
        }

        const token = await this.jwtToken(user)

        return {
            user,
            token
        }
    }

    private async jwtToken(user: User): Promise<string> {
        const payload = {
            username: user.name,
            sub: user.id
        }

        return this.jwtService.signAsync(payload)
    }
}
