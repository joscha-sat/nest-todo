import { TransformFnParams, Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export function ToBoolean(params: TransformFnParams): boolean | undefined {
  const value = params.value;
  switch (value) {
    case '':
    case undefined:
      return undefined;
    case 'true':
    case '1':
      return true;
    case 'false':
    case '0':
      return false;
    default:
      return undefined;
  }
}

export function IsOptionalInt(): PropertyDecorator {
  return (target: any, propertyName: string | symbol): void => {
    IsOptional()(target, propertyName);
    IsInt()(target, propertyName);
    Type(() => Number)(target, propertyName);
  };
}
