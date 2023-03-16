"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onboardingProviders = void 0;
var onboarding_instance_entity_1 = require("./entities/onboarding-instance.entity");
exports.onboardingProviders = [
    {
        provide: 'ONBOARDING_REPOSITORY',
        useFactory: function (dataSource) {
            return dataSource.getRepository(onboarding_instance_entity_1.OnboardingInstanceEntity);
        },
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=onboarding.providers.js.map