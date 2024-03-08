import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ type: String, unique: true, required: true })
  uuid: string;

  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({
    type: String,
    require: true,
    unique: true,
  })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, unique: true, required: true })
  tokenPublicKey: string;

  @Prop({ type: Date })
  lastLogin: Date;

  @Prop({ type: Number, default: 0 })
  loginAttempts: number;

  @Prop({ type: Boolean, default: false })
  locked: boolean;

  @Prop({ type: String })
  avatarUrl?: string;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.set('timestamps', true);
