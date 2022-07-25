import { CreateFormDto } from '../dto/create.form.dto'
import { UpdateFormDto } from '../dto/update-forms.dto'

export abstract class IFormRepository<T> {
    abstract findOneById(id: string): Promise<T>
    abstract findAll(): Promise<T[]>

    abstract create(data: CreateFormDto): Promise<T>
    abstract delete(id: string): Promise<boolean>
    abstract update(id: string, data: UpdateFormDto): Promise<T>
}
