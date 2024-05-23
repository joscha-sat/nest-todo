import { TransformFnParams, Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export function ToBoolean({ value }: TransformFnParams): boolean | undefined {
  console.log('utility ', value);
  if (value === '' || value === undefined) {
    return undefined;
  }
  if (value === 'true' || value === '1') {
    return true;
  } else if (value === 'false' || value === '0') {
    return false;
  }
  return value;
}

export function IsOptionalInt(): PropertyDecorator {
  return (target: any, propertyName: string | symbol): void => {
    IsOptional()(target, propertyName);
    IsInt()(target, propertyName);
    Type(() => Number)(target, propertyName);
  };
}
