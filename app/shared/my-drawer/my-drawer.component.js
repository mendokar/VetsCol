"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var firebase_service_1 = require("../../services/firebase.service");
var application_settings_1 = require("tns-core-modules/application-settings/application-settings");
/* ***********************************************************
* Keep data that is displayed in your app drawer in the MyDrawer component class.
* Add new data objects that you want to display in the drawer here in the form of properties.
*************************************************************/
var MyDrawerComponent = /** @class */ (function () {
    function MyDrawerComponent(_routEx) {
        this._routEx = _routEx;
        this._nameUser = "Oscar Mendoza";
        this._nameVets = "Veterinarias De Colombia";
        this._serviceFirebase = new firebase_service_1.ServiceFirebase();
    }
    MyDrawerComponent.prototype.ngOnInit = function () {
        /* ***********************************************************
        * Use the MyDrawerComponent "onInit" event handler to initialize the properties data values.
        *************************************************************/
        this.getDatosUsuario();
    };
    /* ***********************************************************
    * The "isPageSelected" function is bound to every navigation item on the <MyDrawerItem>.
    * It is used to determine whether the item should have the "selected" class.
    * The "selected" class changes the styles of the item, so that you know which page you are on.
    *************************************************************/
    MyDrawerComponent.prototype.isPageSelected = function (pageTitle) {
        return pageTitle === this.selectedPage;
    };
    /**
     * viewProfile
     */
    MyDrawerComponent.prototype.viewProfile = function () {
        this._routEx.navigate(['profile'], {
            transition: {
                name: "slide",
                duration: 400,
                curve: "ease"
            }
        });
    };
    /**
     * getDatosUsuario
     */
    MyDrawerComponent.prototype.getDatosUsuario = function () {
        var _this = this;
        var idUser = application_settings_1.getString("idLogin");
        this._serviceFirebase.consultarDatosUsuario(idUser).then(function (response) {
            console.log(JSON.stringify(response.value));
            _this._nameUser = response.value[idUser].nombre;
            _this._nameVets = response.value[idUser].correo;
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MyDrawerComponent.prototype, "selectedPage", void 0);
    MyDrawerComponent = __decorate([
        core_1.Component({
            selector: "MyDrawer",
            moduleId: module.id,
            templateUrl: "./my-drawer.component.html",
            styleUrls: ["./my-drawer.component.scss"],
            providers: [firebase_service_1.ServiceFirebase]
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions])
    ], MyDrawerComponent);
    return MyDrawerComponent;
}());
exports.MyDrawerComponent = MyDrawerComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXktZHJhd2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm15LWRyYXdlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUQ7QUFDekQsc0RBQStEO0FBQy9ELG9FQUFrRTtBQUNsRSxtR0FBdUY7QUFJdkY7Ozs4REFHOEQ7QUFROUQ7SUFRSSwyQkFBb0IsT0FBd0I7UUFBeEIsWUFBTyxHQUFQLE9BQU8sQ0FBaUI7UUFvQjVDLGNBQVMsR0FBQyxlQUFlLENBQUM7UUFDMUIsY0FBUyxHQUFDLDBCQUEwQixDQUFDO1FBcEJqQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxrQ0FBZSxFQUFFLENBQUM7SUFDbEQsQ0FBQztJQUVELG9DQUFRLEdBQVI7UUFDSTs7c0VBRThEO1FBQy9ELElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQ7Ozs7a0VBSThEO0lBQzlELDBDQUFjLEdBQWQsVUFBZSxTQUFpQjtRQUM1QixNQUFNLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0MsQ0FBQztJQUtEOztPQUVHO0lBQ0ksdUNBQVcsR0FBbEI7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFDO1lBQzlCLFVBQVUsRUFBQztnQkFDUCxJQUFJLEVBQUMsT0FBTztnQkFDWixRQUFRLEVBQUMsR0FBRztnQkFDWixLQUFLLEVBQUMsTUFBTTthQUNmO1NBQ0osQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVEOztPQUVHO0lBQ0ksMkNBQWUsR0FBdEI7UUFBQSxpQkFPQztRQU5HLElBQUksTUFBTSxHQUFHLGdDQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFFBQVE7WUFDN0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3JELEtBQUksQ0FBQyxTQUFTLEdBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDOUMsS0FBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUEvQ1E7UUFBUixZQUFLLEVBQUU7OzJEQUFzQjtJQVByQixpQkFBaUI7UUFQN0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsNEJBQTRCO1lBQ3pDLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO1lBQ3pDLFNBQVMsRUFBQyxDQUFDLGtDQUFlLENBQUM7U0FDOUIsQ0FBQzt5Q0FTOEIseUJBQWdCO09BUm5DLGlCQUFpQixDQXdEN0I7SUFBRCx3QkFBQztDQUFBLEFBeERELElBd0RDO0FBeERZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFNlcnZpY2VGaXJlYmFzZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IGdldFN0cmluZyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uLXNldHRpbmdzL2FwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcblxyXG5cclxuXHJcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiogS2VlcCBkYXRhIHRoYXQgaXMgZGlzcGxheWVkIGluIHlvdXIgYXBwIGRyYXdlciBpbiB0aGUgTXlEcmF3ZXIgY29tcG9uZW50IGNsYXNzLlxyXG4qIEFkZCBuZXcgZGF0YSBvYmplY3RzIHRoYXQgeW91IHdhbnQgdG8gZGlzcGxheSBpbiB0aGUgZHJhd2VyIGhlcmUgaW4gdGhlIGZvcm0gb2YgcHJvcGVydGllcy5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJNeURyYXdlclwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbXktZHJhd2VyLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vbXktZHJhd2VyLmNvbXBvbmVudC5zY3NzXCJdLFxyXG4gICAgcHJvdmlkZXJzOltTZXJ2aWNlRmlyZWJhc2VdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNeURyYXdlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBfc2VydmljZUZpcmViYXNlOiBTZXJ2aWNlRmlyZWJhc2U7XHJcbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgKiBUaGUgXCJzZWxlY3RlZFBhZ2VcIiBpcyBhIGNvbXBvbmVudCBpbnB1dCBwcm9wZXJ0eS5cclxuICAgICogSXQgaXMgdXNlZCB0byBwYXNzIHRoZSBjdXJyZW50IHBhZ2UgdGl0bGUgZnJvbSB0aGUgY29udGFpbmluZyBwYWdlIGNvbXBvbmVudC5cclxuICAgICogWW91IGNhbiBjaGVjayBob3cgaXQgaXMgdXNlZCBpbiB0aGUgXCJpc1BhZ2VTZWxlY3RlZFwiIGZ1bmN0aW9uIGJlbG93LlxyXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIEBJbnB1dCgpIHNlbGVjdGVkUGFnZTogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm91dEV4OlJvdXRlckV4dGVuc2lvbnMpe1xyXG4gICAgICAgIHRoaXMuX3NlcnZpY2VGaXJlYmFzZSA9IG5ldyBTZXJ2aWNlRmlyZWJhc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICAgICogVXNlIHRoZSBNeURyYXdlckNvbXBvbmVudCBcIm9uSW5pdFwiIGV2ZW50IGhhbmRsZXIgdG8gaW5pdGlhbGl6ZSB0aGUgcHJvcGVydGllcyBkYXRhIHZhbHVlcy5cclxuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgICAgdGhpcy5nZXREYXRvc1VzdWFyaW8oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgKiBUaGUgXCJpc1BhZ2VTZWxlY3RlZFwiIGZ1bmN0aW9uIGlzIGJvdW5kIHRvIGV2ZXJ5IG5hdmlnYXRpb24gaXRlbSBvbiB0aGUgPE15RHJhd2VySXRlbT4uXHJcbiAgICAqIEl0IGlzIHVzZWQgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGl0ZW0gc2hvdWxkIGhhdmUgdGhlIFwic2VsZWN0ZWRcIiBjbGFzcy5cclxuICAgICogVGhlIFwic2VsZWN0ZWRcIiBjbGFzcyBjaGFuZ2VzIHRoZSBzdHlsZXMgb2YgdGhlIGl0ZW0sIHNvIHRoYXQgeW91IGtub3cgd2hpY2ggcGFnZSB5b3UgYXJlIG9uLlxyXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIGlzUGFnZVNlbGVjdGVkKHBhZ2VUaXRsZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHBhZ2VUaXRsZSA9PT0gdGhpcy5zZWxlY3RlZFBhZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgX25hbWVVc2VyPVwiT3NjYXIgTWVuZG96YVwiO1xyXG4gICAgX25hbWVWZXRzPVwiVmV0ZXJpbmFyaWFzIERlIENvbG9tYmlhXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB2aWV3UHJvZmlsZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdmlld1Byb2ZpbGUoKSB7XHJcbiAgICAgICAgdGhpcy5fcm91dEV4Lm5hdmlnYXRlKFsncHJvZmlsZSddLHtcclxuICAgICAgICAgICAgdHJhbnNpdGlvbjp7XHJcbiAgICAgICAgICAgICAgICBuYW1lOlwic2xpZGVcIixcclxuICAgICAgICAgICAgICAgIGR1cmF0aW9uOjQwMCxcclxuICAgICAgICAgICAgICAgIGN1cnZlOlwiZWFzZVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0RGF0b3NVc3VhcmlvXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREYXRvc1VzdWFyaW8oKSB7XHJcbiAgICAgICAgbGV0IGlkVXNlciA9IGdldFN0cmluZyhcImlkTG9naW5cIik7XHJcbiAgICAgICAgdGhpcy5fc2VydmljZUZpcmViYXNlLmNvbnN1bHRhckRhdG9zVXN1YXJpbyhpZFVzZXIpLnRoZW4ocmVzcG9uc2UgPT57XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlLnZhbHVlKSk7XHJcblx0XHRcdHRoaXMuX25hbWVVc2VyID1yZXNwb25zZS52YWx1ZVtpZFVzZXJdLm5vbWJyZTtcclxuXHRcdFx0dGhpcy5fbmFtZVZldHMgPSByZXNwb25zZS52YWx1ZVtpZFVzZXJdLmNvcnJlbztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiJdfQ==