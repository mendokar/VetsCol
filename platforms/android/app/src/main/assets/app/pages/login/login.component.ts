import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { RouterExtensions } from 'nativescript-angular/router';
import { ServiceFirebase } from '../../services/firebase.service';
import { GlobalComponent } from '../../consts/global.model';
import { DatosUsuario } from '../../modal/usuario.modal';
import { setString } from 'tns-core-modules/application-settings/application-settings';
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'login',
	templateUrl: './pages/login/login.component.html',
	styleUrls: ['./pages/login/login.component.scss']
})

export class LoginComponent implements OnInit {

	_datosUsuario: DatosUsuario;
	_globalComponent: GlobalComponent;
	_serviceFirebase: ServiceFirebase;
	constructor(private _page: Page, private _routEx: RouterExtensions) {
		this._page.actionBarHidden = true;
		this._serviceFirebase = new ServiceFirebase();
		this._globalComponent = new GlobalComponent();
		this._datosUsuario = new DatosUsuario();
	}

	ngOnInit() { }

	/**
	 * login
	 */
	public login() {
		console.log("COREEO" + this._globalComponent.validarEmail(this._datosUsuario._correo));
		this._globalComponent.loadingView();
		if (this._globalComponent.validarEmail(this._datosUsuario._correo) !== false) {
			if (this._datosUsuario._correo !== undefined && this._datosUsuario._correo !== null && this._datosUsuario._correo !== "") {
				if (this._datosUsuario._clave !== undefined && this._datosUsuario._clave !== null && this._datosUsuario._clave !== "") {
					this._datosUsuario._correo = this._datosUsuario._correo.trim();
					this._datosUsuario._clave = this._datosUsuario._clave.trim();
					this._serviceFirebase.iniciarSesion(this._datosUsuario).then(response => {
						console.log(response);
						let data = this._globalComponent.validarErrores(response);
						if (data === false) {
							setString('login', 'true');
							setString("idLogin", '' + response);
							this._datosUsuario._id = response;
							//this._idUsuario = response;						
							this._routEx.navigate(['home'], {
								clearHistory: true,
								transition: {
									name: "slide",
									duration: 400,
									curve: "ease"
								}
							});
						}
						this._globalComponent.loadingHide();
					});
				} else {
					this._globalComponent.loadingHide();
					this._globalComponent.validarCampo("contraseña");
				}
			} else {
				this._globalComponent.loadingHide();
				this._globalComponent.validarCampo("correo");
			}

		}else{
			this._globalComponent.loadingHide();
				this._globalComponent.validarCampo("Por favor revisa el formato del correo.");
		}



		/*this._routEx.navigate(["home"], {
			clearHistory: true,
			transition: {
				name: "slide",
				duration: 400,
				curve: "ease"
			}
		})*/
	}

	/**
	 * forgotPass()
	 */
	public forgotPass() {
		this._routEx.navigate(["forgot-pass"], {clearHistory:false,
			transition: {
				name: "slide",
				duration: 400,
				curve: "ease"
			}
		})
	}


}