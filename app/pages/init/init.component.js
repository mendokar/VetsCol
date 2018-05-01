"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var nativescript_swiss_army_knife_1 = require("nativescript-swiss-army-knife/nativescript-swiss-army-knife");
var router_1 = require("nativescript-angular/router");
var firebase_service_1 = require("../../services/firebase.service");
var global_model_1 = require("../../consts/global.model");
var usuario_modal_1 = require("../../modal/usuario.modal");
var application_settings_1 = require("tns-core-modules/application-settings/application-settings");
var InitComponent = /** @class */ (function () {
    function InitComponent(_page, _routEx) {
        this._page = _page;
        this._routEx = _routEx;
        this._page.actionBarHidden = true;
        nativescript_swiss_army_knife_1.SwissArmyKnife.setAndroidStatusBarColor('#ffb732');
        this._serviceFirebase = new firebase_service_1.ServiceFirebase();
        this._globalComponent = new global_model_1.GlobalComponent();
        this._datosUsuario = new usuario_modal_1.DatosUsuario();
    }
    InitComponent.prototype.ngOnInit = function () { };
    /**
     * register
     */
    InitComponent.prototype.register = function () {
        this._routEx.navigate(['register'], {
            transition: {
                name: "slide",
                duration: 400,
                curve: "ease"
            }
        });
    };
    /**
     * login
     */
    InitComponent.prototype.login = function () {
        this._routEx.navigate(['login'], {
            transition: {
                name: "slide",
                duration: 400,
                curve: "ease"
            }
        });
    };
    /**
     * loginGoogle
     */
    InitComponent.prototype.loginGoogle = function () {
        var _this = this;
        this._globalComponent.elimiarTemporales();
        this._serviceFirebase.cerrarSesion();
        console.log("ENTRO A LOGIN");
        this._globalComponent.loadingView();
        this._serviceFirebase.iniciarLoginGoogleS().then(function (result) {
            console.log(result.uid);
            console.log(result.email);
            console.dir(result.name);
            if (result.uid !== null && result.uid !== undefined) {
                _this._datosUsuario._id = result.uid;
                _this._datosUsuario._nombre = result.name;
                _this._datosUsuario._correo = result.email;
                _this._idUsuario = result.uid;
                application_settings_1.setString('login', 'true');
                application_settings_1.setString("idLogin", '' + result.uid);
                _this.consultarDatosUsuario();
                //this.mostrarTipoRegistro();
                //this.consultaSiExisteRegistrado();
            }
            else {
                _this._globalComponent.loadingHide();
            }
        }).catch(function (message) {
            console.log("Error al inicio se sesion" + message);
            _this._globalComponent.loadingHide();
        });
    };
    /**
     * consultarDatosUsuario
     */
    InitComponent.prototype.consultarDatosUsuario = function () {
        var _this = this;
        this._serviceFirebase.consultarDatosUsuario(this._idUsuario).then(function (response) {
            console.log(JSON.stringify(response.value));
            if (response.value !== null) {
                var res = response.value[_this._idUsuario];
                console.log(JSON.stringify(res));
                if (res !== undefined || res !== null) {
                    _this._routEx.navigate(['home'], {
                        clearHistory: true,
                        transition: {
                            name: "fade",
                            duration: 400,
                            curve: "ease"
                        }
                    });
                }
                else {
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
                _this._globalComponent.loadingHide();
            }
            else {
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
    InitComponent.prototype.crearUsuarioDatos = function () {
        this._serviceFirebase.crearDatosUsuario(this._datosUsuario).then(function (response) {
            console.log("RESPUESTA AL CREAR" + response);
        });
    };
    InitComponent = __decorate([
        core_1.Component({
            selector: 'init',
            templateUrl: './pages/init/init.component.html',
            styleUrls: ["./pages/init/init.component.scss"]
        }),
        __metadata("design:paramtypes", [page_1.Page, router_1.RouterExtensions])
    ], InitComponent);
    return InitComponent;
}());
exports.InitComponent = InitComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbml0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxzREFBcUQ7QUFHckQsNkdBQTZGO0FBQzdGLHNEQUErRDtBQUMvRCxvRUFBa0U7QUFDbEUsMERBQTREO0FBQzVELDJEQUF5RDtBQUN6RCxtR0FBdUY7QUFRdkY7SUFNQyx1QkFBb0IsS0FBVyxFQUFVLE9BQXlCO1FBQTlDLFVBQUssR0FBTCxLQUFLLENBQU07UUFBVSxZQUFPLEdBQVAsT0FBTyxDQUFrQjtRQUNqRSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDbEMsOENBQWMsQ0FBQyx3QkFBd0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxrQ0FBZSxFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksOEJBQWUsRUFBRSxDQUFDO1FBQzlDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSw0QkFBWSxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVELGdDQUFRLEdBQVIsY0FBYSxDQUFDO0lBRWQ7O09BRUc7SUFDSSxnQ0FBUSxHQUFmO1FBQ0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNuQyxVQUFVLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsUUFBUSxFQUFFLEdBQUc7Z0JBQ2IsS0FBSyxFQUFFLE1BQU07YUFDYjtTQUNELENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRDs7T0FFRztJQUNJLDZCQUFLLEdBQVo7UUFDQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ2hDLFVBQVUsRUFBRTtnQkFDWCxJQUFJLEVBQUUsT0FBTztnQkFDYixRQUFRLEVBQUUs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YTtRQU56QixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLE1BQU07WUFDaEIsV0FBVyxFQUFFLGtDQUFrQztZQUMvQyxTQUFTLEVBQUUsQ0FBQyxrQ0FBa0MsQ0FBQztTQUMvQyxDQUFDO3lDQVEwQixXQUFJLEVBQW1CLHlCQUFnQjtPQU50RCxhQUFhLENBMkl6QjtJQUFELG9CQUFDO0NBQUEsQUEzSUQsSUEySUM7QUEzSVksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvdWkvcGFnZS9wYWdlJztcblxuXG5pbXBvcnQgeyBTd2lzc0FybXlLbmlmZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtc3dpc3MtYXJteS1rbmlmZS9uYXRpdmVzY3JpcHQtc3dpc3MtYXJteS1rbmlmZVwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBTZXJ2aWNlRmlyZWJhc2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlJztcbmltcG9ydCB7IEdsb2JhbENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvbnN0cy9nbG9iYWwubW9kZWwnO1xuaW1wb3J0IHsgRGF0b3NVc3VhcmlvIH0gZnJvbSAnLi4vLi4vbW9kYWwvdXN1YXJpby5tb2RhbCc7XG5pbXBvcnQgeyBzZXRTdHJpbmcgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uLXNldHRpbmdzL2FwcGxpY2F0aW9uLXNldHRpbmdzJztcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnaW5pdCcsXG5cdHRlbXBsYXRlVXJsOiAnLi9wYWdlcy9pbml0L2luaXQuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFtcIi4vcGFnZXMvaW5pdC9pbml0LmNvbXBvbmVudC5zY3NzXCJdXG59KVxuXG5leHBvcnQgY2xhc3MgSW5pdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cblx0X2lkVXN1YXJpbzogYW55O1xuXHRfZGF0b3NVc3VhcmlvOiBEYXRvc1VzdWFyaW87XG5cdF9nbG9iYWxDb21wb25lbnQ6IEdsb2JhbENvbXBvbmVudDtcblx0X3NlcnZpY2VGaXJlYmFzZTogU2VydmljZUZpcmViYXNlO1xuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIF9wYWdlOiBQYWdlLCBwcml2YXRlIF9yb3V0RXg6IFJvdXRlckV4dGVuc2lvbnMpIHtcblx0XHR0aGlzLl9wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG5cdFx0U3dpc3NBcm15S25pZmUuc2V0QW5kcm9pZFN0YXR1c0JhckNvbG9yKCcjZmZiNzMyJyk7XG5cdFx0dGhpcy5fc2VydmljZUZpcmViYXNlID0gbmV3IFNlcnZpY2VGaXJlYmFzZSgpO1xuXHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudCA9IG5ldyBHbG9iYWxDb21wb25lbnQoKTtcblx0XHR0aGlzLl9kYXRvc1VzdWFyaW8gPSBuZXcgRGF0b3NVc3VhcmlvKCk7XG5cdH1cblxuXHRuZ09uSW5pdCgpIHsgfVxuXG5cdC8qKlxuXHQgKiByZWdpc3RlclxuXHQgKi9cblx0cHVibGljIHJlZ2lzdGVyKCkge1xuXHRcdHRoaXMuX3JvdXRFeC5uYXZpZ2F0ZShbJ3JlZ2lzdGVyJ10sIHtcblx0XHRcdHRyYW5zaXRpb246IHtcblx0XHRcdFx0bmFtZTogXCJzbGlkZVwiLFxuXHRcdFx0XHRkdXJhdGlvbjogNDAwLFxuXHRcdFx0XHRjdXJ2ZTogXCJlYXNlXCJcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBsb2dpblxuXHQgKi9cblx0cHVibGljIGxvZ2luKCkge1xuXHRcdHRoaXMuX3JvdXRFeC5uYXZpZ2F0ZShbJ2xvZ2luJ10sIHtcblx0XHRcdHRyYW5zaXRpb246IHtcblx0XHRcdFx0bmFtZTogXCJzbGlkZVwiLFxuXHRcdFx0XHRkdXJhdGlvbjogNDAwLFxuXHRcdFx0XHRjdXJ2ZTogXCJlYXNlXCJcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBsb2dpbkdvb2dsZVxuXHQgKi9cblx0cHVibGljIGxvZ2luR29vZ2xlKCkge1xuXHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC5lbGltaWFyVGVtcG9yYWxlcygpO1xuXHRcdHRoaXMuX3NlcnZpY2VGaXJlYmFzZS5jZXJyYXJTZXNpb24oKTtcblx0XHRjb25zb2xlLmxvZyhcIkVOVFJPIEEgTE9HSU5cIilcblx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQubG9hZGluZ1ZpZXcoKTtcblx0XHR0aGlzLl9zZXJ2aWNlRmlyZWJhc2UuaW5pY2lhckxvZ2luR29vZ2xlUygpLnRoZW4ocmVzdWx0ID0+IHtcblx0XHRcdGNvbnNvbGUubG9nKHJlc3VsdC51aWQpO1xuXHRcdFx0Y29uc29sZS5sb2cocmVzdWx0LmVtYWlsKTtcblx0XHRcdGNvbnNvbGUuZGlyKHJlc3VsdC5uYW1lKTtcblx0XHRcdGlmIChyZXN1bHQudWlkICE9PSBudWxsICYmIHJlc3VsdC51aWQgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHR0aGlzLl9kYXRvc1VzdWFyaW8uX2lkID0gcmVzdWx0LnVpZDtcblx0XHRcdFx0dGhpcy5fZGF0b3NVc3VhcmlvLl9ub21icmUgPSByZXN1bHQubmFtZTtcblx0XHRcdFx0dGhpcy5fZGF0b3NVc3VhcmlvLl9jb3JyZW8gPSByZXN1bHQuZW1haWw7XG5cdFx0XHRcdHRoaXMuX2lkVXN1YXJpbyA9IHJlc3VsdC51aWQ7XG5cblx0XHRcdFx0c2V0U3RyaW5nKCdsb2dpbicsICd0cnVlJyk7XG5cdFx0XHRcdHNldFN0cmluZyhcImlkTG9naW5cIiwgJycgKyByZXN1bHQudWlkKTtcblxuXHRcdFx0XHR0aGlzLmNvbnN1bHRhckRhdG9zVXN1YXJpbygpO1xuXHRcdFx0XHQvL3RoaXMubW9zdHJhclRpcG9SZWdpc3RybygpO1xuXHRcdFx0XHQvL3RoaXMuY29uc3VsdGFTaUV4aXN0ZVJlZ2lzdHJhZG8oKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC5sb2FkaW5nSGlkZSgpO1xuXHRcdFx0fVxuXG5cblx0XHR9KS5jYXRjaCgobWVzc2FnZTogYW55KSA9PiB7XG5cdFx0XHRjb25zb2xlLmxvZyhcIkVycm9yIGFsIGluaWNpbyBzZSBzZXNpb25cIiArIG1lc3NhZ2UpO1xuXHRcdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LmxvYWRpbmdIaWRlKCk7XG5cdFx0fSk7XG5cdH1cblxuXG5cdC8qKlxuXHQgKiBjb25zdWx0YXJEYXRvc1VzdWFyaW9cblx0ICovXG5cdHB1YmxpYyBjb25zdWx0YXJEYXRvc1VzdWFyaW8oKSB7XG5cdFx0dGhpcy5fc2VydmljZUZpcmViYXNlLmNvbnN1bHRhckRhdG9zVXN1YXJpbyh0aGlzLl9pZFVzdWFyaW8pLnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0Y29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UudmFsdWUpKTtcblx0XHRcdGlmIChyZXNwb25zZS52YWx1ZSAhPT0gbnVsbCkge1xuXHRcdFx0XHRsZXQgcmVzID0gcmVzcG9uc2UudmFsdWVbdGhpcy5faWRVc3VhcmlvXTtcblx0XHRcdFx0Y29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzKSk7XG5cblx0XHRcdFx0aWYgKHJlcyAhPT0gdW5kZWZpbmVkIHx8IHJlcyAhPT0gbnVsbCkge1xuXHRcdFx0XHRcdHRoaXMuX3JvdXRFeC5uYXZpZ2F0ZShbJ2hvbWUnXSwge1xuXHRcdFx0XHRcdFx0Y2xlYXJIaXN0b3J5OiB0cnVlLFxuXHRcdFx0XHRcdFx0dHJhbnNpdGlvbjoge1xuXHRcdFx0XHRcdFx0XHRuYW1lOiBcImZhZGVcIixcblx0XHRcdFx0XHRcdFx0ZHVyYXRpb246IDQwMCxcblx0XHRcdFx0XHRcdFx0Y3VydmU6IFwiZWFzZVwiXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5jcmVhclVzdWFyaW9EYXRvcygpO1xuXG5cdFx0XHRcdFx0dGhpcy5fcm91dEV4Lm5hdmlnYXRlKFsnaG9tZSddLCB7XG5cdFx0XHRcdFx0XHRjbGVhckhpc3Rvcnk6IHRydWUsXG5cdFx0XHRcdFx0XHR0cmFuc2l0aW9uOiB7XG5cdFx0XHRcdFx0XHRcdG5hbWU6IFwiZmFkZVwiLFxuXHRcdFx0XHRcdFx0XHRkdXJhdGlvbjogNDAwLFxuXHRcdFx0XHRcdFx0XHRjdXJ2ZTogXCJlYXNlXCJcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC5sb2FkaW5nSGlkZSgpO1xuXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmNyZWFyVXN1YXJpb0RhdG9zKCk7XG5cblx0XHRcdFx0dGhpcy5fcm91dEV4Lm5hdmlnYXRlKFsnaG9tZSddLCB7XG5cdFx0XHRcdFx0Y2xlYXJIaXN0b3J5OiB0cnVlLFxuXHRcdFx0XHRcdHRyYW5zaXRpb246IHtcblx0XHRcdFx0XHRcdG5hbWU6IFwiZmFkZVwiLFxuXHRcdFx0XHRcdFx0ZHVyYXRpb246IDQwMCxcblx0XHRcdFx0XHRcdGN1cnZlOiBcImVhc2VcIlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblxuXHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC5sb2FkaW5nSGlkZSgpO1xuXHR9XG5cblx0LyoqXG5cdCogY3JlYXJVc3VhcmlvRGF0b3Ncblx0KiBFc3RhIGZ1bmNpb24gcGVybWl0ZSBjcmVhciBsb3MgZGF0b3MgZGVsIHVzdWFyaW8gZW4gbGEgYmFzZSBkZSBkYXRvc1xuXHQqL1xuXHRwdWJsaWMgY3JlYXJVc3VhcmlvRGF0b3MoKSB7XG5cdFx0dGhpcy5fc2VydmljZUZpcmViYXNlLmNyZWFyRGF0b3NVc3VhcmlvKHRoaXMuX2RhdG9zVXN1YXJpbykudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRjb25zb2xlLmxvZyhcIlJFU1BVRVNUQSBBTCBDUkVBUlwiICsgcmVzcG9uc2UpO1xuXHRcdH0pO1xuXHR9XG59Il19