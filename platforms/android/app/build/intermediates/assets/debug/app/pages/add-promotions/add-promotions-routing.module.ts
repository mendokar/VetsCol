import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { AddPromotionsComponent } from "./add-promotions.component";

const routes: Routes = [
    { path: "", component: AddPromotionsComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class AddPromotionsRoutingModule { }
