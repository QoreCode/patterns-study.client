import {Collection} from '@/buisness/core/collection';
import {IPatternCategoryModel, PatternCategoryModel} from '@/buisness/entities/pattern-category/pattern-category-model';

export class PatternCategoryCollection extends Collection<PatternCategoryModel> {
    protected createModel(data: IPatternCategoryModel): PatternCategoryModel {
        return new PatternCategoryModel(data);
    }
}
