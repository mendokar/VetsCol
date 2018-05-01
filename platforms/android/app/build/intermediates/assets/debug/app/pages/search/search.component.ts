import { Component, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { trigger, transition, style, animate, query, stagger } from "@angular/animations";
import { AddServiceModal } from "./add-service/add-service.modal";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { Page, isAndroid } from "tns-core-modules/ui/page/page";
import { GlobalComponent } from "../../consts/global.model";
import { getString, setString } from "tns-core-modules/application-settings/application-settings";
import { RouterExtensions } from "nativescript-angular/router";
import { ServiceFirebase } from "../../services/firebase.service";

import * as dialogs from "ui/dialogs";

@Component({
    selector: "Search",
    moduleId: module.id,
    templateUrl: "./search.component.html",
    styleUrls: ["./servicios.component.scss"],
    providers: [ServiceFirebase],
    animations: [
        trigger("someCoolAnimation", [
            transition("* => *", [
                // this hides everything right away
                query(":enter", style({ opacity: 0 })),

                // starts to animate things with a stagger in between
                query(":enter", stagger(300, [
                    animate(1000, style({ opacity: 1 }))
                ]), { delay: 300 })
            ])
        ])
    ]
})
export class SearchComponent implements OnInit {
    _firebaseService: ServiceFirebase;
    _globalComponent: GlobalComponent;
    _addService = false;
    arregloServicios = [];
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
        this._globalComponent.loadingView();
        this._page.on('loaded', () => {

            console.log("Cargar Servicios")

        });
        this.validateUser();
       
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

    bindingVar = "";
    _viewCreate = true;
    _viewInit = true;
    _viewAdd = false;


    constructor(private vcRef: ViewContainerRef,
        private modal: ModalDialogService,
        private _page: Page,
        private _routEx: RouterExtensions) {
        this._globalComponent = new GlobalComponent();
        this._firebaseService = new ServiceFirebase();

    }

    fadeIn() {
        this.bindingVar = "fadeIn";
    }

    fadeOut() {
        this.bindingVar = "fadeOut";
    }

    toggle() {
        this.bindingVar == "fadeOut" ? this.fadeIn() : this.fadeOut();
    }

    hide() {
        this.fadeOut();
    }

    /**
     * mostrarConfiguracionHorario
     */
    public addServices() {
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
             setString("editService", 'false');
             setString("idService", '');
             setString("nameService", '');
             setString("descriptionService", '');             
        this._routEx.navigate(['add-services'], {
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
    public validateUser() {
        this._globalComponent.validateDataRegisterVetrinaty(getString('idLogin')).then(response => {
            console.log("Mensaje" + JSON.stringify(response) + getString('idLogin'));
            //let res = response.value.servicios;
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
                    this.arregloServicios = [];
                    for (let i = 0; i < servicios.length; i++) {

                        if (servicios[i] !== null) {
                            let nombre = servicios[i].nombre;
                            let descripcion = servicios[i].descripcion;

                            console.log(nombre + descripcion);

                            this.arregloServicios.push({
                                idService: i,
                                title: nombre,
                                description: descripcion
                            });
                        }

                        this._addService = true;

                    }

                } 
                if(this.arregloServicios.length <= 0){
                    this._viewAdd = true;
                }else{
                    this._viewAdd = false;
                }
                this._addService = true;
                this._globalComponent.loadingHide();
            } else {
                this._globalComponent.loadingHide();
                this._globalComponent.viewMessage("Por favor registra tu veterinaria, es necesario para crear servicios.");
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
                let url = "veterinariasRegistradas/" + id + "/" + "servicios/" + numero;
                console.log("Url a eliminar" + url);
                this._firebaseService.deleteServices(url).then(response => {
                    console.log(Response)
                    this.arregloServicios = [];
                    this.validateUser();
                });
            }
        });


    }

    /**
     * updateServices
     */
    public updateServices(id, name, description) {
        setString("editService", 'true');
        setString("idService", '' + id);
        setString("nameService", '' + name);
        setString("descriptionService", '' + description);
        this._routEx.navigate(['add-services'], {
            transition: {
                name: "slide",
                duration: 400,
                curve: "ease"
            }
        });
    }

}
