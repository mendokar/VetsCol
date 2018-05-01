import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/directives/dialogs';
import { Page } from "tns-core-modules/ui/page/page";
import { RouterExtensions } from 'nativescript-angular/router';
import { ServiceFirebase } from '../../../services/firebase.service';
import { ServiciosVets } from '../../../modal/servicios.modal';
import { getString } from 'tns-core-modules/application-settings/application-settings';
import { GlobalComponent } from '../../../consts/global.model';

@Component({
    selector: 'add-product',
    templateUrl: "./pages/product/add-product/add-product.modal.html",
    styleUrls: ["./pages/product/add-product/add-product.modal.scss"],
    providers:[ServiceFirebase]
})
export class AddProductModal implements OnInit {

    _globalConst: GlobalComponent;
    _dataService: ServiciosVets;
    _mensaje = "";
    ngOnInit(): void {
        this.getIdServices();
    }

    constructor(private _modal: ModalDialogParams,
        private _page: Page,
        private _routEx: RouterExtensions,
        private _servicioFirebase: ServiceFirebase) {
        this._page.on("loaded", (args) => {
            (<any>args.object).backgroundColor = "transparent"
        });
        this._dataService = new ServiciosVets();
        this._globalConst = new GlobalComponent();
    }

    /**
     * hide
     */
    public hide() {
        this._modal.closeCallback();
        this._routEx.navigate(["services"]);
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
                this._dataService._idUsuario = getString("idLogin");
                this._servicioFirebase.addServicesVets(this._dataService).then(response => {
                    if(response === "guardado"){
                        this._mensaje = "Servicio registrado correctamente.";
                    }else{
                        this._globalConst.validarErrores(response);
                    }
                });
            } else {
                this.validateMessage("descripcion");
            }
        } else {
            this.validateMessage("nombre");
        }

       
    }


    /**
     * validateMessage
     */
    public validateMessage(dato) {
        this._mensaje = "";
        this._mensaje = "El campo " + dato + " es necesario para continuar."
    }

    /**
     * getIdServices
     */
    public getIdServices() {
        this._dataService._idUsuario = getString("idLogin");
        this._servicioFirebase.getServicesVeterinary(this._dataService).then(response =>{
            //console.log("response"+JSON.stringify(response));

            //console.log(JSON.stringify(response));
			var strJSON = JSON.stringify(response);
			var objJSON = eval("(function(){return " + strJSON + ";})()");
            let size = objJSON.value.servicios.length;     
            this._dataService._idServicioVet = size;       
            console.log("ID SERVICIO"+size);
        });
    }

}