import { RespFormDto } from '../../dto/resp.form.dto'
import { UpdateFormsDataDto } from '../../dto/update.forms.data.dto'

export default class TestUtil {
    static getValidForm(): RespFormDto {
        const form = new RespFormDto()

        form.id = '72faef04-8f48-43c0-9b20-cc72e196c0e9'
        form.email = 'email_test@test.com'
        form.name = 'Form Name'
        form.description = 'Form Description'
        form.isModule = false
        form.formData = new Array<UpdateFormsDataDto>()

        return form
    }

    async createForms(): Promise<RespFormDto> {
        return TestUtil.getValidForm()
    }
}
