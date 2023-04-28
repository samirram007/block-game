<script setup>
import { useGameStore } from "stores/game";
const gameStore = useGameStore();
// console.log(gameStore.score);
</script>

<template>
  <q-tabs dense class="header-bg" active-color="primary" indicator-color="warning" align="justify" narrow-indicator>
    <q-tab label="" icon="home" class="home-tab" /> 
    <q-tab label="" style="width:160px;  ">Score: {{ gameStore.score }}</q-tab>
     <q-tab label="RESET" @click="gameStore.resetStore" />
  </q-tabs>
</template>

<style scoped>
.header-bg{
  background-color:#222;
  width:100%;
  color:#ddd;
  flex:1 2 1;
}
.home-tab{
  text-align:left;
  padding:0;
}
.block {
  width: 70px;
  height: 70px;
  background-color: #c98585c7;
  color: #fff;
  text-align: center;
}
</style>
