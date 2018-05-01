import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';


import { SwissArmyKnife } from "nativescript-swiss-army-knife/nativescript-swiss-army-knife";
import { RouterExtensions } from 'nativescript-angular/router';
import { ServiceFirebase } from '../../services/firebase.service';
import { GlobalComponent } from '../../consts/global.model';
import { DatosUsuario } from '../../modal/usuario.modal';
import { setString } from 'tns-core-modules/application-settings/application-settings';

@Component({
	selector: 'init',
	templateUrl: './pages/init/init.component.html',
	styleUrls: ["./pages/init/init.component.scss"]
})

export class InitComponent implements OnInit {

	_idUsuario: any;
	_datosUsuario: DatosUsuario;
	_globalComponent: GlobalComponent;
	_serviceFirebase: ServiceFirebase;
	constructor(private _page: Page, private _routEx: RouterExtensions) {
		this._page.actionBarHidden = true;
		SwissArmyKnife.setAndroidStatusBarColor('#ffb732');
		this._serviceFirebase = new ServiceFirebase();
		this._globalComponent = new GlobalComponent();
		this._datosUsuario = new DatosUsuario();
	}

	ngOnInit() { }

	/**
	 * register
	 */
	public register() {
		this._routEx.navigate(['register'], {
			transition: {
				name: "slide",
				duration: 400,
				curve: "ease"
			}
		});
	}

	/**
	 * login
	 */
	public login() {
		this._routEx.navigate(['login'], {
			transition: {
				name: "slide",
				duration: 400,
				curve: "ease"
			}
		});
	}

	/**
	 * loginGoogle
	 */
	public loginGoogle() {
		this._globalComponent.elimiarTemporales();
		this._serviceFirebase.cerrarSesion();
		console.log("ENTRO A LOGIN")
		this._globalComponent.loadingView();
		this._serviceFirebase.iniciarLoginGoogleS().then(result => {
			console.log(result.uid);
			console.log(result.email);
			console.dir(result.name);
			if (result.uid !== null && result.uid !== undefined) {
				this._datosUsuario._id = result.uid;
				this._datosUsuario._nombre = result.name;
				this._datosUsuario._correo = result.email;
				this._idUsuario = result.uid;

				setString('login', 'true');
				setString("idLogin", '' + result.uid);

				this.consultarDatosUsuario();
				//this.mostrarTipoRegistro();
				//this.consultaSiExisteRegistrado();
			} else {
				this._globalComponent.loadingHide();
			}


		}).catch((message: any) => {
			console.log("Error al inicio se sesion" + message);
			this._globalComponent.loadingHide();
		});
	}


	/**
	 * consultarDatosUsuario
	 */
	public consultarDatosUsuario() {
		this._serviceFirebase.consultarDatosUsuario(this._idUsuario).then(response => {
			console.log(JSON.stringify(response.value));
			if (response.value !== null) {
				let res = response.value[this._idUsuario];
				console.log(JSON.stringify(res));

				if (res !== undefined || res !== null) {
					this._routEx.navigate(['home'], {
						clearHistory: true,
						transition: {
							name: "fade",
							duration: 400,
							curve: "ease"
						}
					});
				} else {
					this.crearUsuarioDatos();

					this._routEx.navigate(['home'], {
						clearHistory: true,
						transition: {
							name: "fade",
							duration: 400,
							curve: "ease"
						}
					});
				}

				this._globalComponent.loadingHide();

			} else {
				this.crearUsuarioDatos();

				this._routEx.navigate(['home'], {
					clearHistory: true,
					transition: {
						name: "fade",
						duration: 400,
						curve: "ease"
					}
				});
			}
		});


		this._globalComponent.loadingHide();
	}

	/**
	* crearUsuarioDatos
	* Esta funcion permite crear los datos del usuario en la base de datos
	*/
	public crearUsuarioDatos() {
		this._serviceFirebase.crearDatosUsuario(this._datosUsuario).then(response => {
			console.log("RESPUESTA AL CREAR" + response);
		});
	}
}