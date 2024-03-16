import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ParseBooleanPipe } from '../pipes/parse-boolean-pipe';

@ApiTags('Todo')
@Controller('todo')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  @ApiQuery({
    name: 'skip',
    required: false,
    type: Number,
    description: 'Number of records to skip',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Limit on the number of records to return',
  })
  @ApiQuery({
    name: 'done',
    required: false,
    type: Boolean,
    description: 'Check status of Todo',
  })
  findAll(
    @Query('skip') skip: number | undefined,
    @Query('limit') limit: number | undefined,
    @Query('done', new ParseBooleanPipe()) done: boolean | undefined,
  ) {
    return this.todosService.findAll(skip, limit, done);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(+id);
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
