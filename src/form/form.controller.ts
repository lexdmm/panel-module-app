import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post
} from '@nestjs/common'
import { ApiBody } from '@nestjs/swagger'
import { CreateFormDto } from './dto/create.form.dto'
import { UpdateFormDto } from './dto/update-forms.dto'
import { FormService } from './form.service'

@Controller('form')
export class FormController {
    constructor(private readonly formService: FormService) {}

    @Get('all')
    findAll() {
        return this.formService.findAll()
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.formService.findById(id)
    }

    @ApiBody({ type: [CreateFormDto] })
    @Post('create')
    create(@Body() createFormDto: CreateFormDto) {
        return this.formService.create(createFormDto)
    }

    @Patch('update/:id')
    update(@Param('id') id: string, @Body() updateFormDto: UpdateFormDto) {
        return this.formService.update(id, updateFormDto)
    }

    @Delete('delete/:id')
    delete(@Param('id') id: string) {
        return this.formService.delete(id)
    }
}
