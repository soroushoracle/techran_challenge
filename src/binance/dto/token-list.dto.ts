import { Type } from 'class-transformer'
import { IsInt, IsOptional } from 'class-validator'

export class TokenListDto {
    @IsOptional()
    name?: string

    @IsOptional()
    @IsInt({ message: 'صفحه باید از نوع عدد باشد' })
    @Type(() => Number)
    page?: number = 1

    @IsOptional()
    @IsInt({ message: 'محدودیت باید از نوع عدد باشد' })
    @Type(() => Number)
    limit?: number = 10
}
