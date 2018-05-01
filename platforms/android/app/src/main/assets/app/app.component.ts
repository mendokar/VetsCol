import { Component, OnInit } from "@angular/core";
import _firebase = require("nativescript-plugin-firebase");
import { getString, setString } from "tns-core-modules/application-settings/application-settings";
import * as settings from "tns-core-modules/application-settings/application-settings";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
	
	constructor(private _routEx:RouterExtensions){

	}

    ngOnInit(){
        _firebase.init({
			// Optionally pass in properties for database, authentication and cloud messaging,
			// see their respective docs.
		}).then(
			(instance) => {
				console.log("firebase.init done");
				//alert("firebase.init done"+instance)
			},
			(error) => {
				console.log("firebase.init error: " + error);
				//alert("firebase.init error: " + error)
			}
		);

		let dato = getString('login');
		let idUser = getString('idLogin');
		//let tuto = getString("verTuto");
		//let tipo = getString("tipoRegistro");
		if(dato === "true"){
			settings.clear();
			setString('login','true');
			setString('idLogin',idUser);
			//setString("verTuto",tuto);
			//setString("tipoRegistro",tipo);
			this._routEx.navigate(['home'], {clearHistory:true,
				transition: {
					name: "slide",
					duration: 400,
					curve: "ease"
				}
			});
		}
    }
 }
