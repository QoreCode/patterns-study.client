import Request from '@/buisness/tools/request';
import { RequestCriteria } from '@/buisness/tools/request-criteria';
import { Collection } from '@/buisness/components/collection';

export abstract class Mapper<Model> {
  protected abstract entity: string;

  public async getAll(criteria?: RequestCriteria): Promise<Collection<Model>> {
    const props = criteria ? criteria.getProps() : {};
    const data = await Request.get(this.entity, props);

    return this.createCollection(data);
  }

  public async create(payload: object = {}): Promise<Model> {
    const data = await Request.post(this.entity, payload);

    return this.createModel(data);
  }

  public async update(id: number, payload: object): Promise<Model> {
    const data = await Request.put(`${this.entity}/${id}`, payload);

    return this.createModel(data);
  }

  public async deleteById(id: number): Promise<void> {
    return Request.delete(`${this.entity}/${id}`);
  }

  public async deleteByAttributes(criteria: RequestCriteria): Promise<void> {
    return Request.delete(this.entity, criteria.getProps());
  }

  public async findById(id: number): Promise<Model> {
    const data = await Request.get(`${this.entity}/${id}`);

    return this.createModel(data);
  }

  public async findByAttributes(
    criteria: RequestCriteria,
  ): Promise<Collection<Model>> {
    const data = await Request.get(this.entity, criteria.getProps());

    return this.createCollection(data);
  }

  protected abstract createModel(data: Record<string, Model>): Model;

  protected abstract createCollection(
    data: Array<Record<string, Model>>,
  ): Collection<Model>;
}
