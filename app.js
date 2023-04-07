// let tigerWinCount = 0;
// let bearWinCount = 0;
// let tigerPoint ;
// let bearPoint ;

const { reverse } = require("dns");
const { type } = require("os");

// function playGame() {
//   for (let i = 1; i <= 10; i++) {
//     tigerPoint = getDice(1,6);
//     bearPoint = getDice(1,6);
//     if (tigerPoint > bearPoint) {
//       tigerWinCount++;
//       console.log(
//         `第${i}局 | 虎哥${tigerPoint}點 VS 熊哥${bearPoint}點 | 本局虎哥勝`
//       );
//     } else if (bearPoint > tigerPoint) {
//       bearWinCount++;
//       console.log(
//         `第${i}局 | 虎哥${tigerPoint}點 VS 熊哥${bearPoint}點 | 本局熊哥勝`
//       );
//     } else {
//       console.log(
//         `第${i}局 | 虎哥${tigerPoint}點 VS 熊哥${bearPoint}點 | 本局平手`
//       );
//     }
//   }
//   console.log(
//     "---結果---" +
//       "\n" +
//       "虎哥" +
//       tigerWinCount +
//       "勝" +" "+
//       "熊哥" +
//       bearWinCount +
//       "勝"
//   );
//   if (tigerWinCount > bearWinCount) {
//     console.log("最終冠軍虎哥");
//   } else if (tigerWinCount == bearWinCount) {
//     console.log("平手");
//   } else {
//     console.log("最終冠軍熊哥");
//   }
// }

// function getDice(min,max){
//     return Math.floor(Math.random()*(max-min) + min);

// }
// playGame();

// let answer = Math.floor(Math.random() * 100) + 1;
// let min = 0;
// let max = 100;
// let guess;
// let count = 1;
// let guessed = [];
// console.log(answer);
// while(answer !== guess){
//   guess = Math.floor(Math.random() * ((max-1) - (min+1))) + (min+1)
//   if (guess === answer){
//     console.log(`第${count}局 遊戲結束 答案是${guess}`);
//   }else if (guess > answer){
//     max = guess ;
//     console.log(`第${count}局 電腦猜的是${guess}太大了 範圍是${min}到${max}`)
//   }else{
//     min = guess ;
//     console.log(`第${count}局 電腦猜的是${guess}太小了 範圍是${min}到${max}`)
//   }

//   count++;
// };

// let count = 0;
// for (let i = 1; i < 10; i++) {
//   for (let j = 1; j < 10; j++) {
//     for (let k = 1; k < 10; k++) {
//       ans = i + j + k;
//       if (ans <= 20) {
//         if (
//           i + j > k &&
//           i - j < k &&
//           i + k > j &&
//           i - k < j &&
//           k + j > i &&
//           k - j < i
//         ) {
//           if (i === k && i !== j) {
//             count++;
//             console.log(`${i},${j},${k}為等腰三角形`);
//           }
//         }
//       }
//     }
//   }
// }
// console.log(count);

// const players = ['Bernard', 'Youchi', 'Yenting', 'Angela', 'Yvonne', 'Ellen', 'Walter', 'Walter', 'Tim', 'Kevin', 'Russell']
// const blackList = ['Walter', 'Tim']
// // write your code
// let i = 0;
// while(blackList.length !== 0){
//   let del = players.indexOf(blackList[i]);
//   players.splice(del,1);
//   if (!(players.includes(blackList[i]))){
//     blackList.splice(0,1);
//   }
// }
// console.log(players) // should be ["Bernard", "Youchi", "Yenting", "Angela", "Yvonne", "Ellen", "Kevin", "Russell"]

// const players = [
//   { name: "Bernard", email: "bernard@example.com", ticket: "XL3558" },
//   { name: "Youchi", email: "youchi@example.com", ticket: "AH9188" },
//   { name: "Yenting", email: "yenting@example.com", ticket: "LO9903" },
//   { name: "Angela", email: "angela@example.com", ticket: "HY7212" },
//   { name: "Yvonne", email: "yvonne@example.com", ticket: "CH7684" },
//   { name: "Ellen", email: "ellen@example.com", ticket: "BB1750" },
//   { name: "Walter", email: "walter@example.com", ticket: "EI5724" },
//   { name: "Walter", email: "walter@example.com", ticket: "EI5724" },
//   { name: "Tim", email: "tim@example.com", ticket: "CK4592" },
//   { name: "Kevin", email: "kevin@example.com", ticket: "TT1804" },
//   { name: "Russell", email: "russell@example.com", ticket: "SI0305" },
// ];
// const blackList = [
//   { name: "Tim", email: "tim@example.com", ticket: "CK4592" },
//   { name: "Walter", email: "walter@example.com", ticket: "EI5724" },
// ];
// // write your code

