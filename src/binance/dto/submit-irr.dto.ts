import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator'

export class SubmitIRRDto {
    @IsNotEmpty({ message: 'قیمت ضروری می‌باشد' })
    @IsNumber({}, { message: 'قیمت می‌بایست از نوع عدد باشد' })
    @Min(100, { message: 'حداقل مقدار قیمت می‌بایست ۱۰۰ باشد' })
    @Max(1000000, { message: 'حداکثر مقدار قیمت می‌بایست ۱۰۰۰۰۰۰ باشد' })
    price: number
}
