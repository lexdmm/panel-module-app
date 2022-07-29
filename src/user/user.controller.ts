import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post
} from '@nestjs/common'
import { CreateUserDto } from './dto/create.user.dto'
import { UpdateUserDto } from './dto/update.user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('all')
    findAll() {
        return this.userService.findAll()
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.userService.findById(id)
    }

    @Post('email')
    findByEmail(@Body() email: string) {
        return this.userService.findByEmail(email)
    }

    @Post('create')
    create(@Body() createFormDto: CreateUserDto) {
        return this.userService.create(createFormDto)
    }

    @Patch('update/:id')
    update(@Param('id') id: string, @Body() updateFormDto: UpdateUserDto) {
        return this.userService.update(id, updateFormDto)
    }

    @Delete('delete/:id')
    delete(@Param('id') id: string) {
        return this.userService.delete(id)
    }
}
