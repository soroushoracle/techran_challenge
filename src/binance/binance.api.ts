import { BadGatewayException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'
import { BinanceTokenApi } from './interface/binance-token-api.interface'

@Injectable()
export class BinanceApi {
    constructor(private configService: ConfigService) {}
    async fetchAllToken(): Promise<BinanceTokenApi[]> {
        try {
            let binanceTokenApi: BinanceTokenApi[]
            const { data } = await axios.get(this.configService.get('BINANCE_CRYPTO_FETCHING_API'))
            return (binanceTokenApi = data)
        } catch (ex) {
            throw new BadGatewayException('Cannot connect to binance gateway.')
        }
    }
}
