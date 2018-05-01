import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptAnimationsModule } from "nativescript-angular/animations";
import { NativeScriptFormsModule } from "nativescript-angular/forms";


import { SharedModule } from "../../shared/shared.module";
import { SearchRoutingModule } from "./search-routing.module";
import { SearchComponent } from "./search.component";

import { AddServiceModal } from "./add-service/add-service.modal";


@NgModule({
    imports: [
        NativeScriptCommonModule,
        SearchRoutingModule,
        SharedModule,
        NativeScriptAnimationsModule,
        NativeScriptFormsModule
    ],
    declarations: [
        SearchComponent,
        AddServiceModal
    ],
    entryComponents:[AddServiceModal],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SearchModule { }
