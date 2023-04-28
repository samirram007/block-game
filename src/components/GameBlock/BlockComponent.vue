<script setup>
import { onMounted, ref } from "vue";
const props = defineProps(
  {
    boxValue: {
      type: String,
      default: "[]"
    }
  },
  {
    colorValue: {
      type: String,
      default: "#55777dc7"
    }
  }
);
const el = ref();

onMounted(() => {
  el.value = "begin";
});
</script>
<template>
  <transition appear name="fade">
    <div :class="el" class="blockBox">
      {{ props.boxValue }}
    </div>
  </transition>
</template>

<style scoped>
.blockBox {
  width: 62px;
  height: 62px;
  margin: 5px auto;
  /* background-color: #f57d7dc7; */
  box-shadow: 0 0 20px 5px #000;
  border-radius: 50px;
  color: #221e1e;
  text-align: center;
  border: 7px inset #fefbfb95;
  /* box-sizing: border-box; */
  display: flex !important;
  gap: 5px;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  font-weight: bold;
  color: #fff;
  user-select: none;
  /* animation: start 0.3s ease-in 1; */
}

@keyframes start {
  0% {
    height: 700px;
    opacity: 0;
  }

  100% {
    height: 70px;
    opacity: 1;
  }
}

/* .v-enter-active {
  transition: opacity 0.1s ease-out;
  height: 700px;
}
.v-leave-active {
  transition: opacity 0.1s ease-out;
  height: 66px;
}

.v-enter-from {
  opacity: 0;
}
.v-leave-to {
  transition: height 1s ease-out;
  opacity: 0;
  height: 1px;
} */
.normal {
  transition: all 0.5s ease-in;

  /* animation: zoomin 0.5s ease; */
}

.begin {
  /* animation: start 0.3s ease-in 1;*/
}

@keyframes zoomin {
  0% {
    transform: scale(1.5);
  }

  100% {
    transform: scale(1);
  }
}

.toup {
  display: none;
  animation: up 0.1s ease-out 1;
}

@keyframes up {
  20% {
    display: flex;
    height: 70px;
    opacity: 0;
    margin-bottom: 50px;
  }

  80% {
    height: 0;
    opacity: 0;
    margin-bottom: 70px;
  }
}

.todown {
  display: none;
  animation: down 0.5s ease-in-out 1;
}

@keyframes down {
  10% {
    display: flex;
    height: 66px;
    margin-top: 0;
    opacity: 1;
  }

  40% {
    display: flex;
    height: 30px;
    margin-top: 36px;
    background: #222222;
    opacity: 0.5;
  }

  80% {
    display: flex;
    height: 6px;
    margin-top: 60px;
    background: #222222;
    opacity: 0.1;
  }

  100% {
    margin-top: 66px;
    height: 0;
    opacity: 0;
  }
}

.toleft {
  display: none;
  animation: left 0.5s ease-in-out 1;
}

@keyframes left {
  10% {
    display: flex;
    width: 66px;
    margin-right: 0;
    opacity: 1;
  }

  40% {
    display: flex;
    width: 36px;
    margin-right: 30px;
    background: #222;
    opacity: 0.5;
  }

  80% {
    display: flex;
    width: 6px;
    margin-right: 60px;
    background: #222;
    opacity: 0.1;
  }

  100% {
    margin-right: 66px;
    width: 0;
    opacity: 0;
    display: none;
  }
}

.toright {
  display: none;
  animation: right 0.5s ease-in-out 1;
}

@keyframes right {
  10% {
    display: flex;
    width: 66px;
    margin-left: 0;
    opacity: 1;
  }

  40% {
    display: flex;
    width: 36px;
    margin-left: 30;
    background: #222222;
    opacity: 0.5;
  }

  80% {
    display: flex;
    width: 6px;
    margin-left: 60;
    background: #222222;
    opacity: 0.1;
  }

  100% {
    margin-left: 66px;
    width: 0;
    opacity: 0;
    display: none;
  }
}

.fade-enter-active,
.fade-leave-active {
  opacity: 0.8;
  /* transition: opacity 0.1s;*/
  animation: start 0.2s linear 1;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;

}</style>
