import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ForgotPassComponent } from "./forgot-pass.component";

const routes: Routes = [
    { path: "", component: ForgotPassComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ForgotPassRoutingModule { }
