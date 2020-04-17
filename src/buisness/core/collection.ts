import * as _ from 'lodash';
import {IPatternCategoryModel} from '@/buisness/entities/pattern-category/pattern-category-model';

export abstract class Collection<Model> {
    protected entities: Model[] = [];

    public setEntity(entity: IPatternCategoryModel): void {
        this.entities.push(this.createModel(entity));
    }

    public setEntities(entities: any[]): void {
        this.entities = _.map(entities, (entity: any) => this.createModel(entity));
    }

    public isEmpty() {
        return !this.entities.length;
    }

    public getEntities(): Model[] {
        return this.entities;
    }

    protected abstract createModel(data: any): Model;
}
