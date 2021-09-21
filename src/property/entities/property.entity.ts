import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type PropertyDocument = Property & mongoose.Document;

@Schema()
export class Property {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ enum: ["flat", "studio"] })
  type: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, default: 1, max: 6 })
  totalRooms: number;

  @Prop()
  imageUrl: string;

  @Prop({ required: true, enum: ["single"] })
  occupancyType: string;

  @Prop({ required: true, default: 0 })
  rentAmount: number;

  @Prop({ required: true, enum: ["weekly", "monthly", "yearly"], default: "monthly" })
  rentFrequency: string;

  @Prop({ default: true })
  isPublished: boolean;
}

export const PropertySchema = SchemaFactory.createForClass(Property);