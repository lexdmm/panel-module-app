import { NestFactory } from '@nestjs/core'
import {
    FastifyAdapter,
    NestFastifyApplication
} from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { FormModule } from './form/form.module'

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter()
    )

    const options = new DocumentBuilder()
        .setTitle('Form API')
        .setDescription('API responsible for creating dynamic system forms')
        .setVersion('1.0')
        .addTag('api/doc/form')
        .build()
    const formDocument = SwaggerModule.createDocument(app, options, {
        include: [FormModule]
    })
    SwaggerModule.setup('api/doc/form', app, formDocument)

    await app.listen(3000, '0.0.0.0')
}
bootstrap()
