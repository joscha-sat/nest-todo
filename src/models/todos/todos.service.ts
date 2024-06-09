import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { BaseService } from '../../shared/base.service';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService extends BaseService<Todo> {
  constructor(
    @InjectRepository(Todo)
    private todoRepo: Repository<Todo>,
  ) {
    super(
      todoRepo,
      ['user', 'user.address'],
      ['title', 'description', 'user.name', 'address.street'],
    );
  }
}
