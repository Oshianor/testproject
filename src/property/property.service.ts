import { Injectable, BadRequestException } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Property, PropertyDocument } from "./entities/property.entity";
import { User, UserDocument } from "../users/entities/user.entity";

@Injectable()
export class PropertyService {
  constructor(
    @InjectQueue('property') private propertyQueue: Queue,
    @InjectModel(Property.name) private readonly propertyModel: Model<PropertyDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) { }

  async create(createPropertyDto: CreatePropertyDto) {
    const user = await this.userModel.findById(createPropertyDto.user)

    if (!user) throw new BadRequestException();

    const createProperty = new this.propertyModel(createPropertyDto);
    const propt = await createProperty.save();

    await this.propertyQueue.add("published", {
      property: propt,
      user
    }, {
      delay: 1200000
    });

    await this.propertyQueue.add("report", {
      ...propt
    }, {
      delay: 300000
    });

    return propt
  }

  findAll() {
    return `This action returns all property`;
  }
}
