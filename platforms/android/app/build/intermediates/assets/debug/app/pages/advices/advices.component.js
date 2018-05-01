"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var opinions_modal_1 = require("../../modal/opinions.modal");
var firebase_service_1 = require("../../services/firebase.service");
var global_model_1 = require("../../consts/global.model");
var application_settings_1 = require("tns-core-modules/application-settings/application-settings");
var router_1 = require("nativescript-angular/router");
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';
var AdvicesComponent = /** @class */ (function () {
    function AdvicesComponent(_routEx) {
        this._routEx = _routEx;
        this._dataOpinions = new opinions_modal_1.OpinionsModal();
        this._serviceFirebase = new firebase_service_1.ServiceFirebase();
        this._globalComponent = new global_model_1.GlobalComponent();
    }
    AdvicesComponent.prototype.ngOnInit = function () { };
    /**
     * EnviarAsunto
     */
    AdvicesComponent.prototype.EnviarAsunto = function () {
        this._globalComponent.loadingView();
        this._dataOpinions._idUsuario = application_settings_1.getString("idLogin");
        if (this._dataOpinions._asuntoOpinion !== null && this._dataOpinions._asuntoOpinion !== undefined && this._dataOpinions._asuntoOpinion !== "") {
            if (this._dataOpinions._descripcionOpinion !== null && this._dataOpinions._descripcionOpinion !== undefined && this._dataOpinions._descripcionOpinion !== "") {
                this.getIdOpinions();
            }
            else {
                this._globalComponent.validarCampo("descripción");
                this._globalComponent.loadingHide();
            }
        }
        else {
            this._globalComponent.validarCampo("asunto");
            this._globalComponent.loadingHide();
        }
    };
    /**
     * getIdOpinions
     */
    AdvicesComponent.prototype.getIdOpinions = function () {
        var _this = this;
        this._serviceFirebase.getDataIdAdvices().then(function (response) {
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
            _this._serviceFirebase.addAdvicesVets(_this.idOpinion, _this._dataOpinions).then(function (response) {
                if (response === "guardado") {
                    _this._globalComponent.validateSuccess("Hemos recibido tu mensaje, te contactaremos lo mas pronto posible.");
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
        this._globalComponent.loadingHide();
    };
    AdvicesComponent = __decorate([
        core_1.Component({
            selector: 'advices',
            templateUrl: './pages/advices/advices.component.html',
            styleUrls: ['./pages/advices/advices.component.css']
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions])
    ], AdvicesComponent);
    return AdvicesComponent;
}());
exports.AdvicesComponent = AdvicesComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWR2aWNlcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhZHZpY2VzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCw2REFBMkQ7QUFDM0Qsb0VBQWtFO0FBQ2xFLDBEQUE0RDtBQUM1RCxtR0FBdUY7QUFDdkYsc0RBQStEO0FBQy9ELDBEQUEwRDtBQUMxRCw0Q0FBNEM7QUFDNUMsOENBQThDO0FBQzlDLG1EQUFtRDtBQVFuRDtJQU1DLDBCQUFvQixPQUF3QjtRQUF4QixZQUFPLEdBQVAsT0FBTyxDQUFpQjtRQUMzQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksOEJBQWEsRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLGtDQUFlLEVBQUUsQ0FBQztRQUM5QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSw4QkFBZSxFQUFFLENBQUM7SUFDL0MsQ0FBQztJQUVELG1DQUFRLEdBQVIsY0FBYSxDQUFDO0lBR2Q7O09BRUc7SUFDSSx1Q0FBWSxHQUFuQjtRQUNDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsR0FBRyxnQ0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMvSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLG1CQUFtQixLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLG1CQUFtQixLQUFLLFNBQVMsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLG1CQUFtQixLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzlKLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUN0QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ1AsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDbEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3JDLENBQUM7UUFDRixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDUCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQyxDQUFDO0lBQ0YsQ0FBQztJQUVEOztPQUVHO0lBQ0ksd0NBQWEsR0FBcEI7UUFBQSxpQkE4QkM7UUE3QkEsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsUUFBUTtZQUNyRCxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUN4RCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzNCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxPQUFPLEdBQUcsT0FBTyxDQUFDLENBQUM7Z0JBQzlELElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO2dCQUM1QyxLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN2QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ1AsS0FBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7WUFDcEIsQ0FBQztZQUVELEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsS0FBSSxDQUFDLFNBQVMsRUFBRSxLQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsUUFBUTtnQkFDckYsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQzdCLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsb0VBQW9FLENBQUMsQ0FBQztvQkFDNUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRTt3QkFDL0IsWUFBWSxFQUFFLElBQUk7d0JBQ2xCLFVBQVUsRUFBRTs0QkFDWCxJQUFJLEVBQUUsV0FBVzs0QkFDakIsUUFBUSxFQUFFLEdBQUc7NEJBQ2IsS0FBSyxFQUFFLE1BQU07eUJBQ2I7cUJBQ0QsQ0FBQyxDQUFBO2dCQUNILENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ1AsS0FBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDaEQsQ0FBQztZQUNGLENBQUMsQ0FBQyxDQUFBO1FBQ0gsQ0FBQyxDQUFDLENBQUE7UUFFRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckMsQ0FBQztJQW5FVyxnQkFBZ0I7UUFONUIsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFdBQVcsRUFBRSx3Q0FBd0M7WUFDckQsU0FBUyxFQUFFLENBQUMsdUNBQXVDLENBQUM7U0FDcEQsQ0FBQzt5Q0FRMkIseUJBQWdCO09BTmhDLGdCQUFnQixDQW9FNUI7SUFBRCx1QkFBQztDQUFBLEFBcEVELElBb0VDO0FBcEVZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPcGluaW9uc01vZGFsIH0gZnJvbSAnLi4vLi4vbW9kYWwvb3BpbmlvbnMubW9kYWwnO1xuaW1wb3J0IHsgU2VydmljZUZpcmViYXNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBHbG9iYWxDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb25zdHMvZ2xvYmFsLm1vZGVsJztcbmltcG9ydCB7IGdldFN0cmluZyB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24tc2V0dGluZ3MvYXBwbGljYXRpb24tc2V0dGluZ3MnO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XG4vL2ltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhcic7XG4vL2ltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gJ3VpL3RleHQtZmllbGQnO1xuLy9pbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tICdkYXRhL29ic2VydmFibGUnO1xuLy9pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogJ2FkdmljZXMnLFxuXHR0ZW1wbGF0ZVVybDogJy4vcGFnZXMvYWR2aWNlcy9hZHZpY2VzLmNvbXBvbmVudC5odG1sJyxcblx0c3R5bGVVcmxzOiBbJy4vcGFnZXMvYWR2aWNlcy9hZHZpY2VzLmNvbXBvbmVudC5jc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIEFkdmljZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG5cdGlkT3BpbmlvbjogYW55O1xuXHRfZ2xvYmFsQ29tcG9uZW50OiBHbG9iYWxDb21wb25lbnQ7XG5cdF9zZXJ2aWNlRmlyZWJhc2U6IFNlcnZpY2VGaXJlYmFzZTtcblx0X2RhdGFPcGluaW9uczogT3BpbmlvbnNNb2RhbDtcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBfcm91dEV4OlJvdXRlckV4dGVuc2lvbnMpIHsgXG5cdFx0dGhpcy5fZGF0YU9waW5pb25zID0gbmV3IE9waW5pb25zTW9kYWwoKTtcblx0XHR0aGlzLl9zZXJ2aWNlRmlyZWJhc2UgPSBuZXcgU2VydmljZUZpcmViYXNlKCk7XG5cdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50ID0gbmV3IEdsb2JhbENvbXBvbmVudCgpO1xuXHR9XG5cblx0bmdPbkluaXQoKSB7IH1cblxuXG5cdC8qKlxuXHQgKiBFbnZpYXJBc3VudG9cblx0ICovXG5cdHB1YmxpYyBFbnZpYXJBc3VudG8oKSB7XG5cdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LmxvYWRpbmdWaWV3KCk7XG5cdFx0dGhpcy5fZGF0YU9waW5pb25zLl9pZFVzdWFyaW8gPSBnZXRTdHJpbmcoXCJpZExvZ2luXCIpO1xuXHRcdGlmICh0aGlzLl9kYXRhT3BpbmlvbnMuX2FzdW50b09waW5pb24gIT09IG51bGwgJiYgdGhpcy5fZGF0YU9waW5pb25zLl9hc3VudG9PcGluaW9uICE9PSB1bmRlZmluZWQgJiYgdGhpcy5fZGF0YU9waW5pb25zLl9hc3VudG9PcGluaW9uICE9PSBcIlwiKSB7XG5cdFx0XHRpZiAodGhpcy5fZGF0YU9waW5pb25zLl9kZXNjcmlwY2lvbk9waW5pb24gIT09IG51bGwgJiYgdGhpcy5fZGF0YU9waW5pb25zLl9kZXNjcmlwY2lvbk9waW5pb24gIT09IHVuZGVmaW5lZCAmJiB0aGlzLl9kYXRhT3BpbmlvbnMuX2Rlc2NyaXBjaW9uT3BpbmlvbiAhPT0gXCJcIikge1xuXHRcdFx0XHR0aGlzLmdldElkT3BpbmlvbnMoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC52YWxpZGFyQ2FtcG8oXCJkZXNjcmlwY2nDs25cIik7XG5cdFx0XHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC5sb2FkaW5nSGlkZSgpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQudmFsaWRhckNhbXBvKFwiYXN1bnRvXCIpO1xuXHRcdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LmxvYWRpbmdIaWRlKCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIGdldElkT3BpbmlvbnNcblx0ICovXG5cdHB1YmxpYyBnZXRJZE9waW5pb25zKCkge1xuXHRcdHRoaXMuX3NlcnZpY2VGaXJlYmFzZS5nZXREYXRhSWRBZHZpY2VzKCkudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRjb25zb2xlLmxvZyhcIlJlc3BvbnNlIGRlbCBpZFwiK0pTT04uc3RyaW5naWZ5KHJlc3BvbnNlKSk7XG5cdFx0XHRpZiAocmVzcG9uc2UudmFsdWUgIT09IG51bGwpIHtcblx0XHRcdFx0dmFyIHN0ckpTT04gPSBKU09OLnN0cmluZ2lmeShyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgdmFyIG9iakpTT04gPSBldmFsKFwiKGZ1bmN0aW9uKCl7cmV0dXJuIFwiICsgc3RySlNPTiArIFwiO30pKClcIik7XG4gICAgICAgICAgICAgICAgbGV0IHNpemUgPSBvYmpKU09OLnZhbHVlLmxlbmd0aDsgICBcdFx0XHRcdFxuXHRcdFx0XHR0aGlzLmlkT3BpbmlvbiA9IHNpemU7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmlkT3BpbmlvbiA9IDA7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX3NlcnZpY2VGaXJlYmFzZS5hZGRBZHZpY2VzVmV0cyh0aGlzLmlkT3BpbmlvbiwgdGhpcy5fZGF0YU9waW5pb25zKS50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0aWYgKHJlc3BvbnNlID09PSBcImd1YXJkYWRvXCIpIHtcblx0XHRcdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQudmFsaWRhdGVTdWNjZXNzKFwiSGVtb3MgcmVjaWJpZG8gdHUgbWVuc2FqZSwgdGUgY29udGFjdGFyZW1vcyBsbyBtYXMgcHJvbnRvIHBvc2libGUuXCIpO1xuXHRcdFx0XHRcdHRoaXMuX3JvdXRFeC5uYXZpZ2F0ZShbXCJob21lXCJdLCB7XG5cdFx0XHRcdFx0XHRjbGVhckhpc3Rvcnk6IHRydWUsXG5cdFx0XHRcdFx0XHR0cmFuc2l0aW9uOiB7XG5cdFx0XHRcdFx0XHRcdG5hbWU6IFwic2xpZGVMZWZ0XCIsXG5cdFx0XHRcdFx0XHRcdGR1cmF0aW9uOiA0MDAsXG5cdFx0XHRcdFx0XHRcdGN1cnZlOiBcImVhc2VcIlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LnZhbGlkYXJFcnJvcmVzKHJlc3BvbnNlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHR9KVxuXG5cdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LmxvYWRpbmdIaWRlKCk7XG5cdH1cbn0iXX0=