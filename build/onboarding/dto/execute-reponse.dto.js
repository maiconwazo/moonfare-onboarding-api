"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecuteResponseDTO = void 0;
var ExecuteResponseDTO = /** @class */ (function () {
    function ExecuteResponseDTO(instanceId, nextStep) {
        this.instanceId = instanceId;
        this.nextStep = nextStep;
    }
    ExecuteResponseDTO.prototype.toGrpcMessage = function () {
        return {
            instanceId: this.instanceId,
            nextStep: this.nextStep,
        };
    };
    return ExecuteResponseDTO;
}());
exports.ExecuteResponseDTO = ExecuteResponseDTO;
//# sourceMappingURL=execute-reponse.dto.js.map