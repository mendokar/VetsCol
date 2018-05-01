import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptAnimationsModule } from "nativescript-angular/animations";

import { SharedModule } from "../../shared/shared.module";
import { CreateVetsRoutingModule } from "./create-vets-routing.module";
import { CreateVetsComponent } from "./create-vets.component";


@NgModule({
    imports: [
        NativeScriptCommonModule,
        CreateVetsRoutingModule,
        SharedModule,
        NativeScriptAnimationsModule
    ],
    declarations: [
        CreateVetsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CreateVetsModule { }
