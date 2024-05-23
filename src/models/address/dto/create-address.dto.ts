import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty({ default: 'Eichenallee' })
  street: string;

  @ApiProperty({ required: false })
  userId: number;
}
