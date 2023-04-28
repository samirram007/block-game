<script setup>
import BlockComponent from "./BlockComponent.vue";
</script>
<template>
  <div class="game-column" @click="addCurrentValuetoOne">
    <!-- {{ firstColumnArray[1] }} -->
    <BlockComponent
      v-for="(data, index) in firstColumnArray"
      :key="index"
      :box-value="data.num"
      :color-value="data.clr"
      :class="data.class"
      :style="{ backgroundColor: data.clr }"
    ></BlockComponent>
  </div>
</template>

<style scoped>
.game-column {
  width: 350px;
  height: 490px;
  background-color: #000;
  color: #fff;
  text-align: center;
  line-height: 100px;
}
</style>
