import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { SharedModule } from "../../shared/shared.module";
import { AddPromotionsRoutingModule } from "./add-promotions-routing.module";
import { AddPromotionsComponent } from "./add-promotions.component";

import { NativeScriptAnimationsModule } from "nativescript-angular/animations";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        AddPromotionsRoutingModule,
        SharedModule,
        NativeScriptAnimationsModule,
        NativeScriptFormsModule
    ],
    declarations: [
        AddPromotionsComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AddPromotionsModule { }
