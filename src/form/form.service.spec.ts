import { InternalServerErrorException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import TestUtil from './common/test/TestUtil'
import { CreateFormDto } from './dto/create.form.dto'
import { Form } from './entities/form.entity'
import { FormService } from './form.service'

describe('FormsService', () => {
    const mockRepository = {
        create: jest.fn(),
        save: jest.fn()
    }
    let service: FormService

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FormService,
                {
                    provide: getRepositoryToken(Form),
                    useValue: mockRepository
                }
            ]
        }).compile()

        service = module.get<FormService>(FormService)
    })

    // Clear all mocks
    beforeEach(() => {
        mockRepository.create.mockReset()
        mockRepository.save.mockReset()
    })

    describe('When create Forms', () => {
        it('should return when create a new form', async () => {
            const formResult: CreateFormDto = TestUtil.getValidForm()
            mockRepository.save.mockReturnValue(formResult)
            mockRepository.create.mockReturnValue(formResult)
            const saveForm = await service.create(formResult)

            expect(saveForm).toMatchObject(formResult)
            expect(mockRepository.create).toHaveBeenCalledTimes(1)
            expect(mockRepository.save).toHaveBeenCalledTimes(1)
        })

        it('should return axception when does not save a form', async () => {
            const formResult = TestUtil.getValidForm()
            mockRepository.save.mockReturnValue(null)
            mockRepository.create.mockReturnValue(null)

            await service.create(formResult).catch((err) => {
                expect(err).toBeInstanceOf(InternalServerErrorException)
                expect(err).toMatchObject({
                    message: 'There was an error creating the form. Try again.'
                })
            })

            expect(mockRepository.create).toHaveBeenCalledTimes(1)
            expect(mockRepository.save).toHaveBeenCalledTimes(1)
        })
    })
})
