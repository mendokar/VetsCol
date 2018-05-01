import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SharedModule } from "../../shared/shared.module";
import { UsersRoutingModule } from "./users-routing.module";
import { UsersComponent } from "./users.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        UsersRoutingModule,
        SharedModule
    ],
    declarations: [
        UsersComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class UsersModule { }
