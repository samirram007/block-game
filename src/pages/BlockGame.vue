<script setup>
import HeaderLink from "../components/HeaderLink.vue";
import GameColumn from "../components/GameBlock/GameColumn.vue";
import ScoreHeader from "../components/GameBlock/ScoreHeader.vue";
import BlockComponent from "../components/GameBlock/BlockComponent.vue";
import { ref, reactive, onMounted } from "vue";
import useGameStore from "../stores/game";

import { useAuthStore } from "../stores/auth";
const gameStore = useGameStore();
const authStore = useAuthStore();

const gameBodyArray = reactive([]);
const firstColumnArray = reactive([]);
const secondColumnArray = reactive([]);
const thirdColumnArray = reactive([]);
const fourthColumnArray = reactive([]);
const fifthColumnArray = reactive([]);
const CurrentBlockArray = reactive([]);
let Score = ref(0);
// gameStore.updatedScore(Score);
let BlockLoading = false;
let swap = false;
let x = 0;
// let gameNumber = ["2", "4", "8", "16", "32", "64", "128", "256"];
let gameNumber = ["2", "4", "8", "16"];
// let gameNumber = ["2"];
//console.log(firstColumnArray);
const GenerateCurrentBlockQueue = () => {
  for (let i = 0; i < 2; i++) {
    newCurrentBlock();
  }
};
let timeOut = 0;
const addCurrentValuetoColumn = (columnArray, senderIndex) => {
  if (columnArray.length <= 7 && BlockLoading === false) {
    //BlockLoading = true;
    let toPerformAction = true;
    if (columnArray.length === 7) {
      if (columnArray[6].num !== CurrentBlockArray[0].num) {
        toPerformAction = false;
        console.log("Column Full.. Game Over!");
      }
    }
    if (toPerformAction === true && BlockLoading === false) {
      BlockLoading = true;
      columnArray.push(CurrentBlockArray[0]);
      CurrentBlockArray.shift(CurrentBlockArray[0]);

      //console.log(senderIndex);
      swap = 0;

      let loopCount = 0;

      checkForMerging(columnArray, senderIndex);
      newCurrentBlock();
    }
  } else {
    console.log("loading");
  }
};
const newCurrentBlock = () => {
  CurrentBlockArray.push({
    num: randomNumber(),
    clr: randomColor(),
    class: "normal"
  });
};

const checkForMerging = (columnArray, senderIndex) => {
  let arrLength = 0;
  arrLength = columnArray.length;
  //console.log("Inside CheckMarging");
  let swappingChances = false;
  let leftArray = reactive([]);
  let senderArray = columnArray;
  let rightArray = reactive([]);
  // columnArray[arrLength - 1].class = "begin";
  if (senderIndex === 0) {
    rightArray = secondColumnArray;
  } else if (senderIndex === 1) {
    leftArray = firstColumnArray;
    rightArray = thirdColumnArray;
  } else if (senderIndex === 2) {
    leftArray = secondColumnArray;
    rightArray = fourthColumnArray;
  } else if (senderIndex === 3) {
    leftArray = thirdColumnArray;
    rightArray = fifthColumnArray;
  } else if (senderIndex === 4) {
    leftArray = fourthColumnArray;
  }
  console.log(leftArray.length + " : " + arrLength);
  if (leftArray.length >= arrLength) {
    //console.log("take left");
    if (columnArray[arrLength - 1].num === leftArray[arrLength - 1].num) {
      leftArray[arrLength - 1].class = "toright";
      swappingChances = true;
    }
  }
  if (rightArray.length >= arrLength) {
    if (columnArray[arrLength - 1].num === rightArray[arrLength - 1].num) {
      //console.log("take right");
      rightArray[arrLength - 1].class = "toleft";
      swappingChances = true;
    }
  }

  if (arrLength > 1) {
    if (columnArray[arrLength - 2].num === columnArray[arrLength - 1].num) {
      columnArray[arrLength - 2].class = "todown";
      BlockLoading = true;
      swappingChances = true;
      // setTimeout(() => {
      //   swapingValue(columnArray, senderIndex);
      // }, 1000);
      //sleep(1000);
      //
    } else {
      BlockLoading = false;
      swap = 1;
    }
  } else {
    BlockLoading = false;
    swap = 1;
  }
  //console.log(swappingChances);
  if (swappingChances === true) {
    BlockLoading = true;
    setTimeout(() => {
      swapingValue(columnArray, senderIndex);
    }, 500);
  } else {
    BlockLoading = false;
    swap = 1;
  }
};

