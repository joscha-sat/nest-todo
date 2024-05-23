import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity'; // consider this exists with the correct path
import { Repository } from 'typeorm';
import { ResponseWithRecords } from '../users/users.service';
import { addRelationsAndJoin } from '../../shared/helper.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address) private addressRepo: Repository<Address>,
  ) {}

  async create(createAddressDto: CreateAddressDto) {
    const newAddress = this.addressRepo.create(createAddressDto);
    return await this.addressRepo.save(newAddress);
  }

  async findAll(): Promise<ResponseWithRecords<Address>> {
    const queryBuilder = this.addressRepo.createQueryBuilder('address');
    const relations: (keyof Address)[] = ['user'];

    addRelationsAndJoin<Address>(queryBuilder, relations);

    const [results, total] = await queryBuilder.getManyAndCount();

    return { total, results };
  }

  async findOne(id: string) {
    return await this.addressRepo.findOne({ where: { id } });
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    await this.addressRepo.update(id, updateAddressDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const addressToRemove = await this.findOne(id);
    if (!addressToRemove) {
      throw new BadRequestException(`Address with id ${id} not found.`);
    }
    return await this.addressRepo.remove(addressToRemove);
  }
}
