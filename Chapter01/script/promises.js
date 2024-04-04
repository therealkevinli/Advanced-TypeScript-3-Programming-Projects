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
                ExpensiveWebCall(10000).then(() => console.log(`After then in try block callexpensiveweboperation2`));
                console.log(`In try block web service2`);
            }
            catch (error) {
                console.log(`Caught ${error}`);
            }
        });
    }
}
console.log(`calling service1`);
new MyWebService1().CallExpensiveWebOperation();
console.log(`Processing continues until the web service returns`);
console.log(`calling service`);
new MyWebService().CallExpensiveWebOperation();
console.log(`Processing continues until the web service returns`);
// other examples to get used to arrow functions (annonymous functions)
var a = 2, b = 3;
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
console.log(result.map(x => x.length));
console.log(result.map(getLength));
console.log(result.map(() => result.length));
//# sourceMappingURL=promises.js.map