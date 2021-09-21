import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { PropertyProcessor } from './property.processor';
import { BullModule } from "@nestjs/bull"
import { MongooseModule } from '@nestjs/mongoose';
import { Property, PropertySchema } from "./entities/property.entity"
import { User, UserSchema } from "../users/entities/user.entity"
import { HttpModule } from "@nestjs/axios"

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Property.name, schema: PropertySchema }, { name: User.name, schema: UserSchema }]),
    BullModule.registerQueue({
      name: 'property',
    }),
  ],
  controllers: [PropertyController],
  providers: [PropertyService, PropertyProcessor]
})
export class PropertyModule {}
