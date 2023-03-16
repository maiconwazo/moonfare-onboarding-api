"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
var common_1 = require("@nestjs/common");
var rxjs_1 = require("rxjs");
var grpc_js_1 = require("@grpc/grpc-js");
var HttpExceptionFilter = /** @class */ (function () {
    function HttpExceptionFilter() {
    }
    HttpExceptionFilter_1 = HttpExceptionFilter;
    HttpExceptionFilter.prototype.catch = function (exception) {
        var httpStatus = exception.getStatus();
        var httpRes = exception.getResponse();
        return (0, rxjs_1.throwError)(function () {
            var _a;
            return ({
                code: (_a = HttpExceptionFilter_1.HttpStatusCode[httpStatus]) !== null && _a !== void 0 ? _a : grpc_js_1.status.UNKNOWN,
                message: exception.message,
                details: Array.isArray(httpRes.details) ? httpRes.details : undefined,
            });
        });
    };
    var HttpExceptionFilter_1;
    HttpExceptionFilter.HttpStatusCode = (_a = {},
        // standard gRPC error mapping
        // https://cloud.google.com/apis/design/errors#handling_errors
        _a[common_1.HttpStatus.BAD_REQUEST] = grpc_js_1.status.INVALID_ARGUMENT,
        _a[common_1.HttpStatus.UNAUTHORIZED] = grpc_js_1.status.UNAUTHENTICATED,
        _a[common_1.HttpStatus.FORBIDDEN] = grpc_js_1.status.PERMISSION_DENIED,
        _a[common_1.HttpStatus.NOT_FOUND] = grpc_js_1.status.NOT_FOUND,
        _a[common_1.HttpStatus.CONFLICT] = grpc_js_1.status.ALREADY_EXISTS,
        _a[common_1.HttpStatus.GONE] = grpc_js_1.status.ABORTED,
        _a[common_1.HttpStatus.TOO_MANY_REQUESTS] = grpc_js_1.status.RESOURCE_EXHAUSTED,
        _a[499] = grpc_js_1.status.CANCELLED,
        _a[common_1.HttpStatus.INTERNAL_SERVER_ERROR] = grpc_js_1.status.INTERNAL,
        _a[common_1.HttpStatus.NOT_IMPLEMENTED] = grpc_js_1.status.UNIMPLEMENTED,
        _a[common_1.HttpStatus.BAD_GATEWAY] = grpc_js_1.status.UNKNOWN,
        _a[common_1.HttpStatus.SERVICE_UNAVAILABLE] = grpc_js_1.status.UNAVAILABLE,
        _a[common_1.HttpStatus.GATEWAY_TIMEOUT] = grpc_js_1.status.DEADLINE_EXCEEDED,
        // additional built-in http exceptions
        // https://docs.nestjs.com/exception-filters#built-in-http-exceptions
        _a[common_1.HttpStatus.HTTP_VERSION_NOT_SUPPORTED] = grpc_js_1.status.UNAVAILABLE,
        _a[common_1.HttpStatus.PAYLOAD_TOO_LARGE] = grpc_js_1.status.OUT_OF_RANGE,
        _a[common_1.HttpStatus.UNSUPPORTED_MEDIA_TYPE] = grpc_js_1.status.CANCELLED,
        _a[common_1.HttpStatus.UNPROCESSABLE_ENTITY] = grpc_js_1.status.CANCELLED,
        _a[common_1.HttpStatus.I_AM_A_TEAPOT] = grpc_js_1.status.UNKNOWN,
        _a[common_1.HttpStatus.METHOD_NOT_ALLOWED] = grpc_js_1.status.CANCELLED,
        _a[common_1.HttpStatus.PRECONDITION_FAILED] = grpc_js_1.status.FAILED_PRECONDITION,
        _a);
    HttpExceptionFilter = HttpExceptionFilter_1 = __decorate([
        (0, common_1.Catch)(common_1.HttpException)
    ], HttpExceptionFilter);
    return HttpExceptionFilter;
}());
exports.HttpExceptionFilter = HttpExceptionFilter;
//# sourceMappingURL=http-exception-filter.js.map