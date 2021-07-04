<template>
  <div id="app">
    <v-container>
      <h1 class="title">Вы выбрали промежуток времени {{ range }}</h1>
      <v-scale v-model="range" controls start="5-05-0120" end="5-05-2012"  />
    </v-container>
  </div>
</template>

<script>
import VScale from "./components/VScale.vue";
import VContainer from '@/components/VContainer';
export default {
  name: "App",
  components: {
    VScale,
    VContainer
  },
  data() {
    return {
      range: null
    }
  }
};
</script>

<style lang="scss">
.title {
  margin-bottom: 80px;
  text-align: center;
}
</style>
