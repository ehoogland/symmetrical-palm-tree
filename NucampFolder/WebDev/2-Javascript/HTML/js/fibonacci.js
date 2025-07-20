// Function prints all numbers that are part of the fibonacci sequence up to n. n is a whole number entered by the user.
function fibonacciUntilLimit() {
  [a, b] = [0, 1];
  console.log(a);
  const n = Number(prompt("Enter a number >= the largest fibonacci number you want logged"));
  do {
    console.log(b); 
    [a, b] = [b, a + b];
  } while (b <= n);
}

function fibonacciEvenNumbers() {
  [a, b] = [0, 1];
  // console.log(a); iff you consider 0 an even #
  const n = Number(prompt("Enter an even number >= the largest even fibonacci number you want logged"));
  do { 
    if (b % 2 === 0) 
      console.log(b);
    [a, b] = [b, a + b];
  } while (b <= n);
}

// Calculate the sum of the first n Fibonacci numbers below of equal to a number.

function fibonacciSumUp() {
  const n = Number(prompt("Enter a number >= the largest fibonacci number for which you want to calculate the sum of fibonaccis"));
[a, b] = [0, 1];    
let sum = a + b; 
 while (b < n) {  
   [a, b] = [b, a + b];
   sum += b;  
 } 
      console.log(sum);
}

/*

Fibonacci Checker: this function accepts a number n and checks if it is a Fibonacci number. If it is, function returns "The number is a Fibonacci number." If it isn't, it returns "The number is not a Fibonacci number." 

*/

function fibonacciIsNumberPartOf() {
  // your code here
  const n = Number(prompt("Enter a number to be checked for fibonacci status"));
[a, b] = [0, 1];     
do {
   if (a === n || b === n) {
     return alert(n + " is a Fibonacci number.");
   }
  [a, b] = [b, a + b];
  
} while (b <= n);
  
  return alert(n + " is not a Fibonacci number.");
}
