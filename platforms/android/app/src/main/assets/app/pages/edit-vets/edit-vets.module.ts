import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { SharedModule } from "../../shared/shared.module";
import { EditVetsRoutingModule  } from "./edit-vets-routing.module";
import { EditVetsComponent } from "./edit-vets.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        EditVetsRoutingModule,
        SharedModule,
        NativeScriptFormsModule
    ],
    declarations: [
        EditVetsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class EditVetsModule { }
