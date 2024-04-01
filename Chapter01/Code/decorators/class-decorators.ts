let classUser = {user: "peter", roles : [{role:"user"}, {role:"admin"}] };

function IsInRoleClass(role : string) : boolean {
    return classUser.roles.some(r => r.role === role);
}

function RoleClass(role : string) {
    return function(constructor : Function) {
        if (!IsInRoleClass(role)) {
            throw new Error(`The user is not authorised to access this class`);
        }
    }
}

//even before new instances are created, this restricted class will throw an error if it RoleClass("role") doesn't match classUser.role
@RoleClass("admin")
class RestrictedClass {
    constructor() {
        console.log(`Inside the constructor`);
    }
    Validate() {
        console.log(`Validating`);
    }
}


const classUser3 = new RestrictedClass(); //main lesson is to stop the creation of the class if RoleClass("admin") doesn't match classUser.role
classUser3.Validate(); //Validating


//I don't like the above example so I found another from medium:
//https://medium.com/@InspireTech/what-are-decorators-in-typescript-and-how-to-use-decorators-d82d15c5851f

@BaseEntity
class User {
  [x: string]: any;
  constructor(public name: string) {}
}

function BaseEntity(ctr: Function) {
  ctr.prototype.created = new Date().toISOString();
}

const user = new User('John')
console.log(user.name, user.created)
