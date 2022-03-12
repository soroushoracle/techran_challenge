import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type TokenDocument = Token & Document

@Schema()
export class Token {
    @Prop()
    symbol: string

    @Prop()
    markPrice: string

    @Prop()
    indexPrice: string

    @Prop()
    estimatedSettlePrice: string

    @Prop()
    lastFundingRate: string

    @Prop()
    interestRate: string

    @Prop()
    nextFundingTime: Date

    @Prop()
    time: Date

    @Prop()
    price: number
}

export const TokenSchema = SchemaFactory.createForClass(Token)
