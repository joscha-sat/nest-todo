import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { TODO_ERROR_CREATE } from './todo-http-error.enum';
import { addRelationsAndJoin, applySearch } from '../../shared/helper.service';
import { ResponseWithRecords } from '../users/users.service';

type FindAllProps = {
  skip?: number;
  limit?: number;
  search?: string;
  done?: boolean;
};

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

  async findAll({
    skip,
    limit,
    done,
    search,
  }: FindAllProps): Promise<ResponseWithRecords<Todo>> {
    const queryBuilder = this.todoRepo.createQueryBuilder('todo');
    const relations: (keyof Todo)[] = ['user'];

    addRelationsAndJoin<Todo>(queryBuilder, relations);
    applySearch(queryBuilder, 'todo', search, [
      'title',
      'description',
      'user.name',
    ]);

    done !== undefined &&
      queryBuilder.andWhere(`${queryBuilder.alias}.done = :done`, { done });

    const [results, total] = await queryBuilder
      .skip(skip)
      .take(limit ?? 10)
      .getManyAndCount();

    return { total, results };
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
