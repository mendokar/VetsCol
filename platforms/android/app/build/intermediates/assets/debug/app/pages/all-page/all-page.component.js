"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var application_settings_1 = require("tns-core-modules/application-settings/application-settings");
var router_1 = require("nativescript-angular/router");
var opinions_modal_1 = require("../../modal/opinions.modal");
var firebase_service_1 = require("../../services/firebase.service");
var global_model_1 = require("../../consts/global.model");
var AllPageComponent = /** @class */ (function () {
    function AllPageComponent(_routEx) {
        this._routEx = _routEx;
        this._viewHelp = false;
        this._viewBuguet = false;
        this._viewVets = false;
        this._viewTerms = false;
        this._dataOpinions = new opinions_modal_1.OpinionsModal();
        this._serviceFirebase = new firebase_service_1.ServiceFirebase();
        this._globalComponent = new global_model_1.GlobalComponent();
    }
    AllPageComponent.prototype.ngOnInit = function () {
        this.validatePage();
    };
    AllPageComponent.prototype.validatePage = function () {
        var page = application_settings_1.getString("page");
        if (page === "ayuda") {
            this._viewHelp = true;
            this._title = "Ayuda";
        }
        if (page === "facturacion") {
            this._viewBuguet = true;
            this._title = "Facturación";
        }
        if (page === "acerca") {
            this._viewVets = true;
            this._title = "Acerca De";
        }
        if (page === "terminos") {
            this._viewTerms = true;
            this._title = "Terminos";
        }
    };
    /**
     * getBack
     */
    AllPageComponent.prototype.getBack = function () {
        this._routEx.back();
    };
    /**
     * openUrl
     */
    AllPageComponent.prototype.openUrl = function () {
        //utils.openUrl("https://api.whatsapp.com/send?phone=573204232511&text=Hola!, ¿ Tengo una pregunta sobre VetsCol ?")
    };
    /**
     * EnviarAsunto
     */
    AllPageComponent.prototype.EnviarAsunto = function () {
        this._dataOpinions._idUsuario = application_settings_1.getString("idLogin");
        if (this._dataOpinions._asuntoOpinion !== null && this._dataOpinions._asuntoOpinion !== undefined && this._dataOpinions._asuntoOpinion !== "") {
            if (this._dataOpinions._descripcionOpinion !== null && this._dataOpinions._descripcionOpinion !== undefined && this._dataOpinions._descripcionOpinion !== "") {
                this.getIdOpinions();
            }
            else {
                this._globalComponent.validarCampo("descripción");
            }
        }
        else {
            this._globalComponent.validarCampo("asunto");
        }
    };
    /**
     * getIdOpinions
     */
    AllPageComponent.prototype.getIdOpinions = function () {
        var _this = this;
        this._serviceFirebase.getDataIdOpinions().then(function (response) {
            console.log("Response del id" + JSON.stringify(response));
            if (response.value !== null) {
                var strJSON = JSON.stringify(response);
                var objJSON = eval("(function(){return " + strJSON + ";})()");
                var size = objJSON.value.length;
                _this.idOpinion = size;
            }
            else {
                _this.idOpinion = 0;
            }
            _this._serviceFirebase.addSubjectsVets(_this.idOpinion, _this._dataOpinions).then(function (response) {
                if (response === "guardado") {
                    _this._globalComponent.validateSuccess("Hemos recibido tu mensaje, Gracias por hacer parte de nosotros.");
                    _this._routEx.navigate(["home"], {
                        clearHistory: true,
                        transition: {
                            name: "slideLeft",
                            duration: 400,
                            curve: "ease"
                        }
                    });
                }
                else {
                    _this._globalComponent.validarErrores(response);
                }
            });
        });
    };
    AllPageComponent = __decorate([
        core_1.Component({
            selector: 'all-page',
            templateUrl: './pages/all-page/all-page.component.html',
            styleUrls: ['./pages/all-page/all-page.component.css']
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions])
    ], AllPageComponent);
    return AllPageComponent;
}());
exports.AllPageComponent = AllPageComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsLXBhZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWxsLXBhZ2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELG1HQUF1RjtBQU92RixzREFBK0Q7QUFDL0QsNkRBQTJEO0FBQzNELG9FQUFrRTtBQUNsRSwwREFBNEQ7QUFTNUQ7SUFZQywwQkFBb0IsT0FBeUI7UUFBekIsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7UUFMN0MsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFHbEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLDhCQUFhLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxrQ0FBZSxFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksOEJBQWUsRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFFRCxtQ0FBUSxHQUFSO1FBQ0MsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTSx1Q0FBWSxHQUFuQjtRQUNDLElBQUksSUFBSSxHQUFHLGdDQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFN0IsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUM7UUFDdkIsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDO1FBQzdCLENBQUM7UUFF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QyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRTt3QkFDL0IsWUFBWSxFQUFFLElBQUk7d0JBQ2xCLFVBQVUsRUFBRTs0QkFDWCxJQUFJLEVBQUUsV0FBVzs0QkFDakIsUUFBUSxFQUFFLEdBQUc7NEJBQ2IsS0FBSyxFQUFFLE1BQU07eUJBQ2I7cUJBQ0QsQ0FBQyxDQUFBO2dCQUNILENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ1AsS0FBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDaEQsQ0FBQztZQUNGLENBQUMsQ0FBQyxDQUFBO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSCxDQUFDO0lBM0dXLGdCQUFnQjtRQU41QixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLFVBQVU7WUFDcEIsV0FBVyxFQUFFLDBDQUEwQztZQUN2RCxTQUFTLEVBQUUsQ0FBQyx5Q0FBeUMsQ0FBQztTQUN0RCxDQUFDO3lDQWM0Qix5QkFBZ0I7T0FaakMsZ0JBQWdCLENBNEc1QjtJQUFELHVCQUFDO0NBQUEsQUE1R0QsSUE0R0M7QUE1R1ksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGdldFN0cmluZyB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24tc2V0dGluZ3MvYXBwbGljYXRpb24tc2V0dGluZ3MnO1xuLy9pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXInO1xuLy9pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tICd1aS90ZXh0LWZpZWxkJztcbi8vaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcbi8vaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgKiBhcyB1dGlscyBmcm9tIFwidXRpbHMvdXRpbHNcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgT3BpbmlvbnNNb2RhbCB9IGZyb20gJy4uLy4uL21vZGFsL29waW5pb25zLm1vZGFsJztcbmltcG9ydCB7IFNlcnZpY2VGaXJlYmFzZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2ZpcmViYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgR2xvYmFsQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29uc3RzL2dsb2JhbC5tb2RlbCc7XG5cblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnYWxsLXBhZ2UnLFxuXHR0ZW1wbGF0ZVVybDogJy4vcGFnZXMvYWxsLXBhZ2UvYWxsLXBhZ2UuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnLi9wYWdlcy9hbGwtcGFnZS9hbGwtcGFnZS5jb21wb25lbnQuY3NzJ11cbn0pXG5cbmV4cG9ydCBjbGFzcyBBbGxQYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuXHRpZE9waW5pb246IG51bWJlcjtcblx0X3NlcnZpY2VGaXJlYmFzZTogU2VydmljZUZpcmViYXNlO1xuXHRfZGF0YU9waW5pb25zOiBPcGluaW9uc01vZGFsO1xuXHRfZ2xvYmFsQ29tcG9uZW50OiBHbG9iYWxDb21wb25lbnQ7XG5cdF90aXRsZTogc3RyaW5nO1xuXHRfdmlld0hlbHAgPSBmYWxzZTtcblx0X3ZpZXdCdWd1ZXQgPSBmYWxzZTtcblx0X3ZpZXdWZXRzID0gZmFsc2U7XG5cdF92aWV3VGVybXMgPSBmYWxzZTtcblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIF9yb3V0RXg6IFJvdXRlckV4dGVuc2lvbnMpIHtcblx0XHR0aGlzLl9kYXRhT3BpbmlvbnMgPSBuZXcgT3BpbmlvbnNNb2RhbCgpO1xuXHRcdHRoaXMuX3NlcnZpY2VGaXJlYmFzZSA9IG5ldyBTZXJ2aWNlRmlyZWJhc2UoKTtcblx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQgPSBuZXcgR2xvYmFsQ29tcG9uZW50KCk7XG5cdH1cblxuXHRuZ09uSW5pdCgpIHtcblx0XHR0aGlzLnZhbGlkYXRlUGFnZSgpO1xuXHR9XG5cblx0cHVibGljIHZhbGlkYXRlUGFnZSgpIHtcblx0XHRsZXQgcGFnZSA9IGdldFN0cmluZyhcInBhZ2VcIik7XG5cblx0XHRpZiAocGFnZSA9PT0gXCJheXVkYVwiKSB7XG5cdFx0XHR0aGlzLl92aWV3SGVscCA9IHRydWU7XG5cdFx0XHR0aGlzLl90aXRsZSA9IFwiQXl1ZGFcIjtcblx0XHR9XG5cblx0XHRpZiAocGFnZSA9PT0gXCJmYWN0dXJhY2lvblwiKSB7XG5cdFx0XHR0aGlzLl92aWV3QnVndWV0ID0gdHJ1ZTtcblx0XHRcdHRoaXMuX3RpdGxlID0gXCJGYWN0dXJhY2nDs25cIjtcblx0XHR9XG5cblx0XHRpZiAocGFnZSA9PT0gXCJhY2VyY2FcIikge1xuXHRcdFx0dGhpcy5fdmlld1ZldHMgPSB0cnVlO1xuXHRcdFx0dGhpcy5fdGl0bGUgPSBcIkFjZXJjYSBEZVwiO1xuXHRcdH1cblxuXHRcdGlmIChwYWdlID09PSBcInRlcm1pbm9zXCIpIHtcblx0XHRcdHRoaXMuX3ZpZXdUZXJtcyA9IHRydWU7XG5cdFx0XHR0aGlzLl90aXRsZSA9IFwiVGVybWlub3NcIjtcblx0XHR9XG5cblx0fVxuXG5cdC8qKlxuXHQgKiBnZXRCYWNrXG5cdCAqL1xuXHRwdWJsaWMgZ2V0QmFjaygpIHtcblx0XHR0aGlzLl9yb3V0RXguYmFjaygpO1xuXHR9XG5cdC8qKlxuXHQgKiBvcGVuVXJsXG5cdCAqL1xuXHRwdWJsaWMgb3BlblVybCgpIHtcblx0XHQvL3V0aWxzLm9wZW5VcmwoXCJodHRwczovL2FwaS53aGF0c2FwcC5jb20vc2VuZD9waG9uZT01NzMyMDQyMzI1MTEmdGV4dD1Ib2xhISwgwr8gVGVuZ28gdW5hIHByZWd1bnRhIHNvYnJlIFZldHNDb2wgP1wiKVxuXHR9XG5cblx0LyoqXG5cdCAqIEVudmlhckFzdW50b1xuXHQgKi9cblx0cHVibGljIEVudmlhckFzdW50bygpIHtcblx0XHR0aGlzLl9kYXRhT3BpbmlvbnMuX2lkVXN1YXJpbyA9IGdldFN0cmluZyhcImlkTG9naW5cIik7XG5cdFx0aWYgKHRoaXMuX2RhdGFPcGluaW9ucy5fYXN1bnRvT3BpbmlvbiAhPT0gbnVsbCAmJiB0aGlzLl9kYXRhT3BpbmlvbnMuX2FzdW50b09waW5pb24gIT09IHVuZGVmaW5lZCAmJiB0aGlzLl9kYXRhT3BpbmlvbnMuX2FzdW50b09waW5pb24gIT09IFwiXCIpIHtcblx0XHRcdGlmICh0aGlzLl9kYXRhT3BpbmlvbnMuX2Rlc2NyaXBjaW9uT3BpbmlvbiAhPT0gbnVsbCAmJiB0aGlzLl9kYXRhT3BpbmlvbnMuX2Rlc2NyaXBjaW9uT3BpbmlvbiAhPT0gdW5kZWZpbmVkICYmIHRoaXMuX2RhdGFPcGluaW9ucy5fZGVzY3JpcGNpb25PcGluaW9uICE9PSBcIlwiKSB7XG5cdFx0XHRcdHRoaXMuZ2V0SWRPcGluaW9ucygpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LnZhbGlkYXJDYW1wbyhcImRlc2NyaXBjacOzblwiKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LnZhbGlkYXJDYW1wbyhcImFzdW50b1wiKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogZ2V0SWRPcGluaW9uc1xuXHQgKi9cblx0cHVibGljIGdldElkT3BpbmlvbnMoKSB7XG5cdFx0dGhpcy5fc2VydmljZUZpcmViYXNlLmdldERhdGFJZE9waW5pb25zKCkudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRjb25zb2xlLmxvZyhcIlJlc3BvbnNlIGRlbCBpZFwiK0pTT04uc3RyaW5naWZ5KHJlc3BvbnNlKSk7XG5cdFx0XHRpZiAocmVzcG9uc2UudmFsdWUgIT09IG51bGwpIHtcblx0XHRcdFx0dmFyIHN0ckpTT04gPSBKU09OLnN0cmluZ2lmeShyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgdmFyIG9iakpTT04gPSBldmFsKFwiKGZ1bmN0aW9uKCl7cmV0dXJuIFwiICsgc3RySlNPTiArIFwiO30pKClcIik7XG4gICAgICAgICAgICAgICAgbGV0IHNpemUgPSBvYmpKU09OLnZhbHVlLmxlbmd0aDsgICBcdFx0XHRcdFxuXHRcdFx0XHR0aGlzLmlkT3BpbmlvbiA9IHNpemU7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmlkT3BpbmlvbiA9IDA7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX3NlcnZpY2VGaXJlYmFzZS5hZGRTdWJqZWN0c1ZldHModGhpcy5pZE9waW5pb24sIHRoaXMuX2RhdGFPcGluaW9ucykudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdGlmIChyZXNwb25zZSA9PT0gXCJndWFyZGFkb1wiKSB7XG5cdFx0XHRcdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LnZhbGlkYXRlU3VjY2VzcyhcIkhlbW9zIHJlY2liaWRvIHR1IG1lbnNhamUsIEdyYWNpYXMgcG9yIGhhY2VyIHBhcnRlIGRlIG5vc290cm9zLlwiKTtcblx0XHRcdFx0XHR0aGlzLl9yb3V0RXgubmF2aWdhdGUoW1wiaG9tZVwiXSwge1xuXHRcdFx0XHRcdFx0Y2xlYXJIaXN0b3J5OiB0cnVlLFxuXHRcdFx0XHRcdFx0dHJhbnNpdGlvbjoge1xuXHRcdFx0XHRcdFx0XHRuYW1lOiBcInNsaWRlTGVmdFwiLFxuXHRcdFx0XHRcdFx0XHRkdXJhdGlvbjogNDAwLFxuXHRcdFx0XHRcdFx0XHRjdXJ2ZTogXCJlYXNlXCJcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC52YWxpZGFyRXJyb3JlcyhyZXNwb25zZSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0fSlcblx0fVxufSJdfQ==