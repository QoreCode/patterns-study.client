import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class ApplicationComponent extends Vue {
  mounted() {
    console.log("hello frosm app");
  }
}
