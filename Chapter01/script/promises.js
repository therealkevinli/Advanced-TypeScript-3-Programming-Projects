"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Promise only version of the asynchronous code.
function ExpensiveWebCall1(time) {
    return new Promise((resolve, reject) => setTimeout(resolve, time));
}
class MyWebService1 {
    // Does not return anything but uses ExpensiveWebCall1 which is a promise
    CallExpensiveWebOperation() {
        //then gets run after success, like else in python try except else finally
        ExpensiveWebCall1(8000).then(() => console.log(`Finished web service1`))
            .catch(() => console.log(`Expensive web call failure`));
        console.log("After try and catch but this will be called before WelCall1.then is finished");
    }
}
function ExpensiveWebCall(time) {
    return new Promise((resolve, reject) => setTimeout(resolve, time));
}
class MyWebService {
    // what promise does this return?
    CallExpensiveWebOperation() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                ExpensiveWebCall(10).then(() => console.log("at then in ExpensiveWebCall2 should print after In try block web 2"));
                console.log(`In try block web service2`);
                // await makes it clear that this is a promise and force return to be async, and makes them wait
                yield ExpensiveWebCall(10000).then(() => console.log(`After then in try block callexpensiveweboperation2`));
                console.log("everything after await waits for the await to finish, otherwise it would keep going");
            }
            catch (error) {
                console.log(`Caught ${error}`);
            }
        });
    }
}
console.log(`calling service1`);
let nws1 = new MyWebService1().CallExpensiveWebOperation();
console.log(`Processing continues until the web service1 returns`);
console.log(`calling service2`);
let nws2 = new MyWebService().CallExpensiveWebOperation();
console.log(`Processing continues until the web service2 returns`);
// other examples to get used to arrow functions (annonymous functions)
let a = 2, b = 3;
let calculate = () => {
    return a + b;
};
console.log(calculate());
const result = [
    'Scaler',
    'Yash'
];
function getLength(x) {
    return x.length;
}
// arrow function version, does not need getLength function to be already defined because it is using an annonymous function
console.log(result.map(x => x.length)); //[6,5] Scalar and Yash are lengths 6 and 5
console.log(result.map(getLength)); //[6,5]
console.log(result.map(() => result.length)); // [2,2] // for all elements in result because there is no parameter, use result.length
console.log("nws1 is void");
nws1;
console.log("nws2 object can tell us if it is successful");
nws2.then(() => console.log("finished then nws2"));
console.log("written after nws2.then but it should be printed before nws2 finished");
//# sourceMappingURL=promises.js.map