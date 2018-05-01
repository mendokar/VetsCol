"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var forms_1 = require("nativescript-angular/forms");
var shared_module_1 = require("../../shared/shared.module");
var forgot_pass_routing_module_1 = require("./forgot-pass-routing.module");
var forgot_pass_component_1 = require("./forgot-pass.component");
var ForgotPassModule = /** @class */ (function () {
    function ForgotPassModule() {
    }
    ForgotPassModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                forgot_pass_routing_module_1.ForgotPassRoutingModule,
                shared_module_1.SharedModule,
                forms_1.NativeScriptFormsModule
            ],
            declarations: [
                forgot_pass_component_1.ForgotPassComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], ForgotPassModule);
    return ForgotPassModule;
}());
exports.ForgotPassModule = ForgotPassModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yZ290LXBhc3MubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZm9yZ290LXBhc3MubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJEO0FBQzNELHNEQUF1RTtBQUN2RSxvREFBcUU7QUFFckUsNERBQTBEO0FBQzFELDJFQUF1RTtBQUN2RSxpRUFBOEQ7QUFnQjlEO0lBQUE7SUFBZ0MsQ0FBQztJQUFwQixnQkFBZ0I7UUFkNUIsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLGlDQUF3QjtnQkFDeEIsb0RBQXVCO2dCQUN2Qiw0QkFBWTtnQkFDWiwrQkFBdUI7YUFDMUI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsMkNBQW1CO2FBQ3RCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHVCQUFnQjthQUNuQjtTQUNKLENBQUM7T0FDVyxnQkFBZ0IsQ0FBSTtJQUFELHVCQUFDO0NBQUEsQUFBakMsSUFBaUM7QUFBcEIsNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XHJcblxyXG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGVcIjtcclxuaW1wb3J0IHsgRm9yZ290UGFzc1JvdXRpbmdNb2R1bGUgfSBmcm9tIFwiLi9mb3Jnb3QtcGFzcy1yb3V0aW5nLm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBGb3Jnb3RQYXNzQ29tcG9uZW50IH0gZnJvbSBcIi4vZm9yZ290LXBhc3MuY29tcG9uZW50XCI7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSxcclxuICAgICAgICBGb3Jnb3RQYXNzUm91dGluZ01vZHVsZSxcclxuICAgICAgICBTaGFyZWRNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGVcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBGb3Jnb3RQYXNzQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgc2NoZW1hczogW1xyXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEZvcmdvdFBhc3NNb2R1bGUgeyB9XHJcbiJdfQ==