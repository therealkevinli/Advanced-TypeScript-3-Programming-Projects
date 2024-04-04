// Promise only version of the asynchronous code.
function ExpensiveWebCall1(time : number) : Promise<void> {
    return new Promise((resolve, reject) => setTimeout(resolve, time));
}
class MyWebService1 {
    // Does not return anything but uses ExpensiveWebCall1 which is a promise
    CallExpensiveWebOperation() : void {
        //then gets run after success, like else in python try except else finally
        ExpensiveWebCall1(8000).then(()=> console.log(`Finished web service1`))
            .catch(()=> console.log(`Expensive web call failure`));
        console.log("After try and catch but this will be called before WelCall1.then is finished");
    }
}

function ExpensiveWebCall(time : number) : Promise<{}> {
    return new Promise((resolve, reject) => setTimeout(resolve, time));
}
class MyWebService {
    // what promise does this return?
    async CallExpensiveWebOperation() : Promise<void> {
        try {
            ExpensiveWebCall(10000).then(()=>console.log(`After then in try block callexpensiveweboperation2`));
            console.log(`In try block web service2`);
        } catch (error) {
            console.log(`Caught ${error}`);
        } 
    }
}

console.log(`calling service1`);
new MyWebService1().CallExpensiveWebOperation();
console.log(`Processing continues until the web service1 returns`);



console.log(`calling service2`);
new MyWebService().CallExpensiveWebOperation();
console.log(`Processing continues until the web service2 returns`);



// other examples to get used to arrow functions (annonymous functions)

var a=2,b=3;
let calculate=():number=>{
return a+b;
}
console.log(calculate());



const result = [
    'Scaler',
    'Yash'
  ];
  
  function getLength(x:any):number {
    return x.length;
  }

// arrow function version, does not need getLength function to be already defined because it is using an annonymous function
  console.log(result.map(x => x.length)); //[6,5] Scalar and Yash are lengths 6 and 5
  console.log(result.map(getLength)); //[6,5]
  console.log(result.map(() => result.length));// [2,2] // for all elements in result because there is no parameter, use result.length
