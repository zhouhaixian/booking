import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role, Sex, Subject } from '@booking/types';

@Schema({ timestamps: { createdAt: 'create_at', updatedAt: 'update_at' } })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, type: String })
  sex: Sex;

  @Prop({ required: true, type: Array })
  subjects: Subject[];

  @Prop({ required: true, type: String })
  role: Role;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
