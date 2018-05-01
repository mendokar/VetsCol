import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/init", pathMatch: "full" },
    { path: "home", loadChildren: "./pages/home/home.module#HomeModule" },
    { path: "create-vets", loadChildren: "./pages/create-vets/create-vets.module#CreateVetsModule" },
    { path: "search", loadChildren: "./pages/search/search.module#SearchModule" },
    { path: "product", loadChildren: "./pages/product/product.module#ProductModule" },
    { path: "settings", loadChildren: "./pages/settings/settings.module#SettingsModule" },
    { path: "init", loadChildren: "./pages/init/init.module#InitModule" },
    { path: "login", loadChildren: "./pages/login/login.module#LoginModule" },
    { path: "register", loadChildren: "./pages/register/register.module#RegisterModule" },
    { path: "promotions", loadChildren:"./pages/promotions/promotions.module#PromotionsModule"},
    { path: "users", loadChildren:"./pages/users/users.module#UsersModule"},
    { path: "forgot-pass", loadChildren:"./pages/forgot-pass/forgot-pass.module#ForgotPassModule"},
    { path: "add-products", loadChildren:"./pages/add-products/add-products.module#AddProductsModule"},
    { path: "add-services", loadChildren:"./pages/add-services/add-services.module#AddServicesModule"},
    { path: "profile", loadChildren:"./pages/profile/profile.module#ProfileModule"},
    { path: "add-promotions", loadChildren:"./pages/add-promotions/add-promotions.module#AddPromotionsModule"},
    { path: "add-vets", loadChildren:"./pages/add-vets/add-vets.module#AddVetsModule"},
    { path: "all-page", loadChildren:"./pages/all-page/all-page.module#AllVetsModule"},
    { path: "edit-vets", loadChildren:"./pages/edit-vets/edit-vets.module#EditVetsModule"},
    { path: "advices", loadChildren:"./pages/advices/advices.module#AdvicesModule"},
    { path: "comments", loadChildren:"./pages/comments/comments.module#CommentsModule"}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
