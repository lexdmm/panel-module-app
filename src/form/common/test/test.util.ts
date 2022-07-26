import { CreateFormDto } from '../../dto/create.form.dto'
import { CreateFormsDataDto } from '../../dto/create.forms.data.dto'

export default class TestUtil {
    static getValidForm(): CreateFormDto {
        const form = new CreateFormDto()

        form.email = 'email_test@test.com'
        form.name = 'Form Name'
        form.description = 'Form Description'
        form.isModule = false
        form.formData = new Array<CreateFormsDataDto>()

        return form
    }

    async createForms(): Promise<CreateFormDto> {
        return TestUtil.getValidForm()
    }
}
