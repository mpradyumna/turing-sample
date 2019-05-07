import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Customer } from './customer.entity'
import { CreateCustDto } from './createcustdto';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { ConnectionProvider } from '../database/database.module';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomerService {

  constructor(private readonly jwtService: JwtService,
    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
    public connProvider:ConnectionProvider) {
  }

  async createCustomer(createCustDto: CreateCustDto): Promise<any | Error> {
    let customer = new Customer();
    customer.name = createCustDto.name;
    customer.email = createCustDto.email;
    customer.password = createCustDto.password;

    let promise = this.saveCustomer(customer);
    const user: JwtPayload = { email: customer.email };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: 3600,
      accessToken: 'Bearer ' + accessToken,
    };
  }

  saveCustomer(customer: Customer) {
  }

  findOne(email: string) {

    this.customerRepo.query("CALL customer_get_login_info(?)",[email]).then( (results:Customer[]) => {
      console.log(results);
    }).catch(( err) => {
      console.log(err);
    });

    this.connProvider.connection<Customer[]>("SELECT * FROM customer").then((results:Customer[]) => {
      console.log(results);
    }).catch((err) => {
      console.log(err);
    });
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    // put some validation logic here
    // for example query user by id/email/username
    return {};
  }
}