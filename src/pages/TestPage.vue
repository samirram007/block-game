<template>
  <q-page>
    Score : {{ gameStore.score }}
    <q-btn @click="gameStore.updateScore(10)">UpdateScore</q-btn>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useGameStore } from 'src/stores/game'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
const gameStore = useGameStore()
</script>
