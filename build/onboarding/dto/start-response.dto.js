"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartResponseDTO = void 0;
var StartResponseDTO = /** @class */ (function () {
    function StartResponseDTO(instanceId) {
        this.instanceId = instanceId;
    }
    StartResponseDTO.prototype.toGrpcMessage = function () {
        return {
            instanceId: this.instanceId,
        };
    };
    return StartResponseDTO;
}());
exports.StartResponseDTO = StartResponseDTO;
//# sourceMappingURL=start-response.dto.js.map