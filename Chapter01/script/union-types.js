"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangeValidationBase = void 0;
class RangeValidationBase {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    RangeCheck(value) {
        return value >= this.start && value <= this.end;
    }
    GetNumber(value) {
        return new Number(value).valueOf();
    }
}
exports.RangeValidationBase = RangeValidationBase;
class SeparateTypeRangeValidation extends RangeValidationBase {
    IsInRangeString(value) {
        return this.RangeCheck(+value);
    }
    IsInRangeNumber(value) {
        return this.RangeCheck(value);
    }
}
class AnyRangeValidation extends RangeValidationBase {
    IsInRange(value) {
        if (typeof value === "number") {
            return this.RangeCheck(value);
        }
        else if (typeof value === "string") {
            return this.RangeCheck(this.GetNumber(value));
        }
        return false;
    }
}
class UnionRangeValidation extends RangeValidationBase {
    IsInRange(value) {
        if (typeof value === "number") {
            return this.RangeCheck(value);
        }
        return this.RangeCheck(this.GetNumber(value));
    }
}
let anyValidation = new AnyRangeValidation(10, 20);
let validation = function (input) {
    if (anyValidation.IsInRange(input)) {
        console.log(`${input} is in the range 10 to 20`);
    }
    else {
        console.log(`${input} is not in the range 10 to 20`);
    }
};
console.log(`Starting AnyRangeValidation validation`);
validation("15.0123");
validation("20");
validation("22.974");
validation(18);
validation(true);
validation("Peter");
console.log(`Finished AnyRangeValidation validation`);
let unionValidation = new UnionRangeValidation(10, 20);
let validation2 = function (input) {
    if (unionValidation.IsInRange(input)) {
        console.log(`${input} is in the range 10 to 20`);
    }
    else {
        console.log(`${input} is not in the range 10 to 20`);
    }
};
console.log(`Starting UnionRangeValidation validation`);
validation2("15.0123");
validation2("20");
validation2("22.974");
validation2(18);
// validation2(true); This won't compile
validation2("Peter");
console.log(`Finished UnionRangeValidation validation`);
//# sourceMappingURL=union-types.js.map