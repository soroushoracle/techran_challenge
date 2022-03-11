import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { BinanceApi } from './binance.api'
import { SubmitIRRDto } from './dto/submit-irr.dto'
import { TokenListDto } from './dto/token-list.dto'
import { BinanceTokenApi } from './interface/binance-token-api.interface'

@Injectable()
export class BinanceService {
    private IRRPrice: number

    constructor(private configService: ConfigService, private binanceApi: BinanceApi) {
        this.IRRPrice = Number(configService.get('USDT_DEFAULT_PRICE'))
    }

    getIRRPrice() {
        return this.IRRPrice
    }

    setIRRPrice(submitIRRDto: SubmitIRRDto) {
        this.IRRPrice = submitIRRDto.price
    }

    async fetchAllTokenToIRR(filter: TokenListDto): Promise<BinanceTokenApi[]> {
        const { name } = filter
        const tokens: BinanceTokenApi[] = await this.binanceApi.fetchAllToken()
        return this.calculateRialPrice(tokens).filter((token) => token.symbol.toLowerCase().includes(name))
    }

    private calculateRialPrice(tokens: BinanceTokenApi[]) {
        return tokens.map((token) => ({ ...token, price: Math.ceil(this.IRRPrice * Number(token.markPrice)) }))
    }
}
