import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Config {
  @Prop({ required: true })
  booking_successful_message: string;

  @Prop({ required: true })
  forgot_password_message: string;
}

export type ConfigDocument = HydratedDocument<Config>;

export const ConfigSchema = SchemaFactory.createForClass(Config);
