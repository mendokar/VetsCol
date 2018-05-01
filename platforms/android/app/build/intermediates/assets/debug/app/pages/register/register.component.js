"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var usuario_modal_1 = require("../../modal/usuario.modal");
var global_model_1 = require("../../consts/global.model");
var firebase_service_1 = require("../../services/firebase.service");
var application_settings_1 = require("tns-core-modules/application-settings/application-settings");
var router_1 = require("nativescript-angular/router");
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(_page, _routEx) {
        this._page = _page;
        this._routEx = _routEx;
        this._page.actionBarHidden = true;
        this._datosUsuario = new usuario_modal_1.DatosUsuario();
        this._globalComponent = new global_model_1.GlobalComponent();
        this._serviceFirebase = new firebase_service_1.ServiceFirebase();
    }
    RegisterComponent.prototype.ngOnInit = function () { };
    /**
     * nuevoRegistro
     * Funcion que permite crear el Registro de un nuevo usuario en la aplicacion
     */
    RegisterComponent.prototype.nuevoRegistro = function () {
        this._globalComponent.loadingView();
        this._datosUsuario._nombre = this._globalComponent.MayusPrimera(this._datosUsuario._nombre);
        console.log(this._datosUsuario._nombre);
        if (this._globalComponent.validarEmail(this._datosUsuario._correo) !== false) {
            if (this._datosUsuario._nombre !== "" && this._datosUsuario._nombre !== undefined) {
                if (this._datosUsuario._correo !== "" && this._datosUsuario._correo !== undefined) {
                    if (this._datosUsuario._celular !== "" && this._datosUsuario._celular !== undefined) {
                        //if (this._confirmarView === true) {
                        if (this._datosUsuario._clave !== "" && this._datosUsuario._clave !== undefined) {
                            console.log(" se envian datos para guardar ");
                            this.crearUsuario();
                            //this.mostrarTipoRegistro();
                        }
                        else {
                            this._globalComponent.loadingHide();
                            this._globalComponent.validarCampo("contraseña");
                        }
                        /*} else {
                            console.log(" se envian datos para modificar ");
                            this.modificarUsuarioDatos();
                        }*/
                    }
                    else {
                        this._globalComponent.loadingHide();
                        this._globalComponent.validarCampo("celular");
                    }
                }
                else {
                    this._globalComponent.loadingHide();
                    this._globalComponent.validarCampo("correo");
                }
            }
            else {
                this._globalComponent.loadingHide();
                this._globalComponent.validarCampo("nombre");
            }
        }
        else {
            this._globalComponent.loadingHide();
            this._globalComponent.validarCampo("Por favor revisa el formato del correo.");
        }
    };
    /**
 * crearUsuario
 */
    RegisterComponent.prototype.crearUsuario = function () {
        var _this = this;
        this._serviceFirebase.crearUsuario(this._datosUsuario).then(function (response) {
            console.log("RESPUESTA DE LA CREACION" + response);
            var data = _this._globalComponent.validarErrores(response);
            if (data === false) {
                _this.iniciarSesion();
            }
        });
    };
    RegisterComponent.prototype.iniciarSesion = function () {
        var _this = this;
        this._serviceFirebase.iniciarSesion(this._datosUsuario).then(function (response) {
            console.log("RESPUESTA DEL LOGIN" + response);
            var data = _this._globalComponent.validarErrores(response);
            if (data === false) {
                application_settings_1.setString('login', 'true');
                application_settings_1.setString("idLogin", '' + response);
                _this._datosUsuario._id = response;
                console.log("");
                _this.crearUsuarioDatos();
                _this._routEx.navigate(['home'], {
                    clearHistory: true,
                    transition: {
                        name: "fade",
                        duration: 400,
                        curve: "ease"
                    }
                });
            }
        });
        this._globalComponent.loadingHide();
    };
    /**
     * crearUsuarioDatos
     * Esta funcion permite crear los datos del usuario en la base de datos
     */
    RegisterComponent.prototype.crearUsuarioDatos = function () {
        this._serviceFirebase.crearDatosUsuario(this._datosUsuario).then(function (response) {
            console.log("RESPUESTA AL CREAR" + response);
        });
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'register',
            templateUrl: './pages/register/register.component.html',
            styleUrls: ['./pages/register/register.component.scss']
        }),
        __metadata("design:paramtypes", [page_1.Page, router_1.RouterExtensions])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmVnaXN0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELHNEQUFxRDtBQUNyRCwyREFBeUQ7QUFDekQsMERBQTREO0FBQzVELG9FQUFrRTtBQUNsRSxtR0FBdUY7QUFDdkYsc0RBQStEO0FBQy9ELDBEQUEwRDtBQUMxRCw0Q0FBNEM7QUFDNUMsOENBQThDO0FBQzlDLG1EQUFtRDtBQVFuRDtJQUtDLDJCQUFvQixLQUFXLEVBQVUsT0FBeUI7UUFBOUMsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBQ2pFLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUNsQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksNEJBQVksRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLDhCQUFlLEVBQUUsQ0FBQztRQUM5QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxrQ0FBZSxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVELG9DQUFRLEdBQVIsY0FBYSxDQUFDO0lBR2Q7OztPQUdHO0lBQ0kseUNBQWEsR0FBcEI7UUFDQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVGLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUss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Q3ZELFNBQVMsRUFBRSxDQUFDLDBDQUEwQyxDQUFDO1NBQ3ZELENBQUM7eUNBTzBCLFdBQUksRUFBbUIseUJBQWdCO09BTHRELGlCQUFpQixDQTJHN0I7SUFBRCx3QkFBQztDQUFBLEFBM0dELElBMkdDO0FBM0dZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlL3BhZ2UnO1xuaW1wb3J0IHsgRGF0b3NVc3VhcmlvIH0gZnJvbSAnLi4vLi4vbW9kYWwvdXN1YXJpby5tb2RhbCc7XG5pbXBvcnQgeyBHbG9iYWxDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb25zdHMvZ2xvYmFsLm1vZGVsJztcbmltcG9ydCB7IFNlcnZpY2VGaXJlYmFzZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2ZpcmViYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgc2V0U3RyaW5nIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5ncy9hcHBsaWNhdGlvbi1zZXR0aW5ncyc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbi8vaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyJztcbi8vaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSAndWkvdGV4dC1maWVsZCc7XG4vL2ltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gJ2RhdGEvb2JzZXJ2YWJsZSc7XG4vL2ltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAncmVnaXN0ZXInLFxuXHR0ZW1wbGF0ZVVybDogJy4vcGFnZXMvcmVnaXN0ZXIvcmVnaXN0ZXIuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnLi9wYWdlcy9yZWdpc3Rlci9yZWdpc3Rlci5jb21wb25lbnQuc2NzcyddXG59KVxuXG5leHBvcnQgY2xhc3MgUmVnaXN0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG5cdF9zZXJ2aWNlRmlyZWJhc2U6IFNlcnZpY2VGaXJlYmFzZTtcblx0X2dsb2JhbENvbXBvbmVudDogR2xvYmFsQ29tcG9uZW50O1xuXHRfZGF0b3NVc3VhcmlvOiBEYXRvc1VzdWFyaW87XG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgX3BhZ2U6IFBhZ2UsIHByaXZhdGUgX3JvdXRFeDogUm91dGVyRXh0ZW5zaW9ucykge1xuXHRcdHRoaXMuX3BhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcblx0XHR0aGlzLl9kYXRvc1VzdWFyaW8gPSBuZXcgRGF0b3NVc3VhcmlvKCk7XG5cdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50ID0gbmV3IEdsb2JhbENvbXBvbmVudCgpO1xuXHRcdHRoaXMuX3NlcnZpY2VGaXJlYmFzZSA9IG5ldyBTZXJ2aWNlRmlyZWJhc2UoKTtcblx0fVxuXG5cdG5nT25Jbml0KCkgeyB9XG5cblxuXHQvKipcblx0ICogbnVldm9SZWdpc3Ryb1xuXHQgKiBGdW5jaW9uIHF1ZSBwZXJtaXRlIGNyZWFyIGVsIFJlZ2lzdHJvIGRlIHVuIG51ZXZvIHVzdWFyaW8gZW4gbGEgYXBsaWNhY2lvblxuXHQgKi9cblx0cHVibGljIG51ZXZvUmVnaXN0cm8oKSB7XG5cdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LmxvYWRpbmdWaWV3KCk7XG5cdFx0dGhpcy5fZGF0b3NVc3VhcmlvLl9ub21icmUgPSB0aGlzLl9nbG9iYWxDb21wb25lbnQuTWF5dXNQcmltZXJhKHRoaXMuX2RhdG9zVXN1YXJpby5fbm9tYnJlKTtcblx0XHRjb25zb2xlLmxvZyh0aGlzLl9kYXRvc1VzdWFyaW8uX25vbWJyZSk7XG5cdFx0aWYgKHRoaXMuX2dsb2JhbENvbXBvbmVudC52YWxpZGFyRW1haWwodGhpcy5fZGF0b3NVc3VhcmlvLl9jb3JyZW8pICE9PSBmYWxzZSkge1xuXHRcdGlmICh0aGlzLl9kYXRvc1VzdWFyaW8uX25vbWJyZSAhPT0gXCJcIiAmJiB0aGlzLl9kYXRvc1VzdWFyaW8uX25vbWJyZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRpZiAodGhpcy5fZGF0b3NVc3VhcmlvLl9jb3JyZW8gIT09IFwiXCIgJiYgdGhpcy5fZGF0b3NVc3VhcmlvLl9jb3JyZW8gIT09IHVuZGVmaW5lZCkge1xuXG5cdFx0XHRcdGlmICh0aGlzLl9kYXRvc1VzdWFyaW8uX2NlbHVsYXIgIT09IFwiXCIgJiYgdGhpcy5fZGF0b3NVc3VhcmlvLl9jZWx1bGFyICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHQvL2lmICh0aGlzLl9jb25maXJtYXJWaWV3ID09PSB0cnVlKSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMuX2RhdG9zVXN1YXJpby5fY2xhdmUgIT09IFwiXCIgJiYgdGhpcy5fZGF0b3NVc3VhcmlvLl9jbGF2ZSAhPT0gdW5kZWZpbmVkKSB7XG5cblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiIHNlIGVudmlhbiBkYXRvcyBwYXJhIGd1YXJkYXIgXCIpO1xuXHRcdFx0XHRcdFx0dGhpcy5jcmVhclVzdWFyaW8oKTtcblx0XHRcdFx0XHRcdC8vdGhpcy5tb3N0cmFyVGlwb1JlZ2lzdHJvKCk7XG5cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LmxvYWRpbmdIaWRlKCk7XG5cdFx0XHRcdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQudmFsaWRhckNhbXBvKFwiY29udHJhc2XDsWFcIik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8qfSBlbHNlIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKFwiIHNlIGVudmlhbiBkYXRvcyBwYXJhIG1vZGlmaWNhciBcIik7XG5cdFx0XHRcdFx0XHR0aGlzLm1vZGlmaWNhclVzdWFyaW9EYXRvcygpO1xuXHRcdFx0XHRcdH0qL1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC5sb2FkaW5nSGlkZSgpO1xuXHRcdFx0XHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC52YWxpZGFyQ2FtcG8oXCJjZWx1bGFyXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQubG9hZGluZ0hpZGUoKTtcblx0XHRcdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LnZhbGlkYXJDYW1wbyhcImNvcnJlb1wiKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LmxvYWRpbmdIaWRlKCk7XG5cdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQudmFsaWRhckNhbXBvKFwibm9tYnJlXCIpO1xuXHRcdH1cblx0fWVsc2V7XG5cdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LmxvYWRpbmdIaWRlKCk7XG5cdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQudmFsaWRhckNhbXBvKFwiUG9yIGZhdm9yIHJldmlzYSBlbCBmb3JtYXRvIGRlbCBjb3JyZW8uXCIpO1xuXHR9XG5cdH1cblxuXHQvKipcbiAqIGNyZWFyVXN1YXJpb1xuICovXG5cdHB1YmxpYyBjcmVhclVzdWFyaW8oKSB7XG5cdFx0dGhpcy5fc2VydmljZUZpcmViYXNlLmNyZWFyVXN1YXJpbyh0aGlzLl9kYXRvc1VzdWFyaW8pLnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0Y29uc29sZS5sb2coXCJSRVNQVUVTVEEgREUgTEEgQ1JFQUNJT05cIiArIHJlc3BvbnNlKTtcblx0XHRcdGxldCBkYXRhID0gdGhpcy5fZ2xvYmFsQ29tcG9uZW50LnZhbGlkYXJFcnJvcmVzKHJlc3BvbnNlKTtcblx0XHRcdGlmIChkYXRhID09PSBmYWxzZSkge1xuXHRcdFx0XHR0aGlzLmluaWNpYXJTZXNpb24oKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHB1YmxpYyBpbmljaWFyU2VzaW9uKCkge1xuXHRcdHRoaXMuX3NlcnZpY2VGaXJlYmFzZS5pbmljaWFyU2VzaW9uKHRoaXMuX2RhdG9zVXN1YXJpbykudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRjb25zb2xlLmxvZyhcIlJFU1BVRVNUQSBERUwgTE9HSU5cIiArIHJlc3BvbnNlKTtcblx0XHRcdGxldCBkYXRhID0gdGhpcy5fZ2xvYmFsQ29tcG9uZW50LnZhbGlkYXJFcnJvcmVzKHJlc3BvbnNlKTtcblx0XHRcdGlmIChkYXRhID09PSBmYWxzZSkge1xuXHRcdFx0XHRzZXRTdHJpbmcoJ2xvZ2luJywgJ3RydWUnKTtcblx0XHRcdFx0c2V0U3RyaW5nKFwiaWRMb2dpblwiLCAnJyArIHJlc3BvbnNlKTtcblx0XHRcdFx0dGhpcy5fZGF0b3NVc3VhcmlvLl9pZCA9IHJlc3BvbnNlO1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcIlwiKVxuXHRcdFx0XHR0aGlzLmNyZWFyVXN1YXJpb0RhdG9zKCk7XG5cdFx0XHRcdHRoaXMuX3JvdXRFeC5uYXZpZ2F0ZShbJ2hvbWUnXSwge1xuXHRcdFx0XHRcdGNsZWFySGlzdG9yeTogdHJ1ZSxcblx0XHRcdFx0XHR0cmFuc2l0aW9uOiB7XG5cdFx0XHRcdFx0XHRuYW1lOiBcImZhZGVcIixcblx0XHRcdFx0XHRcdGR1cmF0aW9uOiA0MDAsXG5cdFx0XHRcdFx0XHRjdXJ2ZTogXCJlYXNlXCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0fSk7XG5cdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LmxvYWRpbmdIaWRlKCk7XG5cdH1cblxuXHQvKipcblx0ICogY3JlYXJVc3VhcmlvRGF0b3Ncblx0ICogRXN0YSBmdW5jaW9uIHBlcm1pdGUgY3JlYXIgbG9zIGRhdG9zIGRlbCB1c3VhcmlvIGVuIGxhIGJhc2UgZGUgZGF0b3Ncblx0ICovXG5cdHB1YmxpYyBjcmVhclVzdWFyaW9EYXRvcygpIHtcblx0XHR0aGlzLl9zZXJ2aWNlRmlyZWJhc2UuY3JlYXJEYXRvc1VzdWFyaW8odGhpcy5fZGF0b3NVc3VhcmlvKS50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdGNvbnNvbGUubG9nKFwiUkVTUFVFU1RBIEFMIENSRUFSXCIgKyByZXNwb25zZSk7XG5cdFx0fSk7XG5cdH1cbn0iXX0=