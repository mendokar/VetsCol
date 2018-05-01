"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var forms_1 = require("nativescript-angular/forms");
var shared_module_1 = require("../../shared/shared.module");
var add_vets_routing_module_1 = require("./add-vets-routing.module");
var add_vets_component_1 = require("./add-vets.component");
var animations_1 = require("nativescript-angular/animations");
var angular_1 = require("nativescript-checkbox/angular");
var AddVetsModule = /** @class */ (function () {
    function AddVetsModule() {
    }
    AddVetsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                add_vets_routing_module_1.AddVetsRoutingModule,
                shared_module_1.SharedModule,
                animations_1.NativeScriptAnimationsModule,
                forms_1.NativeScriptFormsModule,
                angular_1.TNSCheckBoxModule
            ],
            declarations: [
                add_vets_component_1.AddVetsComponent,
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], AddVetsModule);
    return AddVetsModule;
}());
exports.AddVetsModule = AddVetsModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLXZldHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWRkLXZldHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJEO0FBQzNELHNEQUF1RTtBQUN2RSxvREFBcUU7QUFFckUsNERBQTBEO0FBQzFELHFFQUFpRTtBQUNqRSwyREFBd0Q7QUFFeEQsOERBQStFO0FBRS9FLHlEQUFrRTtBQWtCbEU7SUFBQTtJQUE2QixDQUFDO0lBQWpCLGFBQWE7UUFoQnpCLGVBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRTtnQkFDTCxpQ0FBd0I7Z0JBQ3hCLDhDQUFvQjtnQkFDcEIsNEJBQVk7Z0JBQ1oseUNBQTRCO2dCQUM1QiwrQkFBdUI7Z0JBQ3ZCLDJCQUFpQjthQUNwQjtZQUNELFlBQVksRUFBRTtnQkFDVixxQ0FBZ0I7YUFDbkI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsdUJBQWdCO2FBQ25CO1NBQ0osQ0FBQztPQUNXLGFBQWEsQ0FBSTtJQUFELG9CQUFDO0NBQUEsQUFBOUIsSUFBOEI7QUFBakIsc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9jb21tb25cIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcclxuXHJcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvc2hhcmVkLm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBBZGRWZXRzUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2FkZC12ZXRzLXJvdXRpbmcubW9kdWxlXCI7XHJcbmltcG9ydCB7IEFkZFZldHNDb21wb25lbnQgfSBmcm9tIFwiLi9hZGQtdmV0cy5jb21wb25lbnRcIjtcclxuXHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEFuaW1hdGlvbnNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvYW5pbWF0aW9uc1wiO1xyXG5cclxuaW1wb3J0IHsgVE5TQ2hlY2tCb3hNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtY2hlY2tib3gvYW5ndWxhcic7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSxcclxuICAgICAgICBBZGRWZXRzUm91dGluZ01vZHVsZSxcclxuICAgICAgICBTaGFyZWRNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0QW5pbWF0aW9uc01vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcclxuICAgICAgICBUTlNDaGVja0JveE1vZHVsZVxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIEFkZFZldHNDb21wb25lbnQsXHJcbiAgICBdLFxyXG4gICAgc2NoZW1hczogW1xyXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFkZFZldHNNb2R1bGUgeyB9XHJcbiJdfQ==