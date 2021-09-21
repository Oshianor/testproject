import { IsNotEmpty, IsMongoId, IsNumber, Max, isEnum, IsEnum, IsInt } from 'class-validator';
import { Types } from "mongoose";

export class CreatePropertyDto {
  @IsMongoId()
  user: Types.ObjectId;

  @IsNotEmpty()
  name: string;
  
  @IsNotEmpty()
  address: string;
  
  @IsNotEmpty()
  @IsEnum(["flat", "studio"])
  type: string;
  
  @IsNotEmpty()
  description: string;
  
  @IsNotEmpty()
  @IsNumber()
  @Max(6)
  totalRooms: number;
  
  @IsNotEmpty()
  imageUrl: string;
  
  @IsNotEmpty()
  @IsEnum(["single"])
  occupancyType: string;
  
  @IsNotEmpty()
  @IsInt()
  rentAmount: number;
  
  @IsNotEmpty()
  @IsEnum(["weekly", "monthly", "yearly"])
  rentFrequency: string;

}
