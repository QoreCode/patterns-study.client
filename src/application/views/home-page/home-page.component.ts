import Vue from 'vue';
import Component from 'vue-class-component';
import {UserMapper} from '@/buisness/entities/user/user-mapper';

@Component({})
export default class HomePageComponent extends Vue {

    public async mounted() {
        const mapper = new UserMapper();
        const data = await mapper.getAll();

        console.log(data);
    }

}