const swapingValue = (columnArray, senderIndex) => {
  //console.log("swap called inside");
  let arrLength = columnArray.length;
  let leftArray = reactive([]);
  let senderArray = columnArray;
  let rightArray = reactive([]);
  let theValue = columnArray[arrLength - 1].num;
  let countValue = 0;
  if (senderIndex === 0) {
    rightArray = secondColumnArray;
  } else if (senderIndex === 1) {
    leftArray = firstColumnArray;
    rightArray = thirdColumnArray;
  } else if (senderIndex === 2) {
    leftArray = secondColumnArray;
    rightArray = fourthColumnArray;
  } else if (senderIndex === 3) {
    leftArray = thirdColumnArray;
    rightArray = fifthColumnArray;
  } else if (senderIndex === 4) {
    leftArray = fourthColumnArray;
  }

  if (leftArray.length >= arrLength) {
    if (columnArray[arrLength - 1].num === leftArray[arrLength - 1].num) {
      console.log(leftArray.length + " LeftArray : thisArray " + arrLength);
      // leftArray.pop(arrLength - 1);
      //removeItem(leftArray, arrLength - 1);
      // console.log(...leftArray);
      if (arrLength - 1 > -1) {
        leftArray.splice(arrLength - 1, 1);
      }
      // console.log("---------------------");
      countValue = countValue + 1;
      // console.log(countValue);
      // console.log("---------------------");
    }
  }

  if (rightArray.length >= arrLength) {
    if (columnArray[arrLength - 1].num === rightArray[arrLength - 1].num) {
      // rightArray.pop(arrLength - 1);
      if (arrLength - 1 > -1) {
        rightArray.splice(arrLength - 1, 1);
      }
      // console.log(...rightArray);
      countValue = countValue + 1;
    }
  }

  if (arrLength > 1) {
    // columnArray[arrLength - 2].num = (
    //   parseInt(columnArray[arrLength - 2].num) +
    //   parseInt(columnArray[arrLength - 1].num)
    // ).toString();
    if (columnArray[arrLength - 2].num === columnArray[arrLength - 1].num) {
      if (arrLength - 2 > -1) {
        columnArray.splice(arrLength - 2, 1);
      }
      countValue = countValue + 1;
    }
    //columnArray[arrLength - 2].clr = randomColor();
  }
  console.log(countValue + ":" + theValue + " Count Value");
  switch (countValue) {
    case 1:
      Score.value = Score.value + theValue * 2;
      columnArray[columnArray.length - 1].num = (theValue * 2).toString();
      break;
    case 2:
      Score.value = Score.value + theValue * 4;
      columnArray[columnArray.length - 1].num = (theValue * 4).toString();
      break;
    case 3:
      Score.value = Score.value + theValue * 8;
      columnArray[columnArray.length - 1].num = (theValue * 8).toString();
      break;
  }

  removeAllTodownClass();
  sleep(100);
  checkForMerging(columnArray, senderIndex);
  swap = 0;
  BlockLoading = false;
  //console.log("end of swap value: " + swap);
};
const removeItem = (arr, index) => {
  // var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  //return arr;
};
const removeAllTodownClass = () => {
  const arr = ["collector", "todown", "toleft", "toright", "begin"];
  firstColumnArray.forEach((element) => {
    if (arr.includes(element.class)) {
      element.class = "normal";
    }
  });
  secondColumnArray.forEach((element) => {
    if (arr.includes(element.class)) {
      element.class = "normal";
    }
  });
  thirdColumnArray.forEach((element) => {
    if (arr.includes(element.class)) {
      element.class = "normal";
    }
  });
  fourthColumnArray.forEach((element) => {
    if (arr.includes(element.class)) {
      element.class = "normal";
    }
  });
  fifthColumnArray.forEach((element) => {
    if (arr.includes(element.class)) {
      element.class = "normal";
    }
  });
};
const sleep = (milliseconds) => {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
};
// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }
const randomNumber = () => {
  let random = gameNumber[Math.floor(Math.random() * gameNumber.length)];
  //console.log(random);
  return random;
};
const randomColor = () => {
  let letters = "BCDEF".split("");
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)];
  }
  return color;
};

