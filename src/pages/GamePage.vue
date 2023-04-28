<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useGameStore } from 'src/stores/game'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'


import GameColumn from "../components/GameBlock/GameColumn.vue";
import ScoreHeader from "../components/GameBlock/ScoreHeader.vue";
import BlockComponent from "../components/GameBlock/BlockComponent.vue";
import { storeToRefs } from 'pinia'

const gameStore = useGameStore();
const { firstColumnArray, secondColumnArray, thirdColumnArray, fourthColumnArray, 
  fifthColumnArray,CurrentBlockArray,score } = storeToRefs(gameStore);
const gameBodyArray = reactive([]);
//const CurrentBlockArray = ref([]);
// console.log(firstColumnArray)
// const updateScore = async (param) => {
//   gameStore.updateScore([param])
// }
 
// gameStore.updatedScore(Score);
let BlockLoading = false;
let swap = false;
let x = 0;
 
let timeOut = 0;
const addCurrentValuetoColumn = (columnArray, senderIndex) => {
  if (columnArray.length <= 7 && BlockLoading === false) {
    //BlockLoading = true;
    let toPerformAction = true;
    if (columnArray.length === 7) {
      if (columnArray[6].num !== CurrentBlockArray.value[0].num) {
        toPerformAction = false;
        console.log("Column Full.. Game Over!");
      }
    }
    if (toPerformAction === true && BlockLoading === false) {
      BlockLoading = true;
      columnArray.push(CurrentBlockArray.value[0]);
      CurrentBlockArray.value.shift(CurrentBlockArray.value[0]);

      //console.log(senderIndex);
      swap = 0;

      let loopCount = 0;

      checkForMerging(columnArray, senderIndex);
      gameStore.newCurrentBlock();
    }
  } else {
    console.log("loading");
  }
};
const GenerateCurrentBlockQueue = () => {
  
      for (let i = 0; i < 2-CurrentBlockArray.value.length; i++) {
        gameStore.newCurrentBlock();
      }
    };

