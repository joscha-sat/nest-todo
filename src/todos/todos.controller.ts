import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ParseBooleanPipe } from '../pipes/parse-boolean-pipe';
import { CreateTodoDto } from './dto/create-todo.dto';

@ApiTags('Todo')
@Controller('todo')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  @createApiQuery('skip', 'Number of records to skip')
  @createApiQuery('limit', 'Limit of records to return')
  @createApiQuery('done', 'Return all todo of selected status boolean', Boolean)
  findAll(
    @Query('skip') skip: number | undefined,
    @Query('limit') limit: number | undefined,
    @Query('done', new ParseBooleanPipe()) done: boolean | undefined,
  ) {
    return this.todosService.findAll(skip, limit, done);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(id);
  }

  // @Delete()
  // removeAll() {
  //   return this.todosService.removeAll();
  // }
}

function createApiQuery(
  name: string,
  description: string,
  type: any = Number,
  required = false,
) {
  return ApiQuery({
    name,
    required,
    type,
    description,
  });
}
