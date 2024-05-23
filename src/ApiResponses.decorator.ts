import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export type ErrorCollection = { [k: string]: ErrorCollectionItem };
export type ErrorCollectionItem = {
  status: number | HttpStatus;
  type: string;
  message: string;
};

/**
 * Use this to cast your `ErrorCollection` and keep the autocomplete feature.
 * @param v
 */
export function asErrorCollection<
  T extends { [k: string]: ErrorCollectionItem },
>(v: T): T {
  return v;
}

/**
 * To avoid defining error responses in an enum and with `ApiResponse` again,
 * you could use this decorator to generate the docs from your enum.
 * @param errorCollection
 * @constructor
 */
export function ApiResponses(errorCollection: ErrorCollection) {
  const apiResponses: ClassDecorator[] = Object.keys(errorCollection).map(
    (key) => {
      const errorCollectionItem: ErrorCollectionItem = errorCollection[key];
      return ApiResponse({
        status: errorCollectionItem.status,
        description:
          errorCollectionItem.type + ': ' + errorCollectionItem.message,
      });
    },
  );

  return applyDecorators(...apiResponses);
}
