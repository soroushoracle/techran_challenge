import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { MongooseModule } from '@nestjs/mongoose'
import { ScheduleModule } from '@nestjs/schedule'
import { MorganInterceptor, MorganModule } from 'nest-morgan'
import { BinanceModule } from './binance/binance.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.MONGODB_URI),
        ScheduleModule.forRoot(),
        MorganModule,
        BinanceModule,
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: MorganInterceptor('combined'),
        },
    ],
})
export class AppModule {}
