"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let classUser = { user: "peter", roles: [{ role: "user" }, { role: "admin" }] };
function IsInRoleClass(role) {
    return classUser.roles.some(r => r.role === role);
}
function RoleClass(role) {
    return function (constructor) {
        if (!IsInRoleClass(role)) {
            throw new Error(`The user is not authorised to access this class`);
        }
    };
}
//even before new instances are created, this restricted class will throw an error if it RoleClass("role") doesn't match classUser.role
let RestrictedClass = class RestrictedClass {
    constructor() {
        console.log(`Inside the constructor`);
    }
    Validate() {
        console.log(`Validating`);
    }
};
RestrictedClass = __decorate([
    RoleClass("admin")
], RestrictedClass);
const classUser3 = new RestrictedClass(); //main lesson is to stop the creation of the class if RoleClass("admin") doesn't match classUser.role
classUser3.Validate(); //Validating
//I don't like the above example so I found another from medium:
//https://medium.com/@InspireTech/what-are-decorators-in-typescript-and-how-to-use-decorators-d82d15c5851f
let User = class User {
    constructor(name) {
        this.name = name;
    }
};
User = __decorate([
    BaseEntity
], User);
function BaseEntity(ctr) {
    ctr.prototype.created = new Date().toISOString();
}
const user = new User('John');
console.log(user.name, user.created);
//# sourceMappingURL=class-decorators.js.map