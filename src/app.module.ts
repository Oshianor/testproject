import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://abundance:HxznqZ8XQjq2kLXN@churchee.qbavh.gcp.mongodb.net/test')],
})
export class AppModule {}
