import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { SharedModule } from "../../shared/shared.module";
import { AddProductsRoutingModule } from "./add-products-routing.module";
import { AddProductsComponent } from "./add-products.component";

import { NativeScriptAnimationsModule } from "nativescript-angular/animations";


@NgModule({
    imports: [
        NativeScriptCommonModule,
        AddProductsRoutingModule,
        SharedModule,
        NativeScriptFormsModule
    ],
    declarations: [
        AddProductsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AddProductsModule { }

