import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { ServiceFirebase } from '../../services/firebase.service';
import { DatosUsuario } from '../../modal/usuario.modal';
import { GlobalComponent } from '../../consts/global.model';
import { RouterExtensions } from 'nativescript-angular/router';
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'forgot-pass',
	templateUrl: './pages/forgot-pass/forgot-pass.component.html',
	styleUrls: ['./pages/forgot-pass/forgot-pass.component.scss']
})

export class ForgotPassComponent implements OnInit {

	_globalComponent: GlobalComponent;
	_datosUsuario: DatosUsuario;
	_serviceFirebase: ServiceFirebase;
	_mensaje = "Para empezar con el proceso de recuperación de contraseña, ingresa tu correo electrónico.";
	constructor(private _page: Page, private _routEx: RouterExtensions) {
		this._page.actionBarHidden = true;
		this._serviceFirebase = new ServiceFirebase();
		this._datosUsuario = new DatosUsuario();
		this._globalComponent = new GlobalComponent();
	}

	ngOnInit() { }

	/**
	 * validateEmail
	 */
	public validateEmail() {
		console.log("Email searching" + this._datosUsuario._correo)
		if (this._globalComponent.validarEmail(this._datosUsuario._correo) !== false) {
			if (this._datosUsuario._correo !== undefined && this._datosUsuario._correo !== null && this._datosUsuario._correo !== "") {
				this._serviceFirebase.validateEmailForgotPass(this._datosUsuario._correo.trim()).then(response => {
					console.log("Response data of server" + JSON.stringify(response));
					let res = response.value;
					if (res !== null) {
						this._serviceFirebase.olvidoClave(this._datosUsuario._correo).then(response => {
							let mensaje = "Hemos enviado los pasos para continuar, por favor revisa tu bandeja de entrada.";
							this._globalComponent.viewMessage(mensaje);
							this._datosUsuario._correo = "";
							this.getBack();
						});
					} else {
						this._globalComponent.validarCampo("El correo no se encuentra registrado en VetsCol.")
					}
				});
			} else {
				this._globalComponent.validarCampo("correo");
			}
		} else {
			this._globalComponent.loadingHide();
			this._globalComponent.validarCampo("Por favor revisa el formato del correo.");
		}

	}


	/**
	 * forgotPass()
	 */
	public getBack() {
		this._routEx.navigate(["login"], {
			transition: {
				name: "slideRight",
				duration: 400,
				curve: "ease"
			}
		})
	}

}