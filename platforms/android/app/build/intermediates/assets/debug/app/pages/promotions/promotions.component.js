"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angular_1 = require("nativescript-pro-ui/sidedrawer/angular");
var sidedrawer_1 = require("nativescript-pro-ui/sidedrawer");
var router_1 = require("nativescript-angular/router");
var application_settings_1 = require("tns-core-modules/application-settings/application-settings");
var global_model_1 = require("../../consts/global.model");
var firebase_service_1 = require("../../services/firebase.service");
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';
var dialogs = require("ui/dialogs");
var PromotionsComponent = /** @class */ (function () {
    function PromotionsComponent(_routEx) {
        this._routEx = _routEx;
        this._viewAdd = false;
        this._globalComponent = new global_model_1.GlobalComponent();
        this._firebaseService = new firebase_service_1.ServiceFirebase();
    }
    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    PromotionsComponent.prototype.ngOnInit = function () {
        this._sideDrawerTransition = new sidedrawer_1.SlideInOnTopTransition();
        this.validateDataPromotions();
    };
    Object.defineProperty(PromotionsComponent.prototype, "sideDrawerTransition", {
        get: function () {
            return this._sideDrawerTransition;
        },
        enumerable: true,
        configurable: true
    });
    /* ***********************************************************
    * According to guidelines, if you have a drawer on your page, you should always
    * have a button that opens it. Use the showDrawer() function to open the app drawer section.
    *************************************************************/
    PromotionsComponent.prototype.onDrawerButtonTap = function () {
        this.drawerComponent.sideDrawer.showDrawer();
    };
    /**
     * mostrarConfiguracionHorario
     */
    PromotionsComponent.prototype.addPromotions = function () {
        /* this._viewInit = true;
         this._viewAdd = false;
         let options = {
             context: {},
             fullscreen: false,
             viewContainerRef: this.vcRef
         };
         this.modal.showModal(AddServiceModal, options).then(res => {
             console.log("Response after close PopUp"+res);
             this._globalComponent.loadingView();
             if (res !== undefined) {
                 this.getDataServices();
                 this._viewInit = false;
                 this._viewAdd = true;
             }else{
                 this.getDataServices();
                 this._viewInit = false;
                 this._viewAdd = true;
                 
             }*/
        this._routEx.navigate(['add-promotions'], {
            transition: {
                name: "slide",
                duration: 400,
                curve: "ease"
            }
        });
        //});
    };
    /**
     * validateUser
     */
    PromotionsComponent.prototype.validateDataPromotions = function () {
        var _this = this;
        this.arregloProductos = [];
        this._globalComponent.validateDataRegisterVetrinaty(application_settings_1.getString('idLogin')).then(function (response) {
            console.log("Mensaje" + JSON.stringify(response) + application_settings_1.getString('idLogin'));
            var res = response.value;
            console.log("RESPONSE PROMOCIONES" + res);
            if (res !== null && res !== undefined) {
                var servicios = response.value.promociones;
                console.log("Serviicos ANY" + servicios);
                if (servicios !== null && servicios !== undefined) {
                    console.log("Promociones" + servicios);
                    _this.arregloProductos = [];
                    for (var i = 0; i < servicios.length; i++) {
                        if (servicios[i] !== null) {
                            var nombre = servicios[i].nombre;
                            var descripcion = servicios[i].descripcion;
                            var precio = servicios[i].precio;
                            console.log(nombre + descripcion);
                            _this.arregloProductos.push({
                                idPro: i,
                                title: nombre,
                                precio: "$" + precio,
                                description: descripcion
                            });
                            _this._addService = true;
                        }
                    }
                }
                _this._addService = true;
                if (_this.arregloProductos.length <= 0) {
                    _this._viewAdd = true;
                }
                else {
                    _this._viewAdd = false;
                }
            }
            else {
                _this._globalComponent.viewMessage("Por favor registra tu veterinaria, es necesario para crear promociones.");
                _this._routEx.navigate(['home'], {
                    transition: {
                        name: "fade",
                        duration: 400,
                        curve: "ease"
                    }
                });
            }
        });
    };
    /**
    * deleteService
    */
    PromotionsComponent.prototype.deleteService = function (numero, nombre) {
        var _this = this;
        dialogs.confirm({
            title: "Alerta",
            message: "¿ Realmente deseas eliminar el servicio " + nombre + " ?",
            okButtonText: "NO",
            cancelButtonText: "Cancelar",
            neutralButtonText: "SI"
        }).then(function (result) {
            // result argument is boolean
            console.log("Dialog result: " + result);
            if (result === undefined) {
                _this._globalComponent.loadingView();
                var id = application_settings_1.getString('idLogin');
                var url = "veterinariasRegistradas/" + id + "/" + "promociones/" + numero;
                console.log("Url a eliminar" + url);
                _this._firebaseService.deleteServices(url).then(function (response) {
                    console.log(Response);
                    _this.arregloProductos = [];
                    _this.validateDataPromotions();
                });
                _this._globalComponent.loadingHide();
            }
        });
    };
    __decorate([
        core_1.ViewChild("drawer"),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], PromotionsComponent.prototype, "drawerComponent", void 0);
    PromotionsComponent = __decorate([
        core_1.Component({
            selector: 'promotions',
            templateUrl: './pages/promotions/promotions.component.html',
            styleUrls: ['./pages/promotions/promotions.component.css']
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions])
    ], PromotionsComponent);
    return PromotionsComponent;
}());
exports.PromotionsComponent = PromotionsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbW90aW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcm9tb3Rpb25zLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCxrRUFBZ0Y7QUFDaEYsNkRBQThGO0FBQzlGLHNEQUErRDtBQUMvRCxtR0FBdUY7QUFDdkYsMERBQTREO0FBQzVELG9FQUFrRTtBQUNsRSwwREFBMEQ7QUFDMUQsNENBQTRDO0FBQzVDLDhDQUE4QztBQUM5QyxtREFBbUQ7QUFFbkQsb0NBQXNDO0FBUXRDO0lBbUNJLDZCQUFvQixPQUF5QjtRQUF6QixZQUFPLEdBQVAsT0FBTyxDQUFrQjtRQTdCN0MsYUFBUSxHQUFHLEtBQUssQ0FBQztRQThCYixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSw4QkFBZSxFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksa0NBQWUsRUFBRSxDQUFDO0lBQ2xELENBQUM7SUF2QkQ7O2tFQUU4RDtJQUM5RCxzQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksbUNBQXNCLEVBQUUsQ0FBQztRQUMxRCxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsc0JBQUkscURBQW9CO2FBQXhCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztRQUN0QyxDQUFDOzs7T0FBQTtJQUVEOzs7a0VBRzhEO0lBQzlELCtDQUFpQixHQUFqQjtRQUNJLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pELENBQUM7SUFPRDs7T0FFRztJQUNJLDJDQUFhLEdBQXBCO1FBQ0k7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0JBbUJRO1FBQ1IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1lBQ3RDLFVBQVUsRUFBRTtnQkFD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QUFDO2dCQUNsQyxDQUFDLENBQUMsQ0FBQztnQkFFSCxLQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDeEMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQXhKb0I7UUFBcEIsZ0JBQVMsQ0FBQyxRQUFRLENBQUM7a0NBQWtCLGdDQUFzQjtnRUFBQztJQVhwRCxtQkFBbUI7UUFOL0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFdBQVcsRUFBRSw4Q0FBOEM7WUFDM0QsU0FBUyxFQUFFLENBQUMsNkNBQTZDLENBQUM7U0FDN0QsQ0FBQzt5Q0FxQytCLHlCQUFnQjtPQW5DcEMsbUJBQW1CLENBcUsvQjtJQUFELDBCQUFDO0NBQUEsQUFyS0QsSUFxS0M7QUFyS1ksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1wcm8tdWkvc2lkZWRyYXdlci9hbmd1bGFyJztcbmltcG9ydCB7IERyYXdlclRyYW5zaXRpb25CYXNlLCBTbGlkZUluT25Ub3BUcmFuc2l0aW9uIH0gZnJvbSAnbmF0aXZlc2NyaXB0LXByby11aS9zaWRlZHJhd2VyJztcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgZ2V0U3RyaW5nIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5ncy9hcHBsaWNhdGlvbi1zZXR0aW5ncyc7XG5pbXBvcnQgeyBHbG9iYWxDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb25zdHMvZ2xvYmFsLm1vZGVsJztcbmltcG9ydCB7IFNlcnZpY2VGaXJlYmFzZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2ZpcmViYXNlLnNlcnZpY2UnO1xuLy9pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXInO1xuLy9pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tICd1aS90ZXh0LWZpZWxkJztcbi8vaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcbi8vaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncHJvbW90aW9ucycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3BhZ2VzL3Byb21vdGlvbnMvcHJvbW90aW9ucy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vcGFnZXMvcHJvbW90aW9ucy9wcm9tb3Rpb25zLmNvbXBvbmVudC5jc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIFByb21vdGlvbnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgX2ZpcmViYXNlU2VydmljZTogU2VydmljZUZpcmViYXNlO1xuICAgIF9nbG9iYWxDb21wb25lbnQ6IEdsb2JhbENvbXBvbmVudDtcbiAgICBhcnJlZ2xvUHJvZHVjdG9zOiBhbnlbXTtcbiAgICBfYWRkU2VydmljZTogYm9vbGVhbjtcbiAgICBfdmlld0FkZCA9IGZhbHNlO1xuXHQvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICogVXNlIHRoZSBAVmlld0NoaWxkIGRlY29yYXRvciB0byBnZXQgYSByZWZlcmVuY2UgdG8gdGhlIGRyYXdlciBjb21wb25lbnQuXG4gICAgKiBJdCBpcyB1c2VkIGluIHRoZSBcIm9uRHJhd2VyQnV0dG9uVGFwXCIgZnVuY3Rpb24gYmVsb3cgdG8gbWFuaXB1bGF0ZSB0aGUgZHJhd2VyLlxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgQFZpZXdDaGlsZChcImRyYXdlclwiKSBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XG5cbiAgICBwcml2YXRlIF9zaWRlRHJhd2VyVHJhbnNpdGlvbjogRHJhd2VyVHJhbnNpdGlvbkJhc2U7XG5cbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICogVXNlIHRoZSBzaWRlRHJhd2VyVHJhbnNpdGlvbiBwcm9wZXJ0eSB0byBjaGFuZ2UgdGhlIG9wZW4vY2xvc2UgYW5pbWF0aW9uIG9mIHRoZSBkcmF3ZXIuXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb24gPSBuZXcgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbigpO1xuICAgICAgICB0aGlzLnZhbGlkYXRlRGF0YVByb21vdGlvbnMoKTtcbiAgICB9XG5cbiAgICBnZXQgc2lkZURyYXdlclRyYW5zaXRpb24oKTogRHJhd2VyVHJhbnNpdGlvbkJhc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb247XG4gICAgfVxuXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgICAqIEFjY29yZGluZyB0byBndWlkZWxpbmVzLCBpZiB5b3UgaGF2ZSBhIGRyYXdlciBvbiB5b3VyIHBhZ2UsIHlvdSBzaG91bGQgYWx3YXlzXG4gICAgKiBoYXZlIGEgYnV0dG9uIHRoYXQgb3BlbnMgaXQuIFVzZSB0aGUgc2hvd0RyYXdlcigpIGZ1bmN0aW9uIHRvIG9wZW4gdGhlIGFwcCBkcmF3ZXIgc2VjdGlvbi5cbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIG9uRHJhd2VyQnV0dG9uVGFwKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRyYXdlckNvbXBvbmVudC5zaWRlRHJhd2VyLnNob3dEcmF3ZXIoKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yb3V0RXg6IFJvdXRlckV4dGVuc2lvbnMpIHtcbiAgICAgICAgdGhpcy5fZ2xvYmFsQ29tcG9uZW50ID0gbmV3IEdsb2JhbENvbXBvbmVudCgpO1xuICAgICAgICB0aGlzLl9maXJlYmFzZVNlcnZpY2UgPSBuZXcgU2VydmljZUZpcmViYXNlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogbW9zdHJhckNvbmZpZ3VyYWNpb25Ib3JhcmlvXG4gICAgICovXG4gICAgcHVibGljIGFkZFByb21vdGlvbnMoKSB7XG4gICAgICAgIC8qIHRoaXMuX3ZpZXdJbml0ID0gdHJ1ZTtcbiAgICAgICAgIHRoaXMuX3ZpZXdBZGQgPSBmYWxzZTtcbiAgICAgICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICAgICAgIGNvbnRleHQ6IHt9LFxuICAgICAgICAgICAgIGZ1bGxzY3JlZW46IGZhbHNlLFxuICAgICAgICAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWZcbiAgICAgICAgIH07XG4gICAgICAgICB0aGlzLm1vZGFsLnNob3dNb2RhbChBZGRTZXJ2aWNlTW9kYWwsIG9wdGlvbnMpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlc3BvbnNlIGFmdGVyIGNsb3NlIFBvcFVwXCIrcmVzKTtcbiAgICAgICAgICAgICB0aGlzLl9nbG9iYWxDb21wb25lbnQubG9hZGluZ1ZpZXcoKTtcbiAgICAgICAgICAgICBpZiAocmVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgdGhpcy5nZXREYXRhU2VydmljZXMoKTtcbiAgICAgICAgICAgICAgICAgdGhpcy5fdmlld0luaXQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgdGhpcy5fdmlld0FkZCA9IHRydWU7XG4gICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgIHRoaXMuZ2V0RGF0YVNlcnZpY2VzKCk7XG4gICAgICAgICAgICAgICAgIHRoaXMuX3ZpZXdJbml0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgIHRoaXMuX3ZpZXdBZGQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICB9Ki9cbiAgICAgICAgdGhpcy5fcm91dEV4Lm5hdmlnYXRlKFsnYWRkLXByb21vdGlvbnMnXSwge1xuICAgICAgICAgICAgdHJhbnNpdGlvbjoge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwic2xpZGVcIixcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjogNDAwLFxuICAgICAgICAgICAgICAgIGN1cnZlOiBcImVhc2VcIlxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuXG4gICAgICAgIC8vfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdmFsaWRhdGVVc2VyXG4gICAgICovXG4gICAgcHVibGljIHZhbGlkYXRlRGF0YVByb21vdGlvbnMoKSB7XG4gICAgICAgIHRoaXMuYXJyZWdsb1Byb2R1Y3RvcyA9IFtdO1xuICAgICAgICB0aGlzLl9nbG9iYWxDb21wb25lbnQudmFsaWRhdGVEYXRhUmVnaXN0ZXJWZXRyaW5hdHkoZ2V0U3RyaW5nKCdpZExvZ2luJykpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJNZW5zYWplXCIgKyBKU09OLnN0cmluZ2lmeShyZXNwb25zZSkgKyBnZXRTdHJpbmcoJ2lkTG9naW4nKSk7XG4gICAgICAgICAgICBsZXQgcmVzID0gcmVzcG9uc2UudmFsdWU7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJFU1BPTlNFIFBST01PQ0lPTkVTXCIgKyByZXMpO1xuICAgICAgICAgICAgaWYgKHJlcyAhPT0gbnVsbCAmJiByZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGxldCBzZXJ2aWNpb3MgPSByZXNwb25zZS52YWx1ZS5wcm9tb2Npb25lcztcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNlcnZpaWNvcyBBTllcIitzZXJ2aWNpb3MpXG4gICAgICAgICAgICAgICAgaWYgKHNlcnZpY2lvcyAhPT0gbnVsbCAmJiBzZXJ2aWNpb3MgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlByb21vY2lvbmVzXCIgKyBzZXJ2aWNpb3MpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFycmVnbG9Qcm9kdWN0b3MgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZXJ2aWNpb3MubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlcnZpY2lvc1tpXSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBub21icmUgPSBzZXJ2aWNpb3NbaV0ubm9tYnJlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkZXNjcmlwY2lvbiA9IHNlcnZpY2lvc1tpXS5kZXNjcmlwY2lvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHJlY2lvID0gc2VydmljaW9zW2ldLnByZWNpbztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG5vbWJyZSArIGRlc2NyaXBjaW9uKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyZWdsb1Byb2R1Y3Rvcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWRQcm86IGksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBub21icmUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZWNpbzogXCIkXCIgKyBwcmVjaW8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwY2lvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWRkU2VydmljZSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fYWRkU2VydmljZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5hcnJlZ2xvUHJvZHVjdG9zLmxlbmd0aCA8PSAwKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlld0FkZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZXdBZGQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2dsb2JhbENvbXBvbmVudC52aWV3TWVzc2FnZShcIlBvciBmYXZvciByZWdpc3RyYSB0dSB2ZXRlcmluYXJpYSwgZXMgbmVjZXNhcmlvIHBhcmEgY3JlYXIgcHJvbW9jaW9uZXMuXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JvdXRFeC5uYXZpZ2F0ZShbJ2hvbWUnXSwge1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImZhZGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiA0MDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJ2ZTogXCJlYXNlXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBkZWxldGVTZXJ2aWNlXG4gICAgKi9cbiAgICBwdWJsaWMgZGVsZXRlU2VydmljZShudW1lcm8sIG5vbWJyZSkge1xuICAgICAgICBkaWFsb2dzLmNvbmZpcm0oe1xuICAgICAgICAgICAgdGl0bGU6IFwiQWxlcnRhXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBcIsK/IFJlYWxtZW50ZSBkZXNlYXMgZWxpbWluYXIgZWwgc2VydmljaW8gXCIgKyBub21icmUgKyBcIiA/XCIsXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiTk9cIixcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsYXJcIixcbiAgICAgICAgICAgIG5ldXRyYWxCdXR0b25UZXh0OiBcIlNJXCJcbiAgICAgICAgfSkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgLy8gcmVzdWx0IGFyZ3VtZW50IGlzIGJvb2xlYW5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGlhbG9nIHJlc3VsdDogXCIgKyByZXN1bHQpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZ2xvYmFsQ29tcG9uZW50LmxvYWRpbmdWaWV3KCk7XG4gICAgICAgICAgICAgICAgbGV0IGlkID0gZ2V0U3RyaW5nKCdpZExvZ2luJyk7XG4gICAgICAgICAgICAgICAgbGV0IHVybCA9IFwidmV0ZXJpbmFyaWFzUmVnaXN0cmFkYXMvXCIgKyBpZCArIFwiL1wiICsgXCJwcm9tb2Npb25lcy9cIiArIG51bWVybztcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVybCBhIGVsaW1pbmFyXCIgKyB1cmwpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZpcmViYXNlU2VydmljZS5kZWxldGVTZXJ2aWNlcyh1cmwpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhSZXNwb25zZSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJlZ2xvUHJvZHVjdG9zID0gW107XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsaWRhdGVEYXRhUHJvbW90aW9ucygpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2xvYmFsQ29tcG9uZW50LmxvYWRpbmdIaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG59Il19