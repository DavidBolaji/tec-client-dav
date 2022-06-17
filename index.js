// const arr = [3,4,7,9,15,20];


// const mergeSort = (arr, num) => {
//     let start = 0;
//     let end = arr.length - 1;  
    
//     while (start <= end) {
//         let middle = Math.floor(start + end/2); 
//         if (num === arr[middle]) {
//             return middle;
//         } else if (num > arr[middle]) {
//             start = middle + 1;
//         } else {
//             end = middle - 1;
//         }

//     }

//     return -1;

// }

// console.log(mergeSort(arr, 20))
// A = [1, 3, 6, 4, 1, 2];
A = [-1, -3]


let sorted = A.sort((a,b) => a-b);

console.log(sorted);

sorted = sorted.filter((c, index) => {
    return sorted.indexOf(c) === index;
});



for(let i = 0; i < sorted.length - 1; i++) {
    if((sorted[i] + 1) === sorted[i +1]){
        // smallest++;
        continue;
    } else {
        console.log(sorted[i] + 1);
        break;
    }
}

console.log(sorted[sorted.length - 1] + 1)

