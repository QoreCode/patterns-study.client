import Vue from 'vue';
import Component from 'vue-class-component';
import DefaultLayoutComponent from '@/application/layouts/default-layout/default-layout.component.vue';

@Component({})
export default class ApplicationComponent extends Vue {
  public get layout(): string {
    return this.$route.meta.layout || DefaultLayoutComponent;
  }
}
