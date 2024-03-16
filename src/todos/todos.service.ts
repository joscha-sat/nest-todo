import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { TODO_ERROR_CREATE } from './todo-http-error.enum';

@Injectable()
export class TodosService {
  constructor(@InjectRepository(Todo) private todoRepo: Repository<Todo>) {}

  async create(createTodoDto: CreateTodoDto) {
    const titleExists = await this.todoRepo.findOne({
      where: { title: createTodoDto.title },
    });

    if (titleExists) {
      throw new BadRequestException(TODO_ERROR_CREATE.UNIQUE);
    }

    const newTodo = this.todoRepo.create(createTodoDto);
    return this.todoRepo.save(newTodo);
  }

  async findAll(skip?: number, limit?: number, done?: boolean) {
    console.log(done);
    // Define the find options based on the provided parameters
    const findOptions: FindManyOptions = {
      where: {}, // Initialize an empty where clause
      skip: skip,
      take: limit ?? 20,
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

  findOne(id: string) {
    return this.todoRepo.findOne({ where: { id } });
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
