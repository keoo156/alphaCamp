//dom宣告
// let redNum = document.querySelector(".rednum");
// let greenNum = document.querySelector(".greennum");
// let blueNum = document.querySelector(".bluenum");
// let submit = document.querySelector(".submit");
let hexNum = document.querySelector(".hex_num");
let finalColor = document.querySelector(".hex_color");
let Sliders = document.querySelectorAll(".slider")
let red_number = document.querySelector(".red_number");
let green_number = document.querySelector(".green_number");
let blue_number = document.querySelector(".blue_number")

//掛監聽器
// submit.addEventListener("click", (e) => {
//   let red_num = parseInt(redNum.value);
//   let green_num = parseInt(greenNum.value);
//   let blue_num = parseInt(blueNum.value);
//   let arr = [red_num, green_num, blue_num];
//   let hexString = "";
//   if (!Number.isNaN(arr[0]) && !Number.isNaN(arr[1]) && !Number.isNaN(arr[2])) {
//     if (
//       arr[0] >= 0 &&
//       arr[0] <= 255 &&
//       arr[1] >= 0 &&
//       arr[1] <= 255 &&
//       arr[2] >= 0 &&
//       arr[2] <= 255
//     ) {
//       for (let i = 0; i < arr.length; i++) {
//         hexString += getNum(arr[i]);
//       }
//     } else {
//       alert("請輸入正確數值");
//     }
//   } else {
//     alert("請輸入正確數值");
//   }
//   hexNum.innerHTML = `#${hexString}`
//   finalColor.style.backgroundColor = `#${hexString}`
// });
Sliders.forEach((slider)=>{
  slider.addEventListener("input", (e)=>{
    let arr = [];
    let newHex = ""
    for (let i = 0; i <3 ; i++){
      arr.push(e.target.parentElement.parentElement.children[i].children[0].valueAsNumber)
    }
    for (let j = 0; j < arr.length; j++){
      newHex += getNum(arr[j])
    }
    hexNum.innerHTML = `#${newHex}`
    finalColor.style.backgroundColor = hexNum.innerHTML
    red_number.innerHTML = arr[0]
    green_number.innerHTML = arr[1]
    blue_number.innerHTML = arr[2]
  })
})


//功能區
function getNum(num) {
  let result = "";
  for (let i = 0; i < 2; i++) {
    let restNum = num % 16;
    num = Math.floor(num / 16);
    result += convertor(restNum);
  }
  result = [...result].reverse().join("");
  return result;
}
const sixteen = { 10: "A", 11: "B", 12: "C", 13: "D", 14: "E", 15: "F" };
function convertor(restNum) {
  if (restNum >= 10) {
    let symbol = sixteen[restNum];
    return symbol;
  } else if (restNum < 10) {
    return restNum;
  }
}
