import { Body, Controller, Get, Put, Query, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common'
import { TransformInterceptor } from 'src/common/transform.interceptor'
import { BinanceService } from '../binance.service'
import { SubmitIRRDto } from '../dto/submit-irr.dto'
import Message from '../../common/lib/message'
import { TokenListDto } from '../dto/token-list.dto'
import { MorganInterceptor } from 'nest-morgan'

@Controller('binance')
@UseInterceptors(TransformInterceptor, MorganInterceptor('combined'))
export class BinanceController {
    constructor(private binanceService: BinanceService) {}

    @Put('submit-irr')
    submitIRR(@Body() submitIRRDto: SubmitIRRDto) {
        this.binanceService.setIRRPrice(submitIRRDto)
        return {
            data: {
                rial: this.binanceService.getIRRPrice(),
            },
            message: Message('rial.updated'),
        }
    }

    @Get('irr-price')
    getIRRPrice() {
        return {
            data: {
                rial: this.binanceService.getIRRPrice(),
            },
        }
    }

    @Get('token')
    @UsePipes(new ValidationPipe({ transform: true }))
    async tokenList(@Query() tokenListDto: TokenListDto) {
        return {
            data: {
                tokens: await this.binanceService.findTokens(tokenListDto),
            },
        }
    }

    @Get('fetch-live-token')
    @UsePipes(new ValidationPipe({ transform: true, skipMissingProperties: true }))
    async fetchLiveTokenList(@Query() tokenListDto: TokenListDto) {
        await this.binanceService.fetchAllTokenToIRR(tokenListDto)
        return {
            data: {
                tokens: await this.binanceService.findTokens(tokenListDto),
            },
            message: Message('tokens.updated'),
        }
    }
}
