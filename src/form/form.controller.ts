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

@ApiBearerAuth()
@ApiTags('form')
@Controller('form')
export class FormController {
    constructor(private readonly formService: FormService) {}

    @ApiBearerAuth()
    @UseGuards(AuthGuardJwt)
    @Get('all')
    findAll() {
        return this.formService.findAll()
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuardJwt)
    @Get(':id')
    findById(@Param('id') id: string) {
        return this.formService.findById(id)
    }
    @ApiBearerAuth()
    @UseGuards(AuthGuardJwt)
    @Post('create')
    create(@Body() createFormDto: CreateFormDto) {
        return this.formService.create(createFormDto)
    }

    @UseGuards(AuthGuardJwt)
    @Patch('update/:id')
    update(@Param('id') id: string, @Body() updateFormDto: UpdateFormDto) {
        return this.formService.update(id, updateFormDto)
    }

    @UseGuards(AuthGuardJwt)
    @Delete('delete/:id')
    delete(@Param('id') id: string) {
        return this.formService.delete(id)
    }
}
