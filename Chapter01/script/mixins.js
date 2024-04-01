"use strict";
function RecordStatus(base) {
    return class extends base {
        constructor() {
            super(...arguments);
            this.deleted = false;
        }
        get Deleted() {
            return this.deleted;
        }
        Delete() {
            this.deleted = true;
            console.log(`The record has been marked as deleted.`);
        }
    };
}
function Timestamp(base) {
    return class extends base {
        constructor() {
            super(...arguments);
            this.Updated = new Date();
        }
    };
}
class Person {
    constructor(firstName, lastName) {
        this.FirstName = firstName;
        this.LastName = lastName;
    }
}
//This is the mixin part, mixing Timestamp and RecordStatus with Person
// now we have a new class "ActivePerson"
const ActivePerson = RecordStatus(Timestamp(Person));
let activePerson = new ActivePerson("Peter", "O'Hanlon");
console.log(`this is the original timestamp ${activePerson.Updated}`);
activePerson.Updated = new Date(); //not needed because Timestamp automatically makes a new date
console.log(`this is the new timestamp ${activePerson.Updated}`);
activePerson.Delete();
console.log(`${activePerson.Deleted}`);
//# sourceMappingURL=mixins.js.map