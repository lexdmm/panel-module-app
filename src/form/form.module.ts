import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Form } from './entities/form.entity'
import { FormService } from './form.service'
import { FormController } from './form.controller'
import { FormData } from './entities/form.data.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Form, FormData])],
    providers: [FormService],
    controllers: [FormController]
})
export class FormModule {}
