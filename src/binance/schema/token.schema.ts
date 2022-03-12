import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, PaginateModel, model } from 'mongoose'
import * as mongoosePaginate from 'mongoose-paginate'

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

TokenSchema.plugin(mongoosePaginate)
export interface TokenModel<T extends Document> extends PaginateModel<T> {}
