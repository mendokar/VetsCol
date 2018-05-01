"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';
var dialogs = require("ui/dialogs");
var global_model_1 = require("../../consts/global.model");
var firebase_service_1 = require("../../services/firebase.service");
var router_1 = require("nativescript-angular/router");
var application_settings_1 = require("tns-core-modules/application-settings/application-settings");
var usuario_modal_1 = require("../../modal/usuario.modal");
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(_routEx) {
        this._routEx = _routEx;
        this._viewUpdate = false;
        this._editar = false;
        this._globalComponent = new global_model_1.GlobalComponent();
        this._serviceFirebase = new firebase_service_1.ServiceFirebase();
        this._datosUsuario = new usuario_modal_1.DatosUsuario();
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.getDataUser();
    };
    /**
     * cerrarSesion
     */
    ProfileComponent.prototype.cerrarSesion = function () {
        var _this = this;
        dialogs.confirm({
            title: "Uppsss!",
            message: "¿Realmente deseas cerrar Sesión?",
            okButtonText: "NO",
            cancelButtonText: "Cancelar",
            neutralButtonText: "SI"
        }).then(function (result) {
            // result argument is boolean
            console.log("Dialog result: " + result);
            if (result === undefined) {
                _this._globalComponent.loadingView();
                _this._globalComponent.elimiarTemporales();
                _this._serviceFirebase.cerrarSesion();
                _this._routEx.navigate([''], {
                    clearHistory: true,
                    transition: {
                        name: "fade",
                        duration: 400,
                        curve: "ease"
                    }
                });
                _this._globalComponent.loadingHide();
            }
            else {
                _this._globalComponent.loadingHide();
            }
        });
    };
    /**
     * getBack
     */
    ProfileComponent.prototype.getBack = function () {
        this._routEx.back();
    };
    /**
     * habilitarDato
     */
    ProfileComponent.prototype._editarDatos = function () {
        if (this._editar === false) {
            this._editar = true;
            this._viewUpdate = true;
        }
        else {
            this._editar = false;
            this._viewUpdate = false;
        }
    };
    /**
     * getDataUser
     */
    ProfileComponent.prototype.getDataUser = function () {
        var _this = this;
        var idUser = application_settings_1.getString("idLogin");
        this._serviceFirebase.consultarDatosUsuario(idUser).then(function (response) {
            console.log(JSON.stringify(response.value));
            _this._nombre = response.value[idUser].nombre;
            _this._correo = response.value[idUser].correo;
            _this._celular = response.value[idUser].celular;
            _this._datosUsuario._fecha_creacion = response.value[idUser].fecha_creacion;
        });
    };
    /**
     * updateData
     */
    ProfileComponent.prototype.updateData = function () {
        var _this = this;
        console.log(this._datosUsuario._nombre);
        this._datosUsuario._id = application_settings_1.getString("idLogin");
        this._serviceFirebase.modificarDatosUsuario(this._datosUsuario).then(function (response) {
            console.log(response);
            _this._editar = false;
            _this._viewUpdate = false;
        });
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: 'profile',
            templateUrl: './pages/profile/profile.component.html',
            styleUrls: ['./pages/profile/profile.component.css'],
            providers: [firebase_service_1.ServiceFirebase]
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcm9maWxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCwwREFBMEQ7QUFDMUQsNENBQTRDO0FBQzVDLDhDQUE4QztBQUM5QyxtREFBbUQ7QUFFbkQsb0NBQXNDO0FBQ3RDLDBEQUE0RDtBQUM1RCxvRUFBa0U7QUFDbEUsc0RBQStEO0FBQy9ELG1HQUF1RjtBQUN2RiwyREFBeUQ7QUFTekQ7SUFVQywwQkFBb0IsT0FBeUI7UUFBekIsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7UUFKN0MsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUlmLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLDhCQUFlLEVBQUUsQ0FBQztRQUM5QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxrQ0FBZSxFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLDRCQUFZLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQsbUNBQVEsR0FBUjtRQUNDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUY7O09BRUc7SUFDSSx1Q0FBWSxHQUFuQjtRQUFBLGlCQThCQztRQTdCQSxPQUFPLENBQUMsT0FBTyxDQUFDO1lBQ2YsS0FBSyxFQUFFLFNBQVM7WUFDaEIsT0FBTyxFQUFFLGtDQUFrQztZQUMzQyxZQUFZLEVBQUUsSUFBSTtZQUNsQixnQkFBZ0IsRUFBRSxVQUFVO1lBQzVCLGlCQUFpQixFQUFFLElBQUk7U0FDdkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDYiw2QkFBNkI7WUFFN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxNQUFNLENBQUMsQ0FBQztZQUN4QyxFQUFFLENBQUMsQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDLENBQUMs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Z0I7UUFQNUIsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFdBQVcsRUFBRSx3Q0FBd0M7WUFDckQsU0FBUyxFQUFFLENBQUMsdUNBQXVDLENBQUM7WUFDcEQsU0FBUyxFQUFFLENBQUMsa0NBQWUsQ0FBQztTQUM1QixDQUFDO3lDQVk0Qix5QkFBZ0I7T0FWakMsZ0JBQWdCLENBc0c1QjtJQUFELHVCQUFDO0NBQUEsQUF0R0QsSUFzR0M7QUF0R1ksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyJztcbi8vaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSAndWkvdGV4dC1maWVsZCc7XG4vL2ltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gJ2RhdGEvb2JzZXJ2YWJsZSc7XG4vL2ltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xuaW1wb3J0IHsgR2xvYmFsQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29uc3RzL2dsb2JhbC5tb2RlbCc7XG5pbXBvcnQgeyBTZXJ2aWNlRmlyZWJhc2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlJztcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgZ2V0U3RyaW5nIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5ncy9hcHBsaWNhdGlvbi1zZXR0aW5ncyc7XG5pbXBvcnQgeyBEYXRvc1VzdWFyaW8gfSBmcm9tICcuLi8uLi9tb2RhbC91c3VhcmlvLm1vZGFsJztcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAncHJvZmlsZScsXG5cdHRlbXBsYXRlVXJsOiAnLi9wYWdlcy9wcm9maWxlL3Byb2ZpbGUuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnLi9wYWdlcy9wcm9maWxlL3Byb2ZpbGUuY29tcG9uZW50LmNzcyddLFxuXHRwcm92aWRlcnM6IFtTZXJ2aWNlRmlyZWJhc2VdXG59KVxuXG5leHBvcnQgY2xhc3MgUHJvZmlsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cblx0X2NlbHVsYXI6IGFueTtcblx0X2NvcnJlbzogYW55O1xuXHRfbm9tYnJlOiBhbnk7XG5cdF9kYXRvc1VzdWFyaW86IERhdG9zVXN1YXJpbztcblx0X3ZpZXdVcGRhdGUgPSBmYWxzZTtcblx0X2VkaXRhciA9IGZhbHNlO1xuXHRfc2VydmljZUZpcmViYXNlOiBTZXJ2aWNlRmlyZWJhc2U7XG5cdF9nbG9iYWxDb21wb25lbnQ6IEdsb2JhbENvbXBvbmVudDtcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBfcm91dEV4OiBSb3V0ZXJFeHRlbnNpb25zKSB7XG5cdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50ID0gbmV3IEdsb2JhbENvbXBvbmVudCgpO1xuXHRcdHRoaXMuX3NlcnZpY2VGaXJlYmFzZSA9IG5ldyBTZXJ2aWNlRmlyZWJhc2UoKTtcblx0XHR0aGlzLl9kYXRvc1VzdWFyaW8gPSBuZXcgRGF0b3NVc3VhcmlvKCk7XG5cdH1cblxuXHRuZ09uSW5pdCgpIHtcblx0XHR0aGlzLmdldERhdGFVc2VyKCk7XG5cdFx0fVxuXG5cdC8qKlxuXHQgKiBjZXJyYXJTZXNpb25cblx0ICovXG5cdHB1YmxpYyBjZXJyYXJTZXNpb24oKSB7XG5cdFx0ZGlhbG9ncy5jb25maXJtKHtcblx0XHRcdHRpdGxlOiBcIlVwcHNzcyFcIixcblx0XHRcdG1lc3NhZ2U6IFwiwr9SZWFsbWVudGUgZGVzZWFzIGNlcnJhciBTZXNpw7NuP1wiLFxuXHRcdFx0b2tCdXR0b25UZXh0OiBcIk5PXCIsXG5cdFx0XHRjYW5jZWxCdXR0b25UZXh0OiBcIkNhbmNlbGFyXCIsXG5cdFx0XHRuZXV0cmFsQnV0dG9uVGV4dDogXCJTSVwiXG5cdFx0fSkudGhlbihyZXN1bHQgPT4ge1xuXHRcdFx0Ly8gcmVzdWx0IGFyZ3VtZW50IGlzIGJvb2xlYW5cblxuXHRcdFx0Y29uc29sZS5sb2coXCJEaWFsb2cgcmVzdWx0OiBcIiArIHJlc3VsdCk7XG5cdFx0XHRpZiAocmVzdWx0ID09PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LmxvYWRpbmdWaWV3KCk7XG5cdFx0XHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC5lbGltaWFyVGVtcG9yYWxlcygpO1xuXHRcdFx0XHR0aGlzLl9zZXJ2aWNlRmlyZWJhc2UuY2VycmFyU2VzaW9uKCk7XG5cdFx0XHRcdHRoaXMuX3JvdXRFeC5uYXZpZ2F0ZShbJyddLCB7XG5cdFx0XHRcdFx0Y2xlYXJIaXN0b3J5OiB0cnVlLFxuXHRcdFx0XHRcdHRyYW5zaXRpb246IHtcblx0XHRcdFx0XHRcdG5hbWU6IFwiZmFkZVwiLFxuXHRcdFx0XHRcdFx0ZHVyYXRpb246IDQwMCxcblx0XHRcdFx0XHRcdGN1cnZlOiBcImVhc2VcIlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblxuXHRcdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQubG9hZGluZ0hpZGUoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC5sb2FkaW5nSGlkZSgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdH1cblxuXHQvKipcblx0ICogZ2V0QmFja1xuXHQgKi9cblx0cHVibGljIGdldEJhY2soKSB7XG5cdFx0dGhpcy5fcm91dEV4LmJhY2soKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBoYWJpbGl0YXJEYXRvXG5cdCAqL1xuXHRwdWJsaWMgX2VkaXRhckRhdG9zKCkge1xuXHRcdGlmICh0aGlzLl9lZGl0YXIgPT09IGZhbHNlKSB7XG5cdFx0XHR0aGlzLl9lZGl0YXIgPSB0cnVlO1xuXHRcdFx0dGhpcy5fdmlld1VwZGF0ZSA9IHRydWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX2VkaXRhciA9IGZhbHNlO1xuXHRcdFx0dGhpcy5fdmlld1VwZGF0ZSA9IGZhbHNlO1xuXHRcdH1cblxuXHR9XG5cblx0LyoqXG5cdCAqIGdldERhdGFVc2VyXG5cdCAqL1xuXHRwdWJsaWMgZ2V0RGF0YVVzZXIoKSB7XG5cdFx0bGV0IGlkVXNlciA9Z2V0U3RyaW5nKFwiaWRMb2dpblwiKTtcblx0XHR0aGlzLl9zZXJ2aWNlRmlyZWJhc2UuY29uc3VsdGFyRGF0b3NVc3VhcmlvKGlkVXNlcikudGhlbihyZXNwb25zZSA9Pntcblx0XHRcdGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlLnZhbHVlKSk7XG5cdFx0XHR0aGlzLl9ub21icmUgPXJlc3BvbnNlLnZhbHVlW2lkVXNlcl0ubm9tYnJlO1xuXHRcdFx0dGhpcy5fY29ycmVvID0gcmVzcG9uc2UudmFsdWVbaWRVc2VyXS5jb3JyZW87XG5cdFx0XHR0aGlzLl9jZWx1bGFyID0gcmVzcG9uc2UudmFsdWVbaWRVc2VyXS5jZWx1bGFyO1xuXHRcdFx0dGhpcy5fZGF0b3NVc3VhcmlvLl9mZWNoYV9jcmVhY2lvbiA9IHJlc3BvbnNlLnZhbHVlW2lkVXNlcl0uZmVjaGFfY3JlYWNpb247XG5cdFx0fSk7XG5cdH1cblxuXHQvKipcblx0ICogdXBkYXRlRGF0YVxuXHQgKi9cblx0cHVibGljIHVwZGF0ZURhdGEoKSB7XG5cdFx0Y29uc29sZS5sb2codGhpcy5fZGF0b3NVc3VhcmlvLl9ub21icmUpO1xuXHRcdHRoaXMuX2RhdG9zVXN1YXJpby5faWQgPWdldFN0cmluZyhcImlkTG9naW5cIik7XG5cdFx0dGhpcy5fc2VydmljZUZpcmViYXNlLm1vZGlmaWNhckRhdG9zVXN1YXJpbyh0aGlzLl9kYXRvc1VzdWFyaW8pLnRoZW4ocmVzcG9uc2UgPT57XG5cdFx0XHRjb25zb2xlLmxvZyhyZXNwb25zZSk7XG5cdFx0XHR0aGlzLl9lZGl0YXIgPSBmYWxzZTtcblx0XHRcdHRoaXMuX3ZpZXdVcGRhdGUgPSBmYWxzZTtcblx0XHR9KTtcblx0fVxufSJdfQ==