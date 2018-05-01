import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { SharedModule } from "../../shared/shared.module";
import { AddVetsRoutingModule } from "./add-vets-routing.module";
import { AddVetsComponent } from "./add-vets.component";

import { NativeScriptAnimationsModule } from "nativescript-angular/animations";

import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        AddVetsRoutingModule,
        SharedModule,
        NativeScriptAnimationsModule,
        NativeScriptFormsModule,
        TNSCheckBoxModule
    ],
    declarations: [
        AddVetsComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AddVetsModule { }
