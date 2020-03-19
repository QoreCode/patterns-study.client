import { Model } from "@/buisness/components/model";
import * as _ from "lodash";

export abstract class Collection {
  protected entities: Array<Model> = [];

  protected abstract createModel(data: Record<string, any>): Model;

  setEntity(entity: Record<string, any>): void {
    this.entities.push(this.createModel(entity));
  }

  setEntities(entities: Array<Record<string, any>>): void {
    this.entities = _.map(entities, (entity: Record<string, any>) => {
      return this.createModel(entity);
    });
  }

  isEmpty() {
    return !this.entities.length;
  }

  getEntities(): Array<Model> {
    return this.entities;
  }
}
