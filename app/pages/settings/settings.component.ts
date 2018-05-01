import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { RouterExtensions } from "nativescript-angular/router";
import { setString } from "tns-core-modules/application-settings/application-settings";
import * as utils from "utils/utils";

@Component({
    selector: "Settings",
    moduleId: module.id,
    templateUrl: "./settings.component.html",
    styleUrls:["./settings.component.scss"]
})
export class SettingsComponent implements OnInit {
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    /* ***********************************************************
    * According to guidelines, if you have a drawer on your page, you should always
    * have a button that opens it. Use the showDrawer() function to open the app drawer section.
    *************************************************************/
    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }

    constructor(private _routEx:RouterExtensions){
        
    }

    /**
     * profile
     */
    public profile() {
        this._routEx.navigate(['profile'],{
            transition:{
                name:"slide",
                duration:400,
                curve:"ease"
            }
        })
    }


    /**
     * viewAllPage
     */
    public viewAllPage(page) {
        setString("page",''+page);
        this._routEx.navigate(['all-page'],{
            transition:{
                name:"slide",
                duration:400,
                curve:"ease"
            }
        })
    }

    /**
     * vireTerms
     */
    public viewTerms() {
        
        utils.openUrl("http://vetscol.com/index.php/sobre-vetscol/")
    }
}
