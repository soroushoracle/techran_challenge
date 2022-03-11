import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { BinanceModule } from './binance/binance.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        BinanceModule,
    ],
})
export class AppModule {}
