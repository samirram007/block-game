<template>
  <div class="q-pa-md">
    <!-- <div class="q-gutter-y-md" style="max-width: 400px"> -->
    <q-tabs>
      <q-route-tab v-if="authStore.user" to="/" label="Home" />
      <q-tab v-if="authStore.user" label="|" />
      <q-route-tab v-if="authStore.user" to="/about" label="About" />
      <q-tab v-if="authStore.user" label="|" />
      <q-route-tab v-if="authStore.user" to="/blockgame" label="Block Game" />
      <q-tab v-if="authStore.user" label="|" />
      <q-route-tab
        v-if="authStore.user"
        to="/gstcalculator"
        label="GST Calculator"
      />
      <q-tab v-if="authStore.user" label="|" />
      <!-- <q-route-tab v-if="!authStore.user" to="/login" label="Login" /> -->
      <q-route-tab v-if="authStore.user" label="Logout" @click="logout" />
    </q-tabs>
  </div>
  <!-- </div> -->
</template>
<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "src/stores/auth";
// import { useResetStore } from 'src/stores/resetStore';
const authStore = useAuthStore();
// const resetStore = useResetStore();
const router = useRouter();
const logout = async () => {
  localStorage.clear();
  if (authStore.authUser !== null) {
    await router.push("/");
    window.location.reload();
  }
  //router.push('/')
};
</script>
