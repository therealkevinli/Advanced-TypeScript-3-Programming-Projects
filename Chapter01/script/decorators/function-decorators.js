"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let currentUser = { user: "peter", roles: [{ role: "user" }, { role: "admin" }] };
function IsInRole(role) {
    return currentUser.roles.some(r => r.role === role);
}
function Logging(title) {
    console.log("logging decorator function called");
    return function (target, propertyKey, descriptor) {
        let originalMethod = descriptor.value;
        console.log(title);
        console.log(`currently calling target: ${target}`);
        console.log(`currently calling propertyKey: ${String(propertyKey)}`);
        console.log(`currently calling descriptor: ${String(descriptor)}`);
        descriptor.value = function () {
            console.log(`this line will be printed each time this function is called. Logging is on for function: ${String(propertyKey)}`);
            originalMethod.apply(this, arguments);
        };
        return descriptor;
    };
}
function Role(role) {
    console.log("at Role decorator function");
    return function (target, propertyKey, descriptor) {
        let originalMethod = descriptor.value;
        descriptor.value = function () {
            if (IsInRole(role)) {
                originalMethod.apply(this, arguments);
            }
            else {
                console.log(`${currentUser.user} is not in the ${role} role`);
            }
        };
        return descriptor;
    };
}
// This can be applied with @Admin
function Admin(target, propertyKey, descriptor) {
    let originalMethod = descriptor.value;
    descriptor.value = function () {
        if (IsInRole("admin")) {
            originalMethod.apply(this, arguments);
        }
        else {
            console.log(`${currentUser.user} is not in the admin role`);
        }
    };
    return descriptor;
}
class NoRoleCheck {
    AnyoneCanRun(args) {
        console.log(args);
    }
    AdminOnly(args) {
        console.log(args);
    }
}
class RoleCheck {
    AnyoneCanRun(args) {
        if (!IsInRole("user")) {
            console.log(`${currentUser.user} is not in the user role`);
            return;
        }
        ;
        console.log(args);
    }
    AdminOnly(args) {
        if (!IsInRole("admin")) {
            console.log(`${currentUser.user} is not in the admin role`);
            return;
        }
        ;
        console.log(args);
    }
}
class DecoratedExampleMethodDecoration {
    AnyoneCanRun(args) {
        console.log("AnyoneCanRun @Role'user' addition");
        console.log(args);
    }
    // @Role(param) says do the original method (the decorator method)
    // if param === currentUser.roles.some(r => r.role === param); === no type conversion, == yes type conversion
    // Role function's descriptor.value becomes AdminOnly
    // which means DecoratorExampleMethodDecoration.AdminOnly ===Role(AdminOnly, "admin")
    AdminOnly(args) {
        console.log("AdminOnly @Role'admin' addition");
        console.log(args);
    }
    //since currentUser does not have nobody i expect this to print out:
    //console.log(`${currentUser.user} is not in the ${role} role`);
    NobodyCanRun(args) {
        console.log("NobodyCanRun @Role'nobody' addition");
        console.log(args);
    }
}
__decorate([
    Role("user") // Note, no semi-colon
], DecoratedExampleMethodDecoration.prototype, "AnyoneCanRun", null);
__decorate([
    Role("admin")
], DecoratedExampleMethodDecoration.prototype, "AdminOnly", null);
__decorate([
    Role("nobody")
], DecoratedExampleMethodDecoration.prototype, "NobodyCanRun", null);
class DecoratedExampleMethodDecoration3 {
    HelloWorld(args) {
        console.log("hello world");
    }
}
__decorate([
    Logging("first use of logging")
], DecoratedExampleMethodDecoration3.prototype, "HelloWorld", null);
// a function that takes IDecoratorExample object (class with that matches interface to have AnyoneCanRun and Admin only functions)
// and then calls AnyoneCanRun and AdminOnly, while the currentUser stays the same
function TestDecoratorExample(decoratorMethod) {
    console.log(`Current user ${currentUser.user}`);
    decoratorMethod.AnyoneCanRun(`Running as user`);
    decoratorMethod.AdminOnly(`Running as admin`);
}
function TestDecoratorExample2(decoratorMethod) {
    console.log(`Current user ${currentUser.user}`);
    decoratorMethod.AnyoneCanRun(`Running as user`);
    decoratorMethod.AdminOnly(`Running as admin`);
    decoratorMethod.NobodyCanRun(`Running as nobody`);
}
function TestDecoratorExample3(decoratorMethod) {
    decoratorMethod.HelloWorld();
}
console.log("starting no role check 1");
TestDecoratorExample(new NoRoleCheck());
TestDecoratorExample(new DecoratedExampleMethodDecoration());
currentUser = { user: "bob", roles: [{ role: "user" }] };
TestDecoratorExample(new DecoratedExampleMethodDecoration());
console.log("starting rolecheck 1");
TestDecoratorExample(new RoleCheck());
console.log("starting no role check 2");
TestDecoratorExample(new NoRoleCheck());
TestDecoratorExample2(new DecoratedExampleMethodDecoration());
TestDecoratorExample3(new DecoratedExampleMethodDecoration3());
//# sourceMappingURL=function-decorators.js.map