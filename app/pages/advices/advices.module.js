"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var animations_1 = require("nativescript-angular/animations");
var forms_1 = require("nativescript-angular/forms");
var shared_module_1 = require("../../shared/shared.module");
var advices_routing_module_1 = require("./advices-routing.module");
var advices_component_1 = require("./advices.component");
var AdvicesModule = /** @class */ (function () {
    function AdvicesModule() {
    }
    AdvicesModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                advices_routing_module_1.AdvicesRoutingModule,
                shared_module_1.SharedModule,
                animations_1.NativeScriptAnimationsModule,
                forms_1.NativeScriptFormsModule
            ],
            declarations: [
                advices_component_1.AdvicesComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], AdvicesModule);
    return AdvicesModule;
}());
exports.AdvicesModule = AdvicesModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWR2aWNlcy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhZHZpY2VzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRDtBQUMzRCxzREFBdUU7QUFDdkUsOERBQStFO0FBQy9FLG9EQUFxRTtBQUVyRSw0REFBMEQ7QUFDMUQsbUVBQWdFO0FBQ2hFLHlEQUF1RDtBQWtCdkQ7SUFBQTtJQUE2QixDQUFDO0lBQWpCLGFBQWE7UUFmekIsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLGlDQUF3QjtnQkFDeEIsNkNBQW9CO2dCQUNwQiw0QkFBWTtnQkFDWix5Q0FBNEI7Z0JBQzVCLCtCQUF1QjthQUMxQjtZQUNELFlBQVksRUFBRTtnQkFDVixvQ0FBZ0I7YUFDbkI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsdUJBQWdCO2FBQ25CO1NBQ0osQ0FBQztPQUNXLGFBQWEsQ0FBSTtJQUFELG9CQUFDO0NBQUEsQUFBOUIsSUFBOEI7QUFBakIsc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9jb21tb25cIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0QW5pbWF0aW9uc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9hbmltYXRpb25zXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XHJcblxyXG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGVcIjtcclxuaW1wb3J0IHsgQWR2aWNlc1JvdXRpbmdNb2R1bGUgfSBmcm9tIFwiLi9hZHZpY2VzLXJvdXRpbmcubW9kdWxlXCI7XHJcbmltcG9ydCB7IEFkdmljZXNDb21wb25lbnQgfSBmcm9tIFwiLi9hZHZpY2VzLmNvbXBvbmVudFwiO1xyXG5cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlLFxyXG4gICAgICAgIEFkdmljZXNSb3V0aW5nTW9kdWxlLFxyXG4gICAgICAgIFNoYXJlZE1vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRBbmltYXRpb25zTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlXHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgQWR2aWNlc0NvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIHNjaGVtYXM6IFtcclxuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBZHZpY2VzTW9kdWxlIHsgfVxyXG4iXX0=