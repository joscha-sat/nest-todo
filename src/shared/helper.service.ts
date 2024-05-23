import { FindManyOptions, FindOptionsWhere, SelectQueryBuilder } from 'typeorm';

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
    take: limit ?? 10,
  };
}

export function addRelationsAndJoin<T>(
  queryBuilder: SelectQueryBuilder<T>,
  relations: Array<keyof T>,
) {
  relations.forEach((relation) => {
    queryBuilder.leftJoinAndSelect(
      `${queryBuilder.alias}.${relation as string}`,
      relation as string,
    );
  });
}

export function applySearch<T>(
  qb: SelectQueryBuilder<T>,
  alias: string,
  search?: string,
  fields: string[] = [],
): void {
  if (!search) return;

  fields.forEach((field) =>
    qb.orWhere(`${alias}.${field} LIKE :search`, { search: `%${search}%` }),
  );
}
