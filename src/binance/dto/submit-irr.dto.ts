import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator'

export class SubmitIRRDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(1000000)
    price: number
}
