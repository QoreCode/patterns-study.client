import Request from "@/buisness/tools/request";
import { Model } from "@/buisness/components/model";
import { RequestCriteria } from "@/buisness/tools/request-criteria";
import { Collection } from "@/buisness/components/collection";

/**
 * Crud for entities
 */
export abstract class Mapper {
  protected abstract action: string;

  protected abstract createModel(data: Record<string, any>): Model;

  protected abstract createCollection(
    data: Array<Record<string, any>>
  ): Collection;

  public getAll(criteria?: RequestCriteria): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const props = criteria ? criteria.getProps() : {};

      Request.get(this.action, props).then(
        (data: Array<Record<string, any>>) => {
          resolve(this.createCollection(data));
        },
        reject
      );
    });
  }

  public create(payload: object = {}): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      Request.post(this.action, payload).then((data: Record<string, any>) => {
        resolve(this.createModel(data));
      }, reject);
    });
  }

  public update(id: number, payload: object): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      Request.put(`${this.action}/${id}`, payload).then(
        (data: Record<string, any>) => {
          resolve(this.createModel(data));
        },
        reject
      );
    });
  }

  public deleteById(id: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      Request.delete(`${this.action}/${id}`).then(resolve, reject);
    });
  }

  public deleteByAttributes(criteria: RequestCriteria): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      Request.delete(this.action, criteria.getProps()).then(resolve, reject);
    });
  }

  public findById(id: number, criteria?: RequestCriteria): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const props = criteria ? criteria.getProps() : {};

      Request.get(`${this.action}/${id}`, props).then(
        (data: Record<string, any>) => {
          try {
            resolve(this.createModel(data));
          } catch (e) {
            reject();
          }
        },
        reject
      );
    });
  }

  public findByAttributes(criteria: RequestCriteria): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      Request.get(this.action, criteria.getProps()).then(
        (data: Array<Record<string, any>>) => {
          resolve(this.createCollection(data));
        },
        reject
      );
    });
  }
}
