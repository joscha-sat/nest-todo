import { HttpStatus } from '@nestjs/common';
import { asErrorCollection } from '../ApiResponses.decorator';

export const TODO_ERROR_CREATE = asErrorCollection({
  UNIQUE: [
    HttpStatus.CONFLICT,
    'UNIQUE',
    'There is already a TODO with this name',
  ],
});
