"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var animations_1 = require("nativescript-angular/animations");
var forms_1 = require("nativescript-angular/forms");
var shared_module_1 = require("../../shared/shared.module");
var all_page_routing_module_1 = require("./all-page-routing.module");
var all_page_component_1 = require("./all-page.component");
var AllVetsModule = /** @class */ (function () {
    function AllVetsModule() {
    }
    AllVetsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                all_page_routing_module_1.AllPageRoutingModule,
                shared_module_1.SharedModule,
                animations_1.NativeScriptAnimationsModule,
                forms_1.NativeScriptFormsModule
            ],
            declarations: [
                all_page_component_1.AllPageComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], AllVetsModule);
    return AllVetsModule;
}());
exports.AllVetsModule = AllVetsModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsLXBhZ2UubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWxsLXBhZ2UubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJEO0FBQzNELHNEQUF1RTtBQUN2RSw4REFBK0U7QUFDL0Usb0RBQXFFO0FBRXJFLDREQUEwRDtBQUMxRCxxRUFBaUU7QUFDakUsMkRBQXdEO0FBa0J4RDtJQUFBO0lBQTZCLENBQUM7SUFBakIsYUFBYTtRQWZ6QixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUU7Z0JBQ0wsaUNBQXdCO2dCQUN4Qiw4Q0FBb0I7Z0JBQ3BCLDRCQUFZO2dCQUNaLHlDQUE0QjtnQkFDNUIsK0JBQXVCO2FBQzFCO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLHFDQUFnQjthQUNuQjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO09BQ1csYUFBYSxDQUFJO0lBQUQsb0JBQUM7Q0FBQSxBQUE5QixJQUE4QjtBQUFqQixzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2NvbW1vblwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRBbmltYXRpb25zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2FuaW1hdGlvbnNcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcclxuXHJcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvc2hhcmVkLm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBBbGxQYWdlUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2FsbC1wYWdlLXJvdXRpbmcubW9kdWxlXCI7XHJcbmltcG9ydCB7IEFsbFBhZ2VDb21wb25lbnQgfSBmcm9tIFwiLi9hbGwtcGFnZS5jb21wb25lbnRcIjtcclxuXHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSxcclxuICAgICAgICBBbGxQYWdlUm91dGluZ01vZHVsZSxcclxuICAgICAgICBTaGFyZWRNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0QW5pbWF0aW9uc01vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZVxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIEFsbFBhZ2VDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBzY2hlbWFzOiBbXHJcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWxsVmV0c01vZHVsZSB7IH1cclxuIl19