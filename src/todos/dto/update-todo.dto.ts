import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @ApiProperty({
    required: false,
    description: 'Title of the Todo',
    default: 'Todo Title',
  })
  title: string;

  @ApiProperty({
    required: false,
    description: 'Description of the Todo',
    default: 'A description',
  })
  description: string;
}
