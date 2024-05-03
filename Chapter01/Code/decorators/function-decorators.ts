let currentUser = {user: "peter", roles : [{role:"user"}, {role:"admin"}] };

function IsInRole(role : string) : boolean {
    return currentUser.roles.some(r => r.role === role);
}

function Logging(title: string){
    console.log("logging decorator function called");
    return function(target: any, propertyKey : string | symbol, descriptor : PropertyDescriptor) {
        let originalMethod = descriptor.value;
        console.log(title);
        console.log(`currently calling target: ${target}`);
        console.log(`currently calling propertyKey: ${String(propertyKey)}`);
        console.log(`currently calling descriptor: ${String(descriptor)}`);

        descriptor.value = function() {
            console.log(`this line will be printed each time this function is called. Logging is on for function: ${String(propertyKey)}`)
            originalMethod.apply(this, arguments);
        }
        return descriptor;
    }
}
function Role(role : string) {
    console.log("at Role decorator function");
    return function(target: any, propertyKey : string | symbol, descriptor : PropertyDescriptor) {
        let originalMethod = descriptor.value;
        descriptor.value = function() {
            console.log("printed everytime Role decorator is used in a function call")
            if (IsInRole(role)) {
                originalMethod.apply(this, arguments);
            } else {
                console.log(`${currentUser.user} is not in the ${role} role`);
            }
        }
        return descriptor;
    }
} 

// This can be applied with @Admin
function Admin(target: any, propertyKey : string | symbol, descriptor : PropertyDescriptor) {
    let originalMethod = descriptor.value;
    descriptor.value = function() {
        if (IsInRole("admin")) {
            originalMethod.apply(this, arguments);
        } else {
            console.log(`${currentUser.user} is not in the admin role`);
        }
    }
    return descriptor;
}

interface IDecoratorExample {
    AnyoneCanRun(args:string) : void;
    AdminOnly(args:string) : void;
}

interface IDecoratorExample2 extends IDecoratorExample{
    NobodyCanRun(args:string) : void;
    
}

class NoRoleCheck implements IDecoratorExample {
    AnyoneCanRun(args: string): void {
        console.log(args);
    }    
    AdminOnly(args: string): void {
        console.log(args);
    }
}

class RoleCheck implements IDecoratorExample {
    AnyoneCanRun(args: string): void {
        if (!IsInRole("user")) {
            console.log(`${currentUser.user} is not in the user role`);
            return;
        };
        console.log(args);
    }    
    AdminOnly(args: string): void {
        if (!IsInRole("admin")) {
            console.log(`${currentUser.user} is not in the admin role`);
            return;
        };
        console.log(args);
    }
}

class DecoratedExampleMethodDecoration implements IDecoratorExample {
    @Role("user") // Note, no semi-colon
    @Logging("User logging anyonecanrun")
    AnyoneCanRun(args:string) : void {
        console.log("AnyoneCanRun @Role'user' addition")
        console.log(args);
    }
    // @Role(param) says do the original method (the decorator method)
    // if param === currentUser.roles.some(r => r.role === param); === no type conversion, == yes type conversion
    // Role function's descriptor.value becomes AdminOnly
    // which means DecoratorExampleMethodDecoration.AdminOnly ===Role(AdminOnly, "admin")
    @Role("admin")
    AdminOnly(args:string) : void {
        console.log("AdminOnly @Role'admin' addition")
        console.log(args);
    }
    //since currentUser does not have nobody i expect this to print out:
    //console.log(`${currentUser.user} is not in the ${role} role`);
    @Role("nobody")
    NobodyCanRun(args:string) : void {
        console.log("NobodyCanRun @Role'nobody' addition")
        console.log(args);
    }
    
}


class DecoratedExampleMethodDecoration3{
    @Logging("first use of logging")
    HelloWorld(args:string):void
    {
        console.log("hello world");
    }
}

// a function that takes IDecoratorExample object (class with that matches interface to have AnyoneCanRun and Admin only functions)
// and then calls AnyoneCanRun and AdminOnly, while the currentUser stays the same
function TestDecoratorExample(decoratorMethod : IDecoratorExample) {
    console.log(`Current user ${currentUser.user}`);
    decoratorMethod.AnyoneCanRun(`Running as user`);
    decoratorMethod.AdminOnly(`Running as admin`);        
}

function TestDecoratorExample2(decoratorMethod : IDecoratorExample2) {
    console.log(`Current user ${currentUser.user}`);
    decoratorMethod.AnyoneCanRun(`Running as user`);
    decoratorMethod.AdminOnly(`Running as admin`);        
    decoratorMethod.NobodyCanRun(`Running as nobody`);        
}

function TestDecoratorExample3(decoratorMethod:any) {
    decoratorMethod.HelloWorld();        
}


console.log("starting no role check 1");
TestDecoratorExample(new NoRoleCheck());

TestDecoratorExample(new DecoratedExampleMethodDecoration());
currentUser = {user: "bob", roles : [{role:"user"}] };
TestDecoratorExample(new DecoratedExampleMethodDecoration());

console.log("starting rolecheck 1")
TestDecoratorExample(new RoleCheck());
console.log("starting no role check 2");
TestDecoratorExample(new NoRoleCheck());


TestDecoratorExample2(new DecoratedExampleMethodDecoration());
TestDecoratorExample3(new DecoratedExampleMethodDecoration3());
