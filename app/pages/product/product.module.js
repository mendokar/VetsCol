"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var shared_module_1 = require("../../shared/shared.module");
var product_routing_module_1 = require("./product-routing.module");
var product_component_1 = require("./product.component");
var animations_1 = require("nativescript-angular/animations");
var add_product_modal_1 = require("./add-product/add-product.modal");
var element_registry_1 = require("nativescript-angular/element-registry");
element_registry_1.registerElement('ImageCacheIt', function () { return require('nativescript-image-cache-it').ImageCacheIt; });
var ProductModule = /** @class */ (function () {
    function ProductModule() {
    }
    ProductModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.NativeScriptCommonModule,
                product_routing_module_1.ProductRoutingModule,
                shared_module_1.SharedModule,
                animations_1.NativeScriptAnimationsModule
            ],
            declarations: [
                product_component_1.ProductComponent,
                add_product_modal_1.AddProductModal
            ],
            entryComponents: [add_product_modal_1.AddProductModal],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], ProductModule);
    return ProductModule;
}());
exports.ProductModule = ProductModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcm9kdWN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRDtBQUMzRCxzREFBdUU7QUFFdkUsNERBQTBEO0FBQzFELG1FQUFnRTtBQUNoRSx5REFBdUQ7QUFFdkQsOERBQStFO0FBRS9FLHFFQUFrRTtBQUVsRSwwRUFBd0U7QUFBQyxrQ0FBZSxDQUFDLGNBQWMsRUFBRSxjQUFNLE9BQUEsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUMsWUFBWSxFQUFuRCxDQUFtRCxDQUFDLENBQUM7QUFrQnBLO0lBQUE7SUFBNkIsQ0FBQztJQUFqQixhQUFhO1FBaEJ6QixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUU7Z0JBQ0wsaUNBQXdCO2dCQUN4Qiw2Q0FBb0I7Z0JBQ3BCLDRCQUFZO2dCQUNaLHlDQUE0QjthQUMvQjtZQUNELFlBQVksRUFBRTtnQkFDVixvQ0FBZ0I7Z0JBQ2hCLG1DQUFlO2FBQ2xCO1lBQ0QsZUFBZSxFQUFDLENBQUMsbUNBQWUsQ0FBQztZQUNqQyxPQUFPLEVBQUU7Z0JBQ0wsdUJBQWdCO2FBQ25CO1NBQ0osQ0FBQztPQUNXLGFBQWEsQ0FBSTtJQUFELG9CQUFDO0NBQUEsQUFBOUIsSUFBOEI7QUFBakIsc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9jb21tb25cIjtcclxuXHJcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvc2hhcmVkLm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBQcm9kdWN0Um91dGluZ01vZHVsZSB9IGZyb20gXCIuL3Byb2R1Y3Qtcm91dGluZy5tb2R1bGVcIjtcclxuaW1wb3J0IHsgUHJvZHVjdENvbXBvbmVudCB9IGZyb20gXCIuL3Byb2R1Y3QuY29tcG9uZW50XCI7XHJcblxyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRBbmltYXRpb25zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2FuaW1hdGlvbnNcIjtcclxuXHJcbmltcG9ydCB7IEFkZFByb2R1Y3RNb2RhbCB9IGZyb20gXCIuL2FkZC1wcm9kdWN0L2FkZC1wcm9kdWN0Lm1vZGFsXCI7XHJcblxyXG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5JzsgcmVnaXN0ZXJFbGVtZW50KCdJbWFnZUNhY2hlSXQnLCAoKSA9PiByZXF1aXJlKCduYXRpdmVzY3JpcHQtaW1hZ2UtY2FjaGUtaXQnKS5JbWFnZUNhY2hlSXQpO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUsXHJcbiAgICAgICAgUHJvZHVjdFJvdXRpbmdNb2R1bGUsXHJcbiAgICAgICAgU2hhcmVkTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEFuaW1hdGlvbnNNb2R1bGVcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBQcm9kdWN0Q29tcG9uZW50LFxyXG4gICAgICAgIEFkZFByb2R1Y3RNb2RhbFxyXG4gICAgXSxcclxuICAgIGVudHJ5Q29tcG9uZW50czpbQWRkUHJvZHVjdE1vZGFsXSxcclxuICAgIHNjaGVtYXM6IFtcclxuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQcm9kdWN0TW9kdWxlIHsgfVxyXG4iXX0=