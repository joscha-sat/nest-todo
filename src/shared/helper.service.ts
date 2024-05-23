import { FindManyOptions, FindOptionsWhere } from 'typeorm';

type FindOptionsProps<T> = {
  whereOptions: FindOptionsWhere<T>;
  relations?: string[];
  skip?: number;
  limit?: number;
};

export function createFindOptions<T>({
  whereOptions = {} as FindOptionsWhere<T>,
  relations = [],
  skip,
  limit,
}: FindOptionsProps<T>): FindManyOptions<T> {
  return {
    where: whereOptions,
    relations: relations,
    skip: skip,
    take: limit ?? 20,
  };
}
