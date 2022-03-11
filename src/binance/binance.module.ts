import { Module } from '@nestjs/common'
import { BinanceService } from './binance.service'
import { BinanceController } from './controller/binance.controller'
import { ConfigModule } from '@nestjs/config'
import { BinanceApi } from './binance.api'

@Module({
    imports: [ConfigModule],
    providers: [BinanceService, BinanceApi],
    controllers: [BinanceController],
})
export class BinanceModule {}
