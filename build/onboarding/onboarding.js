"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardingServiceClientImpl = exports.ExecuteResponse = exports.ExecuteRequest = exports.StartResponse = exports.StartRequest = exports.protobufPackage = void 0;
/* eslint-disable */
var _m0 = require("protobufjs/minimal");
exports.protobufPackage = "onboarding";
function createBaseStartRequest() {
    return {};
}
exports.StartRequest = {
    encode: function (_, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseStartRequest();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (_) {
        return {};
    },
    toJSON: function (_) {
        var obj = {};
        return obj;
    },
    create: function (base) {
        return exports.StartRequest.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial: function (_) {
        var message = createBaseStartRequest();
        return message;
    },
};
function createBaseStartResponse() {
    return { instanceId: "" };
}
exports.StartResponse = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message.instanceId !== "") {
            writer.uint32(10).string(message.instanceId);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseStartResponse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.instanceId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return { instanceId: isSet(object.instanceId) ? String(object.instanceId) : "" };
    },
    toJSON: function (message) {
        var obj = {};
        message.instanceId !== undefined && (obj.instanceId = message.instanceId);
        return obj;
    },
    create: function (base) {
        return exports.StartResponse.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial: function (object) {
        var _a;
        var message = createBaseStartResponse();
        message.instanceId = (_a = object.instanceId) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
function createBaseExecuteRequest() {
    return { instanceId: "" };
}
exports.ExecuteRequest = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message.instanceId !== "") {
            writer.uint32(10).string(message.instanceId);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseExecuteRequest();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.instanceId = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return { instanceId: isSet(object.instanceId) ? String(object.instanceId) : "" };
    },
    toJSON: function (message) {
        var obj = {};
        message.instanceId !== undefined && (obj.instanceId = message.instanceId);
        return obj;
    },
    create: function (base) {
        return exports.ExecuteRequest.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial: function (object) {
        var _a;
        var message = createBaseExecuteRequest();
        message.instanceId = (_a = object.instanceId) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
function createBaseExecuteResponse() {
    return { instanceId: "", nextStep: "" };
}
exports.ExecuteResponse = {
    encode: function (message, writer) {
        if (writer === void 0) { writer = _m0.Writer.create(); }
        if (message.instanceId !== "") {
            writer.uint32(10).string(message.instanceId);
        }
        if (message.nextStep !== "") {
            writer.uint32(18).string(message.nextStep);
        }
        return writer;
    },
    decode: function (input, length) {
        var reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
        var end = length === undefined ? reader.len : reader.pos + length;
        var message = createBaseExecuteResponse();
        while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.instanceId = reader.string();
                    break;
                case 2:
                    message.nextStep = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON: function (object) {
        return {
            instanceId: isSet(object.instanceId) ? String(object.instanceId) : "",
            nextStep: isSet(object.nextStep) ? String(object.nextStep) : "",
        };
    },
    toJSON: function (message) {
        var obj = {};
        message.instanceId !== undefined && (obj.instanceId = message.instanceId);
        message.nextStep !== undefined && (obj.nextStep = message.nextStep);
        return obj;
    },
    create: function (base) {
        return exports.ExecuteResponse.fromPartial(base !== null && base !== void 0 ? base : {});
    },
    fromPartial: function (object) {
        var _a, _b;
        var message = createBaseExecuteResponse();
        message.instanceId = (_a = object.instanceId) !== null && _a !== void 0 ? _a : "";
        message.nextStep = (_b = object.nextStep) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
var OnboardingServiceClientImpl = /** @class */ (function () {
    function OnboardingServiceClientImpl(rpc, opts) {
        this.service = (opts === null || opts === void 0 ? void 0 : opts.service) || "onboarding.OnboardingService";
        this.rpc = rpc;
        this.Start = this.Start.bind(this);
        this.Execute = this.Execute.bind(this);
    }
    OnboardingServiceClientImpl.prototype.Start = function (request) {
        var data = exports.StartRequest.encode(request).finish();
        var promise = this.rpc.request(this.service, "Start", data);
        return promise.then(function (data) { return exports.StartResponse.decode(new _m0.Reader(data)); });
    };
    OnboardingServiceClientImpl.prototype.Execute = function (request) {
        var data = exports.ExecuteRequest.encode(request).finish();
        var promise = this.rpc.request(this.service, "Execute", data);
        return promise.then(function (data) { return exports.ExecuteResponse.decode(new _m0.Reader(data)); });
    };
    return OnboardingServiceClientImpl;
}());
exports.OnboardingServiceClientImpl = OnboardingServiceClientImpl;
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=onboarding.js.map