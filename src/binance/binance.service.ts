import { Injectable } from '@nestjs/common'
import { model, Model, PaginateResult } from 'mongoose'
import { ConfigService } from '@nestjs/config'
import { InjectModel } from '@nestjs/mongoose'
import { BinanceApi } from './binance.api'
import { SubmitIRRDto } from './dto/submit-irr.dto'
import { TokenListDto } from './dto/token-list.dto'
import { BinanceTokenApi } from './interface/binance-token-api.interface'
import { Token, TokenDocument, TokenModel, TokenSchema } from './schema/token.schema'
import { Cron } from '@nestjs/schedule'

@Injectable()
export class BinanceService {
    private IRRPrice: number

    constructor(
        private configService: ConfigService,
        private binanceApi: BinanceApi,
        @InjectModel(Token.name)
        private tokenModel: TokenModel<TokenDocument> = model<TokenDocument>(
            'TokenDocument',
            TokenSchema,
        ) as TokenModel<TokenDocument>,
    ) {
        this.IRRPrice = Number(configService.get('USDT_DEFAULT_PRICE'))
    }

    getIRRPrice() {
        return this.IRRPrice
    }

    setIRRPrice(submitIRRDto: SubmitIRRDto) {
        this.IRRPrice = submitIRRDto.price
    }

    async fetchAllTokenToIRR(filter: TokenListDto): Promise<boolean> {
        const { name } = filter
        const tokens = (await this.binanceApi.fetchAllToken()).filter((token) =>
            name ? new RegExp(`.*${name}.*`, 'i').test(token.symbol) : true,
        )
        Promise.all(tokens.map((token) => this.insertOrUpdateToken(this.calculateRialPrice(token))))
        return true
    }

    async findTokens(filter: TokenListDto): Promise<PaginateResult<TokenDocument>> {
        const { name, page, limit } = filter
        return await this.tokenModel.paginate(name ? { symbol: { $regex: '.*' + name + '.*', $options: 'i' } } : {}, {
            page,
            limit,
        })
    }

    private calculateRialPrice(token: BinanceTokenApi) {
        return { ...token, price: Math.ceil(this.IRRPrice * Number(token.markPrice)) }
    }

    async insertOrUpdateToken(token: BinanceTokenApi): Promise<Token> {
        return this.tokenModel.findOneAndUpdate(
            { symbol: token.symbol },
            {
                symbol: token.symbol,
                markPrice: token.markPrice,
                indexPrice: token.indexPrice,
                estimatedSettlePrice: token.estimatedSettlePrice,
                lastFundingRate: token.lastFundingRate,
                interestRate: token.interestRate,
                nextFundingTime: token.nextFundingTime,
                time: token.time,
                price: token.price,
            },
            {
                upsert: true,
                new: true,
            },
        )
    }

    @Cron('0 */5 * * * *')
    async handleCron() {
        console.log('Tokens updated!')
        await this.fetchAllTokenToIRR({})
    }
}
