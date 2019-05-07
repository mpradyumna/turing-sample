import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { DataBaseModule } from '../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity';

@Module({
  imports: [
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 3600,
      }
    }),
    DataBaseModule.forFeature(),
    TypeOrmModule.forFeature([Customer]),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule { }