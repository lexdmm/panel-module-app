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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AuthGuardJwt } from '../auth/auth.guard'
import { CreateFormDto } from './dto/create.form.dto'
import { UpdateFormDto } from './dto/update-forms.dto'
import { FormService } from './form.service'

@ApiTags('form')
@Controller('form')
export class FormController {
    constructor(private readonly formService: FormService) {}

    @ApiBearerAuth('jwt')
    @UseGuards(AuthGuardJwt)
    @Get('all')
    findAll() {
        return this.formService.findAll()
    }

    @ApiBearerAuth('jwt')
    @UseGuards(AuthGuardJwt)
    @Get(':id')
    findById(@Param('id') id: string) {
        return this.formService.findById(id)
    }

    @ApiBearerAuth('jwt')
    @UseGuards(AuthGuardJwt)
    @Post('create')
    create(@Body() createFormDto: CreateFormDto) {
        return this.formService.create(createFormDto)
    }

    @ApiBearerAuth('jwt')
    @UseGuards(AuthGuardJwt)
    @Patch('update/:id')
    update(@Param('id') id: string, @Body() updateFormDto: UpdateFormDto) {
        return this.formService.update(id, updateFormDto)
    }

    @ApiBearerAuth('jwt')
    @UseGuards(AuthGuardJwt)
    @Delete('delete/:id')
    delete(@Param('id') id: string) {
        return this.formService.delete(id)
    }
}
