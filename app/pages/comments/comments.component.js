"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var vets_modal_1 = require("../../modal/vets.modal");
var global_model_1 = require("../../consts/global.model");
var firebase_service_1 = require("../../services/firebase.service");
var application_settings_1 = require("tns-core-modules/application-settings/application-settings");
var router_1 = require("nativescript-angular/router");
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';
var CommentsComponent = /** @class */ (function () {
    function CommentsComponent(_routEx) {
        this._routEx = _routEx;
        this._dataVets = new vets_modal_1.DatosVets();
        this._globalComponent = new global_model_1.GlobalComponent();
        this._serviceFirebase = new firebase_service_1.ServiceFirebase();
    }
    CommentsComponent.prototype.ngOnInit = function () {
        this._globalComponent.loadingView();
        this.getComments();
        this._dataVets._idVets = application_settings_1.getString('idLogin');
    };
    /**
     * getComments
     */
    CommentsComponent.prototype.getComments = function () {
        var _this = this;
        //let idUseres = "2oFMfKbkmZYO4teOZU75117cxi93";
        this._serviceFirebase.getCommentsRating(application_settings_1.getString('idLogin')).then(function (response) {
            console.log("response Comments" + JSON.stringify(response));
            _this.arregloComentarios = [];
            if (response.value !== null) {
                var comentarios = response.value.comentarios;
                for (var i = 0; i < comentarios.length; i++) {
                    var nombre = comentarios[i].nombre;
                    var descripcion = comentarios[i].descripcion;
                    _this.arregloComentarios.push({
                        nombre: nombre,
                        descripcion: descripcion
                    });
                }
            }
            else {
                _this._globalComponent.loadingHide();
                _this._globalComponent.viewMessage("Aún no se encuentran comentarios registrados.");
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
    CommentsComponent = __decorate([
        core_1.Component({
            selector: 'comments',
            templateUrl: './pages/comments/comments.component.html',
            styleUrls: ['./pages/comments/comments.component.css']
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions])
    ], CommentsComponent);
    return CommentsComponent;
}());
exports.CommentsComponent = CommentsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tbWVudHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELHFEQUFtRDtBQUNuRCwwREFBNEQ7QUFDNUQsb0VBQWtFO0FBQ2xFLG1HQUF1RjtBQUN2RixzREFBK0Q7QUFDL0QsMERBQTBEO0FBQzFELDRDQUE0QztBQUM1Qyw4Q0FBOEM7QUFDOUMsbURBQW1EO0FBUW5EO0lBT0MsMkJBQW9CLE9BQXdCO1FBQXhCLFlBQU8sR0FBUCxPQUFPLENBQWlCO1FBQzNDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxzQkFBUyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksOEJBQWUsRUFBRSxDQUFDO1FBQzlDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLGtDQUFlLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBRUQsb0NBQVEsR0FBUjtRQUNDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUUsZ0NBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7O09BRUc7SUFDSSx1Q0FBVyxHQUFsQjtRQUFBLGlCQStCQztRQTlCQSxnREFBZ0Q7UUFDaEQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLGdDQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxRQUFRO1lBQzFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzVELEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxFQUFFLENBQUM7WUFDN0IsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztnQkFFN0MsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7b0JBQzdDLElBQUksTUFBTSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7b0JBQ25DLElBQUksV0FBVyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUM7b0JBRTdDLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUM7d0JBQzVCLE1BQU0sRUFBRSxNQUFNO3dCQUNkLFdBQVcsRUFBRSxXQUFXO3FCQUN4QixDQUFDLENBQUE7Z0JBQ0gsQ0FBQztZQUNGLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDUCxLQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3BDLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsK0NBQStDLENBQUMsQ0FBQztnQkFDbkYsS0FBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBQztvQkFDOUIsWUFBWSxFQUFDLElBQUk7b0JBQ2pCLFVBQVUsRUFBQzt3QkFDVixJQUFJLEVBQUMsTUFBTTt3QkFDWCxRQUFRLEVBQUMsR0FBRzt3QkFDWixLQUFLLEVBQUMsTUFBTTtxQkFDWjtpQkFDRCxDQUFDLENBQUM7WUFDSixDQUFDO1FBQ0YsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckMsQ0FBQztJQXJEVyxpQkFBaUI7UUFON0IsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFdBQVcsRUFBRSwwQ0FBMEM7WUFDdkQsU0FBUyxFQUFFLENBQUMseUNBQXlDLENBQUM7U0FDdEQsQ0FBQzt5Q0FTMkIseUJBQWdCO09BUGhDLGlCQUFpQixDQXNEN0I7SUFBRCx3QkFBQztDQUFBLEFBdERELElBc0RDO0FBdERZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEYXRvc1ZldHMgfSBmcm9tICcuLi8uLi9tb2RhbC92ZXRzLm1vZGFsJztcbmltcG9ydCB7IEdsb2JhbENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvbnN0cy9nbG9iYWwubW9kZWwnO1xuaW1wb3J0IHsgU2VydmljZUZpcmViYXNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBnZXRTdHJpbmcgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uLXNldHRpbmdzL2FwcGxpY2F0aW9uLXNldHRpbmdzJztcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuLy9pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXInO1xuLy9pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tICd1aS90ZXh0LWZpZWxkJztcbi8vaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcbi8vaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICdjb21tZW50cycsXG5cdHRlbXBsYXRlVXJsOiAnLi9wYWdlcy9jb21tZW50cy9jb21tZW50cy5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWycuL3BhZ2VzL2NvbW1lbnRzL2NvbW1lbnRzLmNvbXBvbmVudC5jc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIENvbW1lbnRzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuXHRfZGF0YVZldHM6IERhdG9zVmV0cztcblx0X2dsb2JhbENvbXBvbmVudDogR2xvYmFsQ29tcG9uZW50O1xuXHRfc2VydmljZUZpcmViYXNlOiBTZXJ2aWNlRmlyZWJhc2U7XG5cdGFycmVnbG9Db21lbnRhcmlvczogYW55W107XG5cdGlkQ29tbWVudHM6IGFueTtcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBfcm91dEV4OlJvdXRlckV4dGVuc2lvbnMpIHtcblx0XHR0aGlzLl9kYXRhVmV0cyA9IG5ldyBEYXRvc1ZldHMoKTtcblx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQgPSBuZXcgR2xvYmFsQ29tcG9uZW50KCk7XG5cdFx0dGhpcy5fc2VydmljZUZpcmViYXNlID0gbmV3IFNlcnZpY2VGaXJlYmFzZSgpO1xuXHR9XG5cblx0bmdPbkluaXQoKSB7IFxuXHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC5sb2FkaW5nVmlldygpO1xuXHRcdHRoaXMuZ2V0Q29tbWVudHMoKTtcblx0XHR0aGlzLl9kYXRhVmV0cy5faWRWZXRzPSBnZXRTdHJpbmcoJ2lkTG9naW4nKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBnZXRDb21tZW50c1xuXHQgKi9cblx0cHVibGljIGdldENvbW1lbnRzKCkge1xuXHRcdC8vbGV0IGlkVXNlcmVzID0gXCIyb0ZNZktia21aWU80dGVPWlU3NTExN2N4aTkzXCI7XG5cdFx0dGhpcy5fc2VydmljZUZpcmViYXNlLmdldENvbW1lbnRzUmF0aW5nKGdldFN0cmluZygnaWRMb2dpbicpKS50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdGNvbnNvbGUubG9nKFwicmVzcG9uc2UgQ29tbWVudHNcIiArIEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlKSk7XG5cdFx0XHR0aGlzLmFycmVnbG9Db21lbnRhcmlvcyA9IFtdO1xuXHRcdFx0aWYgKHJlc3BvbnNlLnZhbHVlICE9PSBudWxsKSB7XG5cdFx0XHRcdGxldCBjb21lbnRhcmlvcyA9IHJlc3BvbnNlLnZhbHVlLmNvbWVudGFyaW9zO1xuXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgY29tZW50YXJpb3MubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRsZXQgbm9tYnJlID0gY29tZW50YXJpb3NbaV0ubm9tYnJlO1xuXHRcdFx0XHRcdGxldCBkZXNjcmlwY2lvbiA9IGNvbWVudGFyaW9zW2ldLmRlc2NyaXBjaW9uO1xuXG5cdFx0XHRcdFx0dGhpcy5hcnJlZ2xvQ29tZW50YXJpb3MucHVzaCh7XG5cdFx0XHRcdFx0XHRub21icmU6IG5vbWJyZSxcblx0XHRcdFx0XHRcdGRlc2NyaXBjaW9uOiBkZXNjcmlwY2lvblxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC5sb2FkaW5nSGlkZSgpO1xuXHRcdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQudmlld01lc3NhZ2UoXCJBw7puIG5vIHNlIGVuY3VlbnRyYW4gY29tZW50YXJpb3MgcmVnaXN0cmFkb3MuXCIpO1xuXHRcdFx0XHR0aGlzLl9yb3V0RXgubmF2aWdhdGUoWydob21lJ10se1xuXHRcdFx0XHRcdGNsZWFySGlzdG9yeTp0cnVlLFxuXHRcdFx0XHRcdHRyYW5zaXRpb246e1xuXHRcdFx0XHRcdFx0bmFtZTpcImZhZGVcIixcblx0XHRcdFx0XHRcdGR1cmF0aW9uOjQwMCxcblx0XHRcdFx0XHRcdGN1cnZlOlwiZWFzZVwiXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQubG9hZGluZ0hpZGUoKTtcblx0fVxufSJdfQ==