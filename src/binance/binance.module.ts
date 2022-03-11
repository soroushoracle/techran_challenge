import { Module } from '@nestjs/common'
import { BinanceService } from './binance.service'
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [ConfigModule],
    providers: [BinanceService],
})
export class BinanceModule {}
