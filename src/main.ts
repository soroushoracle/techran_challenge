import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './common/http-exception.filter'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const configService = app.get(ConfigService)

    app.useGlobalPipes(new ValidationPipe())
    app.useGlobalFilters(new HttpExceptionFilter())
    await app.listen(configService.get('HTTP_PORT'))
}
bootstrap()
