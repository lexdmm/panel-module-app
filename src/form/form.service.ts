import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateFormDto } from './dto/create.form.dto'
import { UpdateFormDto } from './dto/update-forms.dto'
import { Form } from './entities/form.entity'
import { IFormRepository } from './repositories/form.repository'

@Injectable()
export class FormService extends IFormRepository<Form> {
    constructor(
        @InjectRepository(Form) //Ta dizendo que o papel de criar a instancia é do repositório
        private formRepository: Repository<Form>
    ) {
        super()
    }

    async findAll(): Promise<Form[]> {
        const form = await this.formRepository.find()
        return form
    }

    async findOneById(id: string): Promise<Form> {
        const form = await this.formRepository.findOneBy({ id })
        if (!form) {
            throw new InternalServerErrorException('Form not found')
        }
        return form
    }
    async create(data: CreateFormDto): Promise<Form> {
        const form = this.formRepository.create(data)
        const formSaved = await this.formRepository.save(form)

        if (!formSaved) {
            throw new InternalServerErrorException(
                'There was an error creating the form. Try again.'
            )
        }
        return formSaved
    }

    async update(id: string, data: UpdateFormDto): Promise<Form> {
        const form = await this.findOneById(id)
        await this.formRepository.update(form, { ...data })

        const formUpdated = this.formRepository.create({ ...form, ...data })
        return formUpdated
    }

    async delete(id: string): Promise<boolean> {
        const form = await this.findOneById(id)
        const deleted = await this.formRepository.delete(form)

        if (deleted) {
            return true
        }
        return false
    }
}
