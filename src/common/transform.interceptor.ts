import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { map, Observable } from 'rxjs'

export interface Response<T> {
    success: boolean | true
    message: string | ''
    data: T
    error?: T
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        return next.handle().pipe(
            map(({ success = true, message = '', data, error }) => ({
                success,
                message: message,
                data,
                error,
            })),
        )
    }
}
