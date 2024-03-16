import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export function ToBoolean(): PropertyDecorator {
  return Transform(({ value }) => {
    console.log(value);
    if (value === 'true' || value === '1') {
      return true;
    } else if (value === 'false' || value === '0') {
      return false;
    }
    return value;
  });
}

export function IsOptionalInt(): PropertyDecorator {
  return (target: any, propertyName: string | symbol): void => {
    IsOptional()(target, propertyName);
    IsInt()(target, propertyName);
    Type(() => Number)(target, propertyName);
  };
}
