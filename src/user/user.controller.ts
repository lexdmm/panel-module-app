import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards
} from '@nestjs/common'
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiTags
} from '@nestjs/swagger'
import { AuthGuardJwt } from '../auth/auth.guard'
import { CreateUserDto } from './dto/create.user.dto'
import { UpdateUserDto } from './dto/update.user.dto'
import { UserService } from './user.service'

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiBearerAuth('jwt')
    @UseGuards(AuthGuardJwt)
    @Get('all')
    findAll() {
        return this.userService.findAll()
    }

    @ApiBearerAuth('jwt')
    @UseGuards(AuthGuardJwt)
    @Get(':id')
    findById(@Param('id') id: string) {
        return this.userService.findById(id)
    }

    @ApiBearerAuth('jwt')
    @UseGuards(AuthGuardJwt)
    @Post('email')
    findByEmail(@Body() email: string) {
        return this.userService.findByEmail(email)
    }

    @ApiCreatedResponse({
        description: 'The record has been successfully created.'
    })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    @ApiBearerAuth('jwt')
    @UseGuards(AuthGuardJwt)
    @Post('create')
    create(@Body() createFormDto: CreateUserDto) {
        return this.userService.create(createFormDto)
    }

    @ApiBearerAuth('jwt')
    @UseGuards(AuthGuardJwt)
    @Patch('update/:id')
    update(@Param('id') id: string, @Body() updateFormDto: UpdateUserDto) {
        return this.userService.update(id, updateFormDto)
    }

    @ApiBearerAuth('jwt')
    @UseGuards(AuthGuardJwt)
    @Delete('delete/:id')
    delete(@Param('id') id: string) {
        return this.userService.delete(id)
    }
}
