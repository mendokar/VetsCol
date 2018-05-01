"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var animations_1 = require("nativescript-angular/animations");
var shared_module_1 = require("../../shared/shared.module");
var create_vets_routing_module_1 = require("./create-vets-routing.module");
var create_vets_component_1 = require("./create-vets.component");
var CreateVetsModule = /** @class */ (function () {
    function CreateVetsModule() {
    }
    CreateVetsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                create_vets_routing_module_1.CreateVetsRoutingModule,
                shared_module_1.SharedModule,
                animations_1.NativeScriptAnimationsModule
            ],
            declarations: [
                create_vets_component_1.CreateVetsComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], CreateVetsModule);
    return CreateVetsModule;
}());
exports.CreateVetsModule = CreateVetsModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXZldHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3JlYXRlLXZldHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJEO0FBQzNELHNEQUF1RTtBQUN2RSw4REFBK0U7QUFFL0UsNERBQTBEO0FBQzFELDJFQUF1RTtBQUN2RSxpRUFBOEQ7QUFpQjlEO0lBQUE7SUFBZ0MsQ0FBQztJQUFwQixnQkFBZ0I7UUFkNUIsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLGlDQUF3QjtnQkFDeEIsb0RBQXVCO2dCQUN2Qiw0QkFBWTtnQkFDWix5Q0FBNEI7YUFDL0I7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsMkNBQW1CO2FBQ3RCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHVCQUFnQjthQUNuQjtTQUNKLENBQUM7T0FDVyxnQkFBZ0IsQ0FBSTtJQUFELHVCQUFDO0NBQUEsQUFBakMsSUFBaUM7QUFBcEIsNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvYW5pbWF0aW9uc1wiO1xyXG5cclxuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9zaGFyZWQubW9kdWxlXCI7XHJcbmltcG9ydCB7IENyZWF0ZVZldHNSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIi4vY3JlYXRlLXZldHMtcm91dGluZy5tb2R1bGVcIjtcclxuaW1wb3J0IHsgQ3JlYXRlVmV0c0NvbXBvbmVudCB9IGZyb20gXCIuL2NyZWF0ZS12ZXRzLmNvbXBvbmVudFwiO1xyXG5cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlLFxyXG4gICAgICAgIENyZWF0ZVZldHNSb3V0aW5nTW9kdWxlLFxyXG4gICAgICAgIFNoYXJlZE1vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRBbmltYXRpb25zTW9kdWxlXHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgQ3JlYXRlVmV0c0NvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIHNjaGVtYXM6IFtcclxuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDcmVhdGVWZXRzTW9kdWxlIHsgfVxyXG4iXX0=