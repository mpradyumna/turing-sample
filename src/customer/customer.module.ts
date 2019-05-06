import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';

@Module({
  imports: [
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 3600,
      }
    }),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule { }