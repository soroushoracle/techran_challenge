import { Body, Controller, Put, UseInterceptors } from '@nestjs/common'
import { TransformInterceptor } from 'src/common/transform.interceptor'
import { BinanceService } from './binance.service'
import { SubmitIRRDto } from './dto/submit-irr.dto'

@Controller('binance')
@UseInterceptors(TransformInterceptor)
export class BinanceController {
    constructor(private binanceService: BinanceService) {}

    @Put('submit-irr')
    submitIRR(@Body() submitIRRDto: SubmitIRRDto) {
        this.binanceService.setIRRPrice(submitIRRDto)
        return {
            data: {
                rial: this.binanceService.getIRRPrice(),
            },
        }
    }
}
