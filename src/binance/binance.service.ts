import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { SubmitIRRDto } from './dto/submit-irr.dto'

@Injectable()
export class BinanceService {
    private IRRPrice: number

    constructor(private configService: ConfigService) {
        this.IRRPrice = Number(configService.get('USDT_DEFAULT_PRICE'))
    }

    getIRRPrice() {
        return this.IRRPrice
    }

    setIRRPrice(submitIRRDto: SubmitIRRDto) {
        this.IRRPrice = submitIRRDto.price
    }
}
