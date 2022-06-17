// const chunkArr = (array, size) => {
//   let newArr = [];
//   let count = 0;
//   let holder = "";
//   for (let idx = 0; idx < array.length; idx++) {
//     if (count !== size) {
//       console.log("incre");
//       holder += array[idx];
//       count++;
//     } else {
//       count = 1;
//       newArr = [...newArr, holder.split("")];
//       holder = "";
//       holder += array[idx];
//     }
//   }

//   if (holder !== "") {
//     newArr = [...newArr, holder.split("")];
//   }

//   console.log(newArr);
//   return newArr;
// };

// chunkArr([1, 2, 3, 4, 5], 3);

// const anagram = (str1, str2) => {
//   const obj = {};
//   let res1 = str1.toLowerCase();
//   let res2 = str2.toLowerCase();
//   for (let char of res1) {
//     if (!(char in obj)) obj[char] = 0;
//     obj[char]++;
//   }

//   for (let char2 of res2) {
//     if (!(char2 in obj) || obj[char2] === 0) return console.log(false);
//     obj[char2]--;
//   }

//   console.log(true);
//   return true;
// };

// anagram("rail safety", "fairy tales");

// const capital = (string) => {
//   let newStr = "";
//   for (let idx = 0; idx < string.length; idx++) {
//     if (idx === 0) {
//       newStr += string[idx].toUpperCase();
//       continue;
//     }
//     if (string[idx] === " ") {
//       newStr += " ";
//       newStr += string[idx + 1].toUpperCase();
//       idx++;
//       continue;
//     }
//     newStr += string[idx];
//   }
//   console.log(newStr);
//   //   return string;
// };

// capital("look, it is working!");

const steps = (num) => {
  for (let row = 0; row < num; row++) {
    let stair = "";
    for (let col = 0; col < num; col++) {
      if (col <= row) {
        stair += "#";
      } else {
        stair += " ";
      }
    }
    console.log(stair);
  }
};

steps(4);
