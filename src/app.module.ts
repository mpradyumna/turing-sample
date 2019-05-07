import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import {CustomerModule} from './customer/customer.module';
import { DataBaseModule } from './database/database.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'turing',
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: true,
    }),
    DataBaseModule.forRoot({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'root',
      database: 'turing'
    }),
    AuthModule,CustomerModule
  ],
})
export class ApplicationModule {}