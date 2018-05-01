import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptAnimationsModule } from "nativescript-angular/animations";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { SharedModule } from "../../shared/shared.module";
import { AllPageRoutingModule } from "./all-page-routing.module";
import { AllPageComponent } from "./all-page.component";


@NgModule({
    imports: [
        NativeScriptCommonModule,
        AllPageRoutingModule,
        SharedModule,
        NativeScriptAnimationsModule,
        NativeScriptFormsModule
    ],
    declarations: [
        AllPageComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AllVetsModule { }
