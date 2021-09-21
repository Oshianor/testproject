import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from "./entities/user.entity"

@Injectable()
export class UsersService {
  constructor(
    @InjectQueue('users') private userQueue: Queue, 
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.findOne({ email: createUserDto.email });

    if (user) throw new BadRequestException({ statusCode: 400, message: "Account already exist" })

    const createUser = new this.userModel(createUserDto);
    await this.userQueue.add("transcode", {
      email: createUserDto.email
    }, {
      delay: 120
    });

    return createUser.save();
  }

  findAll() {
    return `This action returns all users`;
  }
}
