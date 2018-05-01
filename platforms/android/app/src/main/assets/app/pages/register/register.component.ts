import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { DatosUsuario } from '../../modal/usuario.modal';
import { GlobalComponent } from '../../consts/global.model';
import { ServiceFirebase } from '../../services/firebase.service';
import { setString } from 'tns-core-modules/application-settings/application-settings';
import { RouterExtensions } from 'nativescript-angular/router';
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'register',
	templateUrl: './pages/register/register.component.html',
	styleUrls: ['./pages/register/register.component.scss']
})

export class RegisterComponent implements OnInit {

	_serviceFirebase: ServiceFirebase;
	_globalComponent: GlobalComponent;
	_datosUsuario: DatosUsuario;
	constructor(private _page: Page, private _routEx: RouterExtensions) {
		this._page.actionBarHidden = true;
		this._datosUsuario = new DatosUsuario();
		this._globalComponent = new GlobalComponent();
		this._serviceFirebase = new ServiceFirebase();
	}

	ngOnInit() { }


	/**
	 * nuevoRegistro
	 * Funcion que permite crear el Registro de un nuevo usuario en la aplicacion
	 */
	public nuevoRegistro() {
		this._globalComponent.loadingView();
		this._datosUsuario._nombre = this._globalComponent.MayusPrimera(this._datosUsuario._nombre);
		console.log(this._datosUsuario._nombre);
		if (this._globalComponent.validarEmail(this._datosUsuario._correo) !== false) {
		if (this._datosUsuario._nombre !== "" && this._datosUsuario._nombre !== undefined) {
			if (this._datosUsuario._correo !== "" && this._datosUsuario._correo !== undefined) {

				if (this._datosUsuario._celular !== "" && this._datosUsuario._celular !== undefined) {
					//if (this._confirmarView === true) {
					if (this._datosUsuario._clave !== "" && this._datosUsuario._clave !== undefined) {

						console.log(" se envian datos para guardar ");
						this.crearUsuario();
						//this.mostrarTipoRegistro();

					} else {
						this._globalComponent.loadingHide();
						this._globalComponent.validarCampo("contraseña");
					}
					/*} else {
						console.log(" se envian datos para modificar ");
						this.modificarUsuarioDatos();
					}*/
				} else {
					this._globalComponent.loadingHide();
					this._globalComponent.validarCampo("celular");
				}
			} else {
				this._globalComponent.loadingHide();
				this._globalComponent.validarCampo("correo");
			}
		} else {
			this._globalComponent.loadingHide();
			this._globalComponent.validarCampo("nombre");
		}
	}else{
		this._globalComponent.loadingHide();
			this._globalComponent.validarCampo("Por favor revisa el formato del correo.");
	}
	}

	/**
 * crearUsuario
 */
	public crearUsuario() {
		this._serviceFirebase.crearUsuario(this._datosUsuario).then(response => {
			console.log("RESPUESTA DE LA CREACION" + response);
			let data = this._globalComponent.validarErrores(response);
			if (data === false) {
				this.iniciarSesion();
			}
		});
	}

	public iniciarSesion() {
		this._serviceFirebase.iniciarSesion(this._datosUsuario).then(response => {
			console.log("RESPUESTA DEL LOGIN" + response);
			let data = this._globalComponent.validarErrores(response);
			if (data === false) {
				setString('login', 'true');
				setString("idLogin", '' + response);
				this._datosUsuario._id = response;
				console.log("")
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