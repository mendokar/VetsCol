"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var sidedrawer_1 = require("nativescript-pro-ui/sidedrawer");
var angular_1 = require("nativescript-pro-ui/sidedrawer/angular");
var router_1 = require("nativescript-angular/router");
var application_settings_1 = require("tns-core-modules/application-settings/application-settings");
var utils = require("utils/utils");
var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(_routEx) {
        this._routEx = _routEx;
    }
    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    SettingsComponent.prototype.ngOnInit = function () {
        this._sideDrawerTransition = new sidedrawer_1.SlideInOnTopTransition();
    };
    Object.defineProperty(SettingsComponent.prototype, "sideDrawerTransition", {
        get: function () {
            return this._sideDrawerTransition;
        },
        enumerable: true,
        configurable: true
    });
    /* ***********************************************************
    * According to guidelines, if you have a drawer on your page, you should always
    * have a button that opens it. Use the showDrawer() function to open the app drawer section.
    *************************************************************/
    SettingsComponent.prototype.onDrawerButtonTap = function () {
        this.drawerComponent.sideDrawer.showDrawer();
    };
    /**
     * profile
     */
    SettingsComponent.prototype.profile = function () {
        this._routEx.navigate(['profile'], {
            transition: {
                name: "slide",
                duration: 400,
                curve: "ease"
            }
        });
    };
    /**
     * viewAllPage
     */
    SettingsComponent.prototype.viewAllPage = function (page) {
        application_settings_1.setString("page", '' + page);
        this._routEx.navigate(['all-page'], {
            transition: {
                name: "slide",
                duration: 400,
                curve: "ease"
            }
        });
    };
    /**
     * vireTerms
     */
    SettingsComponent.prototype.viewTerms = function () {
        utils.openUrl("http://vetscol.com/index.php/sobre-vetscol/");
    };
    __decorate([
        core_1.ViewChild("drawer"),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], SettingsComponent.prototype, "drawerComponent", void 0);
    SettingsComponent = __decorate([
        core_1.Component({
            selector: "Settings",
            moduleId: module.id,
            templateUrl: "./settings.component.html",
            styleUrls: ["./settings.component.scss"]
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions])
    ], SettingsComponent);
    return SettingsComponent;
}());
exports.SettingsComponent = SettingsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2V0dGluZ3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTZEO0FBQzdELDZEQUE4RjtBQUM5RixrRUFBZ0Y7QUFDaEYsc0RBQStEO0FBQy9ELG1HQUF1RjtBQUN2RixtQ0FBcUM7QUFRckM7SUE0QkksMkJBQW9CLE9BQXdCO1FBQXhCLFlBQU8sR0FBUCxPQUFPLENBQWlCO0lBRTVDLENBQUM7SUFyQkQ7O2tFQUU4RDtJQUM5RCxvQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksbUNBQXNCLEVBQUUsQ0FBQztJQUM5RCxDQUFDO0lBRUQsc0JBQUksbURBQW9CO2FBQXhCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztRQUN0QyxDQUFDOzs7T0FBQTtJQUVEOzs7a0VBRzhEO0lBQzlELDZDQUFpQixHQUFqQjtRQUNJLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pELENBQUM7SUFNRDs7T0FFRztJQUNJLG1DQUFPLEdBQWQ7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFDO1lBQzlCLFVBQVUsRUFBQztnQkFDUCxJQUFJLEVBQUMsT0FBTztnQkFDWixRQUFRLEVBQUMsR0FBRztnQkFDWixLQUFLLEVBQUMsTUFBTTthQUNmO1NBQ0osQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUdEOztPQUVHO0lBQ0ksdUNBQVcsR0FBbEIsVUFBbUIsSUFBSTtRQUNuQixnQ0FBUyxDQUFDLE1BQU0sRUFBQyxFQUFFLEdBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBQztZQUMvQixVQUFVLEVBQUM7Z0JBQ1AsSUFBSSxFQUFDLE9BQU87Z0JBQ1osUUFBUSxFQUFDLEdBQUc7Z0JBQ1osS0FBSyxFQUFDLE1BQU07YUFDZjtTQUNKLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRDs7T0FFRztJQUNJLHFDQUFTLEdBQWhCO1FBRUksS0FBSyxDQUFDLE9BQU8sQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFBO0lBQ2hFLENBQUM7SUE3RG9CO1FBQXBCLGdCQUFTLENBQUMsUUFBUSxDQUFDO2tDQUFrQixnQ0FBc0I7OERBQUM7SUFMcEQsaUJBQWlCO1FBTjdCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsVUFBVTtZQUNwQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDJCQUEyQjtZQUN4QyxTQUFTLEVBQUMsQ0FBQywyQkFBMkIsQ0FBQztTQUMxQyxDQUFDO3lDQTZCOEIseUJBQWdCO09BNUJuQyxpQkFBaUIsQ0FtRTdCO0lBQUQsd0JBQUM7Q0FBQSxBQW5FRCxJQW1FQztBQW5FWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgRHJhd2VyVHJhbnNpdGlvbkJhc2UsIFNsaWRlSW5PblRvcFRyYW5zaXRpb24gfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9zaWRlZHJhd2VyXCI7XHJcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgc2V0U3RyaW5nIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24tc2V0dGluZ3MvYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSBcInV0aWxzL3V0aWxzXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIlNldHRpbmdzXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9zZXR0aW5ncy5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOltcIi4vc2V0dGluZ3MuY29tcG9uZW50LnNjc3NcIl1cclxufSlcclxuZXhwb3J0IGNsYXNzIFNldHRpbmdzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAqIFVzZSB0aGUgQFZpZXdDaGlsZCBkZWNvcmF0b3IgdG8gZ2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBkcmF3ZXIgY29tcG9uZW50LlxyXG4gICAgKiBJdCBpcyB1c2VkIGluIHRoZSBcIm9uRHJhd2VyQnV0dG9uVGFwXCIgZnVuY3Rpb24gYmVsb3cgdG8gbWFuaXB1bGF0ZSB0aGUgZHJhd2VyLlxyXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIEBWaWV3Q2hpbGQoXCJkcmF3ZXJcIikgZHJhd2VyQ29tcG9uZW50OiBSYWRTaWRlRHJhd2VyQ29tcG9uZW50O1xyXG5cclxuICAgIHByaXZhdGUgX3NpZGVEcmF3ZXJUcmFuc2l0aW9uOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZTtcclxuXHJcbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgKiBVc2UgdGhlIHNpZGVEcmF3ZXJUcmFuc2l0aW9uIHByb3BlcnR5IHRvIGNoYW5nZSB0aGUgb3Blbi9jbG9zZSBhbmltYXRpb24gb2YgdGhlIGRyYXdlci5cclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbiA9IG5ldyBTbGlkZUluT25Ub3BUcmFuc2l0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNpZGVEcmF3ZXJUcmFuc2l0aW9uKCk6IERyYXdlclRyYW5zaXRpb25CYXNlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICogQWNjb3JkaW5nIHRvIGd1aWRlbGluZXMsIGlmIHlvdSBoYXZlIGEgZHJhd2VyIG9uIHlvdXIgcGFnZSwgeW91IHNob3VsZCBhbHdheXNcclxuICAgICogaGF2ZSBhIGJ1dHRvbiB0aGF0IG9wZW5zIGl0LiBVc2UgdGhlIHNob3dEcmF3ZXIoKSBmdW5jdGlvbiB0byBvcGVuIHRoZSBhcHAgZHJhd2VyIHNlY3Rpb24uXHJcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgb25EcmF3ZXJCdXR0b25UYXAoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm91dEV4OlJvdXRlckV4dGVuc2lvbnMpe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcHJvZmlsZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcHJvZmlsZSgpIHtcclxuICAgICAgICB0aGlzLl9yb3V0RXgubmF2aWdhdGUoWydwcm9maWxlJ10se1xyXG4gICAgICAgICAgICB0cmFuc2l0aW9uOntcclxuICAgICAgICAgICAgICAgIG5hbWU6XCJzbGlkZVwiLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246NDAwLFxyXG4gICAgICAgICAgICAgICAgY3VydmU6XCJlYXNlXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdmlld0FsbFBhZ2VcclxuICAgICAqL1xyXG4gICAgcHVibGljIHZpZXdBbGxQYWdlKHBhZ2UpIHtcclxuICAgICAgICBzZXRTdHJpbmcoXCJwYWdlXCIsJycrcGFnZSk7XHJcbiAgICAgICAgdGhpcy5fcm91dEV4Lm5hdmlnYXRlKFsnYWxsLXBhZ2UnXSx7XHJcbiAgICAgICAgICAgIHRyYW5zaXRpb246e1xyXG4gICAgICAgICAgICAgICAgbmFtZTpcInNsaWRlXCIsXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbjo0MDAsXHJcbiAgICAgICAgICAgICAgICBjdXJ2ZTpcImVhc2VcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHZpcmVUZXJtc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdmlld1Rlcm1zKCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHV0aWxzLm9wZW5VcmwoXCJodHRwOi8vdmV0c2NvbC5jb20vaW5kZXgucGhwL3NvYnJlLXZldHNjb2wvXCIpXHJcbiAgICB9XHJcbn1cclxuIl19