"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var _firebase = require("nativescript-plugin-firebase");
var application_settings_1 = require("tns-core-modules/application-settings/application-settings");
var settings = require("tns-core-modules/application-settings/application-settings");
var router_1 = require("nativescript-angular/router");
var AppComponent = /** @class */ (function () {
    function AppComponent(_routEx) {
        this._routEx = _routEx;
    }
    AppComponent.prototype.ngOnInit = function () {
        _firebase.init({}).then(function (instance) {
            console.log("firebase.init done");
            //alert("firebase.init done"+instance)
        }, function (error) {
            console.log("firebase.init error: " + error);
            //alert("firebase.init error: " + error)
        });
        var dato = application_settings_1.getString('login');
        var idUser = application_settings_1.getString('idLogin');
        //let tuto = getString("verTuto");
        //let tipo = getString("tipoRegistro");
        if (dato === "true") {
            settings.clear();
            application_settings_1.setString('login', 'true');
            application_settings_1.setString('idLogin', idUser);
            //setString("verTuto",tuto);
            //setString("tipoRegistro",tipo);
            this._routEx.navigate(['home'], { clearHistory: true,
                transition: {
                    name: "slide",
                    duration: 400,
                    curve: "ease"
                }
            });
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "ns-app",
            templateUrl: "app.component.html"
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsd0RBQTJEO0FBQzNELG1HQUFrRztBQUNsRyxxRkFBdUY7QUFDdkYsc0RBQStEO0FBTS9EO0lBRUMsc0JBQW9CLE9BQXdCO1FBQXhCLFlBQU8sR0FBUCxPQUFPLENBQWlCO0lBRTVDLENBQUM7SUFFRSwrQkFBUSxHQUFSO1FBQ0ksU0FBUyxDQUFDLElBQUksQ0FBQyxFQUdwQixDQUFDLENBQUMsSUFBSSxDQUNOLFVBQUMsUUFBUTtZQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUNsQyxzQ0FBc0M7UUFDdkMsQ0FBQyxFQUNELFVBQUMsS0FBSztZQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEdBQUcsS0FBSyxDQUFDLENBQUM7WUFDN0Msd0NBQXdDO1FBQ3pDLENBQUMsQ0FDRCxDQUFDO1FBRUYsSUFBSSxJQUFJLEdBQUcsZ0NBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QixJQUFJLE1BQU0sR0FBRyxnQ0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xDLGtDQUFrQztRQUNsQyx1Q0FBdUM7UUFDdkMsRUFBRSxDQUFBLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxDQUFBLENBQUM7WUFDbkIsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2pCLGdDQUFTLENBQUMsT0FBTyxFQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFCLGdDQUFTLENBQUMsU0FBUyxFQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVCLDRCQUE0QjtZQUM1QixpQ0FBaUM7WUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFDLFlBQVksRUFBQyxJQUFJO2dCQUNqRCxVQUFVLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLE9BQU87b0JBQ2IsUUFBUSxFQUFFLEdBQUc7b0JBQ2IsS0FBSyxFQUFFLE1BQU07aUJBQ2I7YUFDRCxDQUFDLENBQUM7UUFDSixDQUFDO0lBQ0MsQ0FBQztJQXZDUSxZQUFZO1FBSnhCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsUUFBUTtZQUNsQixXQUFXLEVBQUUsb0JBQW9CO1NBQ3BDLENBQUM7eUNBRzJCLHlCQUFnQjtPQUZoQyxZQUFZLENBd0N2QjtJQUFELG1CQUFDO0NBQUEsQUF4Q0YsSUF3Q0U7QUF4Q1csb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCBfZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcclxuaW1wb3J0IHsgZ2V0U3RyaW5nLCBzZXRTdHJpbmcgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5ncy9hcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgKiBhcyBzZXR0aW5ncyBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5ncy9hcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1hcHBcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcImFwcC5jb21wb25lbnQuaHRtbFwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cdFxyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgX3JvdXRFeDpSb3V0ZXJFeHRlbnNpb25zKXtcclxuXHJcblx0fVxyXG5cclxuICAgIG5nT25Jbml0KCl7XHJcbiAgICAgICAgX2ZpcmViYXNlLmluaXQoe1xyXG5cdFx0XHQvLyBPcHRpb25hbGx5IHBhc3MgaW4gcHJvcGVydGllcyBmb3IgZGF0YWJhc2UsIGF1dGhlbnRpY2F0aW9uIGFuZCBjbG91ZCBtZXNzYWdpbmcsXHJcblx0XHRcdC8vIHNlZSB0aGVpciByZXNwZWN0aXZlIGRvY3MuXHJcblx0XHR9KS50aGVuKFxyXG5cdFx0XHQoaW5zdGFuY2UpID0+IHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcImZpcmViYXNlLmluaXQgZG9uZVwiKTtcclxuXHRcdFx0XHQvL2FsZXJ0KFwiZmlyZWJhc2UuaW5pdCBkb25lXCIraW5zdGFuY2UpXHJcblx0XHRcdH0sXHJcblx0XHRcdChlcnJvcikgPT4ge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiZmlyZWJhc2UuaW5pdCBlcnJvcjogXCIgKyBlcnJvcik7XHJcblx0XHRcdFx0Ly9hbGVydChcImZpcmViYXNlLmluaXQgZXJyb3I6IFwiICsgZXJyb3IpXHJcblx0XHRcdH1cclxuXHRcdCk7XHJcblxyXG5cdFx0bGV0IGRhdG8gPSBnZXRTdHJpbmcoJ2xvZ2luJyk7XHJcblx0XHRsZXQgaWRVc2VyID0gZ2V0U3RyaW5nKCdpZExvZ2luJyk7XHJcblx0XHQvL2xldCB0dXRvID0gZ2V0U3RyaW5nKFwidmVyVHV0b1wiKTtcclxuXHRcdC8vbGV0IHRpcG8gPSBnZXRTdHJpbmcoXCJ0aXBvUmVnaXN0cm9cIik7XHJcblx0XHRpZihkYXRvID09PSBcInRydWVcIil7XHJcblx0XHRcdHNldHRpbmdzLmNsZWFyKCk7XHJcblx0XHRcdHNldFN0cmluZygnbG9naW4nLCd0cnVlJyk7XHJcblx0XHRcdHNldFN0cmluZygnaWRMb2dpbicsaWRVc2VyKTtcclxuXHRcdFx0Ly9zZXRTdHJpbmcoXCJ2ZXJUdXRvXCIsdHV0byk7XHJcblx0XHRcdC8vc2V0U3RyaW5nKFwidGlwb1JlZ2lzdHJvXCIsdGlwbyk7XHJcblx0XHRcdHRoaXMuX3JvdXRFeC5uYXZpZ2F0ZShbJ2hvbWUnXSwge2NsZWFySGlzdG9yeTp0cnVlLFxyXG5cdFx0XHRcdHRyYW5zaXRpb246IHtcclxuXHRcdFx0XHRcdG5hbWU6IFwic2xpZGVcIixcclxuXHRcdFx0XHRcdGR1cmF0aW9uOiA0MDAsXHJcblx0XHRcdFx0XHRjdXJ2ZTogXCJlYXNlXCJcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG4gICAgfVxyXG4gfVxyXG4iXX0=