//   for (let i = players.length -1; i >=0 ;i--){ //因為splice會改變index的順序 所以從後面開始排才不會有項目漏掉
//     for(let j = 0; j <blackList.length; j++){
//       if (players[i].email === blackList[j].email){
//         players.splice(i,1);
//       }
//     }
//   }

// console.log(players);

// let count = 0;
// for (let i = 1; i <= 9; i++){
//   for (let j = 1; j <= 9; j++){
//     let ans = i + j + j
//     if (ans <= 20){
//       if ((i + j > j && i - j < j) && ( j + j > i && j - j < i) && (i !== j)){
//         count++;
//         console.log(`以下是所有組合${i},${j},${j}`)
//       }
//     }
//   }
// }
// console.log("總共" + count + "種")

// let pyramidVol
// const baseLength = 10
// const height = 8

// // Write your answer here.
// // equation for square pyramid volume
// pyramidVol = ((baseLength * baseLength * height)/3).toFixed(2)

// /// /////// System code; don't change //////////
// pyramidVol

//計算十與十六進位轉換
// let num = 255
// let arr = [];
// while(num % 16 !== num){

// }

//切割字串

// let j = 0;

// function check(str) {
//     let i = 0;
//     let j = 1;
//   let newStr = str.split(" ");
//   while (i < newStr.length && j < newStr.length) {
//     if (newStr[i].length >= newStr[j].length) {
//       let temp = newStr[i];
//       newStr[i] = newStr[j];
//       newStr[j] = temp;
//     }
//     i++;
//     j++;
//   }
//   let last = newStr.length - 1;
//   console.log(newStr[last])
// }

// check("mor evehr Gookd efef dfkgd");

// function toRoman(){

// }


const romanSymbol = {
  0: "",
  1: "Ⅰ",
  2: "Ⅱ",
  3: "Ⅲ",
  4: "Ⅳ",
  5: "Ⅴ",
  6: "Ⅵ",
  7: "Ⅶ",
  8: "Ⅷ",
  9: "Ⅸ",
  10: "Ⅹ",
  20: "ⅩⅩ",
  30: "ⅩⅩⅩ",
  40: "ⅩⅬ",
  50: "Ⅼ",
  60: "ⅬⅩ",
  70: "ⅬⅩⅩ",
  80: "ⅬⅩⅩⅩ",
  90: "ⅩⅭ",
  100: "Ⅽ",
  200: "ⅭⅭ",
  300: "ⅭⅭⅭ",
  400: "ⅭⅮ",
  500: "Ⅾ",
  600: "ⅮⅭ",
  700: "ⅮⅭⅭ",
  800: "ⅮⅭⅭⅭ",
  900: "ⅭⅯ",
  1000: "Ⅿ",
  2000: "ⅯⅯ",
  3000: "ⅯⅯⅯ",
};

function roman(num){
let strNum = String(num);
let converted = ""
let len = strNum.length

let thousand = strNum[len - 4] * 1000
    let hundred = strNum[len - 3] * 100;
    let tenth = strNum[len - 2] * 10;
    let digit = strNum[len - 1];
if (len === 4){
    converted = romanSymbol[thousand] + romanSymbol[hundred] + romanSymbol[tenth] + romanSymbol[digit];
}else if (len === 3){
    converted = romanSymbol[hundred] + romanSymbol[tenth] + romanSymbol[digit];
}else if (len === 2){
    converted =  romanSymbol[tenth] + romanSymbol[digit];
}else {
    converted = romanSymbol[digit];
}
console.log(converted)
}
roman(1)

// if (len === 1){
//     converted = romanSymbol[num]
// }else if (len === 2){
//     let tenth = strNum[0] * 10
//     converted = romanSymbol[tenth] + romanSymbol[strNum[1]]
// }else if (len === 3){
//     let hundred = strNum[0] * 100
//     let tenth = strNum[1] * 10
//     converted = romanSymbol[hundred] + romanSymbol[tenth] + romanSymbol[strNum[2]]
// }else if (len === 4){
//     let thousand = strNum[0] * 1000
//     let hundred = strNum[1] * 100
//     let tenth = strNum[2] * 10
//     converted  = romanSymbol[thousand] + romanSymbol[hundred] + romanSymbol[tenth] + romanSymbol[strNum[3]]
// }

// let num = 255;

// //功能區
// function getNum(num){
//     let result ="";
// for (let i = 0; i < 2; i++){
//     let restNum = num % 16
//     num = Math.floor(num / 16)
//    result += convertor(restNum)
// }
// result = [...result].reverse().join("");
// return result;
// }
// const sixteen = {10:"A", 11:"B", 12:"C",13:"D", 14:"E" ,15 :"F"}
// function convertor(restNum){
//     if(restNum > 10){
//        let symbol =  sixteen[restNum]
//         return symbol;
//     }else if (restNum < 10){
//         return restNum
//     }
// }

// console.log(getNum(124))
// console.log(124 % 16)
