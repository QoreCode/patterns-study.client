import {Collection} from '@/buisness/components/collection';
import {IPatternCategoryModel, PatternCategoryModel} from '@/buisness/entities/pattern-category/pattern-category-model';

export class PatternCategoryCollection extends Collection<PatternCategoryModel> {
    protected createModel(data: IPatternCategoryModel): PatternCategoryModel {
        return new PatternCategoryModel(data);
    }
}
