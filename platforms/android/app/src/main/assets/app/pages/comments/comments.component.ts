import { Component, OnInit } from '@angular/core';
import { DatosVets } from '../../modal/vets.modal';
import { GlobalComponent } from '../../consts/global.model';
import { ServiceFirebase } from '../../services/firebase.service';
import { getString } from 'tns-core-modules/application-settings/application-settings';
import { RouterExtensions } from 'nativescript-angular/router';
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'comments',
	templateUrl: './pages/comments/comments.component.html',
	styleUrls: ['./pages/comments/comments.component.css']
})

export class CommentsComponent implements OnInit {

	_dataVets: DatosVets;
	_globalComponent: GlobalComponent;
	_serviceFirebase: ServiceFirebase;
	arregloComentarios: any[];
	idComments: any;
	constructor(private _routEx:RouterExtensions) {
		this._dataVets = new DatosVets();
		this._globalComponent = new GlobalComponent();
		this._serviceFirebase = new ServiceFirebase();
	}

	ngOnInit() { 
		this._globalComponent.loadingView();
		this.getComments();
		this._dataVets._idVets= getString('idLogin');
	}

	/**
	 * getComments
	 */
	public getComments() {
		//let idUseres = "2oFMfKbkmZYO4teOZU75117cxi93";
		this._serviceFirebase.getCommentsRating(getString('idLogin')).then(response => {
			console.log("response Comments" + JSON.stringify(response));
			this.arregloComentarios = [];
			if (response.value !== null) {
				let comentarios = response.value.comentarios;

				for (let i = 0; i < comentarios.length; i++) {
					let nombre = comentarios[i].nombre;
					let descripcion = comentarios[i].descripcion;

					this.arregloComentarios.push({
						nombre: nombre,
						descripcion: descripcion
					})
				}
			} else {
				this._globalComponent.loadingHide();
				this._globalComponent.viewMessage("Aún no se encuentran comentarios registrados.");
				this._routEx.navigate(['home'],{
					clearHistory:true,
					transition:{
						name:"fade",
						duration:400,
						curve:"ease"
					}
				});
			}
		});
		this._globalComponent.loadingHide();
	}
}