import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
import { Response } from 'express'

export interface ExceptionResponse<T> {
    success: boolean
    data: T
    errors: T[]
    message: string
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()

        const exceptionResponse = exception.getResponse()
        response.status(exception.getStatus()).json({
            success: false,
            errors: typeof exceptionResponse === 'object' ? exceptionResponse['message'] : [],
            data: {},
            message: typeof exceptionResponse === 'object' ? exceptionResponse['error'] : exceptionResponse,
        })
    }
}
