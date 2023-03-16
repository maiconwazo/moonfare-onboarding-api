"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardingModule = void 0;
var common_1 = require("@nestjs/common");
var database_module_1 = require("../database.module");
var onboarding_controller_1 = require("./onboarding.controller");
var onboarding_providers_1 = require("./onboarding.providers");
var onboarding_service_1 = require("./onboarding.service");
var OnboardingModule = /** @class */ (function () {
    function OnboardingModule() {
    }
    OnboardingModule = __decorate([
        (0, common_1.Module)({
            imports: [database_module_1.DatabaseModule],
            controllers: [onboarding_controller_1.OnboardingController],
            providers: __spreadArray([onboarding_service_1.OnboardingService], onboarding_providers_1.onboardingProviders, true),
        })
    ], OnboardingModule);
    return OnboardingModule;
}());
exports.OnboardingModule = OnboardingModule;
//# sourceMappingURL=onboarding.module.js.map