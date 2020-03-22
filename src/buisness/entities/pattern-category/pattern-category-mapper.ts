import {Mapper} from '@/buisness/components/mapper';
import {IPatternCategoryModel, PatternCategoryModel} from '@/buisness/entities/pattern-category/pattern-category-model';
import {Collection} from '@/buisness/components/collection';
import {PatternCategoryCollection} from '@/buisness/entities/pattern-category/pattern-category-collection';

export class PatternCategoryMapper extends Mapper<PatternCategoryModel> {
    protected entity: string = 'pattern_categories';

    protected createCollection(data: IPatternCategoryModel[]): Collection<PatternCategoryModel> {
        const collection = new PatternCategoryCollection();
        collection.setEntities(data);

        return collection;
    }

    protected createModel(data: IPatternCategoryModel): PatternCategoryModel {
        return new PatternCategoryModel(data);
    }
}
