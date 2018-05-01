import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptAnimationsModule } from "nativescript-angular/animations";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { SharedModule } from "../../shared/shared.module";
import { CommentsRoutingModule } from "./comments-routing.module";
import { CommentsComponent } from "./comments.component";


@NgModule({
    imports: [
        NativeScriptCommonModule,
        CommentsRoutingModule,
        SharedModule,
        NativeScriptAnimationsModule,
        NativeScriptFormsModule
    ],
    declarations: [
        CommentsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CommentsModule { }
