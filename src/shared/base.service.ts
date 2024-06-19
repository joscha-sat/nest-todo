import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import {
  addRelationsAndJoin,
  applyFilters,
  applySearch,
} from './helper.service';

type FindAllProps = {
  skip?: number;
  limit?: number;
  search?: string;
  done?: boolean;
  title?: string;
};

export interface ResponseWithRecords<Entity> {
  total: number;
  results: Entity[];
}

@Injectable()
export class BaseService<Entity> {
  constructor(
    public repo: Repository<Entity>,
    public findAllPopulations: Array<string> = [],
    public searchKeys: Array<string> = [],
    public filterValues: Array<string> = [],
  ) {}

  async create(createEntityDto: any): Promise<Entity[]> {
    const newEntity = this.repo.create(createEntityDto);
    return this.repo.save(newEntity);
  }

  async findAll(
    findAllProps?: FindAllProps,
  ): Promise<ResponseWithRecords<Entity>> {
    const alias = this.repo.metadata.tableName;
    const queryBuilder = this.repo.createQueryBuilder(alias);

    addRelationsAndJoin<Entity>(queryBuilder, this.findAllPopulations);
    applySearch(queryBuilder, findAllProps?.search, this.searchKeys);

    const filterArray = this.filterValues.reduce(
      (obj, item) => ({ ...obj, [item]: findAllProps[item] }),
      {},
    );

    console.log(filterArray);

    applyFilters(queryBuilder, filterArray);

    const [results, total] = await queryBuilder
      .skip(findAllProps?.skip ?? 0)
      .take(findAllProps?.limit ?? 10)
      .getManyAndCount();

    return { total, results };
  }

  async findOne(id: string): Promise<Entity> {
    const alias = this.repo.metadata.tableName;
    return this.repo
      .createQueryBuilder(alias)
      .where(`${this.repo.metadata.name}.id = :id`, { id: id })
      .getOneOrFail();
  }

  async update(id: string, updateEntityDto: any): Promise<UpdateResult> {
    return this.repo.update(id, updateEntityDto);
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.repo.delete(id);
  }

  async removeAll(): Promise<void> {
    return this.repo.clear();
  }
}
