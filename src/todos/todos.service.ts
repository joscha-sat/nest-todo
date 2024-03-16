import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(@InjectRepository(Todo) private todoRepo: Repository<Todo>) {}

  create(createTodoDto: CreateTodoDto) {
    const newTodo = this.todoRepo.create(createTodoDto);
    return this.todoRepo.save(newTodo);
  }

  async findAll(skip?: number, limit?: number) {
    const [results, total] = await this.todoRepo.findAndCount({
      skip,
      take: limit,
    });

    return {
      total,
      results,
    };
  }

  findByStatus(done: boolean) {
    return this.todoRepo.find({
      where: { done },
    });
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
