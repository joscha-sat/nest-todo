import { SelectQueryBuilder } from 'typeorm';

// Takes a TypeORM query builder and a list of relations...
/**
 * Adds relations to the given query builder and performs left join and select.
 *
 * @template T - The type of the query builder entity.
 * @param {SelectQueryBuilder<T>} queryBuilder - The query builder to add relations to.
 * @param {Array<keyof T | string>} relations - The relations to be added.
 * @returns {void}
 */
export function addRelationsAndJoin<T>(
  queryBuilder: SelectQueryBuilder<T>,
  relations: Array<keyof T | string>,
) {
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
          previousAlias = currentAlias;
        });
      } else {
        queryBuilder.leftJoinAndSelect(
          `${queryBuilder.alias}.${relation}`,
          relation,
        );
      }
    }
  });
}

/**
 * Applies search filter to a SelectQueryBuilder.
 *
 * @param {SelectQueryBuilder<T>} qb - The SelectQueryBuilder instance to apply the search filter to.
 * @param {string} alias - The alias of the main entity/table in the query builder.
 * @param {string} [search] - The search string to filter the results by (optional).
 * @param {string[]} [fields=[]] - An array of the entity's fields/columns to search within (optional, defaults to an empty array).
 * @return {void}
 */
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
