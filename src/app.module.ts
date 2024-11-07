import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MondayApiModule } from './monday-api/monday-api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MondayApiModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
