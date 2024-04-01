// we can name "Constructor" as anything but this name is the convention
// given any particular type, a new instance will be created using any appropriate arguments
type Constructor<T ={}> = new(...args: any[]) => T;

function RecordStatus<T extends Constructor>(base : T) {
    return class extends base {
        private deleted : boolean = false;

        get Deleted() : boolean {
            return this.deleted;
        }
        Delete() : void {
            this.deleted = true;
            console.log(`The record has been marked as deleted.`);
        }
    }
}

function Timestamp<T extends Constructor>(base : T) {
    return class extends base {
        Updated : Date = new Date();
    }
}

class Person {
    constructor(firstName : string, lastName : string) {
        this.FirstName = firstName;
        this.LastName = lastName;
    }

    FirstName : string;
    LastName : string;
}

//This is the mixin part, mixing Timestamp and RecordStatus with Person
// now we have a new class "ActivePerson"
const ActivePerson = RecordStatus(Timestamp(Person));

let activePerson = new ActivePerson("Peter", "O'Hanlon");
console.log(`this is the original timestamp ${activePerson.Updated}`)
activePerson.Updated = new Date(); //not needed because Timestamp automatically makes a new date
console.log(`this is the new timestamp ${activePerson.Updated}`)

activePerson.Delete();
console.log(`${activePerson.Deleted}`);