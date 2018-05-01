"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var firebase_service_1 = require("../../services/firebase.service");
var servicios_modal_1 = require("../../modal/servicios.modal");
var global_model_1 = require("../../consts/global.model");
var application_settings_1 = require("tns-core-modules/application-settings/application-settings");
var promotions_modal_1 = require("../../modal/promotions.modal");
var router_1 = require("nativescript-angular/router");
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';
var AddPromotionsComponent = /** @class */ (function () {
    function AddPromotionsComponent(_servicioFirebase, _routEx) {
        this._servicioFirebase = _servicioFirebase;
        this._routEx = _routEx;
        this._dataService = new servicios_modal_1.ServiciosVets();
        this._globalComponent = new global_model_1.GlobalComponent();
        this._dataProducts = new promotions_modal_1.PromotionsVets();
    }
    AddPromotionsComponent.prototype.ngOnInit = function () {
        this.getIdServices();
    };
    /**
     * getIdServices
     */
    AddPromotionsComponent.prototype.getIdServices = function () {
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
                var servicios = response.value.promociones;
                //console.log(servicios.length);
                console.log("ARREGLO DE PROMOCIONES" + JSON.stringify(servicios));
                if (servicios !== null && servicios !== undefined) {
                    console.log(JSON.stringify(response));
                    var strJSON = JSON.stringify(response);
                    var objJSON = eval("(function(){return " + strJSON + ";})()");
                    var size = objJSON.value.promociones.length;
                    _this._dataProducts._idPromotionVet = size;
                    console.log("ID SERVICIO" + size);
                }
                else {
                    _this._dataProducts._idPromotionVet = 0;
                    console.log("ID SERVICIO" + _this._dataProducts._idPromotionVet);
                }
            }
        });
    };
    /**
     * validarDatos
     */
    AddPromotionsComponent.prototype.validarDatos = function () {
        var _this = this;
        this._globalComponent.loadingView();
        var id = application_settings_1.getString("idLogin");
        console.log("Path para guardar las imagenes" + id + "/productos/producto" + this._dataProducts._idPromotionVet);
        console.log(this._dataProducts._nombrePromotionVet);
        if (this._dataProducts._nombrePromotionVet !== undefined && this._dataProducts._nombrePromotionVet !== null && this._dataProducts._nombrePromotionVet !== "") {
            if (this._dataProducts._precioPromotionoVet !== undefined && this._dataProducts._precioPromotionoVet !== null && this._dataProducts._precioPromotionoVet !== "") {
                if (this._dataProducts._descripcionPromotionVet !== undefined && this._dataProducts._descripcionPromotionVet !== null && this._dataProducts._descripcionPromotionVet !== "") {
                    //this._mensaje = "";
                    //this._dataProducts._idUsuario = getString("idLogin");	
                    this._dataProducts._nombrePromotionVet = this._dataProducts._nombrePromotionVet.trim();
                    this._dataProducts._descripcionPromotionVet = this._dataProducts._descripcionPromotionVet.trim();
                    this._dataProducts._nombrePromotionVet = this._globalComponent.MayusPrimera(this._dataProducts._nombrePromotionVet);
                    this._dataProducts._descripcionPromotionVet = this._globalComponent.MayusPrimera(this._dataProducts._descripcionPromotionVet);
                    this._dataProducts._idUsuario = application_settings_1.getString("idLogin");
                    this._dataProducts._precioPromotionoVet = this._globalComponent.validarFormatMiles(this._dataProducts._precioPromotionoVet, '');
                    this._servicioFirebase.addPromotionsVets(this._dataProducts).then(function (response) {
                        if (response === "guardado") {
                            _this._globalComponent.validateSuccess("Promoción registrada correctamente.");
                            _this._dataProducts._nombrePromotionVet = "";
                            _this._dataProducts._precioPromotionoVet = "";
                            _this._dataProducts._descripcionPromotionVet = "";
                            _this.getBack();
                            //this.getIdServices();
                            _this._globalComponent.loadingHide();
                        }
                        else {
                            _this._globalComponent.validarErrores(response);
                            _this._globalComponent.loadingHide();
                        }
                    });
                }
                else {
                    this._globalComponent.validarCampo("descripción");
                    this._globalComponent.loadingHide();
                }
            }
            else {
                this._globalComponent.validarCampo("precio");
                this._globalComponent.loadingHide();
            }
        }
        else {
            this._globalComponent.validarCampo("nombre");
            this._globalComponent.loadingHide();
        }
    };
    /**
     * getBack
     */
    AddPromotionsComponent.prototype.getBack = function () {
        this._routEx.navigate(["promotions"], {
            clearHistory: true,
            transition: {
                name: "slideRight",
                duration: 400,
                curve: "ease"
            }
        });
    };
    AddPromotionsComponent = __decorate([
        core_1.Component({
            selector: 'add-promotions',
            templateUrl: './pages/add-promotions/add-promotions.component.html',
            styleUrls: ['./pages/add-promotions/add-promotions.component.css'],
            providers: [firebase_service_1.ServiceFirebase]
        }),
        __metadata("design:paramtypes", [firebase_service_1.ServiceFirebase, router_1.RouterExtensions])
    ], AddPromotionsComponent);
    return AddPromotionsComponent;
}());
exports.AddPromotionsComponent = AddPromotionsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLXByb21vdGlvbnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWRkLXByb21vdGlvbnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELG9FQUFrRTtBQUNsRSwrREFBNEQ7QUFDNUQsMERBQTREO0FBQzVELG1HQUF1RjtBQUN2RixpRUFBOEQ7QUFDOUQsc0RBQStEO0FBQy9ELDBEQUEwRDtBQUMxRCw0Q0FBNEM7QUFDNUMsOENBQThDO0FBQzlDLG1EQUFtRDtBQVNuRDtJQUtDLGdDQUFvQixpQkFBa0MsRUFBUyxPQUF3QjtRQUFuRSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWlCO1FBQVMsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUFDdEYsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLCtCQUFhLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSw4QkFBZSxFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLGlDQUFjLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRUQseUNBQVEsR0FBUjtRQUNDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQ7O09BRU07SUFDQyw4Q0FBYSxHQUFwQjtRQUFBLGlCQTRCQztRQTNCQSxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsR0FBRyxnQ0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsUUFBUTtZQUM1RSxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbkQsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztZQUN6QixPQUFPLENBQUMs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LEVBQUUsQ0FBQyxxREFBcUQsQ0FBQztZQUNsRSxTQUFTLEVBQUUsQ0FBQyxrQ0FBZSxDQUFDO1NBQzVCLENBQUM7eUNBT3NDLGtDQUFlLEVBQWlCLHlCQUFnQjtPQUwzRSxzQkFBc0IsQ0FnSGxDO0lBQUQsNkJBQUM7Q0FBQSxBQWhIRCxJQWdIQztBQWhIWSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2VydmljZUZpcmViYXNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBTZXJ2aWNpb3NWZXRzIH0gZnJvbSAnLi4vLi4vbW9kYWwvc2VydmljaW9zLm1vZGFsJztcbmltcG9ydCB7IEdsb2JhbENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvbnN0cy9nbG9iYWwubW9kZWwnO1xuaW1wb3J0IHsgZ2V0U3RyaW5nIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5ncy9hcHBsaWNhdGlvbi1zZXR0aW5ncyc7XG5pbXBvcnQgeyBQcm9tb3Rpb25zVmV0cyB9IGZyb20gJy4uLy4uL21vZGFsL3Byb21vdGlvbnMubW9kYWwnO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XG4vL2ltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhcic7XG4vL2ltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gJ3VpL3RleHQtZmllbGQnO1xuLy9pbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tICdkYXRhL29ic2VydmFibGUnO1xuLy9pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ2FkZC1wcm9tb3Rpb25zJyxcblx0dGVtcGxhdGVVcmw6ICcuL3BhZ2VzL2FkZC1wcm9tb3Rpb25zL2FkZC1wcm9tb3Rpb25zLmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJy4vcGFnZXMvYWRkLXByb21vdGlvbnMvYWRkLXByb21vdGlvbnMuY29tcG9uZW50LmNzcyddLFxuXHRwcm92aWRlcnM6IFtTZXJ2aWNlRmlyZWJhc2VdXG59KVxuXG5leHBvcnQgY2xhc3MgQWRkUHJvbW90aW9uc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cblx0X2RhdGFQcm9kdWN0czogUHJvbW90aW9uc1ZldHM7XG5cdF9nbG9iYWxDb21wb25lbnQ6IEdsb2JhbENvbXBvbmVudDtcblx0X2RhdGFTZXJ2aWNlOiBTZXJ2aWNpb3NWZXRzO1xuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZXJ2aWNpb0ZpcmViYXNlOiBTZXJ2aWNlRmlyZWJhc2UscHJpdmF0ZSBfcm91dEV4OlJvdXRlckV4dGVuc2lvbnMpIHtcblx0XHR0aGlzLl9kYXRhU2VydmljZSA9IG5ldyBTZXJ2aWNpb3NWZXRzKCk7XG5cdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50ID0gbmV3IEdsb2JhbENvbXBvbmVudCgpO1xuXHRcdHRoaXMuX2RhdGFQcm9kdWN0cyA9IG5ldyBQcm9tb3Rpb25zVmV0cygpO1xuXHR9XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0dGhpcy5nZXRJZFNlcnZpY2VzKCk7XG5cdH1cblxuXHQvKipcbiAgICAgKiBnZXRJZFNlcnZpY2VzXG4gICAgICovXG5cdHB1YmxpYyBnZXRJZFNlcnZpY2VzKCkge1xuXHRcdHRoaXMuX2RhdGFTZXJ2aWNlLl9pZFVzdWFyaW8gPSBnZXRTdHJpbmcoXCJpZExvZ2luXCIpO1xuXHRcdHRoaXMuX3NlcnZpY2lvRmlyZWJhc2UuZ2V0U2VydmljZXNWZXRlcmluYXJ5KHRoaXMuX2RhdGFTZXJ2aWNlKS50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdGNvbnNvbGUubG9nKFwicmVzcG9uc2VcIiArIEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlKSk7XG5cdFx0XHRsZXQgcmVzID0gcmVzcG9uc2UudmFsdWU7XG5cdFx0XHRjb25zb2xlLmxvZyhcIlJFU1BPTlNFIFBST01PQ0lPTkVTXCIgKyByZXMpO1xuXHRcdFx0aWYgKHJlcyAhPT0gbnVsbCAmJiByZXMgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHQvL2xldCByZXNwb25zZSA9IEpTT04uc3RyaW5naWZ5KHJlcyk7XG5cdFx0XHRcdC8vY29uc29sZS5sb2coXCJDb25zdWx0YSBEZXNjcmlwY2lvblwiK3Jlc3BvbnNlKTtcblx0XHRcdFx0Ly9pZihyZXNwb25zZSAhPT0gbnVsbCAmJiByZXNwb25zZSAhPT0gdW5kZWZpbmVkKXtcblxuXHRcdFx0XHRsZXQgc2VydmljaW9zID0gcmVzcG9uc2UudmFsdWUucHJvbW9jaW9uZXM7XG5cdFx0XHRcdC8vY29uc29sZS5sb2coc2VydmljaW9zLmxlbmd0aCk7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiQVJSRUdMTyBERSBQUk9NT0NJT05FU1wiICsgSlNPTi5zdHJpbmdpZnkoc2VydmljaW9zKSk7XG5cdFx0XHRcdGlmIChzZXJ2aWNpb3MgIT09IG51bGwgJiYgc2VydmljaW9zICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpO1xuXHRcdFx0XHRcdHZhciBzdHJKU09OID0gSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpO1xuXHRcdFx0XHRcdHZhciBvYmpKU09OID0gZXZhbChcIihmdW5jdGlvbigpe3JldHVybiBcIiArIHN0ckpTT04gKyBcIjt9KSgpXCIpO1xuXHRcdFx0XHRcdGxldCBzaXplID0gb2JqSlNPTi52YWx1ZS5wcm9tb2Npb25lcy5sZW5ndGg7XG5cdFx0XHRcdFx0dGhpcy5fZGF0YVByb2R1Y3RzLl9pZFByb21vdGlvblZldCA9IHNpemU7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJJRCBTRVJWSUNJT1wiICsgc2l6ZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5fZGF0YVByb2R1Y3RzLl9pZFByb21vdGlvblZldCA9IDA7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJJRCBTRVJWSUNJT1wiICsgdGhpcy5fZGF0YVByb2R1Y3RzLl9pZFByb21vdGlvblZldCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdH0pO1xuXHR9XG5cblxuXHQvKipcblx0ICogdmFsaWRhckRhdG9zXG5cdCAqL1xuXHRwdWJsaWMgdmFsaWRhckRhdG9zKCkge1xuXHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC5sb2FkaW5nVmlldygpO1xuXHRcdGxldCBpZCA9IGdldFN0cmluZyhcImlkTG9naW5cIik7XG5cdFx0Y29uc29sZS5sb2coXCJQYXRoIHBhcmEgZ3VhcmRhciBsYXMgaW1hZ2VuZXNcIiArIGlkICsgXCIvcHJvZHVjdG9zL3Byb2R1Y3RvXCIgKyB0aGlzLl9kYXRhUHJvZHVjdHMuX2lkUHJvbW90aW9uVmV0KVxuXHRcdGNvbnNvbGUubG9nKHRoaXMuX2RhdGFQcm9kdWN0cy5fbm9tYnJlUHJvbW90aW9uVmV0KTtcblx0XHRpZiAodGhpcy5fZGF0YVByb2R1Y3RzLl9ub21icmVQcm9tb3Rpb25WZXQgIT09IHVuZGVmaW5lZCAmJiB0aGlzLl9kYXRhUHJvZHVjdHMuX25vbWJyZVByb21vdGlvblZldCAhPT0gbnVsbCAmJiB0aGlzLl9kYXRhUHJvZHVjdHMuX25vbWJyZVByb21vdGlvblZldCAhPT0gXCJcIikge1xuXHRcdFx0aWYgKHRoaXMuX2RhdGFQcm9kdWN0cy5fcHJlY2lvUHJvbW90aW9ub1ZldCAhPT0gdW5kZWZpbmVkICYmIHRoaXMuX2RhdGFQcm9kdWN0cy5fcHJlY2lvUHJvbW90aW9ub1ZldCAhPT0gbnVsbCAmJiB0aGlzLl9kYXRhUHJvZHVjdHMuX3ByZWNpb1Byb21vdGlvbm9WZXQgIT09IFwiXCIpIHtcblx0XHRcdFx0aWYgKHRoaXMuX2RhdGFQcm9kdWN0cy5fZGVzY3JpcGNpb25Qcm9tb3Rpb25WZXQgIT09IHVuZGVmaW5lZCAmJiB0aGlzLl9kYXRhUHJvZHVjdHMuX2Rlc2NyaXBjaW9uUHJvbW90aW9uVmV0ICE9PSBudWxsICYmIHRoaXMuX2RhdGFQcm9kdWN0cy5fZGVzY3JpcGNpb25Qcm9tb3Rpb25WZXQgIT09IFwiXCIpIHtcblx0XHRcdFx0XHQvL3RoaXMuX21lbnNhamUgPSBcIlwiO1xuXHRcdFx0XHRcdC8vdGhpcy5fZGF0YVByb2R1Y3RzLl9pZFVzdWFyaW8gPSBnZXRTdHJpbmcoXCJpZExvZ2luXCIpO1x0XG5cdFx0XHRcdFx0XG5cdFx0XHRcdHRoaXMuX2RhdGFQcm9kdWN0cy5fbm9tYnJlUHJvbW90aW9uVmV0ID0gdGhpcy5fZGF0YVByb2R1Y3RzLl9ub21icmVQcm9tb3Rpb25WZXQudHJpbSgpO1xuXHRcdFx0XHR0aGlzLl9kYXRhUHJvZHVjdHMuX2Rlc2NyaXBjaW9uUHJvbW90aW9uVmV0ID0gdGhpcy5fZGF0YVByb2R1Y3RzLl9kZXNjcmlwY2lvblByb21vdGlvblZldC50cmltKCk7XG5cdFx0XHRcdHRoaXMuX2RhdGFQcm9kdWN0cy5fbm9tYnJlUHJvbW90aW9uVmV0ID0gdGhpcy5fZ2xvYmFsQ29tcG9uZW50Lk1heXVzUHJpbWVyYSh0aGlzLl9kYXRhUHJvZHVjdHMuX25vbWJyZVByb21vdGlvblZldCk7XG5cdFx0XHRcdHRoaXMuX2RhdGFQcm9kdWN0cy5fZGVzY3JpcGNpb25Qcm9tb3Rpb25WZXQgPSB0aGlzLl9nbG9iYWxDb21wb25lbnQuTWF5dXNQcmltZXJhKHRoaXMuX2RhdGFQcm9kdWN0cy5fZGVzY3JpcGNpb25Qcm9tb3Rpb25WZXQpO1xuXG5cdFx0XHRcdHRoaXMuX2RhdGFQcm9kdWN0cy5faWRVc3VhcmlvID0gZ2V0U3RyaW5nKFwiaWRMb2dpblwiKTtcblx0XHRcdFx0dGhpcy5fZGF0YVByb2R1Y3RzLl9wcmVjaW9Qcm9tb3Rpb25vVmV0ID0gdGhpcy5fZ2xvYmFsQ29tcG9uZW50LnZhbGlkYXJGb3JtYXRNaWxlcyh0aGlzLl9kYXRhUHJvZHVjdHMuX3ByZWNpb1Byb21vdGlvbm9WZXQsJycpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3NlcnZpY2lvRmlyZWJhc2UuYWRkUHJvbW90aW9uc1ZldHModGhpcy5fZGF0YVByb2R1Y3RzKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYocmVzcG9uc2UgPT09IFwiZ3VhcmRhZG9cIil7XG5cdFx0XHRcdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQudmFsaWRhdGVTdWNjZXNzKFwiUHJvbW9jacOzbiByZWdpc3RyYWRhIGNvcnJlY3RhbWVudGUuXCIpO1xuXHRcdFx0XHRcdFx0dGhpcy5fZGF0YVByb2R1Y3RzLl9ub21icmVQcm9tb3Rpb25WZXQgPSBcIlwiO1xuXHRcdFx0XHRcdFx0dGhpcy5fZGF0YVByb2R1Y3RzLl9wcmVjaW9Qcm9tb3Rpb25vVmV0ID0gXCJcIjtcblx0XHRcdFx0XHRcdHRoaXMuX2RhdGFQcm9kdWN0cy5fZGVzY3JpcGNpb25Qcm9tb3Rpb25WZXQgPSBcIlwiO1xuXHRcdFx0XHRcdFx0dGhpcy5nZXRCYWNrKCk7XG5cdFx0XHRcdFx0XHQvL3RoaXMuZ2V0SWRTZXJ2aWNlcygpO1xuXHRcdFx0XHRcdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LmxvYWRpbmdIaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuXHRcdFx0XHRcdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LnZhbGlkYXJFcnJvcmVzKHJlc3BvbnNlKTtcblx0XHRcdFx0XHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC5sb2FkaW5nSGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XHRcdFx0XHRcdFxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC52YWxpZGFyQ2FtcG8oXCJkZXNjcmlwY2nDs25cIik7XG5cdFx0XHRcdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LmxvYWRpbmdIaWRlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC52YWxpZGFyQ2FtcG8oXCJwcmVjaW9cIik7XG5cdFx0XHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC5sb2FkaW5nSGlkZSgpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQudmFsaWRhckNhbXBvKFwibm9tYnJlXCIpO1xuXHRcdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LmxvYWRpbmdIaWRlKCk7XG5cdFx0fVxuXG5cdH1cblxuXHQvKipcblx0ICogZ2V0QmFja1xuXHQgKi9cblx0cHVibGljIGdldEJhY2soKSB7XG5cdFx0dGhpcy5fcm91dEV4Lm5hdmlnYXRlKFtcInByb21vdGlvbnNcIl0se1xuXHRcdFx0Y2xlYXJIaXN0b3J5OnRydWUsXG5cdFx0XHR0cmFuc2l0aW9uOntcblx0XHRcdFx0bmFtZTpcInNsaWRlUmlnaHRcIixcblx0XHRcdFx0ZHVyYXRpb246NDAwLFxuXHRcdFx0XHRjdXJ2ZTpcImVhc2VcIlxuXHRcdFx0fVxuXHRcdH0pXG5cdH1cbn0iXX0=