const checkForMerging = (columnArray, senderIndex) => {
  let arrLength = 0;
  arrLength = columnArray.length;
  // console.log(arrLength);
  let swappingChances = false;
  let leftArray = ref([]);
  let senderArray = columnArray;
  let rightArray = ref([]);
  // columnArray[arrLength - 1].class = "begin";
  
  if (senderIndex === 0) {
    rightArray.value = secondColumnArray.value;
  } else if (senderIndex === 1) {
    leftArray.value = firstColumnArray.value;
    rightArray.value = thirdColumnArray.value;
  } else if (senderIndex === 2) {
    leftArray.value = secondColumnArray.value;
    rightArray.value = fourthColumnArray.value;
  } else if (senderIndex === 3) {
    //console.log(senderIndex)
    leftArray.value = thirdColumnArray.value;
    rightArray.value = fifthColumnArray.value;
  } else if (senderIndex === 4) {
    leftArray.value = fourthColumnArray.value;
  }
  //  console.log(leftArray.value.length+ " : " + arrLength);
  // console.log(leftArray.value);
  if (leftArray.value.length >= arrLength) {
     console.log("take left");
    if (columnArray[arrLength - 1].num === leftArray.value[arrLength - 1].num) {
      leftArray.value[arrLength - 1].class = "toright";
      swappingChances = true;
    }
  }
  //console.log(rightArray.value.length+ " : " + arrLength);
  if (rightArray.value.length >= arrLength) {
    if (columnArray[arrLength - 1].num === rightArray.value[arrLength - 1].num) {
      console.log("take right");
      rightArray.value[arrLength - 1].class = "toleft";
      swappingChances = true;
    }
  }
 // if(arrLength>=1){return;}
//return;
  if (arrLength > 1) {
    if (columnArray[arrLength - 2].num === columnArray[arrLength - 1].num) {
      columnArray[arrLength - 2].class = "todown";
      BlockLoading = true;
      swappingChances = true; 
    } else {
      BlockLoading = false;
      swap = 1;
    }
  } else {
    BlockLoading = false;
    swap = 1;
  }
//  
 
  if (swappingChances === true) {
   // console.log(swappingChances);
    //return
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

  let leftArray = ref([]);
  let senderArray = columnArray;
  let rightArray = ref([]);
  let theValue = columnArray[arrLength - 1].num;
  let countValue = 0;
  if (senderIndex === 0) {
    rightArray.value = secondColumnArray.value;
  } else if (senderIndex === 1) {
    leftArray.value = firstColumnArray.value;
    rightArray.value = thirdColumnArray.value;
  } else if (senderIndex === 2) {
    leftArray.value = secondColumnArray.value;
    rightArray.value = fourthColumnArray.value;
  } else if (senderIndex === 3) {
    leftArray.value = thirdColumnArray.value;
    rightArray.value = fifthColumnArray.value;
  } else if (senderIndex === 4) {
    leftArray.value = fourthColumnArray.value;
  }

  if (leftArray.value.length >= arrLength) {
    if (columnArray[arrLength - 1].num === leftArray.value[arrLength - 1].num) {
     // console.log(leftArray.value.length + " LeftArray : thisArray " + arrLength);
      if (arrLength - 1 > -1) {
        leftArray.value.splice(arrLength - 1, 1);
      }
      countValue = countValue + 1;
    }
  }

  if (rightArray.value.length >= arrLength) {
    if (columnArray[arrLength - 1].num === rightArray.value[arrLength - 1].num) {
      if (arrLength - 1 > -1) {
        rightArray.value.splice(arrLength - 1, 1);
      }
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

  }
  
  switch (countValue) {
    case 1:
      let thisScore=theValue * 2;
      score.value = score.value + thisScore;
      columnArray[columnArray.length - 1].num = thisScore.toString();
      //console.log("Color Called 2 : "+ gameStore.randomColor(thisScore))
      columnArray[columnArray.length - 1].clr = gameStore.randomColor(theValue * 2).toString();
      columnArray[columnArray.length - 1].nval = gameStore.numberValue(theValue * 2).toString();
     // console.log( columnArray[columnArray.length - 1])
      break;
    case 2:
      score.value = score.value + theValue * 4;
      columnArray[columnArray.length - 1].num = (theValue * 4).toString();
     // console.log("Color Called 4 : "+ gameStore.randomColor(theValue * 4))
      columnArray[columnArray.length - 1].clr = gameStore.randomColor(theValue * 4).toString();
      columnArray[columnArray.length - 1].nval = gameStore.numberValue(theValue * 4).toString();
      break;
    case 3:
      score.value = score.value + (theValue * 8);
      columnArray[columnArray.length - 1].num = (theValue * 8).toString();
      console.log("Color Called 8 : "+ gameStore.randomColor(theValue * 8))
      columnArray[columnArray.length - 1].clr = gameStore.randomColor(theValue * 8).toString();
      columnArray[columnArray.length - 1].nval = gameStore.numberValue(theValue * 8).toString();
      break;
  }

  removeAllTodownClass();
  // sleep(100);
  //gameStore.updateScore(score.value)
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
  firstColumnArray.value.forEach((element) => {
    console.log(element.class);
    if (arr.includes(element.class)) {
      element.class = "collector";
    }
  });
  secondColumnArray.value.forEach((element) => {
    console.log(element.class);
    if (arr.includes(element.class)) {
      element.class = "collector";
    }
  });
  thirdColumnArray.value.forEach((element) => {
    console.log(element.class);
    if (arr.includes(element.class)) {
      element.class = "collector";
    }
  });
  fourthColumnArray.value.forEach((element) => {
    console.log(element.class);
    if (arr.includes(element.class)) {
      element.class = "collector";
    }
  });
  fifthColumnArray.value.forEach((element) => {
    console.log(element.class);
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


onMounted(GenerateCurrentBlockQueue);
</script>
<template>
  <q-page class="flex flex-start items-center column">
    <ScoreHeader />
     

    <div class="game-body">
      <!-- <GameColumn /> -->
      <div class="game-column" @click="addCurrentValuetoColumn(firstColumnArray, 0)">
        <!-- {{ firstColumnArray[1] }} -->
        <BlockComponent v-for="(data, index) in firstColumnArray" :key="index" :box-value="data.nval"
          :color-value="data.clr" :class="data.class" :style="{ backgroundColor: data.clr }"></BlockComponent>
      </div>
      <div class="game-column" @click="addCurrentValuetoColumn(secondColumnArray, 1)">
        <BlockComponent v-for="(data, index) in secondColumnArray" :key="index" :box-value="data.nval"
          :color-value="data.clr" :class="data.class" :style="{ backgroundColor: data.clr }"></BlockComponent>
      </div>
      <div class="game-column" @click="addCurrentValuetoColumn(thirdColumnArray, 2)">
        <BlockComponent v-for="(data, index) in thirdColumnArray" :key="index" :box-value="data.nval"
          :color-value="data.clr" :class="data.class" :style="{ backgroundColor: data.clr }"></BlockComponent>
      </div>
      <div class="game-column" @click="addCurrentValuetoColumn(fourthColumnArray, 3)">
        <BlockComponent v-for="(data, index) in fourthColumnArray" :key="index" :box-value="data.nval"
          :color-value="data.clr" :class="data.class" :style="{ backgroundColor: data.clr }"></BlockComponent>
      </div>
      <div class="game-column" @click="addCurrentValuetoColumn(fifthColumnArray, 4)">
        <BlockComponent v-for="(data, index) in fifthColumnArray" :key="index" :box-value="data.nval"
          :color-value="data.clr" :class="data.class" :style="{ backgroundColor: data.clr }"></BlockComponent>
      </div>
    </div>
    <transition appear>
      <div class="current-values">
        <BlockComponent v-for="(data, index) in CurrentBlockArray " :key="index" :box-value="data.nval"
          :color-value="data.clr" :class="data.class" :style="{ backgroundColor: data.clr }"></BlockComponent>
      </div>
    </transition>
  </q-page>
</template>
<style scoped type="scss">
.game-body {
  width: 350px;
  height: 495px;
  background:rgba(0, 0, 0, 1);
  border: 3px solid rgba(0, 0, 0, 1);
  display: flex;

  flex-flow: col nowrap;
  box-sizing: border-box;
}

.current-values {
  width: 140px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-left:75px;
  
}

.current-values .normal:nth-child(1) {
  width: 65px;
  height: 65px;
  margin:5px auto;
  outline:5px solid #000;
  align-items:middle;
  justify-content:center;
  animation: grow1 1s linear 1;
}

.current-values .normal:nth-child(2) {
  width: 45px;
  height: 45px;
  animation: grow2 500 ease-in-out;
}

.current-values .normal:nth-child(3) {
  width: 44px;
  height: 44px;
  animation: grow3 500 ease-in-out 3;
}

@keyframes grow1 {
  0% {
    width: 55px;
    height: 55px;
  }

  100% {
    width: 65px;
    height: 65px;
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
  background:rgba(100,100,100,0.3);
  color: #fff;
  text-align: center;
  line-height: 100px;
  border: 3px solid rgba(0, 0, 0, 1);
  box-sizing: border-box;
  overflow: hidden;
}
</style>

