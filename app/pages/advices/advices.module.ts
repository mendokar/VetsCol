import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptAnimationsModule } from "nativescript-angular/animations";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { SharedModule } from "../../shared/shared.module";
import { AdvicesRoutingModule } from "./advices-routing.module";
import { AdvicesComponent } from "./advices.component";


@NgModule({
    imports: [
        NativeScriptCommonModule,
        AdvicesRoutingModule,
        SharedModule,
        NativeScriptAnimationsModule,
        NativeScriptFormsModule
    ],
    declarations: [
        AdvicesComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AdvicesModule { }
