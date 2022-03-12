import { IsNumber, IsNumberString, IsOptional } from 'class-validator'

export class TokenListDto {
    @IsOptional()
    name?: string

    @IsOptional()
    @IsNumberString(null, { message: 'صفحه باید از نوع عدد باشد' })
    page: number = 1

    @IsOptional()
    @IsNumberString(null, { message: 'محدودت باید از نوع عدد باشد' })
    limit: number = 10
}
