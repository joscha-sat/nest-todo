import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseBooleanPipe implements PipeTransform<string, boolean> {
  transform(value: string | boolean): boolean | undefined {
    console.log(value);
    if (value === undefined || value === '') {
      return undefined;
    }
    if (value === 'true' || value === '1' || value === true) {
      return true;
    } else if (value === 'false' || value === '0' || value === false) {
      return false;
    } else {
      throw new BadRequestException(
        'Validation failed (boolean string is expected!!)',
      );
    }
  }
}
