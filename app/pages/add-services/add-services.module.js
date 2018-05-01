"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var forms_1 = require("nativescript-angular/forms");
var shared_module_1 = require("../../shared/shared.module");
var add_services_routing_module_1 = require("./add-services-routing.module");
var add_services_component_1 = require("./add-services.component");
var animations_1 = require("nativescript-angular/animations");
var AddServicesModule = /** @class */ (function () {
    function AddServicesModule() {
    }
    AddServicesModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                add_services_routing_module_1.AddServicesRoutingModule,
                shared_module_1.SharedModule,
                animations_1.NativeScriptAnimationsModule,
                forms_1.NativeScriptFormsModule
            ],
            declarations: [
                add_services_component_1.AddServicesComponent,
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], AddServicesModule);
    return AddServicesModule;
}());
exports.AddServicesModule = AddServicesModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLXNlcnZpY2VzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFkZC1zZXJ2aWNlcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0Qsc0RBQXVFO0FBQ3ZFLG9EQUFxRTtBQUVyRSw0REFBMEQ7QUFDMUQsNkVBQXlFO0FBQ3pFLG1FQUFnRTtBQUVoRSw4REFBK0U7QUFpQi9FO0lBQUE7SUFBaUMsQ0FBQztJQUFyQixpQkFBaUI7UUFmN0IsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLGlDQUF3QjtnQkFDeEIsc0RBQXdCO2dCQUN4Qiw0QkFBWTtnQkFDWix5Q0FBNEI7Z0JBQzVCLCtCQUF1QjthQUMxQjtZQUNELFlBQVksRUFBRTtnQkFDViw2Q0FBb0I7YUFDdkI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsdUJBQWdCO2FBQ25CO1NBQ0osQ0FBQztPQUNXLGlCQUFpQixDQUFJO0lBQUQsd0JBQUM7Q0FBQSxBQUFsQyxJQUFrQztBQUFyQiw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9jb21tb25cIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcclxuXHJcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvc2hhcmVkLm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBBZGRTZXJ2aWNlc1JvdXRpbmdNb2R1bGUgfSBmcm9tIFwiLi9hZGQtc2VydmljZXMtcm91dGluZy5tb2R1bGVcIjtcclxuaW1wb3J0IHsgQWRkU2VydmljZXNDb21wb25lbnQgfSBmcm9tIFwiLi9hZGQtc2VydmljZXMuY29tcG9uZW50XCI7XHJcblxyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRBbmltYXRpb25zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2FuaW1hdGlvbnNcIjtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlLFxyXG4gICAgICAgIEFkZFNlcnZpY2VzUm91dGluZ01vZHVsZSxcclxuICAgICAgICBTaGFyZWRNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0QW5pbWF0aW9uc01vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZVxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIEFkZFNlcnZpY2VzQ29tcG9uZW50LFxyXG4gICAgXSxcclxuICAgIHNjaGVtYXM6IFtcclxuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBZGRTZXJ2aWNlc01vZHVsZSB7IH1cclxuIl19