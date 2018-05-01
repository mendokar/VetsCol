import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SharedModule } from "../../shared/shared.module";
import { PromotionsRoutingModule } from "./promotions-routing.module";
import { PromotionsComponent } from "./promotions.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        PromotionsRoutingModule,
        SharedModule
    ],
    declarations: [
        PromotionsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class PromotionsModule { }
