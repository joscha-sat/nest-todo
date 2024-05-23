import { ApiProperty } from '@nestjs/swagger';

export class CreateAddressDto {
  @ApiProperty({ default: 'Eichenallee' })
  street: string;

  @ApiProperty({ required: false, default: 1 })
  userId: number;
}
