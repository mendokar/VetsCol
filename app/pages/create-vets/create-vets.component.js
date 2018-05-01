"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var sidedrawer_1 = require("nativescript-pro-ui/sidedrawer");
var angular_1 = require("nativescript-pro-ui/sidedrawer/angular");
var animations_1 = require("@angular/animations");
var SocialShare = require("nativescript-social-share");
var router_1 = require("nativescript-angular/router");
var firebase_service_1 = require("../../services/firebase.service");
var application_settings_1 = require("tns-core-modules/application-settings/application-settings");
var vets_modal_1 = require("../../modal/vets.modal");
var global_model_1 = require("../../consts/global.model");
var CreateVetsComponent = /** @class */ (function () {
    function CreateVetsComponent(_routEx) {
        this._routEx = _routEx;
        this._viewW = false;
        this._viewT = false;
        this._viewI = false;
        this._viewF = false;
        /*Empezamos a codificar*/
        this._viewShared = false;
        this._viewAdd = false;
        this._vertipo = true;
        this._serviceFirebase = new firebase_service_1.ServiceFirebase();
        this._dataVets = new vets_modal_1.DatosVets();
        this._globalComponent = new global_model_1.GlobalComponent();
    }
    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    CreateVetsComponent.prototype.ngOnInit = function () {
        this._sideDrawerTransition = new sidedrawer_1.SlideInOnTopTransition();
        this.getDataVeterinary();
    };
    Object.defineProperty(CreateVetsComponent.prototype, "sideDrawerTransition", {
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
    CreateVetsComponent.prototype.onDrawerButtonTap = function () {
        this.drawerComponent.sideDrawer.showDrawer();
    };
    /**
     * sharedData
     */
    CreateVetsComponent.prototype.sharedData = function () {
        SocialShare.shareText("Conoce los productos , promociones y servicios que tiene para ti \"" + this._dataVets._nombreVet + "\" en PetsCol. www.vetscol.com ", "¿ Con quien quieres compartir " + this._dataVets._nombreVet + " ?");
    };
    CreateVetsComponent.prototype.addVets = function () {
        //this._viewAdd = false;
        //this._viewData = true;
        this._routEx.navigate(['add-vets'], {
            transition: {
                name: "slide",
                duration: 400,
                curve: "ease"
            }
        });
    };
    /**
     * getDataVeterinary
     */
    CreateVetsComponent.prototype.getDataVeterinary = function () {
        var _this = this;
        this._globalComponent.loadingView();
        var iduser = application_settings_1.getString("idLogin");
        this._serviceFirebase.searchDataVeterinary(iduser).then(function (response) {
            console.log("RESP" + JSON.stringify(response));
            if (response.value !== null) {
                _this._viewShared = true;
                _this._viewAdd = false;
                console.log("RESP" + JSON.stringify(response.value.veterinaria));
                var data = response.value.veterinaria;
                _this._dataVets._nombreVet = data.nombre;
                _this._dataVets._lemaVet = data.lema;
                _this._dataVets._image = data.image;
                _this._dataVets._descripcionVet = data.descripcion;
                _this._dataVets._tipoVet = data.tipo_vets;
                _this._dataVets._correoVet = data.correo;
                _this._dataVets._direccionVet = data.direccion;
                _this._dataVets._telefonoVet = "031-" + data.telefono;
                _this._dataVets._celularVet = data.celular;
                _this._dataVets._paginaWebVet = data.pagina_web;
                if (data.horas === "") {
                    _this._dataVets._horarioVet = data.dias + " de " + data.horario;
                }
                else {
                    _this._dataVets._horarioVet = data.horas;
                }
                _this._dataVets._facebookVets = data.facebook;
                _this._dataVets._twitterVets = data.twitter;
                _this._dataVets._InstagramVets = data.instagram;
                _this._dataVets._whatSappVets = data.whatsapp;
                if (_this._dataVets._facebookVets !== null && _this._dataVets._facebookVets !== "" && _this._dataVets._facebookVets !== undefined) {
                    _this._viewF = true;
                }
                if (_this._dataVets._twitterVets !== null && _this._dataVets._twitterVets !== "" && _this._dataVets._twitterVets !== undefined) {
                    _this._viewT = true;
                }
                if (_this._dataVets._InstagramVets !== null && _this._dataVets._InstagramVets !== "" && _this._dataVets._InstagramVets !== undefined) {
                    _this._viewI = true;
                }
                if (_this._dataVets._whatSappVets !== null && _this._dataVets._whatSappVets !== "" && _this._dataVets._whatSappVets !== undefined) {
                    _this._viewW = true;
                }
            }
            else {
                _this._viewShared = false;
                _this._viewAdd = true;
            }
        });
        this._globalComponent.loadingHide();
    };
    /**
     * editVets
     */
    CreateVetsComponent.prototype.editVets = function () {
        this._routEx.navigate(['edit-vets'], {
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
    ], CreateVetsComponent.prototype, "drawerComponent", void 0);
    CreateVetsComponent = __decorate([
        core_1.Component({
            selector: "Browse",
            moduleId: module.id,
            templateUrl: "./create-vets.component.html",
            styleUrls: ["./create-vets.component.scss"],
            animations: [
                animations_1.trigger("animationDatos", [
                    animations_1.transition("* => fadeOut", [
                        animations_1.style({ transform: "translate(600px)", opacity: 1 }),
                        animations_1.animate(1200, animations_1.style({ transform: "translate(600px)", opacity: 1 }))
                    ]),
                    animations_1.transition("* => fadeIn", [
                        animations_1.animate(1200, animations_1.style({ transform: "translate(600px)", opacity: 1 }))
                    ])
                ])
            ]
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions])
    ], CreateVetsComponent);
    return CreateVetsComponent;
}());
exports.CreateVetsComponent = CreateVetsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXZldHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3JlYXRlLXZldHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTZEO0FBQzdELDZEQUE4RjtBQUM5RixrRUFBZ0Y7QUFDaEYsa0RBQTBFO0FBRTFFLHVEQUF5RDtBQUN6RCxzREFBK0Q7QUFDL0Qsb0VBQWtFO0FBQ2xFLG1HQUF1RjtBQUN2RixxREFBbUQ7QUFDbkQsMERBQTREO0FBbUI1RDtJQWlCSSw2QkFBb0IsT0FBd0I7UUFBeEIsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUFiNUMsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNmLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsV0FBTSxHQUFHLEtBQUssQ0FBQztRQThDZix5QkFBeUI7UUFFekIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUlqQixhQUFRLEdBQUcsSUFBSSxDQUFDO1FBMUNaLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLGtDQUFlLEVBQUUsQ0FBQztRQUM5QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksc0JBQVMsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLDhCQUFlLEVBQUUsQ0FBQztJQUNsRCxDQUFDO0lBRUQ7O2tFQUU4RDtJQUM5RCxzQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksbUNBQXNCLEVBQUUsQ0FBQztRQUMxRCxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsc0JBQUkscURBQW9CO2FBQXhCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztRQUN0QyxDQUFDOzs7T0FBQTtJQUVEOzs7a0VBRzhEO0lBQzlELCtDQUFpQixHQUFqQjtRQUNJLElB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a0JBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztxQkFDdEUsQ0FBQztvQkFDRix1QkFBVSxDQUFDLGFBQWEsRUFBRTt3QkFDdEIsb0JBQU8sQ0FBQyxJQUFJLEVBQUUsa0JBQUssQ0FBQyxFQUFHLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQztxQkFDdEUsQ0FBQztpQkFDTCxDQUFDO2FBQ0w7U0FDSixDQUFDO3lDQWtCOEIseUJBQWdCO09BakJuQyxtQkFBbUIsQ0FtSi9CO0lBQUQsMEJBQUM7Q0FBQSxBQW5KRCxJQW1KQztBQW5KWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgRHJhd2VyVHJhbnNpdGlvbkJhc2UsIFNsaWRlSW5PblRvcFRyYW5zaXRpb24gfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9zaWRlZHJhd2VyXCI7XHJcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcclxuaW1wb3J0IHsgdHJpZ2dlciwgdHJhbnNpdGlvbiwgc3R5bGUsIGFuaW1hdGUgfSBmcm9tIFwiQGFuZ3VsYXIvYW5pbWF0aW9uc1wiO1xyXG5cclxuaW1wb3J0ICogYXMgU29jaWFsU2hhcmUgZnJvbSBcIm5hdGl2ZXNjcmlwdC1zb2NpYWwtc2hhcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgU2VydmljZUZpcmViYXNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2ZpcmViYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgZ2V0U3RyaW5nIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24tc2V0dGluZ3MvYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgRGF0b3NWZXRzIH0gZnJvbSBcIi4uLy4uL21vZGFsL3ZldHMubW9kYWxcIjtcclxuaW1wb3J0IHsgR2xvYmFsQ29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL2NvbnN0cy9nbG9iYWwubW9kZWxcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwiQnJvd3NlXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9jcmVhdGUtdmV0cy5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOltcIi4vY3JlYXRlLXZldHMuY29tcG9uZW50LnNjc3NcIl0sXHJcbiAgICBhbmltYXRpb25zOiBbXHJcbiAgICAgICAgdHJpZ2dlcihcImFuaW1hdGlvbkRhdG9zXCIsIFtcclxuICAgICAgICAgICAgdHJhbnNpdGlvbihcIiogPT4gZmFkZU91dFwiLCBbXHJcbiAgICAgICAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogXCJ0cmFuc2xhdGUoNjAwcHgpXCIsIG9wYWNpdHk6IDEgfSksXHJcbiAgICAgICAgICAgICAgICBhbmltYXRlKDEyMDAsIHN0eWxlKHsgdHJhbnNmb3JtOiBcInRyYW5zbGF0ZSg2MDBweClcIiwgb3BhY2l0eTogMSB9KSlcclxuICAgICAgICAgICAgXSksXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb24oXCIqID0+IGZhZGVJblwiLCBbXHJcbiAgICAgICAgICAgICAgICBhbmltYXRlKDEyMDAsIHN0eWxlKHsgIHRyYW5zZm9ybTogXCJ0cmFuc2xhdGUoNjAwcHgpXCIsIG9wYWNpdHk6IDF9KSlcclxuICAgICAgICAgICAgXSlcclxuICAgICAgICBdKVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ3JlYXRlVmV0c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBfZ2xvYmFsQ29tcG9uZW50OiBHbG9iYWxDb21wb25lbnQ7XHJcbiAgICBfZGF0YVZldHM6IERhdG9zVmV0cztcclxuICAgIF92aWV3RGF0YTogYm9vbGVhbjtcclxuICAgIF92aWV3VyA9IGZhbHNlO1xyXG4gICAgX3ZpZXdUID0gZmFsc2U7XHJcbiAgICBfdmlld0kgPSBmYWxzZTtcclxuICAgIF92aWV3RiA9IGZhbHNlO1xyXG4gICAgX3NlcnZpY2VGaXJlYmFzZTogU2VydmljZUZpcmViYXNlO1xyXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICogVXNlIHRoZSBAVmlld0NoaWxkIGRlY29yYXRvciB0byBnZXQgYSByZWZlcmVuY2UgdG8gdGhlIGRyYXdlciBjb21wb25lbnQuXHJcbiAgICAqIEl0IGlzIHVzZWQgaW4gdGhlIFwib25EcmF3ZXJCdXR0b25UYXBcIiBmdW5jdGlvbiBiZWxvdyB0byBtYW5pcHVsYXRlIHRoZSBkcmF3ZXIuXHJcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgQFZpZXdDaGlsZChcImRyYXdlclwiKSBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfc2lkZURyYXdlclRyYW5zaXRpb246IERyYXdlclRyYW5zaXRpb25CYXNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3JvdXRFeDpSb3V0ZXJFeHRlbnNpb25zKXtcclxuICAgICAgICB0aGlzLl9zZXJ2aWNlRmlyZWJhc2UgPSBuZXcgU2VydmljZUZpcmViYXNlKCk7XHJcbiAgICAgICAgdGhpcy5fZGF0YVZldHMgPSBuZXcgRGF0b3NWZXRzKCk7XHJcbiAgICAgICAgdGhpcy5fZ2xvYmFsQ29tcG9uZW50ID0gbmV3IEdsb2JhbENvbXBvbmVudCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAqIFVzZSB0aGUgc2lkZURyYXdlclRyYW5zaXRpb24gcHJvcGVydHkgdG8gY2hhbmdlIHRoZSBvcGVuL2Nsb3NlIGFuaW1hdGlvbiBvZiB0aGUgZHJhd2VyLlxyXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3NpZGVEcmF3ZXJUcmFuc2l0aW9uID0gbmV3IFNsaWRlSW5PblRvcFRyYW5zaXRpb24oKTtcclxuICAgICAgICB0aGlzLmdldERhdGFWZXRlcmluYXJ5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNpZGVEcmF3ZXJUcmFuc2l0aW9uKCk6IERyYXdlclRyYW5zaXRpb25CYXNlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICogQWNjb3JkaW5nIHRvIGd1aWRlbGluZXMsIGlmIHlvdSBoYXZlIGEgZHJhd2VyIG9uIHlvdXIgcGFnZSwgeW91IHNob3VsZCBhbHdheXNcclxuICAgICogaGF2ZSBhIGJ1dHRvbiB0aGF0IG9wZW5zIGl0LiBVc2UgdGhlIHNob3dEcmF3ZXIoKSBmdW5jdGlvbiB0byBvcGVuIHRoZSBhcHAgZHJhd2VyIHNlY3Rpb24uXHJcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgb25EcmF3ZXJCdXR0b25UYXAoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2hhcmVkRGF0YVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2hhcmVkRGF0YSgpIHtcclxuICAgICAgICBTb2NpYWxTaGFyZS5zaGFyZVRleHQoXCJDb25vY2UgbG9zIHByb2R1Y3RvcyAsIHByb21vY2lvbmVzIHkgc2VydmljaW9zIHF1ZSB0aWVuZSBwYXJhIHRpIFxcXCJcIisgdGhpcy5fZGF0YVZldHMuX25vbWJyZVZldCsgXCJcXFwiIGVuIFBldHNDb2wuIHd3dy52ZXRzY29sLmNvbSBcIixcIsK/IENvbiBxdWllbiBxdWllcmVzIGNvbXBhcnRpciBcIit0aGlzLl9kYXRhVmV0cy5fbm9tYnJlVmV0K1wiID9cIilcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIC8qRW1wZXphbW9zIGEgY29kaWZpY2FyKi9cclxuXHJcbiAgICBfdmlld1NoYXJlZCA9IGZhbHNlO1xyXG4gICAgX3ZpZXdBZGQgPSBmYWxzZTtcclxuXHJcbiAgICBcclxuXHJcbiAgICBfdmVydGlwbyA9IHRydWU7XHJcbiAgICBcclxuXHJcbiAgICBwdWJsaWMgYWRkVmV0cygpe1xyXG4gICAgICAgIC8vdGhpcy5fdmlld0FkZCA9IGZhbHNlO1xyXG4gICAgICAgIC8vdGhpcy5fdmlld0RhdGEgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX3JvdXRFeC5uYXZpZ2F0ZShbJ2FkZC12ZXRzJ10se1xyXG4gICAgICAgICAgICB0cmFuc2l0aW9uOntcclxuICAgICAgICAgICAgICAgIG5hbWU6XCJzbGlkZVwiLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246NDAwLFxyXG4gICAgICAgICAgICAgICAgY3VydmU6XCJlYXNlXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0RGF0YVZldGVyaW5hcnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERhdGFWZXRlcmluYXJ5KCkge1xyXG4gICAgICAgIHRoaXMuX2dsb2JhbENvbXBvbmVudC5sb2FkaW5nVmlldygpO1xyXG4gICAgICAgIGxldCBpZHVzZXIgPSBnZXRTdHJpbmcoXCJpZExvZ2luXCIpO1xyXG4gICAgICAgIHRoaXMuX3NlcnZpY2VGaXJlYmFzZS5zZWFyY2hEYXRhVmV0ZXJpbmFyeShpZHVzZXIpLnRoZW4ocmVzcG9uc2UgPT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUkVTUFwiK0pTT04uc3RyaW5naWZ5KHJlc3BvbnNlKSk7XHJcbiAgICAgICAgICAgIGlmKHJlc3BvbnNlLnZhbHVlICE9PSBudWxsKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZpZXdTaGFyZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdmlld0FkZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSRVNQXCIrSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UudmFsdWUudmV0ZXJpbmFyaWEpKTtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UudmFsdWUudmV0ZXJpbmFyaWE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhVmV0cy5fbm9tYnJlVmV0ID0gZGF0YS5ub21icmU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhVmV0cy5fbGVtYVZldCA9IGRhdGEubGVtYTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGFWZXRzLl9pbWFnZSA9IGRhdGEuaW1hZ2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhVmV0cy5fZGVzY3JpcGNpb25WZXQgPSBkYXRhLmRlc2NyaXBjaW9uO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGF0YVZldHMuX3RpcG9WZXQgPSAgZGF0YS50aXBvX3ZldHM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhVmV0cy5fY29ycmVvVmV0ID0gZGF0YS5jb3JyZW87XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhVmV0cy5fZGlyZWNjaW9uVmV0ID0gZGF0YS5kaXJlY2Npb247XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhVmV0cy5fdGVsZWZvbm9WZXQgPSBcIjAzMS1cIitkYXRhLnRlbGVmb25vO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGF0YVZldHMuX2NlbHVsYXJWZXQgPSBkYXRhLmNlbHVsYXI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhVmV0cy5fcGFnaW5hV2ViVmV0ID0gZGF0YS5wYWdpbmFfd2ViO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGRhdGEuaG9yYXMgPT09IFwiXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RhdGFWZXRzLl9ob3JhcmlvVmV0ID0gZGF0YS5kaWFzK1wiIGRlIFwiK2RhdGEuaG9yYXJpb1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGF0YVZldHMuX2hvcmFyaW9WZXQgPSBkYXRhLmhvcmFzXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhVmV0cy5fZmFjZWJvb2tWZXRzID0gZGF0YS5mYWNlYm9vaztcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGFWZXRzLl90d2l0dGVyVmV0cyA9IGRhdGEudHdpdHRlcjtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGFWZXRzLl9JbnN0YWdyYW1WZXRzID0gZGF0YS5pbnN0YWdyYW07XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhVmV0cy5fd2hhdFNhcHBWZXRzID0gZGF0YS53aGF0c2FwcDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9kYXRhVmV0cy5fZmFjZWJvb2tWZXRzICE9PSBudWxsICYmIHRoaXMuX2RhdGFWZXRzLl9mYWNlYm9va1ZldHMgIT09IFwiXCIgJiYgdGhpcy5fZGF0YVZldHMuX2ZhY2Vib29rVmV0cyAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWV3RiA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9kYXRhVmV0cy5fdHdpdHRlclZldHMgIT09IG51bGwgJiYgdGhpcy5fZGF0YVZldHMuX3R3aXR0ZXJWZXRzICE9PSBcIlwiICYmIHRoaXMuX2RhdGFWZXRzLl90d2l0dGVyVmV0cyAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWV3VCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9kYXRhVmV0cy5fSW5zdGFncmFtVmV0cyAhPT0gbnVsbCAmJiB0aGlzLl9kYXRhVmV0cy5fSW5zdGFncmFtVmV0cyAhPT0gXCJcIiAmJiB0aGlzLl9kYXRhVmV0cy5fSW5zdGFncmFtVmV0cyAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWV3SSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9kYXRhVmV0cy5fd2hhdFNhcHBWZXRzICE9PSBudWxsICYmIHRoaXMuX2RhdGFWZXRzLl93aGF0U2FwcFZldHMgIT09IFwiXCIgJiYgdGhpcy5fZGF0YVZldHMuX3doYXRTYXBwVmV0cyAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWV3VyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdmlld1NoYXJlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdmlld0FkZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9nbG9iYWxDb21wb25lbnQubG9hZGluZ0hpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGVkaXRWZXRzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBlZGl0VmV0cygpIHtcclxuICAgICAgICB0aGlzLl9yb3V0RXgubmF2aWdhdGUoWydlZGl0LXZldHMnXSx7XHJcbiAgICAgICAgICAgIHRyYW5zaXRpb246e1xyXG4gICAgICAgICAgICAgICAgbmFtZTpcInNsaWRlXCIsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjo0MDAsXHJcbiAgICAgICAgICAgICAgICBjdXJ2ZTpcImVhc2VcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbn1cclxuIl19