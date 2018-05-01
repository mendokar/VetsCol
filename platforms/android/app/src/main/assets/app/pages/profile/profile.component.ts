import { Component, OnInit } from '@angular/core';
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';

import * as dialogs from "ui/dialogs";
import { GlobalComponent } from '../../consts/global.model';
import { ServiceFirebase } from '../../services/firebase.service';
import { RouterExtensions } from 'nativescript-angular/router';
import { getString } from 'tns-core-modules/application-settings/application-settings';
import { DatosUsuario } from '../../modal/usuario.modal';

@Component({
	selector: 'profile',
	templateUrl: './pages/profile/profile.component.html',
	styleUrls: ['./pages/profile/profile.component.css'],
	providers: [ServiceFirebase]
})

export class ProfileComponent implements OnInit {

	_celular: any;
	_correo: any;
	_nombre: any;
	_datosUsuario: DatosUsuario;
	_viewUpdate = false;
	_editar = false;
	_serviceFirebase: ServiceFirebase;
	_globalComponent: GlobalComponent;
	constructor(private _routEx: RouterExtensions) {
		this._globalComponent = new GlobalComponent();
		this._serviceFirebase = new ServiceFirebase();
		this._datosUsuario = new DatosUsuario();
	}

	ngOnInit() {
		this.getDataUser();
		}

	/**
	 * cerrarSesion
	 */
	public cerrarSesion() {
		dialogs.confirm({
			title: "Uppsss!",
			message: "¿Realmente deseas cerrar Sesión?",
			okButtonText: "NO",
			cancelButtonText: "Cancelar",
			neutralButtonText: "SI"
		}).then(result => {
			// result argument is boolean

			console.log("Dialog result: " + result);
			if (result === undefined) {
				this._globalComponent.loadingView();
				this._globalComponent.elimiarTemporales();
				this._serviceFirebase.cerrarSesion();
				this._routEx.navigate([''], {
					clearHistory: true,
					transition: {
						name: "fade",
						duration: 400,
						curve: "ease"
					}
				})

				this._globalComponent.loadingHide();
			} else {
				this._globalComponent.loadingHide();
			}
		});

	}

	/**
	 * getBack
	 */
	public getBack() {
		this._routEx.back();
	}

	/**
	 * habilitarDato
	 */
	public _editarDatos() {
		if (this._editar === false) {
			this._editar = true;
			this._viewUpdate = true;
		} else {
			this._editar = false;
			this._viewUpdate = false;
		}

	}

	/**
	 * getDataUser
	 */
	public getDataUser() {
		let idUser =getString("idLogin");
		this._serviceFirebase.consultarDatosUsuario(idUser).then(response =>{
			console.log(JSON.stringify(response.value));
			this._nombre =response.value[idUser].nombre;
			this._correo = response.value[idUser].correo;
			this._celular = response.value[idUser].celular;
			this._datosUsuario._fecha_creacion = response.value[idUser].fecha_creacion;
		});
	}

	/**
	 * updateData
	 */
	public updateData() {
		console.log(this._datosUsuario._nombre);
		this._datosUsuario._id =getString("idLogin");
		this._serviceFirebase.modificarDatosUsuario(this._datosUsuario).then(response =>{
			console.log(response);
			this._editar = false;
			this._viewUpdate = false;
		});
	}
}