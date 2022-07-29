import {
    Injectable,
    InternalServerErrorException,
    NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { IResponseError } from '../common/interface/response.error'
import { CreateFormDto } from './dto/create.form.dto'
import { RespFormDto } from './dto/resp.form.dto'
import { UpdateFormDto } from './dto/update-forms.dto'
import { Form } from './entities/form.entity'
import { IFormRepository } from './repository/form.repository'

@Injectable()
export class FormService implements IFormRepository<Form> {
    constructor(
        @InjectRepository(Form) //Ta dizendo que o papel de criar a instancia é do repositório
        private formRepository: Repository<Form>
    ) {}

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

    async findById(id: string): Promise<RespFormDto> {
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
            const form = await this.findById(id)
            form.name = data.name
            form.email = data.email
            form.description = data.description
            form.isModule = data.isModule

            data.formData.forEach((data, index) => {
                form.formData[index] = { ...form.formData[index], ...data }
            })

            if (!form) {
                throw new NotFoundException(`Form ${id} not found`)
            }

            return await this.formRepository.save(form)
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    async delete(id: string): Promise<IResponseError> {
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