onMounted(GenerateCurrentBlockQueue);
</script>
<template>
  <HeaderLink />
  <q-page class="flex flex-start items-center column">
    <ScoreHeader :updated-score="Score" />
    Score {{ Score }}
    <div class="game-body">
      <!-- <GameColumn /> -->
      <div
        class="game-column"
        @click="addCurrentValuetoColumn(firstColumnArray, 0)"
      >
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
      <div
        class="game-column"
        @click="addCurrentValuetoColumn(secondColumnArray, 1)"
      >
        <BlockComponent
          v-for="(data, index) in secondColumnArray"
          :key="index"
          :box-value="data.num"
          :color-value="data.clr"
          :class="data.class"
          :style="{ backgroundColor: data.clr }"
        ></BlockComponent>
      </div>
      <div
        class="game-column"
        @click="addCurrentValuetoColumn(thirdColumnArray, 2)"
      >
        <BlockComponent
          v-for="(data, index) in thirdColumnArray"
          :key="index"
          :box-value="data.num"
          :color-value="data.clr"
          :class="data.class"
          :style="{ backgroundColor: data.clr }"
        ></BlockComponent>
      </div>
      <div
        class="game-column"
        @click="addCurrentValuetoColumn(fourthColumnArray, 3)"
      >
        <BlockComponent
          v-for="(data, index) in fourthColumnArray"
          :key="index"
          :box-value="data.num"
          :color-value="data.clr"
          :class="data.class"
          :style="{ backgroundColor: data.clr }"
        ></BlockComponent>
      </div>
      <div
        class="game-column"
        @click="addCurrentValuetoColumn(fifthColumnArray, 4)"
      >
        <BlockComponent
          v-for="(data, index) in fifthColumnArray"
          :key="index"
          :box-value="data.num"
          :color-value="data.clr"
          :class="data.class"
          :style="{ backgroundColor: data.clr }"
        ></BlockComponent>
      </div>
    </div>
    <transition appear>
      <div class="current-values">
        <BlockComponent
          v-for="(data, index) in CurrentBlockArray"
          :key="index"
          :box-value="data.num"
          :color-value="data.clr"
          :class="data.class"
          :style="{ backgroundColor: data.clr }"
        ></BlockComponent>
      </div>
    </transition>
  </q-page>
</template>

<style scoped type="scss">
.game-body {
  width: 350px;
  height: 490px;
  border: 2px solid rgba(9, 122, 197, 1);
  display: flex;

  flex-flow: col nowrap;
  box-sizing: border-box;
}
.current-values {
  width: 350px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-right: 77px;
}
.current-values .normal:nth-child(1) {
  width: 66px;
  height: 66px;
  animation: grow1 500 ease-in-out;
}

.current-values .normal:nth-child(2) {
  width: 55px;
  height: 55px;
  animation: grow2 500 ease-in-out;
}
.current-values .normal:nth-child(3) {
  width: 44px;
  height: 44px;
  animation: grow3 500 ease-in-out;
}
@keyframes grow1 {
  0% {
    width: 55px;
    height: 55px;
  }
  100% {
    width: 66px;
    height: 66px;
  }
}
@keyframes grow2 {
  0% {
    width: 45px;
    height: 45px;
  }
  100% {
    width: 55px;
    height: 55px;
  }
}
@keyframes grow3 {
  0% {
    width: 33px;
    height: 33px;
  }
  100% {
    width: 44px;
    height: 44px;
  }
}
.game-column {
  width: 70px;
  height: 490px;
  background-color: #221e1e;
  color: #fff;
  text-align: center;
  line-height: 100px;
  border: 2px solid rgba(9, 122, 197, 1);
  box-sizing: border-box;
  overflow: hidden;
}
</style>
