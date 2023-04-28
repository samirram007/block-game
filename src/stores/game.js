import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const useGameStore = defineStore(
  "game",
  () => {
    const score = ref(0);
    const firstColumnArray = ref([]);
    const secondColumnArray = ref([]);
    const thirdColumnArray = ref([]);
    const fourthColumnArray = ref([]);
    const fifthColumnArray = ref([]);
    const CurrentBlockArray = ref([]);
    // let gameNumber = ["2"];
    let numberColor={
      'collections':[
      {"number":2,"nvalue":"2","color":"#FF6328"},
      {"number":4,"nvalue":"4","color":"#6BAF42"},
      {"number":8,"nvalue":"8","color":"#9558E1"},
      {"number":16,"nvalue":"16","color":"#FA6B97"},
      {"number":32,"nvalue":"32","color":"#FCB446"},
      {"number":64,"nvalue":"64","color":"#C93660"},
      {"number":128,"nvalue":"128","color":"#FF6328"},
      {"number":256,"nvalue":"256","color":"#6BAF42"},
      {"number":512,"nvalue":"512","color":"#9558E1"},
      {"number":1024,"nvalue":"1K","color":"#FA6B97"},
      {"number":2048,"nvalue":"2K","color":"#FCB446"},
      {"number":4096,"nvalue":"4K","color":"#C93660"},
      {"number":8192,"nvalue":"8K","color":"#FF6328"},
      {"number":16384,"nvalue":"16K","color":"#6BAF42"},
      {"number":32768,"nvalue":"32K","color":"#9558E1"},
      {"number":65536,"nvalue":"65K","color":"#FA6B97"},
      {"number":131072,"nvalue":"131K","color":"#FCB446"},
      {"number":262144,"nvalue":"262K","color":"#C93660"},
    ]
  };
    let gameNumber = ["2", "4","8","16","32","64" ];
    const updateScore = async (newvalue) => {
     // console.log("Old Score: "+score.value+" New Score: "+newvalue);
      score.value = score.value + newvalue;
      //console.log("Updated Score: "+score.value +"----------");
    };
    const  resetStore = () => {
      
      score.value=0
      firstColumnArray.value=[]
      secondColumnArray.value=[]
      thirdColumnArray.value=[]
      fourthColumnArray.value=[]
      fifthColumnArray.value=[]
      CurrentBlockArray.value=[]
     console.log("reset call")
     GenerateCurrentBlockQueue()
    };
    const GenerateCurrentBlockQueue = () => {
      for (let i = 0; i < 2; i++) {
        newCurrentBlock();
      }
    };
    const newCurrentBlock = () => {
      let randNumber=randomNumber();
      CurrentBlockArray.value.push({
        num: randNumber,
        clr: randomColor(randNumber),
        nval:numberValue(randNumber),
        class: "normal"
      });
    };
    const randomNumber = () => {
      let random = gameNumber[Math.floor(Math.random() * gameNumber.length)];
      //console.log(random);
      return random;
    };
    const randomColor =   (randNumber) => { 
       let thisumberColor=numberColor.collections.filter(
        (el)=>{
           //  console.log( el.number)
            //console.log(el.nummber ==randNumber?'haa':'naa')
            if(el.number==randNumber){
              return el;
            }
            else{
              return   
            }
            
       });
      //  console.log(thisumberColor[0].color)
      return thisumberColor[0].color;
      //return color;
    };
    const numberValue =   (randNumber) => { 
      let thisumberColor=numberColor.collections.filter(
       (el)=>{
          //  console.log( el.number)
           //console.log(el.nummber ==randNumber?'haa':'naa')
           if(el.number==randNumber){
             return el;
           }
           else{
             return   
           }
           
      });
     //  console.log(thisumberColor[0].color)
     return thisumberColor[0].nvalue;
     //return color;
   };
    return {
      score,
      firstColumnArray,
      secondColumnArray,
      thirdColumnArray,
      fourthColumnArray,
      fifthColumnArray,
      CurrentBlockArray, 
      newCurrentBlock,
      updateScore,
      randomColor,
      numberValue,
       resetStore
    };
  },
  { persist: true }
);
