import Vue from 'vue';
import Component from 'vue-class-component';
import {PatternCategoryMapper} from '@/buisness/entities/pattern-category/pattern-category-mapper';

@Component({})
export default class HomePageComponent extends Vue {

    public async mounted() {
        const mapper = new PatternCategoryMapper();
        const data = await mapper.getAll();

        console.log(data);
    }

}

