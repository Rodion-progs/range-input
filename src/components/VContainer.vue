<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "VContainer.vue",
}
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
* {
  box-sizing: border-box;
}
.container {
  width: 100%;
  max-width: 1500px;
  padding: 0 15px;
  margin: 0 auto;
}
</style>
