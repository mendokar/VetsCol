import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { trigger, transition, style, animate } from "@angular/animations";

import * as SocialShare from "nativescript-social-share";
import { RouterExtensions } from "nativescript-angular/router";
import { ServiceFirebase } from "../../services/firebase.service";
import { getString } from "tns-core-modules/application-settings/application-settings";
import { DatosVets } from "../../modal/vets.modal";
import { GlobalComponent } from "../../consts/global.model";

@Component({
    selector: "Browse",
    moduleId: module.id,
    templateUrl: "./create-vets.component.html",
    styleUrls:["./create-vets.component.scss"],
    animations: [
        trigger("animationDatos", [
            transition("* => fadeOut", [
                style({ transform: "translate(600px)", opacity: 1 }),
                animate(1200, style({ transform: "translate(600px)", opacity: 1 }))
            ]),
            transition("* => fadeIn", [
                animate(1200, style({  transform: "translate(600px)", opacity: 1}))
            ])
        ])
    ]
})
export class CreateVetsComponent implements OnInit {
    _globalComponent: GlobalComponent;
    _dataVets: DatosVets;
    _viewData: boolean;
    _viewW = false;
    _viewT = false;
    _viewI = false;
    _viewF = false;
    _serviceFirebase: ServiceFirebase;
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(private _routEx:RouterExtensions){
        this._serviceFirebase = new ServiceFirebase();
        this._dataVets = new DatosVets();
        this._globalComponent = new GlobalComponent();
    }

    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this.getDataVeterinary();
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


    /**
     * sharedData
     */
    public sharedData() {
        SocialShare.shareText("Conoce los productos , promociones y servicios que tiene para ti \""+ this._dataVets._nombreVet+ "\" en PetsCol. www.vetscol.com ","¿ Con quien quieres compartir "+this._dataVets._nombreVet+" ?")
    }



    /*Empezamos a codificar*/

    _viewShared = false;
    _viewAdd = false;

    

    _vertipo = true;
    

    public addVets(){
        //this._viewAdd = false;
        //this._viewData = true;
        this._routEx.navigate(['add-vets'],{
            transition:{
                name:"slide",
                duration:400,
                curve:"ease"
            }
        })
    }


    /**
     * getDataVeterinary
     */
    public getDataVeterinary() {
        this._globalComponent.loadingView();
        let iduser = getString("idLogin");
        this._serviceFirebase.searchDataVeterinary(iduser).then(response =>{
            console.log("RESP"+JSON.stringify(response));
            if(response.value !== null){
                this._viewShared = true;
                this._viewAdd = false;
                console.log("RESP"+JSON.stringify(response.value.veterinaria));
                let data = response.value.veterinaria;
                this._dataVets._nombreVet = data.nombre;
                this._dataVets._lemaVet = data.lema;
                this._dataVets._image = data.image;
                this._dataVets._descripcionVet = data.descripcion;
                this._dataVets._tipoVet =  data.tipo_vets;
                this._dataVets._correoVet = data.correo;
                this._dataVets._direccionVet = data.direccion;
                this._dataVets._telefonoVet = "031-"+data.telefono;
                this._dataVets._celularVet = data.celular;
                this._dataVets._paginaWebVet = data.pagina_web;

                if(data.horas === ""){
                    this._dataVets._horarioVet = data.dias+" de "+data.horario
                }else{
                    this._dataVets._horarioVet = data.horas
                }

                
                this._dataVets._facebookVets = data.facebook;
                this._dataVets._twitterVets = data.twitter;
                this._dataVets._InstagramVets = data.instagram;
                this._dataVets._whatSappVets = data.whatsapp;

                if(this._dataVets._facebookVets !== null && this._dataVets._facebookVets !== "" && this._dataVets._facebookVets !== undefined){
                    this._viewF = true;
                }
                if(this._dataVets._twitterVets !== null && this._dataVets._twitterVets !== "" && this._dataVets._twitterVets !== undefined){
                    this._viewT = true;
                }
                if(this._dataVets._InstagramVets !== null && this._dataVets._InstagramVets !== "" && this._dataVets._InstagramVets !== undefined){
                    this._viewI = true;
                }
                if(this._dataVets._whatSappVets !== null && this._dataVets._whatSappVets !== "" && this._dataVets._whatSappVets !== undefined){
                    this._viewW = true;
                }
            }else{
                this._viewShared = false;
                this._viewAdd = true;
            }
        });
        this._globalComponent.loadingHide();
    }

    /**
     * editVets
     */
    public editVets() {
        this._routEx.navigate(['edit-vets'],{
            transition:{
                name:"slide",
                duration:400,
                curve:"ease"
            }
        })
    }

    

}
