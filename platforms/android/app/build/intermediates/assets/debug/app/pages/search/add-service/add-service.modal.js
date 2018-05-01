"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var page_1 = require("tns-core-modules/ui/page/page");
var router_1 = require("nativescript-angular/router");
var firebase_service_1 = require("../../../services/firebase.service");
var servicios_modal_1 = require("../../../modal/servicios.modal");
var application_settings_1 = require("tns-core-modules/application-settings/application-settings");
var global_model_1 = require("../../../consts/global.model");
var AddServiceModal = /** @class */ (function () {
    function AddServiceModal(_modal, _page, _routEx, _servicioFirebase) {
        this._modal = _modal;
        this._page = _page;
        this._routEx = _routEx;
        this._servicioFirebase = _servicioFirebase;
        this._mensaje = "";
        this._page.on("loaded", function (args) {
            args.object.backgroundColor = "transparent";
        });
        this._dataService = new servicios_modal_1.ServiciosVets();
        this._globalConst = new global_model_1.GlobalComponent();
    }
    AddServiceModal.prototype.ngOnInit = function () {
        this.getIdServices();
    };
    /**
     * hide
     */
    AddServiceModal.prototype.hide = function () {
        this._modal.closeCallback();
        this._routEx.navigate(["services"]);
    };
    /**
     * addServicesVets
     */
    AddServiceModal.prototype.addServicesVets = function () {
        var _this = this;
        this._mensaje = "";
        console.log(this._dataService._nombreServicioVet);
        if (this._dataService._nombreServicioVet !== undefined && this._dataService._nombreServicioVet !== null && this._dataService._nombreServicioVet !== "") {
            if (this._dataService._descripcionServicioVet !== undefined && this._dataService._descripcionServicioVet !== null && this._dataService._descripcionServicioVet !== "") {
                this._mensaje = "";
                this._dataService._idUsuario = application_settings_1.getString("idLogin");
                this._servicioFirebase.addServicesVets(this._dataService).then(function (response) {
                    if (response === "guardado") {
                        _this._mensaje = "Servicio registrado correctamente.";
                    }
                    else {
                        _this._globalConst.validarErrores(response);
                    }
                });
            }
            else {
                this.validateMessage("descripcion");
            }
        }
        else {
            this.validateMessage("nombre");
        }
    };
    /**
     * validateMessage
     */
    AddServiceModal.prototype.validateMessage = function (dato) {
        this._mensaje = "";
        this._mensaje = "El campo " + dato + " es necesario para continuar.";
    };
    /**
     * getIdServices
     */
    AddServiceModal.prototype.getIdServices = function () {
        var _this = this;
        this._dataService._idUsuario = application_settings_1.getString("idLogin");
        this._servicioFirebase.getServicesVeterinary(this._dataService).then(function (response) {
            console.log("response" + JSON.stringify(response));
            console.log(JSON.stringify(response));
            var strJSON = JSON.stringify(response);
            var objJSON = eval("(function(){return " + strJSON + ";})()");
            var size = objJSON.value.servicios.length;
            _this._dataService._idServicioVet = size;
            console.log("ID SERVICIO" + size);
        });
    };
    AddServiceModal = __decorate([
        core_1.Component({
            selector: 'add-service',
            templateUrl: "./pages/search/add-service/add-service.modal.html",
            styleUrls: ["./pages/search/add-service/add-service.modal.scss"],
            providers: [firebase_service_1.ServiceFirebase]
        }),
        __metadata("design:paramtypes", [dialogs_1.ModalDialogParams,
            page_1.Page,
            router_1.RouterExtensions,
            firebase_service_1.ServiceFirebase])
    ], AddServiceModal);
    return AddServiceModal;
}());
exports.AddServiceModal = AddServiceModal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLXNlcnZpY2UubW9kYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhZGQtc2VydmljZS5tb2RhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxtRUFBNEU7QUFDNUUsc0RBQXFEO0FBQ3JELHNEQUErRDtBQUMvRCx1RUFBcUU7QUFDckUsa0VBQStEO0FBQy9ELG1HQUF1RjtBQUN2Riw2REFBK0Q7QUFRL0Q7SUFTSSx5QkFBb0IsTUFBeUIsRUFDakMsS0FBVyxFQUNYLE9BQXlCLEVBQ3pCLGlCQUFrQztRQUgxQixXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUNqQyxVQUFLLEdBQUwsS0FBSyxDQUFNO1FBQ1gsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7UUFDekIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFpQjtRQVI5QyxhQUFRLEdBQUcsRUFBRSxDQUFDO1FBU1YsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQUMsSUFBSTtZQUNuQixJQUFJLENBQUMsTUFBTyxDQUFDLGVBQWUsR0FBRyxhQUFhLENBQUE7UUFDdEQsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksK0JBQWEsRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSw4QkFBZSxFQUFFLENBQUM7SUFDOUMsQ0FBQztJQWJELGtDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQWFEOztPQUVHO0lBQ0ksOEJBQUksR0FBWDtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRDs7T0FFRztJQUNJLHlDQUFlLEdBQXRCO1FBQUEsaUJBc0JDO1FBckJHLElBQUksQ0FBQyxRQUFR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LEVBQUUsbURBQW1EO1lBQ2hFLFNBQVMsRUFBRSxDQUFDLG1EQUFtRCxDQUFDO1lBQ2hFLFNBQVMsRUFBQyxDQUFDLGtDQUFlLENBQUM7U0FDOUIsQ0FBQzt5Q0FVOEIsMkJBQWlCO1lBQzFCLFdBQUk7WUFDRix5QkFBZ0I7WUFDTixrQ0FBZTtPQVpyQyxlQUFlLENBaUYzQjtJQUFELHNCQUFDO0NBQUEsQUFqRkQsSUFpRkM7QUFqRlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNb2RhbERpYWxvZ1BhcmFtcyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9ncyc7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlL3BhZ2VcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XHJcbmltcG9ydCB7IFNlcnZpY2VGaXJlYmFzZSB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL2ZpcmViYXNlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBTZXJ2aWNpb3NWZXRzIH0gZnJvbSAnLi4vLi4vLi4vbW9kYWwvc2VydmljaW9zLm1vZGFsJztcclxuaW1wb3J0IHsgZ2V0U3RyaW5nIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5ncy9hcHBsaWNhdGlvbi1zZXR0aW5ncyc7XHJcbmltcG9ydCB7IEdsb2JhbENvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL2NvbnN0cy9nbG9iYWwubW9kZWwnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ2FkZC1zZXJ2aWNlJyxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vcGFnZXMvc2VhcmNoL2FkZC1zZXJ2aWNlL2FkZC1zZXJ2aWNlLm1vZGFsLmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi9wYWdlcy9zZWFyY2gvYWRkLXNlcnZpY2UvYWRkLXNlcnZpY2UubW9kYWwuc2Nzc1wiXSxcclxuICAgIHByb3ZpZGVyczpbU2VydmljZUZpcmViYXNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWRkU2VydmljZU1vZGFsIGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgICBfZ2xvYmFsQ29uc3Q6IEdsb2JhbENvbXBvbmVudDtcclxuICAgIF9kYXRhU2VydmljZTogU2VydmljaW9zVmV0cztcclxuICAgIF9tZW5zYWplID0gXCJcIjtcclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZ2V0SWRTZXJ2aWNlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX21vZGFsOiBNb2RhbERpYWxvZ1BhcmFtcyxcclxuICAgICAgICBwcml2YXRlIF9wYWdlOiBQYWdlLFxyXG4gICAgICAgIHByaXZhdGUgX3JvdXRFeDogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgICAgICBwcml2YXRlIF9zZXJ2aWNpb0ZpcmViYXNlOiBTZXJ2aWNlRmlyZWJhc2UpIHtcclxuICAgICAgICB0aGlzLl9wYWdlLm9uKFwibG9hZGVkXCIsIChhcmdzKSA9PiB7XHJcbiAgICAgICAgICAgICg8YW55PmFyZ3Mub2JqZWN0KS5iYWNrZ3JvdW5kQ29sb3IgPSBcInRyYW5zcGFyZW50XCJcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9kYXRhU2VydmljZSA9IG5ldyBTZXJ2aWNpb3NWZXRzKCk7XHJcbiAgICAgICAgdGhpcy5fZ2xvYmFsQ29uc3QgPSBuZXcgR2xvYmFsQ29tcG9uZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBoaWRlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoaWRlKCkge1xyXG4gICAgICAgIHRoaXMuX21vZGFsLmNsb3NlQ2FsbGJhY2soKTtcclxuICAgICAgICB0aGlzLl9yb3V0RXgubmF2aWdhdGUoW1wic2VydmljZXNcIl0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYWRkU2VydmljZXNWZXRzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRTZXJ2aWNlc1ZldHMoKSB7XHJcbiAgICAgICAgdGhpcy5fbWVuc2FqZSA9IFwiXCI7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5fZGF0YVNlcnZpY2UuX25vbWJyZVNlcnZpY2lvVmV0KTtcclxuICAgICAgICBpZiAodGhpcy5fZGF0YVNlcnZpY2UuX25vbWJyZVNlcnZpY2lvVmV0ICE9PSB1bmRlZmluZWQgJiYgdGhpcy5fZGF0YVNlcnZpY2UuX25vbWJyZVNlcnZpY2lvVmV0ICE9PSBudWxsICYmIHRoaXMuX2RhdGFTZXJ2aWNlLl9ub21icmVTZXJ2aWNpb1ZldCAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fZGF0YVNlcnZpY2UuX2Rlc2NyaXBjaW9uU2VydmljaW9WZXQgIT09IHVuZGVmaW5lZCAmJiB0aGlzLl9kYXRhU2VydmljZS5fZGVzY3JpcGNpb25TZXJ2aWNpb1ZldCAhPT0gbnVsbCAmJiB0aGlzLl9kYXRhU2VydmljZS5fZGVzY3JpcGNpb25TZXJ2aWNpb1ZldCAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWVuc2FqZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhU2VydmljZS5faWRVc3VhcmlvID0gZ2V0U3RyaW5nKFwiaWRMb2dpblwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NlcnZpY2lvRmlyZWJhc2UuYWRkU2VydmljZXNWZXRzKHRoaXMuX2RhdGFTZXJ2aWNlKS50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZihyZXNwb25zZSA9PT0gXCJndWFyZGFkb1wiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWVuc2FqZSA9IFwiU2VydmljaW8gcmVnaXN0cmFkbyBjb3JyZWN0YW1lbnRlLlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9nbG9iYWxDb25zdC52YWxpZGFyRXJyb3JlcyhyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlTWVzc2FnZShcImRlc2NyaXBjaW9uXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy52YWxpZGF0ZU1lc3NhZ2UoXCJub21icmVcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgIFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIHZhbGlkYXRlTWVzc2FnZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdmFsaWRhdGVNZXNzYWdlKGRhdG8pIHtcclxuICAgICAgICB0aGlzLl9tZW5zYWplID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9tZW5zYWplID0gXCJFbCBjYW1wbyBcIiArIGRhdG8gKyBcIiBlcyBuZWNlc2FyaW8gcGFyYSBjb250aW51YXIuXCJcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldElkU2VydmljZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldElkU2VydmljZXMoKSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YVNlcnZpY2UuX2lkVXN1YXJpbyA9IGdldFN0cmluZyhcImlkTG9naW5cIik7XHJcbiAgICAgICAgdGhpcy5fc2VydmljaW9GaXJlYmFzZS5nZXRTZXJ2aWNlc1ZldGVyaW5hcnkodGhpcy5fZGF0YVNlcnZpY2UpLnRoZW4ocmVzcG9uc2UgPT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzcG9uc2VcIitKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpO1xyXG5cclxuICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKTtcclxuXHRcdFx0dmFyIHN0ckpTT04gPSBKU09OLnN0cmluZ2lmeShyZXNwb25zZSk7XHJcblx0XHRcdHZhciBvYmpKU09OID0gZXZhbChcIihmdW5jdGlvbigpe3JldHVybiBcIiArIHN0ckpTT04gKyBcIjt9KSgpXCIpO1xyXG4gICAgICAgICAgICBsZXQgc2l6ZSA9IG9iakpTT04udmFsdWUuc2VydmljaW9zLmxlbmd0aDsgICAgIFxyXG4gICAgICAgICAgICB0aGlzLl9kYXRhU2VydmljZS5faWRTZXJ2aWNpb1ZldCA9IHNpemU7ICAgICAgIFxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIklEIFNFUlZJQ0lPXCIrc2l6ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59Il19