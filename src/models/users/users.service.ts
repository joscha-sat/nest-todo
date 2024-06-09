import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { BaseService } from '../../shared/base.service';

export type ResponseWithRecords<T> = { total: number; results: T[] };

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {
    super(usersRepo);
  }
}
