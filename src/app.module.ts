import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { PropertyModule } from './property/property.module';
import { BullModule } from '@nestjs/bull';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';

@Module({
  imports: [
    MongooseModule.forRoot('DATABASE_URL'), 
    UsersModule, 
    PropertyModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    SendGridModule.forRoot({
      apiKey: 'SENDGRID_API_KEY',
    }),
  ],
})
export class AppModule { }
