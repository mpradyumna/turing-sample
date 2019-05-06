import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Customer } from './customer.entity'
import { CreateCustDto } from './createcustdto';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

@Injectable()
export class CustomerService {

  constructor(private readonly jwtService: JwtService,
    @Inject('CONNECTION_PROVIDER') public pool) {
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
      this.pool.getConnection(function (err, connection) {
        if (err) throw err; // not connected!

        // Use the connection
        connection.query('SELECT * FROM customer', function (error, results, fields) {
          // When done with the connection, release it.
          connection.release();

          // Handle error after the release.
          if (error) throw error;

          // Don't use the connection here, it has been returned to the pool.
        });
      });
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    // put some validation logic here
    // for example query user by id/email/username
    return {};
  }
}