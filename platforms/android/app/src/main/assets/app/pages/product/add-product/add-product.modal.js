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
var AddProductModal = /** @class */ (function () {
    function AddProductModal(_modal, _page, _routEx, _servicioFirebase) {
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
    AddProductModal.prototype.ngOnInit = function () {
        this.getIdServices();
    };
    /**
     * hide
     */
    AddProductModal.prototype.hide = function () {
        this._modal.closeCallback();
        this._routEx.navigate(["services"]);
    };
    /**
     * addServicesVets
     */
    AddProductModal.prototype.addServicesVets = function () {
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
    AddProductModal.prototype.validateMessage = function (dato) {
        this._mensaje = "";
        this._mensaje = "El campo " + dato + " es necesario para continuar.";
    };
    /**
     * getIdServices
     */
    AddProductModal.prototype.getIdServices = function () {
        var _this = this;
        this._dataService._idUsuario = application_settings_1.getString("idLogin");
        this._servicioFirebase.getServicesVeterinary(this._dataService).then(function (response) {
            //console.log("response"+JSON.stringify(response));
            //console.log(JSON.stringify(response));
            var strJSON = JSON.stringify(response);
            var objJSON = eval("(function(){return " + strJSON + ";})()");
            var size = objJSON.value.servicios.length;
            _this._dataService._idServicioVet = size;
            console.log("ID SERVICIO" + size);
        });
    };
    AddProductModal = __decorate([
        core_1.Component({
            selector: 'add-product',
            templateUrl: "./pages/product/add-product/add-product.modal.html",
            styleUrls: ["./pages/product/add-product/add-product.modal.scss"],
            providers: [firebase_service_1.ServiceFirebase]
        }),
        __metadata("design:paramtypes", [dialogs_1.ModalDialogParams,
            page_1.Page,
            router_1.RouterExtensions,
            firebase_service_1.ServiceFirebase])
    ], AddProductModal);
    return AddProductModal;
}());
exports.AddProductModal = AddProductModal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLXByb2R1Y3QubW9kYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhZGQtcHJvZHVjdC5tb2RhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxtRUFBNEU7QUFDNUUsc0RBQXFEO0FBQ3JELHNEQUErRDtBQUMvRCx1RUFBcUU7QUFDckUsa0VBQStEO0FBQy9ELG1HQUF1RjtBQUN2Riw2REFBK0Q7QUFRL0Q7SUFTSSx5QkFBb0IsTUFBeUIsRUFDakMsS0FBVyxFQUNYLE9BQXlCLEVBQ3pCLGlCQUFrQztRQUgxQixXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUNqQyxVQUFLLEdBQUwsS0FBSyxDQUFNO1FBQ1gsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7UUFDekIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFpQjtRQVI5QyxhQUFRLEdBQUcsRUFBRSxDQUFDO1FBU1YsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQUMsSUFBSTtZQUNuQixJQUFJLENBQUMsTUFBTyxDQUFDLGVBQWUsR0FBRyxhQUFhLENBQUE7UUFDdEQsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksK0JBQWEsRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSw4QkFBZSxFQUFFLENBQUM7SUFDOUMsQ0FBQztJQWJELGtDQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQWFEOztPQUVHO0lBQ0ksOEJBQUksR0FBWDtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRDs7T0FFRztJQUNJLHlDQUFlLEdBQXRCO1FBQUEsaUJBc0JDO1FBckJHLElBQUksQ0FBQyxRQUFR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Q0YseUJBQWdCO1lBQ04sa0NBQWU7T0FackMsZUFBZSxDQWlGM0I7SUFBRCxzQkFBQztDQUFBLEFBakZELElBaUZDO0FBakZZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3MnO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZS9wYWdlXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xyXG5pbXBvcnQgeyBTZXJ2aWNlRmlyZWJhc2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU2VydmljaW9zVmV0cyB9IGZyb20gJy4uLy4uLy4uL21vZGFsL3NlcnZpY2lvcy5tb2RhbCc7XHJcbmltcG9ydCB7IGdldFN0cmluZyB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24tc2V0dGluZ3MvYXBwbGljYXRpb24tc2V0dGluZ3MnO1xyXG5pbXBvcnQgeyBHbG9iYWxDb21wb25lbnQgfSBmcm9tICcuLi8uLi8uLi9jb25zdHMvZ2xvYmFsLm1vZGVsJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdhZGQtcHJvZHVjdCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL3BhZ2VzL3Byb2R1Y3QvYWRkLXByb2R1Y3QvYWRkLXByb2R1Y3QubW9kYWwuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL3BhZ2VzL3Byb2R1Y3QvYWRkLXByb2R1Y3QvYWRkLXByb2R1Y3QubW9kYWwuc2Nzc1wiXSxcclxuICAgIHByb3ZpZGVyczpbU2VydmljZUZpcmViYXNlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWRkUHJvZHVjdE1vZGFsIGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgICBfZ2xvYmFsQ29uc3Q6IEdsb2JhbENvbXBvbmVudDtcclxuICAgIF9kYXRhU2VydmljZTogU2VydmljaW9zVmV0cztcclxuICAgIF9tZW5zYWplID0gXCJcIjtcclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZ2V0SWRTZXJ2aWNlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX21vZGFsOiBNb2RhbERpYWxvZ1BhcmFtcyxcclxuICAgICAgICBwcml2YXRlIF9wYWdlOiBQYWdlLFxyXG4gICAgICAgIHByaXZhdGUgX3JvdXRFeDogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgICAgICBwcml2YXRlIF9zZXJ2aWNpb0ZpcmViYXNlOiBTZXJ2aWNlRmlyZWJhc2UpIHtcclxuICAgICAgICB0aGlzLl9wYWdlLm9uKFwibG9hZGVkXCIsIChhcmdzKSA9PiB7XHJcbiAgICAgICAgICAgICg8YW55PmFyZ3Mub2JqZWN0KS5iYWNrZ3JvdW5kQ29sb3IgPSBcInRyYW5zcGFyZW50XCJcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLl9kYXRhU2VydmljZSA9IG5ldyBTZXJ2aWNpb3NWZXRzKCk7XHJcbiAgICAgICAgdGhpcy5fZ2xvYmFsQ29uc3QgPSBuZXcgR2xvYmFsQ29tcG9uZW50KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBoaWRlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoaWRlKCkge1xyXG4gICAgICAgIHRoaXMuX21vZGFsLmNsb3NlQ2FsbGJhY2soKTtcclxuICAgICAgICB0aGlzLl9yb3V0RXgubmF2aWdhdGUoW1wic2VydmljZXNcIl0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogYWRkU2VydmljZXNWZXRzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhZGRTZXJ2aWNlc1ZldHMoKSB7XHJcbiAgICAgICAgdGhpcy5fbWVuc2FqZSA9IFwiXCI7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5fZGF0YVNlcnZpY2UuX25vbWJyZVNlcnZpY2lvVmV0KTtcclxuICAgICAgICBpZiAodGhpcy5fZGF0YVNlcnZpY2UuX25vbWJyZVNlcnZpY2lvVmV0ICE9PSB1bmRlZmluZWQgJiYgdGhpcy5fZGF0YVNlcnZpY2UuX25vbWJyZVNlcnZpY2lvVmV0ICE9PSBudWxsICYmIHRoaXMuX2RhdGFTZXJ2aWNlLl9ub21icmVTZXJ2aWNpb1ZldCAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fZGF0YVNlcnZpY2UuX2Rlc2NyaXBjaW9uU2VydmljaW9WZXQgIT09IHVuZGVmaW5lZCAmJiB0aGlzLl9kYXRhU2VydmljZS5fZGVzY3JpcGNpb25TZXJ2aWNpb1ZldCAhPT0gbnVsbCAmJiB0aGlzLl9kYXRhU2VydmljZS5fZGVzY3JpcGNpb25TZXJ2aWNpb1ZldCAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWVuc2FqZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhU2VydmljZS5faWRVc3VhcmlvID0gZ2V0U3RyaW5nKFwiaWRMb2dpblwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NlcnZpY2lvRmlyZWJhc2UuYWRkU2VydmljZXNWZXRzKHRoaXMuX2RhdGFTZXJ2aWNlKS50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZihyZXNwb25zZSA9PT0gXCJndWFyZGFkb1wiKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWVuc2FqZSA9IFwiU2VydmljaW8gcmVnaXN0cmFkbyBjb3JyZWN0YW1lbnRlLlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9nbG9iYWxDb25zdC52YWxpZGFyRXJyb3JlcyhyZXNwb25zZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlTWVzc2FnZShcImRlc2NyaXBjaW9uXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy52YWxpZGF0ZU1lc3NhZ2UoXCJub21icmVcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgIFxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIHZhbGlkYXRlTWVzc2FnZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdmFsaWRhdGVNZXNzYWdlKGRhdG8pIHtcclxuICAgICAgICB0aGlzLl9tZW5zYWplID0gXCJcIjtcclxuICAgICAgICB0aGlzLl9tZW5zYWplID0gXCJFbCBjYW1wbyBcIiArIGRhdG8gKyBcIiBlcyBuZWNlc2FyaW8gcGFyYSBjb250aW51YXIuXCJcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGdldElkU2VydmljZXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldElkU2VydmljZXMoKSB7XHJcbiAgICAgICAgdGhpcy5fZGF0YVNlcnZpY2UuX2lkVXN1YXJpbyA9IGdldFN0cmluZyhcImlkTG9naW5cIik7XHJcbiAgICAgICAgdGhpcy5fc2VydmljaW9GaXJlYmFzZS5nZXRTZXJ2aWNlc1ZldGVyaW5hcnkodGhpcy5fZGF0YVNlcnZpY2UpLnRoZW4ocmVzcG9uc2UgPT57XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJyZXNwb25zZVwiK0pTT04uc3RyaW5naWZ5KHJlc3BvbnNlKSk7XHJcblxyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlKSk7XHJcblx0XHRcdHZhciBzdHJKU09OID0gSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpO1xyXG5cdFx0XHR2YXIgb2JqSlNPTiA9IGV2YWwoXCIoZnVuY3Rpb24oKXtyZXR1cm4gXCIgKyBzdHJKU09OICsgXCI7fSkoKVwiKTtcclxuICAgICAgICAgICAgbGV0IHNpemUgPSBvYmpKU09OLnZhbHVlLnNlcnZpY2lvcy5sZW5ndGg7ICAgICBcclxuICAgICAgICAgICAgdGhpcy5fZGF0YVNlcnZpY2UuX2lkU2VydmljaW9WZXQgPSBzaXplOyAgICAgICBcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJJRCBTRVJWSUNJT1wiK3NpemUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufSJdfQ==