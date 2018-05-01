import { Component, OnInit } from '@angular/core';
import { OpinionsModal } from '../../modal/opinions.modal';
import { ServiceFirebase } from '../../services/firebase.service';
import { GlobalComponent } from '../../consts/global.model';
import { getString } from 'tns-core-modules/application-settings/application-settings';
import { RouterExtensions } from 'nativescript-angular/router';
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'advices',
	templateUrl: './pages/advices/advices.component.html',
	styleUrls: ['./pages/advices/advices.component.css']
})

export class AdvicesComponent implements OnInit {

	idOpinion: any;
	_globalComponent: GlobalComponent;
	_serviceFirebase: ServiceFirebase;
	_dataOpinions: OpinionsModal;
	constructor(private _routEx:RouterExtensions) { 
		this._dataOpinions = new OpinionsModal();
		this._serviceFirebase = new ServiceFirebase();
		this._globalComponent = new GlobalComponent();
	}

	ngOnInit() { }


	/**
	 * EnviarAsunto
	 */
	public EnviarAsunto() {
		this._globalComponent.loadingView();
		this._dataOpinions._idUsuario = getString("idLogin");
		if (this._dataOpinions._asuntoOpinion !== null && this._dataOpinions._asuntoOpinion !== undefined && this._dataOpinions._asuntoOpinion !== "") {
			if (this._dataOpinions._descripcionOpinion !== null && this._dataOpinions._descripcionOpinion !== undefined && this._dataOpinions._descripcionOpinion !== "") {
				this.getIdOpinions();
			} else {
				this._globalComponent.validarCampo("descripción");
				this._globalComponent.loadingHide();
			}
		} else {
			this._globalComponent.validarCampo("asunto");
			this._globalComponent.loadingHide();
		}
	}

	/**
	 * getIdOpinions
	 */
	public getIdOpinions() {
		this._serviceFirebase.getDataIdAdvices().then(response => {
			console.log("Response del id"+JSON.stringify(response));
			if (response.value !== null) {
				var strJSON = JSON.stringify(response);
                var objJSON = eval("(function(){return " + strJSON + ";})()");
                let size = objJSON.value.length;   				
				this.idOpinion = size;
			} else {
				this.idOpinion = 0;
			}

			this._serviceFirebase.addAdvicesVets(this.idOpinion, this._dataOpinions).then(response => {
				if (response === "guardado") {
					this._globalComponent.validateSuccess("Hemos recibido tu mensaje, te contactaremos lo mas pronto posible.");
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

		this._globalComponent.loadingHide();
	}
}