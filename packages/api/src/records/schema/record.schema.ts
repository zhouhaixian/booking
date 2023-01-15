import { Subject } from '@booking/types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: { createdAt: 'create_at' } })
export class Record {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  grade: string;

  @Prop({ required: true })
  class: number;

  @Prop({ required: true })
  subject: Subject;

  @Prop({ required: true })
  index: number;

  @Prop({ required: true })
  start_time: Date;

  @Prop({ required: true })
  end_time: Date;

  @Prop({ required: true })
  id: string;
}

export type RecordDocument = HydratedDocument<Record>;

export const RecordSchema = SchemaFactory.createForClass(Record);
