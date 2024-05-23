import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './entities/user.entity';

export type ResponseWithRecords<T> = { total: number; results: T[] };

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepo.save(createUserDto);
  }

  async findAll(): Promise<ResponseWithRecords<User>> {
    const [results, total] = await this.usersRepo.findAndCount();

    return {
      total,
      results,
    };
  }

  findOne(id: string): Promise<User> {
    return this.usersRepo.findOne({ where: { id } });
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.usersRepo.update(id, updateUserDto);
  }

  remove(id: string): Promise<DeleteResult> {
    return this.usersRepo.delete(id);
  }
}
