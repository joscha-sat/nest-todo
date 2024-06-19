import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'The name of the User.', example: 'John Doe' })
  name: string;

  @ApiProperty({
    description: 'The email of the User.',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The password of the User.',
    example: 'password123',
  })
  password: string;
}
