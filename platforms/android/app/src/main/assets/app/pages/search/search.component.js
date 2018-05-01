"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var sidedrawer_1 = require("nativescript-pro-ui/sidedrawer");
var angular_1 = require("nativescript-pro-ui/sidedrawer/angular");
var animations_1 = require("@angular/animations");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var page_1 = require("tns-core-modules/ui/page/page");
var global_model_1 = require("../../consts/global.model");
var application_settings_1 = require("tns-core-modules/application-settings/application-settings");
var router_1 = require("nativescript-angular/router");
var firebase_service_1 = require("../../services/firebase.service");
var dialogs = require("ui/dialogs");
var SearchComponent = /** @class */ (function () {
    function SearchComponent(vcRef, modal, _page, _routEx) {
        this.vcRef = vcRef;
        this.modal = modal;
        this._page = _page;
        this._routEx = _routEx;
        this._addService = false;
        this.arregloServicios = [];
        this.bindingVar = "";
        this._viewCreate = true;
        this._viewInit = true;
        this._viewAdd = false;
        this._globalComponent = new global_model_1.GlobalComponent();
        this._firebaseService = new firebase_service_1.ServiceFirebase();
    }
    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    SearchComponent.prototype.ngOnInit = function () {
        this._sideDrawerTransition = new sidedrawer_1.SlideInOnTopTransition();
        this._globalComponent.loadingView();
        this._page.on('loaded', function () {
            console.log("Cargar Servicios");
        });
        this.validateUser();
    };
    Object.defineProperty(SearchComponent.prototype, "sideDrawerTransition", {
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
    SearchComponent.prototype.onDrawerButtonTap = function () {
        this.drawerComponent.sideDrawer.showDrawer();
    };
    SearchComponent.prototype.fadeIn = function () {
        this.bindingVar = "fadeIn";
    };
    SearchComponent.prototype.fadeOut = function () {
        this.bindingVar = "fadeOut";
    };
    SearchComponent.prototype.toggle = function () {
        this.bindingVar == "fadeOut" ? this.fadeIn() : this.fadeOut();
    };
    SearchComponent.prototype.hide = function () {
        this.fadeOut();
    };
    /**
     * mostrarConfiguracionHorario
     */
    SearchComponent.prototype.addServices = function () {
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
        application_settings_1.setString("editService", 'false');
        application_settings_1.setString("idService", '');
        application_settings_1.setString("nameService", '');
        application_settings_1.setString("descriptionService", '');
        this._routEx.navigate(['add-services'], {
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
    SearchComponent.prototype.validateUser = function () {
        var _this = this;
        this._globalComponent.validateDataRegisterVetrinaty(application_settings_1.getString('idLogin')).then(function (response) {
            console.log("Mensaje" + JSON.stringify(response) + application_settings_1.getString('idLogin'));
            //let res = response.value.servicios;
            var res = response.value;
            console.log("RESPONSE PROMOCIONES" + res);
            if (res !== null && res !== undefined) {
                //let response = JSON.stringify(res);
                //console.log("Consulta Descripcion"+response);
                //if(response !== null && response !== undefined){
                var servicios = response.value.servicios;
                //console.log(servicios.length);
                console.log("ARREGLO DE SERVICIOS" + servicios);
                if (servicios !== null && servicios !== undefined) {
                    _this.arregloServicios = [];
                    for (var i = 0; i < servicios.length; i++) {
                        if (servicios[i] !== null) {
                            var nombre = servicios[i].nombre;
                            var descripcion = servicios[i].descripcion;
                            console.log(nombre + descripcion);
                            _this.arregloServicios.push({
                                idService: i,
                                title: nombre,
                                description: descripcion
                            });
                        }
                        _this._addService = true;
                    }
                }
                if (_this.arregloServicios.length <= 0) {
                    _this._viewAdd = true;
                }
                else {
                    _this._viewAdd = false;
                }
                _this._addService = true;
                _this._globalComponent.loadingHide();
            }
            else {
                _this._globalComponent.loadingHide();
                _this._globalComponent.viewMessage("Por favor registra tu veterinaria, es necesario para crear servicios.");
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
    SearchComponent.prototype.deleteService = function (numero, nombre) {
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
                var url = "veterinariasRegistradas/" + id + "/" + "servicios/" + numero;
                console.log("Url a eliminar" + url);
                _this._firebaseService.deleteServices(url).then(function (response) {
                    console.log(Response);
                    _this.arregloServicios = [];
                    _this.validateUser();
                });
            }
        });
    };
    /**
     * updateServices
     */
    SearchComponent.prototype.updateServices = function (id, name, description) {
        application_settings_1.setString("editService", 'true');
        application_settings_1.setString("idService", '' + id);
        application_settings_1.setString("nameService", '' + name);
        application_settings_1.setString("descriptionService", '' + description);
        this._routEx.navigate(['add-services'], {
            transition: {
                name: "slide",
                duration: 400,
                curve: "ease"
            }
        });
    };
    __decorate([
        core_1.ViewChild("drawer"),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], SearchComponent.prototype, "drawerComponent", void 0);
    SearchComponent = __decorate([
        core_1.Component({
            selector: "Search",
            moduleId: module.id,
            templateUrl: "./search.component.html",
            styleUrls: ["./servicios.component.scss"],
            providers: [firebase_service_1.ServiceFirebase],
            animations: [
                animations_1.trigger("someCoolAnimation", [
                    animations_1.transition("* => *", [
                        // this hides everything right away
                        animations_1.query(":enter", animations_1.style({ opacity: 0 })),
                        // starts to animate things with a stagger in between
                        animations_1.query(":enter", animations_1.stagger(300, [
                            animations_1.animate(1000, animations_1.style({ opacity: 1 }))
                        ]), { delay: 300 })
                    ])
                ])
            ]
        }),
        __metadata("design:paramtypes", [core_1.ViewContainerRef,
            modal_dialog_1.ModalDialogService,
            page_1.Page,
            router_1.RouterExtensions])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlYXJjaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBK0U7QUFDL0UsNkRBQThGO0FBQzlGLGtFQUFnRjtBQUNoRixrREFBMEY7QUFFMUYsa0VBQXVFO0FBQ3ZFLHNEQUFnRTtBQUNoRSwwREFBNEQ7QUFDNUQsbUdBQWtHO0FBQ2xHLHNEQUErRDtBQUMvRCxvRUFBa0U7QUFFbEUsb0NBQXNDO0FBc0J0QztJQThDSSx5QkFBb0IsS0FBdUIsRUFDL0IsS0FBeUIsRUFDekIsS0FBVyxFQUNYLE9BQXlCO1FBSGpCLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQy9CLFVBQUssR0FBTCxLQUFLLENBQW9CO1FBQ3pCLFVBQUssR0FBTCxLQUFLLENBQU07UUFDWCxZQUFPLEdBQVAsT0FBTyxDQUFrQjtRQTlDckMsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIscUJBQWdCLEdBQUcsRUFBRSxDQUFDO1FBb0N0QixlQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLGNBQVMsR0FBRyxJQUFJLENBQUM7UUFDakIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQU9iLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLDhCQUFlLEVBQUUsQ0FBQztRQUM5QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxrQ0FBZSxFQUFFLENBQUM7SUFFbEQsQ0FBQztJQXhDRDs7a0VBRThEO0lBQzlELGtDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxtQ0FBc0IsRUFBRSxDQUFDO1FBQzFELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUU7WUFFcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FB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LGtCQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzt5QkFDdkMsQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDO3FCQUN0QixDQUFDO2lCQUNMLENBQUM7YUFDTDtTQUNKLENBQUM7eUNBK0M2Qix1QkFBZ0I7WUFDeEIsaUNBQWtCO1lBQ2xCLFdBQUk7WUFDRix5QkFBZ0I7T0FqRDVCLGVBQWUsQ0EyTjNCO0lBQUQsc0JBQUM7Q0FBQSxBQTNORCxJQTJOQztBQTNOWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBEcmF3ZXJUcmFuc2l0aW9uQmFzZSwgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbiB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcHJvLXVpL3NpZGVkcmF3ZXJcIjtcclxuaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcHJvLXVpL3NpZGVkcmF3ZXIvYW5ndWxhclwiO1xyXG5pbXBvcnQgeyB0cmlnZ2VyLCB0cmFuc2l0aW9uLCBzdHlsZSwgYW5pbWF0ZSwgcXVlcnksIHN0YWdnZXIgfSBmcm9tIFwiQGFuZ3VsYXIvYW5pbWF0aW9uc1wiO1xyXG5pbXBvcnQgeyBBZGRTZXJ2aWNlTW9kYWwgfSBmcm9tIFwiLi9hZGQtc2VydmljZS9hZGQtc2VydmljZS5tb2RhbFwiO1xyXG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbW9kYWwtZGlhbG9nXCI7XHJcbmltcG9ydCB7IFBhZ2UsIGlzQW5kcm9pZCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZVwiO1xyXG5pbXBvcnQgeyBHbG9iYWxDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vY29uc3RzL2dsb2JhbC5tb2RlbFwiO1xyXG5pbXBvcnQgeyBnZXRTdHJpbmcsIHNldFN0cmluZyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uLXNldHRpbmdzL2FwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFNlcnZpY2VGaXJlYmFzZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIlNlYXJjaFwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vc2VhcmNoLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vc2VydmljaW9zLmNvbXBvbmVudC5zY3NzXCJdLFxyXG4gICAgcHJvdmlkZXJzOiBbU2VydmljZUZpcmViYXNlXSxcclxuICAgIGFuaW1hdGlvbnM6IFtcclxuICAgICAgICB0cmlnZ2VyKFwic29tZUNvb2xBbmltYXRpb25cIiwgW1xyXG4gICAgICAgICAgICB0cmFuc2l0aW9uKFwiKiA9PiAqXCIsIFtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMgaGlkZXMgZXZlcnl0aGluZyByaWdodCBhd2F5XHJcbiAgICAgICAgICAgICAgICBxdWVyeShcIjplbnRlclwiLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpLFxyXG5cclxuICAgICAgICAgICAgICAgIC8vIHN0YXJ0cyB0byBhbmltYXRlIHRoaW5ncyB3aXRoIGEgc3RhZ2dlciBpbiBiZXR3ZWVuXHJcbiAgICAgICAgICAgICAgICBxdWVyeShcIjplbnRlclwiLCBzdGFnZ2VyKDMwMCwgW1xyXG4gICAgICAgICAgICAgICAgICAgIGFuaW1hdGUoMTAwMCwgc3R5bGUoeyBvcGFjaXR5OiAxIH0pKVxyXG4gICAgICAgICAgICAgICAgXSksIHsgZGVsYXk6IDMwMCB9KVxyXG4gICAgICAgICAgICBdKVxyXG4gICAgICAgIF0pXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZWFyY2hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgX2ZpcmViYXNlU2VydmljZTogU2VydmljZUZpcmViYXNlO1xyXG4gICAgX2dsb2JhbENvbXBvbmVudDogR2xvYmFsQ29tcG9uZW50O1xyXG4gICAgX2FkZFNlcnZpY2UgPSBmYWxzZTtcclxuICAgIGFycmVnbG9TZXJ2aWNpb3MgPSBbXTtcclxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAqIFVzZSB0aGUgQFZpZXdDaGlsZCBkZWNvcmF0b3IgdG8gZ2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBkcmF3ZXIgY29tcG9uZW50LlxyXG4gICAgKiBJdCBpcyB1c2VkIGluIHRoZSBcIm9uRHJhd2VyQnV0dG9uVGFwXCIgZnVuY3Rpb24gYmVsb3cgdG8gbWFuaXB1bGF0ZSB0aGUgZHJhd2VyLlxyXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIEBWaWV3Q2hpbGQoXCJkcmF3ZXJcIikgZHJhd2VyQ29tcG9uZW50OiBSYWRTaWRlRHJhd2VyQ29tcG9uZW50O1xyXG5cclxuICAgIHByaXZhdGUgX3NpZGVEcmF3ZXJUcmFuc2l0aW9uOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZTtcclxuXHJcbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgKiBVc2UgdGhlIHNpZGVEcmF3ZXJUcmFuc2l0aW9uIHByb3BlcnR5IHRvIGNoYW5nZSB0aGUgb3Blbi9jbG9zZSBhbmltYXRpb24gb2YgdGhlIGRyYXdlci5cclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbiA9IG5ldyBTbGlkZUluT25Ub3BUcmFuc2l0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5fZ2xvYmFsQ29tcG9uZW50LmxvYWRpbmdWaWV3KCk7XHJcbiAgICAgICAgdGhpcy5fcGFnZS5vbignbG9hZGVkJywgKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDYXJnYXIgU2VydmljaW9zXCIpXHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMudmFsaWRhdGVVc2VyKCk7XHJcbiAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc2lkZURyYXdlclRyYW5zaXRpb24oKTogRHJhd2VyVHJhbnNpdGlvbkJhc2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgKiBBY2NvcmRpbmcgdG8gZ3VpZGVsaW5lcywgaWYgeW91IGhhdmUgYSBkcmF3ZXIgb24geW91ciBwYWdlLCB5b3Ugc2hvdWxkIGFsd2F5c1xyXG4gICAgKiBoYXZlIGEgYnV0dG9uIHRoYXQgb3BlbnMgaXQuIFVzZSB0aGUgc2hvd0RyYXdlcigpIGZ1bmN0aW9uIHRvIG9wZW4gdGhlIGFwcCBkcmF3ZXIgc2VjdGlvbi5cclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICBvbkRyYXdlckJ1dHRvblRhcCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRyYXdlckNvbXBvbmVudC5zaWRlRHJhd2VyLnNob3dEcmF3ZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kaW5nVmFyID0gXCJcIjtcclxuICAgIF92aWV3Q3JlYXRlID0gdHJ1ZTtcclxuICAgIF92aWV3SW5pdCA9IHRydWU7XHJcbiAgICBfdmlld0FkZCA9IGZhbHNlO1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgICAgIHByaXZhdGUgbW9kYWw6IE1vZGFsRGlhbG9nU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIF9wYWdlOiBQYWdlLFxyXG4gICAgICAgIHByaXZhdGUgX3JvdXRFeDogUm91dGVyRXh0ZW5zaW9ucykge1xyXG4gICAgICAgIHRoaXMuX2dsb2JhbENvbXBvbmVudCA9IG5ldyBHbG9iYWxDb21wb25lbnQoKTtcclxuICAgICAgICB0aGlzLl9maXJlYmFzZVNlcnZpY2UgPSBuZXcgU2VydmljZUZpcmViYXNlKCk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZhZGVJbigpIHtcclxuICAgICAgICB0aGlzLmJpbmRpbmdWYXIgPSBcImZhZGVJblwiO1xyXG4gICAgfVxyXG5cclxuICAgIGZhZGVPdXQoKSB7XHJcbiAgICAgICAgdGhpcy5iaW5kaW5nVmFyID0gXCJmYWRlT3V0XCI7XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlKCkge1xyXG4gICAgICAgIHRoaXMuYmluZGluZ1ZhciA9PSBcImZhZGVPdXRcIiA/IHRoaXMuZmFkZUluKCkgOiB0aGlzLmZhZGVPdXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBoaWRlKCkge1xyXG4gICAgICAgIHRoaXMuZmFkZU91dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbW9zdHJhckNvbmZpZ3VyYWNpb25Ib3JhcmlvXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRTZXJ2aWNlcygpIHtcclxuICAgICAgICAvKiB0aGlzLl92aWV3SW5pdCA9IHRydWU7XHJcbiAgICAgICAgIHRoaXMuX3ZpZXdBZGQgPSBmYWxzZTtcclxuICAgICAgICAgbGV0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICBjb250ZXh0OiB7fSxcclxuICAgICAgICAgICAgIGZ1bGxzY3JlZW46IGZhbHNlLFxyXG4gICAgICAgICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZlxyXG4gICAgICAgICB9O1xyXG4gICAgICAgICB0aGlzLm1vZGFsLnNob3dNb2RhbChBZGRTZXJ2aWNlTW9kYWwsIG9wdGlvbnMpLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVzcG9uc2UgYWZ0ZXIgY2xvc2UgUG9wVXBcIityZXMpO1xyXG4gICAgICAgICAgICAgdGhpcy5fZ2xvYmFsQ29tcG9uZW50LmxvYWRpbmdWaWV3KCk7XHJcbiAgICAgICAgICAgICBpZiAocmVzICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICB0aGlzLmdldERhdGFTZXJ2aWNlcygpO1xyXG4gICAgICAgICAgICAgICAgIHRoaXMuX3ZpZXdJbml0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgdGhpcy5fdmlld0FkZCA9IHRydWU7XHJcbiAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICB0aGlzLmdldERhdGFTZXJ2aWNlcygpO1xyXG4gICAgICAgICAgICAgICAgIHRoaXMuX3ZpZXdJbml0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgdGhpcy5fdmlld0FkZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICB9Ki9cclxuICAgICAgICAgICAgIHNldFN0cmluZyhcImVkaXRTZXJ2aWNlXCIsICdmYWxzZScpO1xyXG4gICAgICAgICAgICAgc2V0U3RyaW5nKFwiaWRTZXJ2aWNlXCIsICcnKTtcclxuICAgICAgICAgICAgIHNldFN0cmluZyhcIm5hbWVTZXJ2aWNlXCIsICcnKTtcclxuICAgICAgICAgICAgIHNldFN0cmluZyhcImRlc2NyaXB0aW9uU2VydmljZVwiLCAnJyk7ICAgICAgICAgICAgIFxyXG4gICAgICAgIHRoaXMuX3JvdXRFeC5uYXZpZ2F0ZShbJ2FkZC1zZXJ2aWNlcyddLCB7XHJcbiAgICAgICAgICAgIHRyYW5zaXRpb246IHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IFwic2xpZGVcIixcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiA0MDAsXHJcbiAgICAgICAgICAgICAgICBjdXJ2ZTogXCJlYXNlXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgLy99KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHZhbGlkYXRlVXNlclxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdmFsaWRhdGVVc2VyKCkge1xyXG4gICAgICAgIHRoaXMuX2dsb2JhbENvbXBvbmVudC52YWxpZGF0ZURhdGFSZWdpc3RlclZldHJpbmF0eShnZXRTdHJpbmcoJ2lkTG9naW4nKSkudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTWVuc2FqZVwiICsgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpICsgZ2V0U3RyaW5nKCdpZExvZ2luJykpO1xyXG4gICAgICAgICAgICAvL2xldCByZXMgPSByZXNwb25zZS52YWx1ZS5zZXJ2aWNpb3M7XHJcbiAgICAgICAgICAgIGxldCByZXMgPSByZXNwb25zZS52YWx1ZTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJSRVNQT05TRSBQUk9NT0NJT05FU1wiICsgcmVzKTtcclxuICAgICAgICAgICAgaWYgKHJlcyAhPT0gbnVsbCAmJiByZXMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgLy9sZXQgcmVzcG9uc2UgPSBKU09OLnN0cmluZ2lmeShyZXMpO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkNvbnN1bHRhIERlc2NyaXBjaW9uXCIrcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgLy9pZihyZXNwb25zZSAhPT0gbnVsbCAmJiByZXNwb25zZSAhPT0gdW5kZWZpbmVkKXtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgc2VydmljaW9zID0gcmVzcG9uc2UudmFsdWUuc2VydmljaW9zO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhzZXJ2aWNpb3MubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQVJSRUdMTyBERSBTRVJWSUNJT1NcIiArICBzZXJ2aWNpb3MpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlcnZpY2lvcyAhPT0gbnVsbCAmJiBzZXJ2aWNpb3MgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyZWdsb1NlcnZpY2lvcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VydmljaW9zLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VydmljaW9zW2ldICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgbm9tYnJlID0gc2VydmljaW9zW2ldLm5vbWJyZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkZXNjcmlwY2lvbiA9IHNlcnZpY2lvc1tpXS5kZXNjcmlwY2lvbjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhub21icmUgKyBkZXNjcmlwY2lvbik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hcnJlZ2xvU2VydmljaW9zLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkU2VydmljZTogaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogbm9tYnJlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwY2lvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FkZFNlcnZpY2UgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuYXJyZWdsb1NlcnZpY2lvcy5sZW5ndGggPD0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlld0FkZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWV3QWRkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9hZGRTZXJ2aWNlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2dsb2JhbENvbXBvbmVudC5sb2FkaW5nSGlkZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2xvYmFsQ29tcG9uZW50LmxvYWRpbmdIaWRlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9nbG9iYWxDb21wb25lbnQudmlld01lc3NhZ2UoXCJQb3IgZmF2b3IgcmVnaXN0cmEgdHUgdmV0ZXJpbmFyaWEsIGVzIG5lY2VzYXJpbyBwYXJhIGNyZWFyIHNlcnZpY2lvcy5cIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yb3V0RXgubmF2aWdhdGUoWydob21lJ10sIHtcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZmFkZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogNDAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJ2ZTogXCJlYXNlXCJcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkZWxldGVTZXJ2aWNlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkZWxldGVTZXJ2aWNlKG51bWVybywgbm9tYnJlKSB7XHJcbiAgICAgICAgZGlhbG9ncy5jb25maXJtKHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiQWxlcnRhXCIsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiwr8gUmVhbG1lbnRlIGRlc2VhcyBlbGltaW5hciBlbCBzZXJ2aWNpbyBcIiArIG5vbWJyZSArIFwiID9cIixcclxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk5PXCIsXHJcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiQ2FuY2VsYXJcIixcclxuICAgICAgICAgICAgbmV1dHJhbEJ1dHRvblRleHQ6IFwiU0lcIlxyXG4gICAgICAgIH0pLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgLy8gcmVzdWx0IGFyZ3VtZW50IGlzIGJvb2xlYW5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEaWFsb2cgcmVzdWx0OiBcIiArIHJlc3VsdCk7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZ2xvYmFsQ29tcG9uZW50LmxvYWRpbmdWaWV3KCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaWQgPSBnZXRTdHJpbmcoJ2lkTG9naW4nKTtcclxuICAgICAgICAgICAgICAgIGxldCB1cmwgPSBcInZldGVyaW5hcmlhc1JlZ2lzdHJhZGFzL1wiICsgaWQgKyBcIi9cIiArIFwic2VydmljaW9zL1wiICsgbnVtZXJvO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVcmwgYSBlbGltaW5hclwiICsgdXJsKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ZpcmViYXNlU2VydmljZS5kZWxldGVTZXJ2aWNlcyh1cmwpLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFJlc3BvbnNlKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXJyZWdsb1NlcnZpY2lvcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsaWRhdGVVc2VyKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB1cGRhdGVTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdXBkYXRlU2VydmljZXMoaWQsIG5hbWUsIGRlc2NyaXB0aW9uKSB7XHJcbiAgICAgICAgc2V0U3RyaW5nKFwiZWRpdFNlcnZpY2VcIiwgJ3RydWUnKTtcclxuICAgICAgICBzZXRTdHJpbmcoXCJpZFNlcnZpY2VcIiwgJycgKyBpZCk7XHJcbiAgICAgICAgc2V0U3RyaW5nKFwibmFtZVNlcnZpY2VcIiwgJycgKyBuYW1lKTtcclxuICAgICAgICBzZXRTdHJpbmcoXCJkZXNjcmlwdGlvblNlcnZpY2VcIiwgJycgKyBkZXNjcmlwdGlvbik7XHJcbiAgICAgICAgdGhpcy5fcm91dEV4Lm5hdmlnYXRlKFsnYWRkLXNlcnZpY2VzJ10sIHtcclxuICAgICAgICAgICAgdHJhbnNpdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJzbGlkZVwiLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDQwMCxcclxuICAgICAgICAgICAgICAgIGN1cnZlOiBcImVhc2VcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==