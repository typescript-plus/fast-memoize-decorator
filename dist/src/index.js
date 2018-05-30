"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no-require-imports
var fm = require("fast-memoize");
function Memoize() {
    return function (target, propertyKey, descriptor) {
        var value = descriptor.value;
        if (typeof value === 'function') {
            descriptor.value = newFunction(propertyKey, value);
            return;
        }
        var get = descriptor.get;
        if (get != null) {
            descriptor.get = newGetter(propertyKey, get);
        }
    };
}
exports.Memoize = Memoize;
function newFunction(name, fn) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var bound = fn.bind(this);
        var value = fm(bound);
        Object.defineProperty(this, name, { value: value });
        return value.apply(void 0, args);
    };
}
function newGetter(name, fn) {
    return function () {
        var value = fn.apply(this);
        Object.defineProperty(this, name, { value: value });
        return value;
    };
}
//# sourceMappingURL=index.js.map