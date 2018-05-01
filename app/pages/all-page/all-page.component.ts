import { Component, OnInit } from '@angular/core';
import { getString } from 'tns-core-modules/application-settings/application-settings';
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';

import * as utils from "utils/utils";
import { RouterExtensions } from 'nativescript-angular/router';
import { OpinionsModal } from '../../modal/opinions.modal';
import { ServiceFirebase } from '../../services/firebase.service';
import { GlobalComponent } from '../../consts/global.model';


@Component({
	selector: 'all-page',
	templateUrl: './pages/all-page/all-page.component.html',
	styleUrls: ['./pages/all-page/all-page.component.css']
})

export class AllPageComponent implements OnInit {

	idOpinion: number;
	_serviceFirebase: ServiceFirebase;
	_dataOpinions: OpinionsModal;
	_globalComponent: GlobalComponent;
	_title: string;
	_viewHelp = false;
	_viewBuguet = false;
	_viewVets = false;
	_viewTerms = false;

	constructor(private _routEx: RouterExtensions) {
		this._dataOpinions = new OpinionsModal();
		this._serviceFirebase = new ServiceFirebase();
		this._globalComponent = new GlobalComponent();
	}

	ngOnInit() {
		this.validatePage();
	}

	public validatePage() {
		let page = getString("page");

		if (page === "ayuda") {
			this._viewHelp = true;
			this._title = "Ayuda";
		}

		if (page === "facturacion") {
			this._viewBuguet = true;
			this._title = "Facturación";
		}

		if (page === "acerca") {
			this._viewVets = true;
			this._title = "Acerca De";
		}

		if (page === "terminos") {
			this._viewTerms = true;
			this._title = "Terminos";
		}

	}

	/**
	 * getBack
	 */
	public getBack() {
		this._routEx.back();
	}
	/**
	 * openUrl
	 */
	public openUrl() {
		//utils.openUrl("https://api.whatsapp.com/send?phone=573204232511&text=Hola!, ¿ Tengo una pregunta sobre VetsCol ?")
	}

	/**
	 * EnviarAsunto
	 */
	public EnviarAsunto() {
		this._dataOpinions._idUsuario = getString("idLogin");
		if (this._dataOpinions._asuntoOpinion !== null && this._dataOpinions._asuntoOpinion !== undefined && this._dataOpinions._asuntoOpinion !== "") {
			if (this._dataOpinions._descripcionOpinion !== null && this._dataOpinions._descripcionOpinion !== undefined && this._dataOpinions._descripcionOpinion !== "") {
				this.getIdOpinions();
			} else {
				this._globalComponent.validarCampo("descripción");
			}
		} else {
			this._globalComponent.validarCampo("asunto");
		}
	}

	/**
	 * getIdOpinions
	 */
	public getIdOpinions() {
		this._serviceFirebase.getDataIdOpinions().then(response => {
			console.log("Response del id"+JSON.stringify(response));
			if (response.value !== null) {
				var strJSON = JSON.stringify(response);
                var objJSON = eval("(function(){return " + strJSON + ";})()");
                let size = objJSON.value.length;   				
				this.idOpinion = size;
			} else {
				this.idOpinion = 0;
			}

			this._serviceFirebase.addSubjectsVets(this.idOpinion, this._dataOpinions).then(response => {
				if (response === "guardado") {
					this._globalComponent.validateSuccess("Hemos recibido tu mensaje, Gracias por hacer parte de nosotros.");
					this._routEx.navigate(["home"], {
						clearHistory: true,
						transition: {
							name: "slideLeft",
							duration: 400,
							curve: "ease"
						}
					})
				} else {
					this._globalComponent.validarErrores(response);
				}
			})
		})
	}
}