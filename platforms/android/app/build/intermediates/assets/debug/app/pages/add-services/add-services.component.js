"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var global_model_1 = require("../../consts/global.model");
var servicios_modal_1 = require("../../modal/servicios.modal");
var page_1 = require("tns-core-modules/ui/page/page");
var firebase_service_1 = require("../../services/firebase.service");
var application_settings_1 = require("tns-core-modules/application-settings/application-settings");
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';
var AddServicesComponent = /** @class */ (function () {
    function AddServicesComponent(_page, _routEx, _servicioFirebase) {
        this._page = _page;
        this._routEx = _routEx;
        this._servicioFirebase = _servicioFirebase;
        this._mensaje = "";
        this._title = "";
        this._dataService = new servicios_modal_1.ServiciosVets();
        this._globalConst = new global_model_1.GlobalComponent();
    }
    AddServicesComponent.prototype.ngOnInit = function () {
        //this.getIdServices();
        this.validateTypePage();
        /* if (!isAndroid) {
             return;
           }
           application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
             console.log("selecciono back")
             //this.getBack();
             this._routEx.navigate(['search'],{
                 transition:{
                     name:"slide",
                     duration:400,
                     curve:"ease"
                 }
             });
           });*/
    };
    /**
     * addServicesVets
     */
    AddServicesComponent.prototype.addServicesVets = function () {
        var _this = this;
        this._mensaje = "";
        console.log(this._dataService._nombreServicioVet);
        if (this._dataService._nombreServicioVet !== undefined && this._dataService._nombreServicioVet !== null && this._dataService._nombreServicioVet !== "") {
            if (this._dataService._descripcionServicioVet !== undefined && this._dataService._descripcionServicioVet !== null && this._dataService._descripcionServicioVet !== "") {
                this._mensaje = "";
                this._dataService._nombreServicioVet = this._dataService._nombreServicioVet.trim();
                this._dataService._descripcionServicioVet = this._dataService._descripcionServicioVet.trim();
                this._dataService._nombreServicioVet = this._globalConst.MayusPrimera(this._dataService._nombreServicioVet);
                this._dataService._descripcionServicioVet = this._globalConst.MayusPrimera(this._dataService._descripcionServicioVet);
                this._dataService._idUsuario = application_settings_1.getString("idLogin");
                this._servicioFirebase.addServicesVets(this._dataService).then(function (response) {
                    if (response === "guardado") {
                        _this._globalConst.validateSuccess("Servicio registrado correctamente.");
                        _this._dataService._nombreServicioVet = "";
                        _this._dataService._descripcionServicioVet = "";
                        _this.getBack();
                        //this.getIdServices();
                    }
                    else {
                        _this._globalConst.validarErrores(response);
                    }
                });
            }
            else {
                this._globalConst.validarCampo("descripcion");
            }
        }
        else {
            this._globalConst.validarCampo("nombre");
        }
    };
    /**
     * getIdServices
     */
    AddServicesComponent.prototype.getIdServices = function () {
        var _this = this;
        this._dataService._idUsuario = application_settings_1.getString("idLogin");
        this._servicioFirebase.getServicesVeterinary(this._dataService).then(function (response) {
            console.log("response" + JSON.stringify(response));
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
                    console.log(JSON.stringify(response));
                    var strJSON = JSON.stringify(response);
                    var objJSON = eval("(function(){return " + strJSON + ";})()");
                    var size = objJSON.value.servicios.length;
                    _this._dataService._idServicioVet = size;
                    console.log("ID SERVICIO" + size);
                }
                else {
                    _this._dataService._idServicioVet = 0;
                    console.log("ID SERVICIO" + _this._dataService._idServicioVet);
                }
            }
        });
    };
    /**
     * getBack
     */
    AddServicesComponent.prototype.getBack = function () {
        this._routEx.navigate(['search'], {
            clearHistory: true,
            transition: {
                name: "slideRight",
                duration: 400,
                curve: "ease"
            }
        });
    };
    /**
     * validateTypePage
     */
    AddServicesComponent.prototype.validateTypePage = function () {
        var edit = application_settings_1.getString("editService");
        if (edit === "true") {
            var id = application_settings_1.getString("idService");
            var name_1 = application_settings_1.getString("nameService");
            var description = application_settings_1.getString("descriptionService");
            this._dataService._idServicioVet = id;
            this._dataService._nombreServicioVet = name_1;
            this._dataService._descripcionServicioVet = description;
            this._title = "Actualiza Tu Servicio";
            this._subtitle = "Actualiza tus servicios, éstos los verán todos tus usuarios.";
            this._nameButton = "Actualizar Servicio";
            //this.getIdServices();
        }
        else {
            this.getIdServices();
            this._title = "Registra Tus Servicios";
            this._subtitle = "Registra los servicios, éstos los verán todos tus usuarios.";
            this._nameButton = "Registrar Servicio";
        }
    };
    /**
     * validateTypeFunction
     */
    AddServicesComponent.prototype.validateTypeFunction = function () {
        var edit = application_settings_1.getString("editService");
        if (edit === "true") {
            this.editServicesVets();
        }
        else {
            this.addServicesVets();
        }
    };
    /**
     * addServicesVets
     */
    AddServicesComponent.prototype.editServicesVets = function () {
        var _this = this;
        this._mensaje = "";
        console.log(this._dataService._nombreServicioVet);
        if (this._dataService._nombreServicioVet !== undefined && this._dataService._nombreServicioVet !== null && this._dataService._nombreServicioVet !== "") {
            if (this._dataService._descripcionServicioVet !== undefined && this._dataService._descripcionServicioVet !== null && this._dataService._descripcionServicioVet !== "") {
                this._mensaje = "";
                this._dataService._nombreServicioVet = this._dataService._nombreServicioVet.trim();
                this._dataService._descripcionServicioVet = this._dataService._descripcionServicioVet.trim();
                this._dataService._nombreServicioVet = this._globalConst.MayusPrimera(this._dataService._nombreServicioVet);
                this._dataService._descripcionServicioVet = this._globalConst.MayusPrimera(this._dataService._descripcionServicioVet);
                this._dataService._idUsuario = application_settings_1.getString("idLogin");
                this._servicioFirebase.addServicesVets(this._dataService).then(function (response) {
                    if (response === "guardado") {
                        _this._globalConst.validateSuccess("Servicio actualizado correctamente.");
                        _this.getBack();
                    }
                    else {
                        _this._globalConst.validarErrores(response);
                    }
                });
            }
            else {
                this._globalConst.validarCampo("descripcion");
            }
        }
        else {
            this._globalConst.validarCampo("nombre");
        }
    };
    AddServicesComponent = __decorate([
        core_1.Component({
            selector: 'add-services',
            templateUrl: './pages/add-services/add-services.component.html',
            styleUrls: ['./pages/add-services/add-services.component.scss'],
            providers: [firebase_service_1.ServiceFirebase]
        }),
        __metadata("design:paramtypes", [page_1.Page,
            router_1.RouterExtensions,
            firebase_service_1.ServiceFirebase])
    ], AddServicesComponent);
    return AddServicesComponent;
}());
exports.AddServicesComponent = AddServicesComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLXNlcnZpY2VzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFkZC1zZXJ2aWNlcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsc0RBQStEO0FBQy9ELDBEQUE0RDtBQUM1RCwrREFBNEQ7QUFDNUQsc0RBQXFEO0FBQ3JELG9FQUFrRTtBQUNsRSxtR0FBdUY7QUFJdkYsMERBQTBEO0FBQzFELDRDQUE0QztBQUM1Qyw4Q0FBOEM7QUFDOUMsbURBQW1EO0FBU25EO0lBNEJJLDhCQUNZLEtBQVcsRUFDWCxPQUF5QixFQUN6QixpQkFBa0M7UUFGbEMsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUNYLFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBQ3pCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBaUI7UUF4QjlDLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFDZCxXQUFNLEdBQUcsRUFBRSxDQUFDO1FBd0JSLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSwrQkFBYSxFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLDhCQUFlLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBekJELHVDQUFRLEdBQVI7UUFDSSx1QkFBdUI7UUFDdkIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDekI7Ozs7Ozs7Ozs7Ozs7Z0JBYUU7SUFDTCxDQUFDO0lBVUQ7O09BRUc7SUFDSSw4Q0FBZSxHQUF0QjtRQUFBLGlCQStCQztRQTlCRyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNsRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixLQUFLLElBQUksSUFBSSxJ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ckMsb0JBQW9CLENBNExoQztJQUFELDJCQUFDO0NBQUEsQUE1TEQsSUE0TEM7QUE1TFksb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgR2xvYmFsQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29uc3RzL2dsb2JhbC5tb2RlbCc7XG5pbXBvcnQgeyBTZXJ2aWNpb3NWZXRzIH0gZnJvbSAnLi4vLi4vbW9kYWwvc2VydmljaW9zLm1vZGFsJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZSc7XG5pbXBvcnQgeyBTZXJ2aWNlRmlyZWJhc2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlJztcbmltcG9ydCB7IGdldFN0cmluZyB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24tc2V0dGluZ3MvYXBwbGljYXRpb24tc2V0dGluZ3MnO1xuaW1wb3J0IHsgaXNBbmRyb2lkIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybS9wbGF0Zm9ybSc7XG5pbXBvcnQgKiBhcyBhcHBsaWNhdGlvbiBmcm9tIFwiYXBwbGljYXRpb25cIjtcbmltcG9ydCB7IEFuZHJvaWRBcHBsaWNhdGlvbiwgQW5kcm9pZEFjdGl2aXR5QmFja1ByZXNzZWRFdmVudERhdGEgfSBmcm9tIFwiYXBwbGljYXRpb25cIjtcbi8vaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyJztcbi8vaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSAndWkvdGV4dC1maWVsZCc7XG4vL2ltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gJ2RhdGEvb2JzZXJ2YWJsZSc7XG4vL2ltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnYWRkLXNlcnZpY2VzJyxcblx0dGVtcGxhdGVVcmw6ICcuL3BhZ2VzL2FkZC1zZXJ2aWNlcy9hZGQtc2VydmljZXMuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnLi9wYWdlcy9hZGQtc2VydmljZXMvYWRkLXNlcnZpY2VzLmNvbXBvbmVudC5zY3NzJ10sXG5cdHByb3ZpZGVyczpbU2VydmljZUZpcmViYXNlXVxufSlcblxuZXhwb3J0IGNsYXNzIEFkZFNlcnZpY2VzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuXG4gICAgX25hbWVCdXR0b246IHN0cmluZztcbiAgICBfc3VidGl0bGU6IHN0cmluZztcblx0X2dsb2JhbENvbnN0OiBHbG9iYWxDb21wb25lbnQ7XG4gICAgX2RhdGFTZXJ2aWNlOiBTZXJ2aWNpb3NWZXRzO1xuICAgIF9tZW5zYWplID0gXCJcIjtcbiAgICBfdGl0bGUgPSBcIlwiO1xuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICAvL3RoaXMuZ2V0SWRTZXJ2aWNlcygpO1xuICAgICAgICB0aGlzLnZhbGlkYXRlVHlwZVBhZ2UoKTtcbiAgICAgICAvKiBpZiAoIWlzQW5kcm9pZCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdCAgfVxuXHRcdCAgYXBwbGljYXRpb24uYW5kcm9pZC5vbihBbmRyb2lkQXBwbGljYXRpb24uYWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50LCAoZGF0YTogQW5kcm9pZEFjdGl2aXR5QmFja1ByZXNzZWRFdmVudERhdGEpID0+IHtcblx0XHRcdGNvbnNvbGUubG9nKFwic2VsZWNjaW9ubyBiYWNrXCIpXG4gICAgICAgICAgICAvL3RoaXMuZ2V0QmFjaygpO1xuICAgICAgICAgICAgdGhpcy5fcm91dEV4Lm5hdmlnYXRlKFsnc2VhcmNoJ10seyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOntcbiAgICAgICAgICAgICAgICAgICAgbmFtZTpcInNsaWRlXCIsXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOjQwMCxcbiAgICAgICAgICAgICAgICAgICAgY3VydmU6XCJlYXNlXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblx0XHQgIH0pOyovXG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX3BhZ2U6IFBhZ2UsXG4gICAgICAgIHByaXZhdGUgX3JvdXRFeDogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICAgICAgcHJpdmF0ZSBfc2VydmljaW9GaXJlYmFzZTogU2VydmljZUZpcmViYXNlKSB7XG4gICAgICAgIHRoaXMuX2RhdGFTZXJ2aWNlID0gbmV3IFNlcnZpY2lvc1ZldHMoKTtcbiAgICAgICAgdGhpcy5fZ2xvYmFsQ29uc3QgPSBuZXcgR2xvYmFsQ29tcG9uZW50KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYWRkU2VydmljZXNWZXRzXG4gICAgICovXG4gICAgcHVibGljIGFkZFNlcnZpY2VzVmV0cygpIHtcbiAgICAgICAgdGhpcy5fbWVuc2FqZSA9IFwiXCI7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuX2RhdGFTZXJ2aWNlLl9ub21icmVTZXJ2aWNpb1ZldCk7XG4gICAgICAgIGlmICh0aGlzLl9kYXRhU2VydmljZS5fbm9tYnJlU2VydmljaW9WZXQgIT09IHVuZGVmaW5lZCAmJiB0aGlzLl9kYXRhU2VydmljZS5fbm9tYnJlU2VydmljaW9WZXQgIT09IG51bGwgJiYgdGhpcy5fZGF0YVNlcnZpY2UuX25vbWJyZVNlcnZpY2lvVmV0ICE9PSBcIlwiKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fZGF0YVNlcnZpY2UuX2Rlc2NyaXBjaW9uU2VydmljaW9WZXQgIT09IHVuZGVmaW5lZCAmJiB0aGlzLl9kYXRhU2VydmljZS5fZGVzY3JpcGNpb25TZXJ2aWNpb1ZldCAhPT0gbnVsbCAmJiB0aGlzLl9kYXRhU2VydmljZS5fZGVzY3JpcGNpb25TZXJ2aWNpb1ZldCAhPT0gXCJcIikge1xuXHRcdFx0XHR0aGlzLl9tZW5zYWplID0gXCJcIjtcblx0XHRcdFx0dGhpcy5fZGF0YVNlcnZpY2UuX25vbWJyZVNlcnZpY2lvVmV0ID0gdGhpcy5fZGF0YVNlcnZpY2UuX25vbWJyZVNlcnZpY2lvVmV0LnRyaW0oKTtcblx0XHRcdFx0dGhpcy5fZGF0YVNlcnZpY2UuX2Rlc2NyaXBjaW9uU2VydmljaW9WZXQgPSB0aGlzLl9kYXRhU2VydmljZS5fZGVzY3JpcGNpb25TZXJ2aWNpb1ZldC50cmltKCk7XG5cdFx0XHRcdHRoaXMuX2RhdGFTZXJ2aWNlLl9ub21icmVTZXJ2aWNpb1ZldCA9IHRoaXMuX2dsb2JhbENvbnN0Lk1heXVzUHJpbWVyYSh0aGlzLl9kYXRhU2VydmljZS5fbm9tYnJlU2VydmljaW9WZXQpO1xuXHRcdFx0XHR0aGlzLl9kYXRhU2VydmljZS5fZGVzY3JpcGNpb25TZXJ2aWNpb1ZldCA9IHRoaXMuX2dsb2JhbENvbnN0Lk1heXVzUHJpbWVyYSh0aGlzLl9kYXRhU2VydmljZS5fZGVzY3JpcGNpb25TZXJ2aWNpb1ZldCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhU2VydmljZS5faWRVc3VhcmlvID0gZ2V0U3RyaW5nKFwiaWRMb2dpblwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXJ2aWNpb0ZpcmViYXNlLmFkZFNlcnZpY2VzVmV0cyh0aGlzLl9kYXRhU2VydmljZSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHJlc3BvbnNlID09PSBcImd1YXJkYWRvXCIpe1xuXHRcdFx0XHRcdFx0dGhpcy5fZ2xvYmFsQ29uc3QudmFsaWRhdGVTdWNjZXNzKFwiU2VydmljaW8gcmVnaXN0cmFkbyBjb3JyZWN0YW1lbnRlLlwiKTtcblx0XHRcdFx0XHRcdHRoaXMuX2RhdGFTZXJ2aWNlLl9ub21icmVTZXJ2aWNpb1ZldCA9IFwiXCI7XG5cdFx0XHRcdFx0XHR0aGlzLl9kYXRhU2VydmljZS5fZGVzY3JpcGNpb25TZXJ2aWNpb1ZldCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdldEJhY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy5nZXRJZFNlcnZpY2VzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2xvYmFsQ29uc3QudmFsaWRhckVycm9yZXMocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2dsb2JhbENvbnN0LnZhbGlkYXJDYW1wbyhcImRlc2NyaXBjaW9uXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZ2xvYmFsQ29uc3QudmFsaWRhckNhbXBvKFwibm9tYnJlXCIpO1xuICAgICAgICB9XG5cbiAgICAgICBcbiAgICB9XG4gICAgLyoqXG4gICAgICogZ2V0SWRTZXJ2aWNlc1xuICAgICAqL1xuICAgIHB1YmxpYyBnZXRJZFNlcnZpY2VzKCkge1xuICAgICAgICB0aGlzLl9kYXRhU2VydmljZS5faWRVc3VhcmlvID0gZ2V0U3RyaW5nKFwiaWRMb2dpblwiKTtcbiAgICAgICAgdGhpcy5fc2VydmljaW9GaXJlYmFzZS5nZXRTZXJ2aWNlc1ZldGVyaW5hcnkodGhpcy5fZGF0YVNlcnZpY2UpLnRoZW4ocmVzcG9uc2UgPT57XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc3BvbnNlXCIrSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKTtcbiAgICAgICAgICAgIGxldCByZXMgPSByZXNwb25zZS52YWx1ZTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUkVTUE9OU0UgUFJPTU9DSU9ORVNcIiArIHJlcyk7XG4gICAgICAgICAgICBpZiAocmVzICE9PSBudWxsICYmIHJlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgLy9sZXQgcmVzcG9uc2UgPSBKU09OLnN0cmluZ2lmeShyZXMpO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJDb25zdWx0YSBEZXNjcmlwY2lvblwiK3Jlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAvL2lmKHJlc3BvbnNlICE9PSBudWxsICYmIHJlc3BvbnNlICE9PSB1bmRlZmluZWQpe1xuXG4gICAgICAgICAgICAgICAgbGV0IHNlcnZpY2lvcyA9IHJlc3BvbnNlLnZhbHVlLnNlcnZpY2lvcztcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKHNlcnZpY2lvcy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQVJSRUdMTyBERSBTRVJWSUNJT1NcIiArICBzZXJ2aWNpb3MpO1xuICAgICAgICAgICAgICAgIGlmIChzZXJ2aWNpb3MgIT09IG51bGwgJiYgc2VydmljaW9zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0ckpTT04gPSBKU09OLnN0cmluZ2lmeShyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmpKU09OID0gZXZhbChcIihmdW5jdGlvbigpe3JldHVybiBcIiArIHN0ckpTT04gKyBcIjt9KSgpXCIpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2l6ZSA9IG9iakpTT04udmFsdWUuc2VydmljaW9zLmxlbmd0aDsgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kYXRhU2VydmljZS5faWRTZXJ2aWNpb1ZldCA9IHNpemU7ICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIklEIFNFUlZJQ0lPXCIrc2l6ZSk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RhdGFTZXJ2aWNlLl9pZFNlcnZpY2lvVmV0ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJJRCBTRVJWSUNJT1wiK3RoaXMuX2RhdGFTZXJ2aWNlLl9pZFNlcnZpY2lvVmV0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cdC8qKlxuXHQgKiBnZXRCYWNrXG5cdCAqL1xuXHRwdWJsaWMgZ2V0QmFjaygpIHtcblx0XHR0aGlzLl9yb3V0RXgubmF2aWdhdGUoWydzZWFyY2gnXSx7XG4gICAgICAgICAgICBjbGVhckhpc3Rvcnk6dHJ1ZSxcbiAgICAgICAgICAgIHRyYW5zaXRpb246e1xuICAgICAgICAgICAgICAgIG5hbWU6XCJzbGlkZVJpZ2h0XCIsXG4gICAgICAgICAgICAgICAgZHVyYXRpb246NDAwLFxuICAgICAgICAgICAgICAgIGN1cnZlOlwiZWFzZVwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcblxuICAgIC8qKlxuICAgICAqIHZhbGlkYXRlVHlwZVBhZ2VcbiAgICAgKi9cbiAgICBwdWJsaWMgdmFsaWRhdGVUeXBlUGFnZSgpIHtcbiAgICAgICAgbGV0IGVkaXQgPSBnZXRTdHJpbmcoXCJlZGl0U2VydmljZVwiKTtcbiAgICAgICAgaWYoZWRpdCA9PT0gXCJ0cnVlXCIpe1xuICAgICAgICAgICAgbGV0IGlkID0gZ2V0U3RyaW5nKFwiaWRTZXJ2aWNlXCIpO1xuICAgICAgICAgICAgbGV0IG5hbWUgPSBnZXRTdHJpbmcoXCJuYW1lU2VydmljZVwiKTtcbiAgICAgICAgICAgIGxldCBkZXNjcmlwdGlvbiA9IGdldFN0cmluZyhcImRlc2NyaXB0aW9uU2VydmljZVwiKTtcbiAgICAgICAgICAgIHRoaXMuX2RhdGFTZXJ2aWNlLl9pZFNlcnZpY2lvVmV0ID0gaWQ7XG4gICAgICAgICAgICB0aGlzLl9kYXRhU2VydmljZS5fbm9tYnJlU2VydmljaW9WZXQgPSBuYW1lO1xuICAgICAgICAgICAgdGhpcy5fZGF0YVNlcnZpY2UuX2Rlc2NyaXBjaW9uU2VydmljaW9WZXQgPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgICAgIHRoaXMuX3RpdGxlID0gXCJBY3R1YWxpemEgVHUgU2VydmljaW9cIlxuICAgICAgICAgICAgdGhpcy5fc3VidGl0bGUgPSBcIkFjdHVhbGl6YSB0dXMgc2VydmljaW9zLCDDqXN0b3MgbG9zIHZlcsOhbiB0b2RvcyB0dXMgdXN1YXJpb3MuXCJcbiAgICAgICAgICAgIHRoaXMuX25hbWVCdXR0b24gPSBcIkFjdHVhbGl6YXIgU2VydmljaW9cIjtcbiAgICAgICAgICAgIC8vdGhpcy5nZXRJZFNlcnZpY2VzKCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5nZXRJZFNlcnZpY2VzKCk7XG4gICAgICAgICAgICB0aGlzLl90aXRsZSA9IFwiUmVnaXN0cmEgVHVzIFNlcnZpY2lvc1wiO1xuICAgICAgICAgICAgdGhpcy5fc3VidGl0bGUgPSBcIlJlZ2lzdHJhIGxvcyBzZXJ2aWNpb3MsIMOpc3RvcyBsb3MgdmVyw6FuIHRvZG9zIHR1cyB1c3Vhcmlvcy5cIjtcbiAgICAgICAgICAgIHRoaXMuX25hbWVCdXR0b24gPSBcIlJlZ2lzdHJhciBTZXJ2aWNpb1wiXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB2YWxpZGF0ZVR5cGVGdW5jdGlvblxuICAgICAqL1xuICAgIHB1YmxpYyB2YWxpZGF0ZVR5cGVGdW5jdGlvbigpIHtcbiAgICAgICAgbGV0IGVkaXQgPSBnZXRTdHJpbmcoXCJlZGl0U2VydmljZVwiKTtcbiAgICAgICAgaWYoZWRpdCA9PT0gXCJ0cnVlXCIpe1xuICAgICAgICAgICAgdGhpcy5lZGl0U2VydmljZXNWZXRzKCk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgdGhpcy5hZGRTZXJ2aWNlc1ZldHMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogYWRkU2VydmljZXNWZXRzXG4gICAgICovXG4gICAgcHVibGljIGVkaXRTZXJ2aWNlc1ZldHMoKSB7XG4gICAgICAgIHRoaXMuX21lbnNhamUgPSBcIlwiO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLl9kYXRhU2VydmljZS5fbm9tYnJlU2VydmljaW9WZXQpO1xuICAgICAgICBpZiAodGhpcy5fZGF0YVNlcnZpY2UuX25vbWJyZVNlcnZpY2lvVmV0ICE9PSB1bmRlZmluZWQgJiYgdGhpcy5fZGF0YVNlcnZpY2UuX25vbWJyZVNlcnZpY2lvVmV0ICE9PSBudWxsICYmIHRoaXMuX2RhdGFTZXJ2aWNlLl9ub21icmVTZXJ2aWNpb1ZldCAhPT0gXCJcIikge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGFTZXJ2aWNlLl9kZXNjcmlwY2lvblNlcnZpY2lvVmV0ICE9PSB1bmRlZmluZWQgJiYgdGhpcy5fZGF0YVNlcnZpY2UuX2Rlc2NyaXBjaW9uU2VydmljaW9WZXQgIT09IG51bGwgJiYgdGhpcy5fZGF0YVNlcnZpY2UuX2Rlc2NyaXBjaW9uU2VydmljaW9WZXQgIT09IFwiXCIpIHtcblx0XHRcdFx0dGhpcy5fbWVuc2FqZSA9IFwiXCI7XG5cdFx0XHRcdHRoaXMuX2RhdGFTZXJ2aWNlLl9ub21icmVTZXJ2aWNpb1ZldCA9IHRoaXMuX2RhdGFTZXJ2aWNlLl9ub21icmVTZXJ2aWNpb1ZldC50cmltKCk7XG5cdFx0XHRcdHRoaXMuX2RhdGFTZXJ2aWNlLl9kZXNjcmlwY2lvblNlcnZpY2lvVmV0ID0gdGhpcy5fZGF0YVNlcnZpY2UuX2Rlc2NyaXBjaW9uU2VydmljaW9WZXQudHJpbSgpO1xuXHRcdFx0XHR0aGlzLl9kYXRhU2VydmljZS5fbm9tYnJlU2VydmljaW9WZXQgPSB0aGlzLl9nbG9iYWxDb25zdC5NYXl1c1ByaW1lcmEodGhpcy5fZGF0YVNlcnZpY2UuX25vbWJyZVNlcnZpY2lvVmV0KTtcblx0XHRcdFx0dGhpcy5fZGF0YVNlcnZpY2UuX2Rlc2NyaXBjaW9uU2VydmljaW9WZXQgPSB0aGlzLl9nbG9iYWxDb25zdC5NYXl1c1ByaW1lcmEodGhpcy5fZGF0YVNlcnZpY2UuX2Rlc2NyaXBjaW9uU2VydmljaW9WZXQpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5fZGF0YVNlcnZpY2UuX2lkVXN1YXJpbyA9IGdldFN0cmluZyhcImlkTG9naW5cIik7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2VydmljaW9GaXJlYmFzZS5hZGRTZXJ2aWNlc1ZldHModGhpcy5fZGF0YVNlcnZpY2UpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZihyZXNwb25zZSA9PT0gXCJndWFyZGFkb1wiKXtcblx0XHRcdFx0XHRcdHRoaXMuX2dsb2JhbENvbnN0LnZhbGlkYXRlU3VjY2VzcyhcIlNlcnZpY2lvIGFjdHVhbGl6YWRvIGNvcnJlY3RhbWVudGUuXCIpO1xuXHRcdFx0XHRcdFx0dGhpcy5nZXRCYWNrKCk7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2xvYmFsQ29uc3QudmFsaWRhckVycm9yZXMocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2dsb2JhbENvbnN0LnZhbGlkYXJDYW1wbyhcImRlc2NyaXBjaW9uXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZ2xvYmFsQ29uc3QudmFsaWRhckNhbXBvKFwibm9tYnJlXCIpO1xuICAgICAgICB9XG5cbiAgICAgICBcbiAgICB9XG59Il19