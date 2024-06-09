import { SelectQueryBuilder } from 'typeorm';

export type Condition<T> = {
  relation: string;
  condition: (qb: SelectQueryBuilder<T>, alias: string) => any;
};

export function addRelationsAndJoin<T>(
  queryBuilder: SelectQueryBuilder<T>,
  relations: Array<keyof T | string>,
  conditions: Condition<T>[] = [],
): void {
  relations.forEach((relation) => {
    if (typeof relation === 'string') {
      const relParts = relation.split('.');
      if (relParts.length > 1) {
        let previousAlias = queryBuilder.alias;
        relParts.forEach((relPart, index, array) => {
          const currentAlias =
            index == array.length - 1 ? relPart : `${relPart}${index}`;
          queryBuilder.leftJoinAndSelect(
            `${previousAlias}.${relPart}`,
            currentAlias,
          );
          const condition = conditions.find(
            (cond) => `${previousAlias}.${relPart}` === cond.relation,
          );
          if (condition) {
            condition.condition(queryBuilder, currentAlias);
          }
          previousAlias = currentAlias;
        });
      } else {
        const alias = relation;
        queryBuilder.leftJoinAndSelect(`${queryBuilder.alias}.${alias}`, alias);
        const condition = conditions.find(
          (cond) => `${queryBuilder.alias}.${alias}` === cond.relation,
        );
        if (condition) {
          condition.condition(queryBuilder, alias);
        }
      }
    }
  });
}

/**
 * Applies search filter to a SelectQueryBuilder.
 *
 * @param queryBuilder
 * @param {string} [search] - The search string to filter the results by (optional).
 * @param {string[]} [fields=[]] - An array of the entity's fields/columns to search within (optional, defaults to an empty array).
 * @return {void}
 */
export function applySearch<T>(
  queryBuilder: SelectQueryBuilder<T>,
  search?: string,
  fields: string[] = [],
): void {
  if (!search) return;

  fields.forEach((field) =>
    queryBuilder.orWhere(`${queryBuilder.alias}.${field} LIKE :search`, {
      search: `%${search}%`,
    }),
  );
}

export function key<Model, Type = any>(key: KeyOf<Model, Type>) {
  return key;
}

export type KeyOf<Entity, V = any> = {
  [K in keyof Entity]-?: Entity[K] extends V ? K : never;
}[keyof Entity] &
  string;
