import { Component, OnInit, ViewChild } from '@angular/core';
import { RadSideDrawerComponent } from 'nativescript-pro-ui/sidedrawer/angular';
import { DrawerTransitionBase, SlideInOnTopTransition } from 'nativescript-pro-ui/sidedrawer';
import { RouterExtensions } from 'nativescript-angular/router';
import { getString } from 'tns-core-modules/application-settings/application-settings';
import { GlobalComponent } from '../../consts/global.model';
import { ServiceFirebase } from '../../services/firebase.service';
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';

import * as dialogs from "ui/dialogs";

@Component({
    selector: 'promotions',
    templateUrl: './pages/promotions/promotions.component.html',
    styleUrls: ['./pages/promotions/promotions.component.css']
})

export class PromotionsComponent implements OnInit {

    _firebaseService: ServiceFirebase;
    _globalComponent: GlobalComponent;
    arregloProductos: any[];
    _addService: boolean;
    _viewAdd = false;
	/* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this.validateDataPromotions();
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    /* ***********************************************************
    * According to guidelines, if you have a drawer on your page, you should always
    * have a button that opens it. Use the showDrawer() function to open the app drawer section.
    *************************************************************/
    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }

    constructor(private _routEx: RouterExtensions) {
        this._globalComponent = new GlobalComponent();
        this._firebaseService = new ServiceFirebase();
    }

    /**
     * mostrarConfiguracionHorario
     */
    public addPromotions() {
        /* this._viewInit = true;
         this._viewAdd = false;
         let options = {
             context: {},
             fullscreen: false,
             viewContainerRef: this.vcRef
         };
         this.modal.showModal(AddServiceModal, options).then(res => {
             console.log("Response after close PopUp"+res);
             this._globalComponent.loadingView();
             if (res !== undefined) {
                 this.getDataServices();
                 this._viewInit = false;
                 this._viewAdd = true;
             }else{
                 this.getDataServices();
                 this._viewInit = false;
                 this._viewAdd = true;
                 
             }*/
        this._routEx.navigate(['add-promotions'], {
            transition: {
                name: "slide",
                duration: 400,
                curve: "ease"
            }
        });


        //});
    }

    /**
     * validateUser
     */
    public validateDataPromotions() {
        this.arregloProductos = [];
        this._globalComponent.validateDataRegisterVetrinaty(getString('idLogin')).then(response => {
            console.log("Mensaje" + JSON.stringify(response) + getString('idLogin'));
            let res = response.value;
            console.log("RESPONSE PROMOCIONES" + res);
            if (res !== null && res !== undefined) {
                let servicios = response.value.promociones;
                console.log("Serviicos ANY"+servicios)
                if (servicios !== null && servicios !== undefined) {
                    console.log("Promociones" + servicios);
                    this.arregloProductos = [];
                    for (let i = 0; i < servicios.length; i++) {

                        if (servicios[i] !== null) {
                            let nombre = servicios[i].nombre;
                            let descripcion = servicios[i].descripcion;
                            let precio = servicios[i].precio;

                            console.log(nombre + descripcion);

                            this.arregloProductos.push({
                                idPro: i,
                                title: nombre,
                                precio: "$" + precio,
                                description: descripcion
                            });

                            this._addService = true;

                        }


                    }
                }
                this._addService = true;
                if(this.arregloProductos.length <= 0){
                    this._viewAdd = true;
                }else{
                    this._viewAdd = false;
                }
            } else {
                this._globalComponent.viewMessage("Por favor registra tu veterinaria, es necesario para crear promociones.");
                this._routEx.navigate(['home'], {
                    transition: {
                        name: "fade",
                        duration: 400,
                        curve: "ease"
                    }
                });
            }
        });


    }

    /**
    * deleteService
    */
    public deleteService(numero, nombre) {
        dialogs.confirm({
            title: "Alerta",
            message: "¿ Realmente deseas eliminar el servicio " + nombre + " ?",
            okButtonText: "NO",
            cancelButtonText: "Cancelar",
            neutralButtonText: "SI"
        }).then(result => {
            // result argument is boolean
            console.log("Dialog result: " + result);
            if (result === undefined) {
                this._globalComponent.loadingView();
                let id = getString('idLogin');
                let url = "veterinariasRegistradas/" + id + "/" + "promociones/" + numero;
                console.log("Url a eliminar" + url);
                this._firebaseService.deleteServices(url).then(response => {
                    console.log(Response)
                    this.arregloProductos = [];
                    this.validateDataPromotions();
                });

                this._globalComponent.loadingHide();
            }
        });

    }

}