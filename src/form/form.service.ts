import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateFormDto } from './dto/create.form.dto'
import { RespFormDto } from './dto/resp.form.dto'
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

    async findAll(): Promise<RespFormDto[]> {
        try {
            const form = await this.formRepository
                .createQueryBuilder('form')
                .innerJoinAndSelect('form.formData', 'formData')
                .getMany()

            return form
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async findOneById(id: string): Promise<RespFormDto> {
        try {
            const form = await this.formRepository
                .createQueryBuilder('form')
                .innerJoinAndSelect('form.formData', 'formData')
                .where('form.id = :id', { id: id })
                .getOne()

            if (!form) {
                throw new InternalServerErrorException('Form not found!')
            }
            return form
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async create(data: CreateFormDto): Promise<RespFormDto> {
        const form = this.formRepository.create(data)
        const newForm = await this.formRepository.save(form)

        if (!newForm) {
            throw new InternalServerErrorException(
                'There was an error creating the form. Try again.'
            )
        }
        return newForm
    }

    async update(id: string, data: UpdateFormDto): Promise<RespFormDto> {
        try {
            const form = await this.findOneById(id)

            form.name = data.name
            form.email = data.email
            form.description = data.description
            form.isModule = data.isModule

            data.formData.forEach((data, index) => {
                form.formData[index] = { ...form.formData[index], ...data }
            })

            const formUpdate = await this.formRepository.save(form)
            return formUpdate
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async delete(id: string): Promise<object> {
        const deleted = await this.formRepository
            .createQueryBuilder('form')
            .where('form.id = :id', { id: id })
            .delete()
            .execute()

        if (deleted) {
            return { status: true, message: 'Deleted success!' }
        }
        return { status: false, message: 'Could not delete form!' }
    }
}
