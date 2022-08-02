import { NestFactory } from '@nestjs/core'
import {
    FastifyAdapter,
    NestFastifyApplication
} from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { AuthModule } from './auth/auth.module'
import { FormModule } from './form/form.module'
import { UserModule } from './user/user.module'

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter()
    )

    const optionsForm = new DocumentBuilder()
        .setTitle('Form API')
        .setDescription('API responsible for creating dynamic system forms')
        .setVersion('1.0')
        .addTag('api/doc/form')
        .addBearerAuth()
        .build()
    const formDocument = SwaggerModule.createDocument(app, optionsForm, {
        include: [FormModule]
    })
    SwaggerModule.setup('api/doc/form', app, formDocument)

    const optionsUser = new DocumentBuilder()
        .setTitle('User API')
        .setDescription('API responsible for management users')
        .setVersion('1.0')
        .addTag('api/doc/user')
        .addBearerAuth()
        .build()
    const userDocument = SwaggerModule.createDocument(app, optionsUser, {
        include: [UserModule]
    })
    SwaggerModule.setup('api/doc/user', app, userDocument)

    const optionsAuth = new DocumentBuilder()
        .setTitle('Auth API')
        .setDescription('API responsible by security')
        .setVersion('1.0')
        .addTag('api/doc/auth')
        .build()
    const authDocument = SwaggerModule.createDocument(app, optionsAuth, {
        include: [AuthModule]
    })
    SwaggerModule.setup('api/doc/auth', app, authDocument)

    await app.listen(3000, '0.0.0.0')
}
bootstrap()
