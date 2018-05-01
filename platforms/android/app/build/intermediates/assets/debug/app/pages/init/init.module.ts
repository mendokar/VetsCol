import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SharedModule } from "../../shared/shared.module";
import { InitRoutingModule } from "./init-routing.module";
import { InitComponent } from "./init.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        InitRoutingModule,
        SharedModule
    ],
    declarations: [
        InitComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class InitModule { }
