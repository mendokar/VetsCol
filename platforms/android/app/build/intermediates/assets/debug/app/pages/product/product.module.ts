import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { SharedModule } from "../../shared/shared.module";
import { ProductRoutingModule } from "./product-routing.module";
import { ProductComponent } from "./product.component";

import { NativeScriptAnimationsModule } from "nativescript-angular/animations";

import { AddProductModal } from "./add-product/add-product.modal";

import { registerElement } from 'nativescript-angular/element-registry'; registerElement('ImageCacheIt', () => require('nativescript-image-cache-it').ImageCacheIt);

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ProductRoutingModule,
        SharedModule,
        NativeScriptAnimationsModule
    ],
    declarations: [
        ProductComponent,
        AddProductModal
    ],
    entryComponents:[AddProductModal],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ProductModule { }
