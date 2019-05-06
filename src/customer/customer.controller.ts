import { Controller, Get, Post, Param, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CustomerService } from './customer.service';
import { CreateCustDto } from './createcustdto';
import { generateErrorMsg, ErrorMsg } from '../lib/util';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }

  @Post()
  async createCustomer(@Body() createCustDto: CreateCustDto): Promise<any> {

    const errors: Array<ErrorMsg> = [];

    if (!createCustDto.email) {
      errors.push(generateErrorMsg("CUS01", "email", 'The field email is empty'));
    }

    if (!createCustDto.name) {
      errors.push(generateErrorMsg("CUS02", "name", 'The field name is empty'));
    }

    if (!createCustDto.password) {
      errors.push(generateErrorMsg("CUS03", "password", 'The field password is empty'));
    }

    if (errors.length > 0)
      return errors;
    const promise = this.customerService.findOne(createCustDto.email);

  }


  @Get('data')
  @UseGuards(AuthGuard())
  findAll() {
    // this route is restricted by AuthGuard
    // JWT strategy
  }
}