import { IResponseError } from '../../common/interface/response.error'
import { CreateFormDto } from '../dto/create.form.dto'
import { UpdateFormDto } from '../dto/update-forms.dto'

export abstract class IFormRepository<T> {
    abstract findById(id: string): Promise<T | object>
    abstract findAll(): Promise<T[] | object[]>

    abstract create(data: CreateFormDto): Promise<T | object>
    abstract delete(id: string): Promise<T | IResponseError>
    abstract update(id: string, data: UpdateFormDto): Promise<T | object>
}
