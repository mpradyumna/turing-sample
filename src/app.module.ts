import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { DataBaseModule } from './database/database.module';



@Module({
  imports: [
    DataBaseModule,
    AuthModule, CustomerModule
  ],
})
export class ApplicationModule { }