import { IsOptional } from 'class-validator'

export class TokenListDto {
    @IsOptional()
    name?: string
}
