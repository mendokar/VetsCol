"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
var const_model_1 = require("../consts/const.model");
var MapsService = /** @class */ (function () {
    function MapsService(http) {
        this.http = http;
        this.url = "";
        this._consts = new const_model_1.ConstsModels;
    }
    MapsService.prototype.getDataMapsTest = function () {
        this.serverUrl = this._consts.ulrMapsTest;
        return this.http.get(this.serverUrl).do(function (res) { return res; });
    };
    MapsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], MapsService);
    return MapsService;
}());
exports.MapsService = MapsService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFwcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLHNDQUF3RDtBQUt4RCxpQ0FBK0I7QUFDL0IsZ0NBQThCO0FBQzlCLHFEQUFxRDtBQUdyRDtJQU1JLHFCQUFvQixJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUw5QixRQUFHLEdBQVEsRUFBRSxDQUFDO1FBTVYsSUFBSSxDQUFDLE9BQU8sR0FBRSxJQUFJLDBCQUFZLENBQUM7SUFDbkMsQ0FBQztJQUVELHFDQUFlLEdBQWY7UUFDSSxJQUFJLENBQUMsU0FBUyxHQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO1FBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxFQUFILENBQUcsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFiUSxXQUFXO1FBRHZCLGlCQUFVLEVBQUU7eUNBT2lCLFdBQUk7T0FOckIsV0FBVyxDQWV2QjtJQUFELGtCQUFDO0NBQUEsQUFmRCxJQWVDO0FBZlksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIGFzIFJ4T2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcclxuXHJcblxyXG5cclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XHJcbmltcG9ydCB7IENvbnN0c01vZGVscyB9IGZyb20gXCIuLi9jb25zdHMvY29uc3QubW9kZWxcIjtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE1hcHNTZXJ2aWNlIHtcclxuICAgIHVybDpzdHJpbmc9XCJcIjtcclxuXHJcbiAgICBfY29uc3RzOiBDb25zdHNNb2RlbHM7XHJcbiAgICBwcml2YXRlIHNlcnZlclVybDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHApIHsgXHJcbiAgICAgICAgdGhpcy5fY29uc3RzPSBuZXcgQ29uc3RzTW9kZWxzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERhdGFNYXBzVGVzdCgpe1xyXG4gICAgICAgIHRoaXMuc2VydmVyVXJsID10aGlzLl9jb25zdHMudWxyTWFwc1Rlc3Q7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5zZXJ2ZXJVcmwpLmRvKHJlcyA9PiByZXMpO1xyXG4gICAgfVxyXG5cclxufSJdfQ==