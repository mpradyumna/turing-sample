import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Options } from '@nestjs/common';

@Entity({ synchronize: false, engine: 'InnoDB', schema: 'turing' })
export class Customer {

  @PrimaryGeneratedColumn()
  customer_id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @Column('text', { name: 'credit_card' })
  creditCard: string;

  @Column('text', { name: 'address_1' })
  address1: string;

  @Column('text', { name: 'address_2' })
  address2: string;

  @Column('text', { name: 'city' })
  city: string;

  @Column('text', { name: 'region' })
  region: string;

  @Column('text', { name: 'postal_code' })
  postalCode: string;

  @Column('text', { name: 'country' })
  country: string;

  @Column('text', { name: 'shipping_region_id' })
  shippingRegionId: string;

  @Column('text', { name: 'day_phone' })
  dayPhone: string;

  @Column('text', { name: 'eve_phone' })
  evePhone: string;

  @Column('text', { name: 'mob_phone' })
  mobPhone: string;

}