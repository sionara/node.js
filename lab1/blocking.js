//blocking code

let a = 4;
let b = 5;
console.log(a+b);
console.log("hello world!"); //this code was blocked by the code above. It will always appear after the previous line runs.

//non-blocking code using setTimeOut()

setTimeout(function(){
  console.log("this code ran after a delay.")
}, 3000);
console.log("this code was not blocked!"); //this code was not blocked by code above because it had a delay.