import {Model} from '@/buisness/core/model';

export interface IPatternCategoryModel {
    name: string;
    description: string;
}

export class PatternCategoryModel extends Model implements IPatternCategoryModel {
    public description: string;
    public name: string;

    constructor(data: IPatternCategoryModel) {
        super();

        this.name = data.name;
        this.description = data.description;
    }
}
