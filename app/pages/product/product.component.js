"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var sidedrawer_1 = require("nativescript-pro-ui/sidedrawer");
var angular_1 = require("nativescript-pro-ui/sidedrawer/angular");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var page_1 = require("tns-core-modules/ui/page/page");
var router_1 = require("nativescript-angular/router");
var global_model_1 = require("../../consts/global.model");
var application_settings_1 = require("tns-core-modules/application-settings/application-settings");
var firebase_service_1 = require("../../services/firebase.service");
var dialogs = require("ui/dialogs");
var ProductComponent = /** @class */ (function () {
    function ProductComponent(vcRef, modal, _page, _routEx) {
        this.vcRef = vcRef;
        this.modal = modal;
        this._page = _page;
        this._routEx = _routEx;
        this.arregloProductos = [];
        this._viewAdd = false;
        this._globalComponent = new global_model_1.GlobalComponent();
        this._serviceFirebase = new firebase_service_1.ServiceFirebase();
    }
    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ProductComponent.prototype.ngOnInit = function () {
        this._sideDrawerTransition = new sidedrawer_1.SlideInOnTopTransition();
        this._globalComponent.loadingView();
        this.validateDataProducts();
    };
    Object.defineProperty(ProductComponent.prototype, "sideDrawerTransition", {
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
    ProductComponent.prototype.onDrawerButtonTap = function () {
        this.drawerComponent.sideDrawer.showDrawer();
    };
    /**
     * mostrarConfiguracionHorario
     */
    ProductComponent.prototype.addProducts = function () {
        /*let options = {
            context: {},
            fullscreen: false,
            viewContainerRef: this.vcRef
        };
        this.modal.showModal(AddProductModal, options).then(res => {
            console.log("Response after close PopUp"+res);
            if (res !== undefined) {
                //this.validateUser();
            }else{
                //this.validateUser();
                
            }

            this._routEx.navigate(['search'],{
                clearHistory:true,
                transition:{
                    name:"fade",
                    duration:200,
                    curve:"ease"
                }
            });


        });*/
        this._routEx.navigate(['add-products'], {
            transition: {
                name: "fade",
                duration: 200,
                curve: "ease"
            }
        });
    };
    /**
     * validateUser
     */
    ProductComponent.prototype.validateDataProducts = function () {
        var _this = this;
        this._globalComponent.validateDataRegisterVetrinaty(application_settings_1.getString('idLogin')).then(function (response) {
            //console.log("Mensaje" + JSON.stringify(response) + getString('idLogin'));
            var res = response.value;
            console.log("RESPONSE PRODUCTOS" + JSON.stringify(res));
            if (res !== null && res !== undefined) {
                var servicios = response.value.productos;
                var strJSON = JSON.stringify(servicios);
                var objJSON = eval("(function(){return " + strJSON + ";})()");
                //console.log("DATOS PRODUCTOS"+objJSON.length);
                if (objJSON !== null && objJSON !== undefined) {
                    _this.arregloProductos = [];
                    for (var i = 0; i < objJSON.length; i++) {
                        if (objJSON[i] !== null) {
                            var nombre = objJSON[i].nombre;
                            var descripcion = objJSON[i].descripcion;
                            var precio = objJSON[i].precio;
                            var imagen = objJSON[i].image;
                            console.log(nombre + descripcion + precio + imagen);
                            _this.arregloProductos.push({
                                idProduct: i,
                                title: nombre,
                                description: descripcion,
                                price: "$" + precio,
                                image: imagen
                            });
                            _this._addService = true;
                        }
                    }
                }
                _this._addService = true;
                _this._globalComponent.loadingHide();
                if (_this.arregloProductos.length <= 0) {
                    _this._viewAdd = true;
                }
                else {
                    _this._viewAdd = false;
                }
            }
            else {
                _this._globalComponent.viewMessage("Por favor registra tu veterinaria, es necesario para crear productos.");
                _this._globalComponent.loadingHide();
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
     * deleteProducts
     */
    ProductComponent.prototype.deleteProducts = function (numero, nombre) {
        var _this = this;
        dialogs.confirm({
            title: "Alerta",
            message: "¿ Realmente deseas eliminar el producto " + nombre + " ?",
            okButtonText: "NO",
            cancelButtonText: "Cancelar",
            neutralButtonText: "SI"
        }).then(function (result) {
            // result argument is boolean
            console.log("Dialog result: " + result);
            if (result === undefined) {
                _this._globalComponent.loadingView();
                var id = application_settings_1.getString('idLogin');
                var url = "veterinariasRegistradas/" + id + "/" + "productos/" + numero;
                var urlImage_1 = id + "/" + "productos/producto" + numero + ".png";
                console.log("Url a eliminar" + url);
                _this._serviceFirebase.deleteServices(url).then(function (response) {
                    console.log(Response);
                    _this._serviceFirebase.deleteImage(urlImage_1).then(function (res) {
                        console.log(res);
                    });
                    _this.arregloProductos = [];
                    _this._routEx.navigate(['home']);
                    _this._globalComponent.loadingHide();
                    _this.validateDataProducts();
                });
            }
        });
    };
    __decorate([
        core_1.ViewChild("drawer"),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], ProductComponent.prototype, "drawerComponent", void 0);
    ProductComponent = __decorate([
        core_1.Component({
            selector: "Featured",
            moduleId: module.id,
            templateUrl: "./product.component.html",
            styleUrls: ["./product.component.scss"]
        }),
        __metadata("design:paramtypes", [core_1.ViewContainerRef,
            modal_dialog_1.ModalDialogService,
            page_1.Page,
            router_1.RouterExtensions])
    ], ProductComponent);
    return ProductComponent;
}());
exports.ProductComponent = ProductComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcm9kdWN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUErRTtBQUMvRSw2REFBOEY7QUFDOUYsa0VBQWdGO0FBRWhGLGtFQUF1RTtBQUN2RSxzREFBcUQ7QUFDckQsc0RBQStEO0FBQy9ELDBEQUE0RDtBQUM1RCxtR0FBdUY7QUFDdkYsb0VBQWtFO0FBRWxFLG9DQUFzQztBQVV0QztJQW1DSSwwQkFBb0IsS0FBdUIsRUFDL0IsS0FBeUIsRUFDekIsS0FBVyxFQUNYLE9BQXlCO1FBSGpCLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQy9CLFVBQUssR0FBTCxLQUFLLENBQW9CO1FBQ3pCLFVBQUssR0FBTCxLQUFLLENBQU07UUFDWCxZQUFPLEdBQVAsT0FBTyxDQUFrQjtRQXBDckMscUJBQWdCLEdBQUcsRUFBRSxDQUFDO1FBR3RCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFrQ2IsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksOEJBQWUsRUFBRSxDQUFDO1FBQzlDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLGtDQUFlLEVBQUUsQ0FBQztJQUVsRCxDQUFDO0lBNUJEOztrRUFFOEQ7SUFDOUQsbUNBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLG1DQUFzQixFQUFFLENBQUM7UUFDMUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxzQkFBSSxrREFBb0I7YUFBeEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDO1FBQ3RDLENBQUM7OztPQUFBO0lBRUQ7OztrRUFHOEQ7SUFDOUQsNENBQWlCLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFF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O09BdEM1QixnQkFBZ0IsQ0EwTDVCO0lBQUQsdUJBQUM7Q0FBQSxBQTFMRCxJQTBMQztBQTFMWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgRHJhd2VyVHJhbnNpdGlvbkJhc2UsIFNsaWRlSW5PblRvcFRyYW5zaXRpb24gfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9zaWRlZHJhd2VyXCI7XHJcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcclxuaW1wb3J0IHsgQWRkUHJvZHVjdE1vZGFsIH0gZnJvbSBcIi4vYWRkLXByb2R1Y3QvYWRkLXByb2R1Y3QubW9kYWxcIjtcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL21vZGFsLWRpYWxvZ1wiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZS9wYWdlXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IEdsb2JhbENvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9jb25zdHMvZ2xvYmFsLm1vZGVsXCI7XHJcbmltcG9ydCB7IGdldFN0cmluZyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uLXNldHRpbmdzL2FwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbmltcG9ydCB7IFNlcnZpY2VGaXJlYmFzZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJGZWF0dXJlZFwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcHJvZHVjdC5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL3Byb2R1Y3QuY29tcG9uZW50LnNjc3NcIl1cclxuXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQcm9kdWN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIF9zZXJ2aWNlRmlyZWJhc2U6IFNlcnZpY2VGaXJlYmFzZTtcclxuICAgIGFycmVnbG9Qcm9kdWN0b3MgPSBbXTtcclxuICAgIF9hZGRTZXJ2aWNlOiBib29sZWFuO1xyXG4gICAgX2dsb2JhbENvbXBvbmVudDogR2xvYmFsQ29tcG9uZW50O1xyXG4gICAgX3ZpZXdBZGQgPSBmYWxzZTtcclxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAqIFVzZSB0aGUgQFZpZXdDaGlsZCBkZWNvcmF0b3IgdG8gZ2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBkcmF3ZXIgY29tcG9uZW50LlxyXG4gICAgKiBJdCBpcyB1c2VkIGluIHRoZSBcIm9uRHJhd2VyQnV0dG9uVGFwXCIgZnVuY3Rpb24gYmVsb3cgdG8gbWFuaXB1bGF0ZSB0aGUgZHJhd2VyLlxyXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIEBWaWV3Q2hpbGQoXCJkcmF3ZXJcIikgZHJhd2VyQ29tcG9uZW50OiBSYWRTaWRlRHJhd2VyQ29tcG9uZW50O1xyXG5cclxuICAgIHByaXZhdGUgX3NpZGVEcmF3ZXJUcmFuc2l0aW9uOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZTtcclxuXHJcbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgKiBVc2UgdGhlIHNpZGVEcmF3ZXJUcmFuc2l0aW9uIHByb3BlcnR5IHRvIGNoYW5nZSB0aGUgb3Blbi9jbG9zZSBhbmltYXRpb24gb2YgdGhlIGRyYXdlci5cclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbiA9IG5ldyBTbGlkZUluT25Ub3BUcmFuc2l0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5fZ2xvYmFsQ29tcG9uZW50LmxvYWRpbmdWaWV3KCk7XHJcbiAgICAgICAgdGhpcy52YWxpZGF0ZURhdGFQcm9kdWN0cygpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzaWRlRHJhd2VyVHJhbnNpdGlvbigpOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpZGVEcmF3ZXJUcmFuc2l0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAqIEFjY29yZGluZyB0byBndWlkZWxpbmVzLCBpZiB5b3UgaGF2ZSBhIGRyYXdlciBvbiB5b3VyIHBhZ2UsIHlvdSBzaG91bGQgYWx3YXlzXHJcbiAgICAqIGhhdmUgYSBidXR0b24gdGhhdCBvcGVucyBpdC4gVXNlIHRoZSBzaG93RHJhd2VyKCkgZnVuY3Rpb24gdG8gb3BlbiB0aGUgYXBwIGRyYXdlciBzZWN0aW9uLlxyXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIG9uRHJhd2VyQnV0dG9uVGFwKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZHJhd2VyQ29tcG9uZW50LnNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYsXHJcbiAgICAgICAgcHJpdmF0ZSBtb2RhbDogTW9kYWxEaWFsb2dTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX3BhZ2U6IFBhZ2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfcm91dEV4OiBSb3V0ZXJFeHRlbnNpb25zKSB7XHJcbiAgICAgICAgdGhpcy5fZ2xvYmFsQ29tcG9uZW50ID0gbmV3IEdsb2JhbENvbXBvbmVudCgpO1xyXG4gICAgICAgIHRoaXMuX3NlcnZpY2VGaXJlYmFzZSA9IG5ldyBTZXJ2aWNlRmlyZWJhc2UoKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbW9zdHJhckNvbmZpZ3VyYWNpb25Ib3JhcmlvXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRQcm9kdWN0cygpIHtcclxuXHRcdC8qbGV0IG9wdGlvbnMgPSB7XHJcblx0XHRcdGNvbnRleHQ6IHt9LFxyXG5cdFx0XHRmdWxsc2NyZWVuOiBmYWxzZSxcclxuXHRcdFx0dmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZlxyXG5cdFx0fTtcclxuXHRcdHRoaXMubW9kYWwuc2hvd01vZGFsKEFkZFByb2R1Y3RNb2RhbCwgb3B0aW9ucykudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlc3BvbnNlIGFmdGVyIGNsb3NlIFBvcFVwXCIrcmVzKTtcclxuXHRcdFx0aWYgKHJlcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMudmFsaWRhdGVVc2VyKCk7XHJcblx0XHRcdH1lbHNle1xyXG4gICAgICAgICAgICAgICAgLy90aGlzLnZhbGlkYXRlVXNlcigpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3JvdXRFeC5uYXZpZ2F0ZShbJ3NlYXJjaCddLHtcclxuICAgICAgICAgICAgICAgIGNsZWFySGlzdG9yeTp0cnVlLFxyXG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbjp7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTpcImZhZGVcIixcclxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjoyMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgY3VydmU6XCJlYXNlXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICB9KTsqL1xyXG5cclxuICAgICAgICB0aGlzLl9yb3V0RXgubmF2aWdhdGUoWydhZGQtcHJvZHVjdHMnXSwge1xyXG4gICAgICAgICAgICB0cmFuc2l0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuYW1lOiBcImZhZGVcIixcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAsXHJcbiAgICAgICAgICAgICAgICBjdXJ2ZTogXCJlYXNlXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdmFsaWRhdGVVc2VyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB2YWxpZGF0ZURhdGFQcm9kdWN0cygpIHtcclxuICAgICAgICB0aGlzLl9nbG9iYWxDb21wb25lbnQudmFsaWRhdGVEYXRhUmVnaXN0ZXJWZXRyaW5hdHkoZ2V0U3RyaW5nKCdpZExvZ2luJykpLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiTWVuc2FqZVwiICsgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpICsgZ2V0U3RyaW5nKCdpZExvZ2luJykpO1xyXG4gICAgICAgICAgICBsZXQgcmVzID0gcmVzcG9uc2UudmFsdWU7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUkVTUE9OU0UgUFJPRFVDVE9TXCIgKyBKU09OLnN0cmluZ2lmeShyZXMpKTtcclxuICAgICAgICAgICAgaWYgKHJlcyAhPT0gbnVsbCAmJiByZXMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlcnZpY2lvcyA9IHJlc3BvbnNlLnZhbHVlLnByb2R1Y3RvcztcclxuICAgICAgICAgICAgICAgIHZhciBzdHJKU09OID0gSlNPTi5zdHJpbmdpZnkoc2VydmljaW9zKTtcclxuICAgICAgICAgICAgICAgIHZhciBvYmpKU09OID0gZXZhbChcIihmdW5jdGlvbigpe3JldHVybiBcIiArIHN0ckpTT04gKyBcIjt9KSgpXCIpO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkRBVE9TIFBST0RVQ1RPU1wiK29iakpTT04ubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIGlmIChvYmpKU09OICE9PSBudWxsICYmIG9iakpTT04gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyZWdsb1Byb2R1Y3RvcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2JqSlNPTi5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iakpTT05baV0gIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBub21icmUgPSBvYmpKU09OW2ldLm5vbWJyZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkZXNjcmlwY2lvbiA9IG9iakpTT05baV0uZGVzY3JpcGNpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHJlY2lvID0gb2JqSlNPTltpXS5wcmVjaW87XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaW1hZ2VuID0gb2JqSlNPTltpXS5pbWFnZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhub21icmUgKyBkZXNjcmlwY2lvbiArIHByZWNpbyArIGltYWdlbik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJlZ2xvUHJvZHVjdG9zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkUHJvZHVjdDogaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogbm9tYnJlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwY2lvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmljZTogXCIkXCIgKyBwcmVjaW8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IGltYWdlblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWRkU2VydmljZSA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX2FkZFNlcnZpY2UgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2xvYmFsQ29tcG9uZW50LmxvYWRpbmdIaWRlKCk7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmFycmVnbG9Qcm9kdWN0b3MubGVuZ3RoIDw9IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZXdBZGQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlld0FkZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2xvYmFsQ29tcG9uZW50LnZpZXdNZXNzYWdlKFwiUG9yIGZhdm9yIHJlZ2lzdHJhIHR1IHZldGVyaW5hcmlhLCBlcyBuZWNlc2FyaW8gcGFyYSBjcmVhciBwcm9kdWN0b3MuXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2xvYmFsQ29tcG9uZW50LmxvYWRpbmdIaWRlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yb3V0RXgubmF2aWdhdGUoWydob21lJ10sIHtcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZmFkZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogNDAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJ2ZTogXCJlYXNlXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZGVsZXRlUHJvZHVjdHNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRlbGV0ZVByb2R1Y3RzKG51bWVybywgbm9tYnJlKSB7XHJcbiAgICAgICAgZGlhbG9ncy5jb25maXJtKHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiQWxlcnRhXCIsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiwr8gUmVhbG1lbnRlIGRlc2VhcyBlbGltaW5hciBlbCBwcm9kdWN0byBcIiArIG5vbWJyZSArIFwiID9cIixcclxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk5PXCIsXHJcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsYXJcIixcclxuICAgICAgICAgICAgbmV1dHJhbEJ1dHRvblRleHQ6IFwiU0lcIlxyXG4gICAgICAgIH0pLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgLy8gcmVzdWx0IGFyZ3VtZW50IGlzIGJvb2xlYW5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgcmVzdWx0OiBcIiArIHJlc3VsdCk7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2xvYmFsQ29tcG9uZW50LmxvYWRpbmdWaWV3KCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaWQgPSBnZXRTdHJpbmcoJ2lkTG9naW4nKTtcclxuICAgICAgICAgICAgICAgIGxldCB1cmwgPSBcInZldGVyaW5hcmlhc1JlZ2lzdHJhZGFzL1wiICsgaWQgKyBcIi9cIiArIFwicHJvZHVjdG9zL1wiICsgbnVtZXJvO1xyXG4gICAgICAgICAgICAgICAgbGV0IHVybEltYWdlID0gaWQgKyBcIi9cIiArIFwicHJvZHVjdG9zL3Byb2R1Y3RvXCIgKyBudW1lcm8gKyBcIi5wbmdcIjtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVXJsIGEgZWxpbWluYXJcIiArIHVybCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXJ2aWNlRmlyZWJhc2UuZGVsZXRlU2VydmljZXModXJsKS50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhSZXNwb25zZSlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZXJ2aWNlRmlyZWJhc2UuZGVsZXRlSW1hZ2UodXJsSW1hZ2UpLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJlZ2xvUHJvZHVjdG9zID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm91dEV4Lm5hdmlnYXRlKFsnaG9tZSddKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9nbG9iYWxDb21wb25lbnQubG9hZGluZ0hpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlRGF0YVByb2R1Y3RzKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG5cclxufVxyXG4iXX0=