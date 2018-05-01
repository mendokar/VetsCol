import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { SharedModule } from "../../shared/shared.module";
import { AddServicesRoutingModule } from "./add-services-routing.module";
import { AddServicesComponent } from "./add-services.component";

import { NativeScriptAnimationsModule } from "nativescript-angular/animations";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        AddServicesRoutingModule,
        SharedModule,
        NativeScriptAnimationsModule,
        NativeScriptFormsModule
    ],
    declarations: [
        AddServicesComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AddServicesModule { }
