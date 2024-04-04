"use strict";
// Array functions and examples: https://blog.canopas.com/typescript-array-methods-and-their-usages-daa8d498b4fd
// in this code we use array.shift() to deque an element. There is also .pop for popping the last element
// [1,2,3].pop() pops 3. [1,2,3].shift() dequeues 1
class QueueOfInt {
    constructor() {
        this.queue = [];
    }
    Push(value) {
        this.queue.push(value);
    }
    Pop() {
        return this.queue.shift();
    }
}
const intQueue = new QueueOfInt();
intQueue.Push(10);
intQueue.Push(35);
console.log(intQueue.Pop()); // Prints 10
console.log(intQueue.Pop()); // Prints 35
class QueueOfString {
    constructor() {
        this.queue = [];
    }
    Push(value) {
        this.queue.push(value);
    }
    Pop() {
        return this.queue.shift();
    }
}
class Queue {
    constructor() {
        this.queue = [];
    }
    Push(value) {
        this.queue.push(value);
    }
    Pop() {
        return this.queue.shift();
    }
}
console.log(`calling generic queue`);
const queue = new Queue();
const stringQueue = new Queue();
queue.Push(10);
queue.Push(35);
console.log(queue.Pop());
console.log(queue.Pop());
stringQueue.Push(`Hello`);
stringQueue.Push(`Generics`);
console.log(stringQueue.Pop());
console.log(stringQueue.Pop());
console.log(`trying with a literal ${[1, 2, 3].pop()}`);
let firstNumArray = [1, 2, 3];
console.log(firstNumArray.pop()); //print pop 3
console.log(firstNumArray.shift()); //print dequeue 1
//p 36
function KeyValuePair(key, value) {
    console.log(typeof (key));
}
//type defined initialization of KeyValuePair is optional but will be enforced
KeyValuePair("first pair", 123);
KeyValuePair("second pair", 123);
//# sourceMappingURL=generics.js.map