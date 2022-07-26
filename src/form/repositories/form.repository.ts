import { CreateFormDto } from '../dto/create.form.dto'
import { UpdateFormDto } from '../dto/update-forms.dto'

export abstract class IFormRepository<T> {
    abstract findOneById(id: string): Promise<T | object>
    abstract findAll(): Promise<T[] | object[]>

    abstract create(data: CreateFormDto): Promise<T | object>
    abstract delete(id: string): Promise<object>
    abstract update(id: string, data: UpdateFormDto): Promise<T | object>
}
