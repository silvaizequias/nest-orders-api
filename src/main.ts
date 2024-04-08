import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { NewrelicInterceptor } from './newrelic.interceptor'

async function bootstrap() {
  const PORT = process.env.PORT ?? ''

  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )

  app.useGlobalInterceptors(new NewrelicInterceptor())

  app.enableCors({
    origin: ['http://localhost', 'https://dedicado.digital'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  })

  const options = new DocumentBuilder()
    .setTitle('orders')
    .setDescription('orders')
    .setVersion('1.0')
    .addApiKey({
      type: 'apiKey',
      in: 'header',
      description: 'Authorization',
    })
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('swagger', app, document)

  await app
    .listen(PORT || 3000)
    .then(() => console.log(`server running on http://localhost:${PORT}`))
}
bootstrap()
