"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var firebase_service_1 = require("../../services/firebase.service");
var usuario_modal_1 = require("../../modal/usuario.modal");
var global_model_1 = require("../../consts/global.model");
var router_1 = require("nativescript-angular/router");
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';
var ForgotPassComponent = /** @class */ (function () {
    function ForgotPassComponent(_page, _routEx) {
        this._page = _page;
        this._routEx = _routEx;
        this._mensaje = "Para empezar con el proceso de recuperación de contraseña, ingresa tu correo electrónico.";
        this._page.actionBarHidden = true;
        this._serviceFirebase = new firebase_service_1.ServiceFirebase();
        this._datosUsuario = new usuario_modal_1.DatosUsuario();
        this._globalComponent = new global_model_1.GlobalComponent();
    }
    ForgotPassComponent.prototype.ngOnInit = function () { };
    /**
     * validateEmail
     */
    ForgotPassComponent.prototype.validateEmail = function () {
        var _this = this;
        console.log("Email searching" + this._datosUsuario._correo);
        if (this._globalComponent.validarEmail(this._datosUsuario._correo) !== false) {
            if (this._datosUsuario._correo !== undefined && this._datosUsuario._correo !== null && this._datosUsuario._correo !== "") {
                this._serviceFirebase.validateEmailForgotPass(this._datosUsuario._correo.trim()).then(function (response) {
                    console.log("Response data of server" + JSON.stringify(response));
                    var res = response.value;
                    if (res !== null) {
                        _this._serviceFirebase.olvidoClave(_this._datosUsuario._correo).then(function (response) {
                            var mensaje = "Hemos enviado los pasos para continuar, por favor revisa tu bandeja de entrada.";
                            _this._globalComponent.viewMessage(mensaje);
                            _this._datosUsuario._correo = "";
                            _this.getBack();
                        });
                    }
                    else {
                        _this._globalComponent.validarCampo("El correo no se encuentra registrado en VetsCol.");
                    }
                });
            }
            else {
                this._globalComponent.validarCampo("correo");
            }
        }
        else {
            this._globalComponent.loadingHide();
            this._globalComponent.validarCampo("Por favor revisa el formato del correo.");
        }
    };
    /**
     * forgotPass()
     */
    ForgotPassComponent.prototype.getBack = function () {
        this._routEx.navigate(["login"], {
            transition: {
                name: "slideRight",
                duration: 400,
                curve: "ease"
            }
        });
    };
    ForgotPassComponent = __decorate([
        core_1.Component({
            selector: 'forgot-pass',
            templateUrl: './pages/forgot-pass/forgot-pass.component.html',
            styleUrls: ['./pages/forgot-pass/forgot-pass.component.scss']
        }),
        __metadata("design:paramtypes", [page_1.Page, router_1.RouterExtensions])
    ], ForgotPassComponent);
    return ForgotPassComponent;
}());
exports.ForgotPassComponent = ForgotPassComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yZ290LXBhc3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZm9yZ290LXBhc3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELHNEQUFxRDtBQUNyRCxvRUFBa0U7QUFDbEUsMkRBQXlEO0FBQ3pELDBEQUE0RDtBQUM1RCxzREFBK0Q7QUFDL0QsMERBQTBEO0FBQzFELDRDQUE0QztBQUM1Qyw4Q0FBOEM7QUFDOUMsbURBQW1EO0FBUW5EO0lBTUMsNkJBQW9CLEtBQVcsRUFBVSxPQUF5QjtRQUE5QyxVQUFLLEdBQUwsS0FBSyxDQUFNO1FBQVUsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7UUFEbEUsYUFBUSxHQUFHLDJGQUEyRixDQUFDO1FBRXRHLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUNsQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxrQ0FBZSxFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLDRCQUFZLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSw4QkFBZSxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVELHNDQUFRLEdBQVIsY0FBYSxDQUFDO0lBRWQ7O09BRUc7SUFDSSwyQ0FBYSxHQUFwQjtRQUFBLGlCQTBCQztRQXpCQSxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDM0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDOUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMxSCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxRQUFRO29CQUM3RixPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDbEUsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztvQkFDekIsRUFBRSxDQUFDLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ2xCLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsS0FBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxRQUFROzRCQUMxRSxJQUFJLE9BQU8sR0FBRyxpRkFBaUYsQ0FBQzs0QkFDaEcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQzs0QkFDM0MsS0FBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDOzRCQUNoQyxLQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ2hCLENBQUMsQ0FBQyxDQUFDO29CQUNKLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ1AsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxrREFBa0QsQ0FBQyxDQUFBO29CQUN2RixDQUFDO2dCQUNGLENBQUMsQ0FBQyxDQUFDO1lBQ0osQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNQLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDOUMsQ0FBQztRQUNGLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNQLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNwQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLHlDQUF5QyxDQUFDLENBQUM7UUFDL0UsQ0FBQztJQUVGLENBQUM7SUFHRDs7T0FFRztJQUNJLHFDQUFPLEdBQWQ7UUFDQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ2hDLFVBQVUsRUFBRTtnQkFDWCxJQUFJLEVBQUUsWUFBWTtnQkFDbEIsUUFBUSxFQUFFLEdBQUc7Z0JBQ2IsS0FBSyxFQUFFLE1BQU07YUFDYjtTQUNELENBQUMsQ0FBQTtJQUNILENBQUM7SUExRFcsbUJBQW1CO1FBTi9CLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsYUFBYTtZQUN2QixXQUFXLEVBQUUsZ0RBQWdEO1lBQzdELFNBQVMsRUFBRSxDQUFDLGdEQUFnRCxDQUFDO1NBQzdELENBQUM7eUNBUTBCLFdBQUksRUFBbUIseUJBQWdCO09BTnRELG1CQUFtQixDQTREL0I7SUFBRCwwQkFBQztDQUFBLEFBNURELElBNERDO0FBNURZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlL3BhZ2UnO1xuaW1wb3J0IHsgU2VydmljZUZpcmViYXNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBEYXRvc1VzdWFyaW8gfSBmcm9tICcuLi8uLi9tb2RhbC91c3VhcmlvLm1vZGFsJztcbmltcG9ydCB7IEdsb2JhbENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvbnN0cy9nbG9iYWwubW9kZWwnO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XG4vL2ltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhcic7XG4vL2ltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gJ3VpL3RleHQtZmllbGQnO1xuLy9pbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tICdkYXRhL29ic2VydmFibGUnO1xuLy9pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ2ZvcmdvdC1wYXNzJyxcblx0dGVtcGxhdGVVcmw6ICcuL3BhZ2VzL2ZvcmdvdC1wYXNzL2ZvcmdvdC1wYXNzLmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJy4vcGFnZXMvZm9yZ290LXBhc3MvZm9yZ290LXBhc3MuY29tcG9uZW50LnNjc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIEZvcmdvdFBhc3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG5cdF9nbG9iYWxDb21wb25lbnQ6IEdsb2JhbENvbXBvbmVudDtcblx0X2RhdG9zVXN1YXJpbzogRGF0b3NVc3VhcmlvO1xuXHRfc2VydmljZUZpcmViYXNlOiBTZXJ2aWNlRmlyZWJhc2U7XG5cdF9tZW5zYWplID0gXCJQYXJhIGVtcGV6YXIgY29uIGVsIHByb2Nlc28gZGUgcmVjdXBlcmFjacOzbiBkZSBjb250cmFzZcOxYSwgaW5ncmVzYSB0dSBjb3JyZW8gZWxlY3Ryw7NuaWNvLlwiO1xuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIF9wYWdlOiBQYWdlLCBwcml2YXRlIF9yb3V0RXg6IFJvdXRlckV4dGVuc2lvbnMpIHtcblx0XHR0aGlzLl9wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG5cdFx0dGhpcy5fc2VydmljZUZpcmViYXNlID0gbmV3IFNlcnZpY2VGaXJlYmFzZSgpO1xuXHRcdHRoaXMuX2RhdG9zVXN1YXJpbyA9IG5ldyBEYXRvc1VzdWFyaW8oKTtcblx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQgPSBuZXcgR2xvYmFsQ29tcG9uZW50KCk7XG5cdH1cblxuXHRuZ09uSW5pdCgpIHsgfVxuXG5cdC8qKlxuXHQgKiB2YWxpZGF0ZUVtYWlsXG5cdCAqL1xuXHRwdWJsaWMgdmFsaWRhdGVFbWFpbCgpIHtcblx0XHRjb25zb2xlLmxvZyhcIkVtYWlsIHNlYXJjaGluZ1wiICsgdGhpcy5fZGF0b3NVc3VhcmlvLl9jb3JyZW8pXG5cdFx0aWYgKHRoaXMuX2dsb2JhbENvbXBvbmVudC52YWxpZGFyRW1haWwodGhpcy5fZGF0b3NVc3VhcmlvLl9jb3JyZW8pICE9PSBmYWxzZSkge1xuXHRcdFx0aWYgKHRoaXMuX2RhdG9zVXN1YXJpby5fY29ycmVvICE9PSB1bmRlZmluZWQgJiYgdGhpcy5fZGF0b3NVc3VhcmlvLl9jb3JyZW8gIT09IG51bGwgJiYgdGhpcy5fZGF0b3NVc3VhcmlvLl9jb3JyZW8gIT09IFwiXCIpIHtcblx0XHRcdFx0dGhpcy5fc2VydmljZUZpcmViYXNlLnZhbGlkYXRlRW1haWxGb3Jnb3RQYXNzKHRoaXMuX2RhdG9zVXN1YXJpby5fY29ycmVvLnRyaW0oKSkudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJSZXNwb25zZSBkYXRhIG9mIHNlcnZlclwiICsgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKTtcblx0XHRcdFx0XHRsZXQgcmVzID0gcmVzcG9uc2UudmFsdWU7XG5cdFx0XHRcdFx0aWYgKHJlcyAhPT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0dGhpcy5fc2VydmljZUZpcmViYXNlLm9sdmlkb0NsYXZlKHRoaXMuX2RhdG9zVXN1YXJpby5fY29ycmVvKS50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0XHRcdFx0bGV0IG1lbnNhamUgPSBcIkhlbW9zIGVudmlhZG8gbG9zIHBhc29zIHBhcmEgY29udGludWFyLCBwb3IgZmF2b3IgcmV2aXNhIHR1IGJhbmRlamEgZGUgZW50cmFkYS5cIjtcblx0XHRcdFx0XHRcdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LnZpZXdNZXNzYWdlKG1lbnNhamUpO1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9kYXRvc1VzdWFyaW8uX2NvcnJlbyA9IFwiXCI7XG5cdFx0XHRcdFx0XHRcdHRoaXMuZ2V0QmFjaygpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC52YWxpZGFyQ2FtcG8oXCJFbCBjb3JyZW8gbm8gc2UgZW5jdWVudHJhIHJlZ2lzdHJhZG8gZW4gVmV0c0NvbC5cIilcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LnZhbGlkYXJDYW1wbyhcImNvcnJlb1wiKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LmxvYWRpbmdIaWRlKCk7XG5cdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQudmFsaWRhckNhbXBvKFwiUG9yIGZhdm9yIHJldmlzYSBlbCBmb3JtYXRvIGRlbCBjb3JyZW8uXCIpO1xuXHRcdH1cblxuXHR9XG5cblxuXHQvKipcblx0ICogZm9yZ290UGFzcygpXG5cdCAqL1xuXHRwdWJsaWMgZ2V0QmFjaygpIHtcblx0XHR0aGlzLl9yb3V0RXgubmF2aWdhdGUoW1wibG9naW5cIl0sIHtcblx0XHRcdHRyYW5zaXRpb246IHtcblx0XHRcdFx0bmFtZTogXCJzbGlkZVJpZ2h0XCIsXG5cdFx0XHRcdGR1cmF0aW9uOiA0MDAsXG5cdFx0XHRcdGN1cnZlOiBcImVhc2VcIlxuXHRcdFx0fVxuXHRcdH0pXG5cdH1cblxufSJdfQ==