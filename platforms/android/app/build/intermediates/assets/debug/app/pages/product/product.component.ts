import { Component, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { AddProductModal } from "./add-product/add-product.modal";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { Page } from "tns-core-modules/ui/page/page";
import { RouterExtensions } from "nativescript-angular/router";
import { GlobalComponent } from "../../consts/global.model";
import { getString } from "tns-core-modules/application-settings/application-settings";
import { ServiceFirebase } from "../../services/firebase.service";

import * as dialogs from "ui/dialogs";


@Component({
    selector: "Featured",
    moduleId: module.id,
    templateUrl: "./product.component.html",
    styleUrls: ["./product.component.scss"]

})
export class ProductComponent implements OnInit {
    _serviceFirebase: ServiceFirebase;
    arregloProductos = [];
    _addService: boolean;
    _globalComponent: GlobalComponent;
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
        this._globalComponent.loadingView();
        this.validateDataProducts();
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

    constructor(private vcRef: ViewContainerRef,
        private modal: ModalDialogService,
        private _page: Page,
        private _routEx: RouterExtensions) {
        this._globalComponent = new GlobalComponent();
        this._serviceFirebase = new ServiceFirebase();

    }


    /**
     * mostrarConfiguracionHorario
     */
    public addProducts() {
		/*let options = {
			context: {},
			fullscreen: false,
			viewContainerRef: this.vcRef
		};
		this.modal.showModal(AddProductModal, options).then(res => {
            console.log("Response after close PopUp"+res);
			if (res !== undefined) {
                //this.validateUser();
			}else{
                //this.validateUser();
                
            }

            this._routEx.navigate(['search'],{
                clearHistory:true,
                transition:{
                    name:"fade",
                    duration:200,
                    curve:"ease"
                }
            });


        });*/

        this._routEx.navigate(['add-products'], {
            transition: {
                name: "fade",
                duration: 200,
                curve: "ease"
            }
        });
    }

    /**
     * validateUser
     */
    public validateDataProducts() {
        this._globalComponent.validateDataRegisterVetrinaty(getString('idLogin')).then(response => {
            //console.log("Mensaje" + JSON.stringify(response) + getString('idLogin'));
            let res = response.value;
            console.log("RESPONSE PRODUCTOS" + JSON.stringify(res));
            if (res !== null && res !== undefined) {
                let servicios = response.value.productos;
                var strJSON = JSON.stringify(servicios);
                var objJSON = eval("(function(){return " + strJSON + ";})()");
                //console.log("DATOS PRODUCTOS"+objJSON.length);
                if (objJSON !== null && objJSON !== undefined) {
                    this.arregloProductos = [];
                    for (let i = 0; i < objJSON.length; i++) {

                        if (objJSON[i] !== null) {
                            let nombre = objJSON[i].nombre;
                            let descripcion = objJSON[i].descripcion;
                            let precio = objJSON[i].precio;
                            let imagen = objJSON[i].image;

                            console.log(nombre + descripcion + precio + imagen);

                            this.arregloProductos.push({
                                idProduct: i,
                                title: nombre,
                                description: descripcion,
                                price: "$" + precio,
                                image: imagen
                            });

                            this._addService = true;

                        }
                    }

                }
                this._addService = true;
                this._globalComponent.loadingHide();
                if(this.arregloProductos.length <= 0){
                    this._viewAdd = true;
                }else{
                    this._viewAdd = false;
                }
            } else {
                this._globalComponent.viewMessage("Por favor registra tu veterinaria, es necesario para crear productos.");
                this._globalComponent.loadingHide();
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
     * deleteProducts
     */
    public deleteProducts(numero, nombre) {
        dialogs.confirm({
            title: "Alerta",
            message: "¿ Realmente deseas eliminar el producto " + nombre + " ?",
            okButtonText: "NO",
            cancelButtonText: "Cancelar",
            neutralButtonText: "SI"
        }).then(result => {
            // result argument is boolean
            console.log("Dialog result: " + result);
            if (result === undefined) {
                this._globalComponent.loadingView();
                let id = getString('idLogin');
                let url = "veterinariasRegistradas/" + id + "/" + "productos/" + numero;
                let urlImage = id + "/" + "productos/producto" + numero + ".png";
                console.log("Url a eliminar" + url);
                this._serviceFirebase.deleteServices(url).then(response => {
                    console.log(Response)
                    this._serviceFirebase.deleteImage(urlImage).then(res => {
                        console.log(res)
                    })
                    this.arregloProductos = [];
                    this._routEx.navigate(['home']);
                    this._globalComponent.loadingHide();
                    this.validateDataProducts();
                });
            }
        });


    }





}
