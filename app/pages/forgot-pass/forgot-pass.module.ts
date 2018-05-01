import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { SharedModule } from "../../shared/shared.module";
import { ForgotPassRoutingModule } from "./forgot-pass-routing.module";
import { ForgotPassComponent } from "./forgot-pass.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ForgotPassRoutingModule,
        SharedModule,
        NativeScriptFormsModule
    ],
    declarations: [
        ForgotPassComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ForgotPassModule { }
