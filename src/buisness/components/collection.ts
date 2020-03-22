import * as _ from 'lodash';

export abstract class Collection<Model> {
  protected entities: Model[] = [];

  public setEntity(entity: Record<string, Model>): void {
    this.entities.push(this.createModel(entity));
  }

  public setEntities(entities: Array<Record<string, Model>>): void {
    this.entities = _.map(entities, (entity: Record<string, Model>) => {
      return this.createModel(entity);
    });
  }

  public isEmpty() {
    return !this.entities.length;
  }

  public getEntities(): Model[] {
    return this.entities;
  }

  protected abstract createModel(data: Record<string, Model>): Model;
}
