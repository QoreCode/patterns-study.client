import * as _ from 'lodash';

export enum ORDER_TYPES {
  DESC = 'desc',
  ASC = 'asc',
}

export interface RequestCriteriaInterface {
  perPage?: number;
  expand?: string[];
  page?: number;
  condition?: { [fieldName: string]: Array<number | string | boolean> | null };
  mixins?: string[];
  order?:
    | {
        field: string;
        type: ORDER_TYPES;
      }
    | 'random';
  groupBy?: string[];
}

export class RequestCriteria implements RequestCriteriaInterface {
  public perPage?: number;
  public page?: number;
  public expand?: string[];
  public condition?: { [fieldName: string]: Array<number | string | boolean> };
  public mixins?: [];
  public order?:
    | {
        field: string;
        type: ORDER_TYPES;
      }
    | 'random';
  public groupBy?: string[];

  constructor(data: RequestCriteriaInterface) {
    _.each(data, (value: any, field: string) => {
      this.setProp(field, value);
    });
  }

  public setProp(name: string, value: any) {
    if (_.isUndefined(value)) {
      return;
    }

    _.set(this, name, value);
  }

  public getProps() {
    const props = {};

    if (!_.isUndefined(this.expand)) {
      _.set(props, 'expand', this.expand.join(','));
    }

    if (!_.isUndefined(this.page)) {
      _.set(props, 'page', this.page);
    }

    if (!_.isUndefined(this.mixins)) {
      _.set(props, 'mixins', this.mixins.join(','));
    }

    if (!_.isUndefined(this.groupBy)) {
      _.set(props, 'groupBy', this.groupBy.join(','));
    }

    if (!_.isUndefined(this.perPage)) {
      _.set(props, 'per-page', this.perPage);
    }

    if (!_.isUndefined(this.order)) {
      let value = '';

      if (this.order === 'random') {
        value = this.order;
      } else {
        const sign = this.order.type === ORDER_TYPES.ASC ? '' : '-';
        value = sign + this.order.field;
      }

      _.set(props, 'sort', value);
    }

    if (this.condition && Object.keys(this.condition).length) {
      const condition = {};

      _.each(
        this.condition,
        (value: Array<string | number | boolean>, field: string) => {
          _.set(condition, field, value);
        },
      );

      _.set(props, 'filter', condition);
    }

    return props;
  }
}
