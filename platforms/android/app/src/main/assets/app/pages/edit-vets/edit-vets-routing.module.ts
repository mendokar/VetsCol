import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { EditVetsComponent } from "./edit-vets.component";

const routes: Routes = [
    { path: "", component: EditVetsComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class EditVetsRoutingModule { }
