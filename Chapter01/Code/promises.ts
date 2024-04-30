// Promise only version of the asynchronous code.
function ExpensiveWebCall1(time : number) : Promise<void> {
    return new Promise((resolve, reject) => setTimeout(resolve, time));
}
class MyWebService1 {
    // Does not return anything but uses ExpensiveWebCall1 which is a promise
    // If you put async in front it returns Promise<void> async CallExpensiveWebOperation() : Promise<void> {
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
    // what promise does this return? - Promise without a type
    // async is needed because there is await in here, so when CallExpensiveWebOperation() is 
    async CallExpensiveWebOperation() : Promise<void> {
        try {
            ExpensiveWebCall(10).then(()=>console.log("at then in ExpensiveWebCall2 should print after In try block web 2"))
            console.log(`In try block web service2, if the above line had await, this would print after that line finished`);

            // await makes it clear that this is a promise and force return to be async, and makes them wait
            await ExpensiveWebCall(10000).then(()=>console.log(`After then in try block callexpensiveweboperation2`));
            console.log("everything after await waits for the await to finish, otherwise it would keep going")
            
        } catch (error) {
            console.log(`Caught ${error}`);
        } 
    }
}

console.log(`calling service1`);
let nws1:void = new MyWebService1().CallExpensiveWebOperation();
console.log(`Processing continues until the web service1 returns`);



console.log(`calling service2`);
let nws2:Promise<void> = new MyWebService().CallExpensiveWebOperation();
console.log(`Processing continues until the web service2 returns`);



// other examples to get used to arrow functions (annonymous functions)

let a=2,b=3;
let calculate=():number=>{
    return a+b;
}
console.log(calculate());
let calculate2=(first:number,second:number):number=>{
    return first+second;
    }
console.log(calculate2(a,b));


const result = [
    'Scaler',
    'Yash'
  ];
  
function getLength(x:any):number {
return x.length;
}

// arrow function version, does not need getLength function to be already defined because it is using an annonymous function
console.log(result.map(x => x.length)); //[6,5] Scalar and Yash are lengths 6 and 5

console.log(result.map(x => getLength(x))); //[6,5] 
console.log(result.map(getLength)); //[6,5] the same as the above example (x) => getLength(x)
console.log(result.map(() => result.length));// [2,2] // for all elements in result because there is no parameter, use result.length


console.log("nws1 is void");
// nws1.then(()=>console.log("this has an error because there is no async so no promise is returned"));
console.log("nws2 object can tell us if it is successful");
nws2.then(()=>console.log("finished then nws2"));
console.log("written after nws2.then but it should be printed before nws2 finished")

