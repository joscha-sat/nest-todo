import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({ default: 'Todo Titel' })
  title: string;

  @ApiProperty({ default: 'Eine Beschreibung' })
  description: string;

  @ApiProperty({ required: false })
  userId: number;
}
