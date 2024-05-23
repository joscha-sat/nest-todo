import { HttpStatus } from '@nestjs/common';
import { asErrorCollection } from '../../ApiResponses.decorator';

export const TODO_ERROR_CREATE = asErrorCollection({
  UNIQUE: {
    status: HttpStatus.CONFLICT,
    type: 'UNIQUE',
    message: 'There is already a TODO with this name',
  },
});
