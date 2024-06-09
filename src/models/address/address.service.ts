import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity'; // consider this exists with the correct path
import { Repository } from 'typeorm';
import { BaseService } from '../../shared/base.service';

@Injectable()
export class AddressService extends BaseService<Address> {
  constructor(
    @InjectRepository(Address) private addressRepo: Repository<Address>,
  ) {
    super(addressRepo);
  }
}
