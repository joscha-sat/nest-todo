import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the User.', example: 'Joe' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The password of the User.',
    example: 'password123',
  })
  password: string;
}
