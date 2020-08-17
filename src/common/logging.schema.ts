import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema()
export class LoggingSchema extends Document {
  @Prop()
  method: string

  @Prop()
  url: number

  @Prop()
  params: any

  @Prop()
  body: any

  @Prop()
  query: any
}

// const LoggingSchema = SchemaFactory.createForClass(LoggingSchema)
export default SchemaFactory.createForClass(LoggingSchema)
