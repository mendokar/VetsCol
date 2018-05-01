import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { GlobalComponent } from '../../consts/global.model';
import { ServiciosVets } from '../../modal/servicios.modal';
import { Page } from 'tns-core-modules/ui/page/page';
import { ServiceFirebase } from '../../services/firebase.service';
import { getString } from 'tns-core-modules/application-settings/application-settings';
import { isAndroid } from 'tns-core-modules/platform/platform';
import * as application from "application";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "application";
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'add-services',
	templateUrl: './pages/add-services/add-services.component.html',
	styleUrls: ['./pages/add-services/add-services.component.scss'],
	providers:[ServiceFirebase]
})

export class AddServicesComponent implements OnInit {


    _nameButton: string;
    _subtitle: string;
	_globalConst: GlobalComponent;
    _dataService: ServiciosVets;
    _mensaje = "";
    _title = "";
    ngOnInit(): void {
        //this.getIdServices();
        this.validateTypePage();
       /* if (!isAndroid) {
			return;
		  }
		  application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
			console.log("selecciono back")
            //this.getBack();
            this._routEx.navigate(['search'],{                
                transition:{
                    name:"slide",
                    duration:400,
                    curve:"ease"
                }
            });
		  });*/
    }

    constructor(
        private _page: Page,
        private _routEx: RouterExtensions,
        private _servicioFirebase: ServiceFirebase) {
        this._dataService = new ServiciosVets();
        this._globalConst = new GlobalComponent();
    }

    /**
     * addServicesVets
     */
    public addServicesVets() {
        this._mensaje = "";
        console.log(this._dataService._nombreServicioVet);
        if (this._dataService._nombreServicioVet !== undefined && this._dataService._nombreServicioVet !== null && this._dataService._nombreServicioVet !== "") {
            if (this._dataService._descripcionServicioVet !== undefined && this._dataService._descripcionServicioVet !== null && this._dataService._descripcionServicioVet !== "") {
				this._mensaje = "";
				this._dataService._nombreServicioVet = this._dataService._nombreServicioVet.trim();
				this._dataService._descripcionServicioVet = this._dataService._descripcionServicioVet.trim();
				this._dataService._nombreServicioVet = this._globalConst.MayusPrimera(this._dataService._nombreServicioVet);
				this._dataService._descripcionServicioVet = this._globalConst.MayusPrimera(this._dataService._descripcionServicioVet);

                this._dataService._idUsuario = getString("idLogin");
                this._servicioFirebase.addServicesVets(this._dataService).then(response => {
                    if(response === "guardado"){
						this._globalConst.validateSuccess("Servicio registrado correctamente.");
						this._dataService._nombreServicioVet = "";
						this._dataService._descripcionServicioVet = "";
                        this.getBack();
                        //this.getIdServices();
                    }else{
                        this._globalConst.validarErrores(response);
                    }
                });
            } else {
                this._globalConst.validarCampo("descripcion");
            }
        } else {
            this._globalConst.validarCampo("nombre");
        }

       
    }
    /**
     * getIdServices
     */
    public getIdServices() {
        this._dataService._idUsuario = getString("idLogin");
        this._servicioFirebase.getServicesVeterinary(this._dataService).then(response =>{
            console.log("response"+JSON.stringify(response));
            let res = response.value;
            console.log("RESPONSE PROMOCIONES" + res);
            if (res !== null && res !== undefined) {
                //let response = JSON.stringify(res);
                //console.log("Consulta Descripcion"+response);
                //if(response !== null && response !== undefined){

                let servicios = response.value.servicios;
                //console.log(servicios.length);
                console.log("ARREGLO DE SERVICIOS" +  servicios);
                if (servicios !== null && servicios !== undefined) {
                    console.log(JSON.stringify(response));
                    var strJSON = JSON.stringify(response);
                    var objJSON = eval("(function(){return " + strJSON + ";})()");
                    let size = objJSON.value.servicios.length;     
                    this._dataService._idServicioVet = size;       
                    console.log("ID SERVICIO"+size);
                }else{
                    this._dataService._idServicioVet = 0;
                    console.log("ID SERVICIO"+this._dataService._idServicioVet);
                }
            }
            
        });
    }

	/**
	 * getBack
	 */
	public getBack() {
		this._routEx.navigate(['search'],{
            clearHistory:true,
            transition:{
                name:"slideRight",
                duration:400,
                curve:"ease"
            }
        });
    }
    

    /**
     * validateTypePage
     */
    public validateTypePage() {
        let edit = getString("editService");
        if(edit === "true"){
            let id = getString("idService");
            let name = getString("nameService");
            let description = getString("descriptionService");
            this._dataService._idServicioVet = id;
            this._dataService._nombreServicioVet = name;
            this._dataService._descripcionServicioVet = description;
            this._title = "Actualiza Tu Servicio"
            this._subtitle = "Actualiza tus servicios, éstos los verán todos tus usuarios."
            this._nameButton = "Actualizar Servicio";
            //this.getIdServices();
        }else{
            this.getIdServices();
            this._title = "Registra Tus Servicios";
            this._subtitle = "Registra los servicios, éstos los verán todos tus usuarios.";
            this._nameButton = "Registrar Servicio"
        }
    }

    /**
     * validateTypeFunction
     */
    public validateTypeFunction() {
        let edit = getString("editService");
        if(edit === "true"){
            this.editServicesVets();
        }else{
            this.addServicesVets();
        }
    }


    /**
     * addServicesVets
     */
    public editServicesVets() {
        this._mensaje = "";
        console.log(this._dataService._nombreServicioVet);
        if (this._dataService._nombreServicioVet !== undefined && this._dataService._nombreServicioVet !== null && this._dataService._nombreServicioVet !== "") {
            if (this._dataService._descripcionServicioVet !== undefined && this._dataService._descripcionServicioVet !== null && this._dataService._descripcionServicioVet !== "") {
				this._mensaje = "";
				this._dataService._nombreServicioVet = this._dataService._nombreServicioVet.trim();
				this._dataService._descripcionServicioVet = this._dataService._descripcionServicioVet.trim();
				this._dataService._nombreServicioVet = this._globalConst.MayusPrimera(this._dataService._nombreServicioVet);
				this._dataService._descripcionServicioVet = this._globalConst.MayusPrimera(this._dataService._descripcionServicioVet);

                this._dataService._idUsuario = getString("idLogin");
                this._servicioFirebase.addServicesVets(this._dataService).then(response => {
                    if(response === "guardado"){
						this._globalConst.validateSuccess("Servicio actualizado correctamente.");
						this.getBack();
                    }else{
                        this._globalConst.validarErrores(response);
                    }
                });
            } else {
                this._globalConst.validarCampo("descripcion");
            }
        } else {
            this._globalConst.validarCampo("nombre");
        }

       
    }
}