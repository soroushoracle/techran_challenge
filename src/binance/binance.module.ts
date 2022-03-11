import { Module } from '@nestjs/common'
import { BinanceService } from './binance.service'
import { BinanceController } from './binance.controller'
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [ConfigModule],
    providers: [BinanceService],
    controllers: [BinanceController],
})
export class BinanceModule {}
