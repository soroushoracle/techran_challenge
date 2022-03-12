import { Module } from '@nestjs/common'
import { BinanceService } from './binance.service'
import { BinanceController } from './controller/binance.controller'
import { ConfigModule } from '@nestjs/config'
import { BinanceApi } from './binance.api'
import { MongooseModule } from '@nestjs/mongoose'
import { Token, TokenSchema } from './schema/token.schema'

@Module({
    imports: [ConfigModule, MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }])],
    providers: [BinanceService, BinanceApi],
    controllers: [BinanceController],
})
export class BinanceModule {}
