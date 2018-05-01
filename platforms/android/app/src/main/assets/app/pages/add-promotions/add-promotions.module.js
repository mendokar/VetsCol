"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var forms_1 = require("nativescript-angular/forms");
var shared_module_1 = require("../../shared/shared.module");
var add_promotions_routing_module_1 = require("./add-promotions-routing.module");
var add_promotions_component_1 = require("./add-promotions.component");
var animations_1 = require("nativescript-angular/animations");
var AddPromotionsModule = /** @class */ (function () {
    function AddPromotionsModule() {
    }
    AddPromotionsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                add_promotions_routing_module_1.AddPromotionsRoutingModule,
                shared_module_1.SharedModule,
                animations_1.NativeScriptAnimationsModule,
                forms_1.NativeScriptFormsModule
            ],
            declarations: [
                add_promotions_component_1.AddPromotionsComponent,
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], AddPromotionsModule);
    return AddPromotionsModule;
}());
exports.AddPromotionsModule = AddPromotionsModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLXByb21vdGlvbnMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWRkLXByb21vdGlvbnMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJEO0FBQzNELHNEQUF1RTtBQUN2RSxvREFBcUU7QUFFckUsNERBQTBEO0FBQzFELGlGQUE2RTtBQUM3RSx1RUFBb0U7QUFFcEUsOERBQStFO0FBaUIvRTtJQUFBO0lBQW1DLENBQUM7SUFBdkIsbUJBQW1CO1FBZi9CLGVBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRTtnQkFDTCxpQ0FBd0I7Z0JBQ3hCLDBEQUEwQjtnQkFDMUIsNEJBQVk7Z0JBQ1oseUNBQTRCO2dCQUM1QiwrQkFBdUI7YUFDMUI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsaURBQXNCO2FBQ3pCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHVCQUFnQjthQUNuQjtTQUNKLENBQUM7T0FDVyxtQkFBbUIsQ0FBSTtJQUFELDBCQUFDO0NBQUEsQUFBcEMsSUFBb0M7QUFBdkIsa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XHJcblxyXG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGVcIjtcclxuaW1wb3J0IHsgQWRkUHJvbW90aW9uc1JvdXRpbmdNb2R1bGUgfSBmcm9tIFwiLi9hZGQtcHJvbW90aW9ucy1yb3V0aW5nLm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBBZGRQcm9tb3Rpb25zQ29tcG9uZW50IH0gZnJvbSBcIi4vYWRkLXByb21vdGlvbnMuY29tcG9uZW50XCI7XHJcblxyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRBbmltYXRpb25zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2FuaW1hdGlvbnNcIjtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlLFxyXG4gICAgICAgIEFkZFByb21vdGlvbnNSb3V0aW5nTW9kdWxlLFxyXG4gICAgICAgIFNoYXJlZE1vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRBbmltYXRpb25zTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlXHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgQWRkUHJvbW90aW9uc0NvbXBvbmVudCxcclxuICAgIF0sXHJcbiAgICBzY2hlbWFzOiBbXHJcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWRkUHJvbW90aW9uc01vZHVsZSB7IH1cclxuIl19