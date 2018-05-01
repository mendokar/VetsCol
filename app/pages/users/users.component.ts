import { Component, OnInit, ViewChild } from '@angular/core';
import { RadSideDrawerComponent } from 'nativescript-pro-ui/sidedrawer/angular';
import { DrawerTransitionBase, SlideInOnTopTransition } from 'nativescript-pro-ui/sidedrawer';
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'users',
	templateUrl: './pages/users/users.component.html',
	styleUrls: ['./pages/users/users.component.css']
})

export class UsersComponent implements OnInit {

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
}