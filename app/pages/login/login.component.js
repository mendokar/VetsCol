"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var router_1 = require("nativescript-angular/router");
var firebase_service_1 = require("../../services/firebase.service");
var global_model_1 = require("../../consts/global.model");
var usuario_modal_1 = require("../../modal/usuario.modal");
var application_settings_1 = require("tns-core-modules/application-settings/application-settings");
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';
var LoginComponent = /** @class */ (function () {
    function LoginComponent(_page, _routEx) {
        this._page = _page;
        this._routEx = _routEx;
        this._page.actionBarHidden = true;
        this._serviceFirebase = new firebase_service_1.ServiceFirebase();
        this._globalComponent = new global_model_1.GlobalComponent();
        this._datosUsuario = new usuario_modal_1.DatosUsuario();
    }
    LoginComponent.prototype.ngOnInit = function () { };
    /**
     * login
     */
    LoginComponent.prototype.login = function () {
        var _this = this;
        console.log("COREEO" + this._globalComponent.validarEmail(this._datosUsuario._correo));
        this._globalComponent.loadingView();
        if (this._globalComponent.validarEmail(this._datosUsuario._correo) !== false) {
            if (this._datosUsuario._correo !== undefined && this._datosUsuario._correo !== null && this._datosUsuario._correo !== "") {
                if (this._datosUsuario._clave !== undefined && this._datosUsuario._clave !== null && this._datosUsuario._clave !== "") {
                    this._datosUsuario._correo = this._datosUsuario._correo.trim();
                    this._datosUsuario._clave = this._datosUsuario._clave.trim();
                    this._serviceFirebase.iniciarSesion(this._datosUsuario).then(function (response) {
                        console.log(response);
                        var data = _this._globalComponent.validarErrores(response);
                        if (data === false) {
                            application_settings_1.setString('login', 'true');
                            application_settings_1.setString("idLogin", '' + response);
                            _this._datosUsuario._id = response;
                            //this._idUsuario = response;						
                            _this._routEx.navigate(['home'], {
                                clearHistory: true,
                                transition: {
                                    name: "slide",
                                    duration: 400,
                                    curve: "ease"
                                }
                            });
                        }
                        _this._globalComponent.loadingHide();
                    });
                }
                else {
                    this._globalComponent.loadingHide();
                    this._globalComponent.validarCampo("contraseña");
                }
            }
            else {
                this._globalComponent.loadingHide();
                this._globalComponent.validarCampo("correo");
            }
        }
        else {
            this._globalComponent.loadingHide();
            this._globalComponent.validarCampo("Por favor revisa el formato del correo.");
        }
        /*this._routEx.navigate(["home"], {
            clearHistory: true,
            transition: {
                name: "slide",
                duration: 400,
                curve: "ease"
            }
        })*/
    };
    /**
     * forgotPass()
     */
    LoginComponent.prototype.forgotPass = function () {
        this._routEx.navigate(["forgot-pass"], { clearHistory: false,
            transition: {
                name: "slide",
                duration: 400,
                curve: "ease"
            }
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: './pages/login/login.component.html',
            styleUrls: ['./pages/login/login.component.scss']
        }),
        __metadata("design:paramtypes", [page_1.Page, router_1.RouterExtensions])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELHNEQUFxRDtBQUNyRCxzREFBK0Q7QUFDL0Qsb0VBQWtFO0FBQ2xFLDBEQUE0RDtBQUM1RCwyREFBeUQ7QUFDekQsbUdBQXVGO0FBQ3ZGLDBEQUEwRDtBQUMxRCw0Q0FBNEM7QUFDNUMsOENBQThDO0FBQzlDLG1EQUFtRDtBQVFuRDtJQUtDLHdCQUFvQixLQUFXLEVBQVUsT0FBeUI7UUFBOUMsVUFBSyxHQUFMLEtBQUssQ0FBTTtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBQ2pFLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUNsQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxrQ0FBZSxFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksOEJBQWUsRUFBRSxDQUFDO1FBQzlDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSw0QkFBWSxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVELGlDQUFRLEdBQVIsY0FBYSxDQUFDO0lBRWQ7O09BRUc7SUFDSSw4QkFBSyxHQUFaO1FBQUEsaUJBbURDO1FBbERBLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3ZGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNwQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztZQUM5RSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMs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WUFDakIsV0FBVyxFQUFFLG9DQUFvQztZQUNqRCxTQUFTLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztTQUNqRCxDQUFDO3lDQU8wQixXQUFJLEVBQW1CLHlCQUFnQjtPQUx0RCxjQUFjLENBb0YxQjtJQUFELHFCQUFDO0NBQUEsQUFwRkQsSUFvRkM7QUFwRlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvcGFnZS9wYWdlJztcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU2VydmljZUZpcmViYXNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBHbG9iYWxDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb25zdHMvZ2xvYmFsLm1vZGVsJztcbmltcG9ydCB7IERhdG9zVXN1YXJpbyB9IGZyb20gJy4uLy4uL21vZGFsL3VzdWFyaW8ubW9kYWwnO1xuaW1wb3J0IHsgc2V0U3RyaW5nIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5ncy9hcHBsaWNhdGlvbi1zZXR0aW5ncyc7XG4vL2ltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhcic7XG4vL2ltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gJ3VpL3RleHQtZmllbGQnO1xuLy9pbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tICdkYXRhL29ic2VydmFibGUnO1xuLy9pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ2xvZ2luJyxcblx0dGVtcGxhdGVVcmw6ICcuL3BhZ2VzL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJy4vcGFnZXMvbG9naW4vbG9naW4uY29tcG9uZW50LnNjc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuXHRfZGF0b3NVc3VhcmlvOiBEYXRvc1VzdWFyaW87XG5cdF9nbG9iYWxDb21wb25lbnQ6IEdsb2JhbENvbXBvbmVudDtcblx0X3NlcnZpY2VGaXJlYmFzZTogU2VydmljZUZpcmViYXNlO1xuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIF9wYWdlOiBQYWdlLCBwcml2YXRlIF9yb3V0RXg6IFJvdXRlckV4dGVuc2lvbnMpIHtcblx0XHR0aGlzLl9wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG5cdFx0dGhpcy5fc2VydmljZUZpcmViYXNlID0gbmV3IFNlcnZpY2VGaXJlYmFzZSgpO1xuXHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudCA9IG5ldyBHbG9iYWxDb21wb25lbnQoKTtcblx0XHR0aGlzLl9kYXRvc1VzdWFyaW8gPSBuZXcgRGF0b3NVc3VhcmlvKCk7XG5cdH1cblxuXHRuZ09uSW5pdCgpIHsgfVxuXG5cdC8qKlxuXHQgKiBsb2dpblxuXHQgKi9cblx0cHVibGljIGxvZ2luKCkge1xuXHRcdGNvbnNvbGUubG9nKFwiQ09SRUVPXCIgKyB0aGlzLl9nbG9iYWxDb21wb25lbnQudmFsaWRhckVtYWlsKHRoaXMuX2RhdG9zVXN1YXJpby5fY29ycmVvKSk7XG5cdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LmxvYWRpbmdWaWV3KCk7XG5cdFx0aWYgKHRoaXMuX2dsb2JhbENvbXBvbmVudC52YWxpZGFyRW1haWwodGhpcy5fZGF0b3NVc3VhcmlvLl9jb3JyZW8pICE9PSBmYWxzZSkge1xuXHRcdFx0aWYgKHRoaXMuX2RhdG9zVXN1YXJpby5fY29ycmVvICE9PSB1bmRlZmluZWQgJiYgdGhpcy5fZGF0b3NVc3VhcmlvLl9jb3JyZW8gIT09IG51bGwgJiYgdGhpcy5fZGF0b3NVc3VhcmlvLl9jb3JyZW8gIT09IFwiXCIpIHtcblx0XHRcdFx0aWYgKHRoaXMuX2RhdG9zVXN1YXJpby5fY2xhdmUgIT09IHVuZGVmaW5lZCAmJiB0aGlzLl9kYXRvc1VzdWFyaW8uX2NsYXZlICE9PSBudWxsICYmIHRoaXMuX2RhdG9zVXN1YXJpby5fY2xhdmUgIT09IFwiXCIpIHtcblx0XHRcdFx0XHR0aGlzLl9kYXRvc1VzdWFyaW8uX2NvcnJlbyA9IHRoaXMuX2RhdG9zVXN1YXJpby5fY29ycmVvLnRyaW0oKTtcblx0XHRcdFx0XHR0aGlzLl9kYXRvc1VzdWFyaW8uX2NsYXZlID0gdGhpcy5fZGF0b3NVc3VhcmlvLl9jbGF2ZS50cmltKCk7XG5cdFx0XHRcdFx0dGhpcy5fc2VydmljZUZpcmViYXNlLmluaWNpYXJTZXNpb24odGhpcy5fZGF0b3NVc3VhcmlvKS50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcblx0XHRcdFx0XHRcdGxldCBkYXRhID0gdGhpcy5fZ2xvYmFsQ29tcG9uZW50LnZhbGlkYXJFcnJvcmVzKHJlc3BvbnNlKTtcblx0XHRcdFx0XHRcdGlmIChkYXRhID09PSBmYWxzZSkge1xuXHRcdFx0XHRcdFx0XHRzZXRTdHJpbmcoJ2xvZ2luJywgJ3RydWUnKTtcblx0XHRcdFx0XHRcdFx0c2V0U3RyaW5nKFwiaWRMb2dpblwiLCAnJyArIHJlc3BvbnNlKTtcblx0XHRcdFx0XHRcdFx0dGhpcy5fZGF0b3NVc3VhcmlvLl9pZCA9IHJlc3BvbnNlO1xuXHRcdFx0XHRcdFx0XHQvL3RoaXMuX2lkVXN1YXJpbyA9IHJlc3BvbnNlO1x0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHR0aGlzLl9yb3V0RXgubmF2aWdhdGUoWydob21lJ10sIHtcblx0XHRcdFx0XHRcdFx0XHRjbGVhckhpc3Rvcnk6IHRydWUsXG5cdFx0XHRcdFx0XHRcdFx0dHJhbnNpdGlvbjoge1xuXHRcdFx0XHRcdFx0XHRcdFx0bmFtZTogXCJzbGlkZVwiLFxuXHRcdFx0XHRcdFx0XHRcdFx0ZHVyYXRpb246IDQwMCxcblx0XHRcdFx0XHRcdFx0XHRcdGN1cnZlOiBcImVhc2VcIlxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQubG9hZGluZ0hpZGUoKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQubG9hZGluZ0hpZGUoKTtcblx0XHRcdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQudmFsaWRhckNhbXBvKFwiY29udHJhc2XDsWFcIik7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC5sb2FkaW5nSGlkZSgpO1xuXHRcdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQudmFsaWRhckNhbXBvKFwiY29ycmVvXCIpO1xuXHRcdFx0fVxuXG5cdFx0fWVsc2V7XG5cdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQubG9hZGluZ0hpZGUoKTtcblx0XHRcdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LnZhbGlkYXJDYW1wbyhcIlBvciBmYXZvciByZXZpc2EgZWwgZm9ybWF0byBkZWwgY29ycmVvLlwiKTtcblx0XHR9XG5cblxuXG5cdFx0Lyp0aGlzLl9yb3V0RXgubmF2aWdhdGUoW1wiaG9tZVwiXSwge1xuXHRcdFx0Y2xlYXJIaXN0b3J5OiB0cnVlLFxuXHRcdFx0dHJhbnNpdGlvbjoge1xuXHRcdFx0XHRuYW1lOiBcInNsaWRlXCIsXG5cdFx0XHRcdGR1cmF0aW9uOiA0MDAsXG5cdFx0XHRcdGN1cnZlOiBcImVhc2VcIlxuXHRcdFx0fVxuXHRcdH0pKi9cblx0fVxuXG5cdC8qKlxuXHQgKiBmb3Jnb3RQYXNzKClcblx0ICovXG5cdHB1YmxpYyBmb3Jnb3RQYXNzKCkge1xuXHRcdHRoaXMuX3JvdXRFeC5uYXZpZ2F0ZShbXCJmb3Jnb3QtcGFzc1wiXSwge2NsZWFySGlzdG9yeTpmYWxzZSxcblx0XHRcdHRyYW5zaXRpb246IHtcblx0XHRcdFx0bmFtZTogXCJzbGlkZVwiLFxuXHRcdFx0XHRkdXJhdGlvbjogNDAwLFxuXHRcdFx0XHRjdXJ2ZTogXCJlYXNlXCJcblx0XHRcdH1cblx0XHR9KVxuXHR9XG5cblxufSJdfQ==