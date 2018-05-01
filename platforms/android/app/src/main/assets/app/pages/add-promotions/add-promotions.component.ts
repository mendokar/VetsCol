import { Component, OnInit } from '@angular/core';
import { ServiceFirebase } from '../../services/firebase.service';
import { ServiciosVets } from '../../modal/servicios.modal';
import { GlobalComponent } from '../../consts/global.model';
import { getString } from 'tns-core-modules/application-settings/application-settings';
import { PromotionsVets } from '../../modal/promotions.modal';
import { RouterExtensions } from 'nativescript-angular/router';
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'add-promotions',
	templateUrl: './pages/add-promotions/add-promotions.component.html',
	styleUrls: ['./pages/add-promotions/add-promotions.component.css'],
	providers: [ServiceFirebase]
})

export class AddPromotionsComponent implements OnInit {

	_dataProducts: PromotionsVets;
	_globalComponent: GlobalComponent;
	_dataService: ServiciosVets;
	constructor(private _servicioFirebase: ServiceFirebase,private _routEx:RouterExtensions) {
		this._dataService = new ServiciosVets();
		this._globalComponent = new GlobalComponent();
		this._dataProducts = new PromotionsVets();
	}

	ngOnInit() {
		this.getIdServices();
	}

	/**
     * getIdServices
     */
	public getIdServices() {
		this._dataService._idUsuario = getString("idLogin");
		this._servicioFirebase.getServicesVeterinary(this._dataService).then(response => {
			console.log("response" + JSON.stringify(response));
			let res = response.value;
			console.log("RESPONSE PROMOCIONES" + res);
			if (res !== null && res !== undefined) {
				//let response = JSON.stringify(res);
				//console.log("Consulta Descripcion"+response);
				//if(response !== null && response !== undefined){

				let servicios = response.value.promociones;
				//console.log(servicios.length);
				console.log("ARREGLO DE PROMOCIONES" + JSON.stringify(servicios));
				if (servicios !== null && servicios !== undefined) {
					console.log(JSON.stringify(response));
					var strJSON = JSON.stringify(response);
					var objJSON = eval("(function(){return " + strJSON + ";})()");
					let size = objJSON.value.promociones.length;
					this._dataProducts._idPromotionVet = size;
					console.log("ID SERVICIO" + size);
				} else {
					this._dataProducts._idPromotionVet = 0;
					console.log("ID SERVICIO" + this._dataProducts._idPromotionVet);
				}
			}

		});
	}


	/**
	 * validarDatos
	 */
	public validarDatos() {
		this._globalComponent.loadingView();
		let id = getString("idLogin");
		console.log("Path para guardar las imagenes" + id + "/productos/producto" + this._dataProducts._idPromotionVet)
		console.log(this._dataProducts._nombrePromotionVet);
		if (this._dataProducts._nombrePromotionVet !== undefined && this._dataProducts._nombrePromotionVet !== null && this._dataProducts._nombrePromotionVet !== "") {
			if (this._dataProducts._precioPromotionoVet !== undefined && this._dataProducts._precioPromotionoVet !== null && this._dataProducts._precioPromotionoVet !== "") {
				if (this._dataProducts._descripcionPromotionVet !== undefined && this._dataProducts._descripcionPromotionVet !== null && this._dataProducts._descripcionPromotionVet !== "") {
					//this._mensaje = "";
					//this._dataProducts._idUsuario = getString("idLogin");	
					
				this._dataProducts._nombrePromotionVet = this._dataProducts._nombrePromotionVet.trim();
				this._dataProducts._descripcionPromotionVet = this._dataProducts._descripcionPromotionVet.trim();
				this._dataProducts._nombrePromotionVet = this._globalComponent.MayusPrimera(this._dataProducts._nombrePromotionVet);
				this._dataProducts._descripcionPromotionVet = this._globalComponent.MayusPrimera(this._dataProducts._descripcionPromotionVet);

				this._dataProducts._idUsuario = getString("idLogin");
				this._dataProducts._precioPromotionoVet = this._globalComponent.validarFormatMiles(this._dataProducts._precioPromotionoVet,'');
                this._servicioFirebase.addPromotionsVets(this._dataProducts).then(response => {
                    if(response === "guardado"){
						this._globalComponent.validateSuccess("Promoción registrada correctamente.");
						this._dataProducts._nombrePromotionVet = "";
						this._dataProducts._precioPromotionoVet = "";
						this._dataProducts._descripcionPromotionVet = "";
						this.getBack();
						//this.getIdServices();
						this._globalComponent.loadingHide();
                    }else{
						this._globalComponent.validarErrores(response);
						this._globalComponent.loadingHide();
                    }
                });					
				} else {
					this._globalComponent.validarCampo("descripción");
					this._globalComponent.loadingHide();
				}
			} else {
				this._globalComponent.validarCampo("precio");
				this._globalComponent.loadingHide();
			}
		} else {
			this._globalComponent.validarCampo("nombre");
			this._globalComponent.loadingHide();
		}

	}

	/**
	 * getBack
	 */
	public getBack() {
		this._routEx.navigate(["promotions"],{
			clearHistory:true,
			transition:{
				name:"slideRight",
				duration:400,
				curve:"ease"
			}
		})
	}
}