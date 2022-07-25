import { Body, Controller, Get, Post } from '@nestjs/common'
import { CreateFormDto } from './dto/create.form.dto'
import { FormService } from './form.service'

@Controller('form')
export class FormController {
    constructor(private readonly formService: FormService) {}

    @Get('all')
    findAll() {
        return this.formService.findAll()
    }

    @Post('create')
    create(@Body() createFormDto: CreateFormDto) {
        this.formService.create(createFormDto)
    }
}
