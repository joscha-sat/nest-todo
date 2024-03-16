import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(@InjectRepository(Todo) private todoRepo: Repository<Todo>) {}

  create(createTodoDto: CreateTodoDto) {
    const newTodo = this.todoRepo.create(createTodoDto);
    return this.todoRepo.save(newTodo);
  }

  async findAll(skip?: number, limit?: number, done?: boolean) {
    // Define the find options based on the provided parameters
    const findOptions: FindManyOptions = {
      where: {}, // Initialize an empty where clause
      skip: skip,
      take: limit,
    };

    // If a status was provided, add it to the where clause
    if (done !== undefined) {
      findOptions.where['done'] = done;
    }

    // Execute the query and return the results and total count
    const [results, total] = await this.todoRepo.findAndCount(findOptions);

    return {
      total,
      results,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    return this.todoRepo.update(id, updateTodoDto);
  }

  remove(id: string) {
    return this.todoRepo.delete(id);
  }

  removeAll() {
    return this.todoRepo.clear();
  }
}
