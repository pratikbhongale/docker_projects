// console.log(a);
// let a = 8;
 
// var x = 1;
// {
//     var x = 2;
// }
// console.log(x);

// primitives-> string, number, boolean, null, undefined, symbol, bigint
// References-> arrays, objects, function
// let a = {
//     name: "pratik"
// };
// let b = a;
// b.name = "abhi";
// c = "5" + 1

let logged = true;
let token = false;
let access = logged && token ? "allow" : "Denyy";
console.log(access)


let a = 5
a++; //increment by 1
++a; // increment by 2
console.log(a)
let b = 8
b--;
console.log(b);
--b;
console.log(b);

let x = 3;
let y = x++
console.log(x, y);

let i = 1;
console.log(++i);
console.log(i++);
console.log(i)