import { Component, Input, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ServiceFirebase } from "../../services/firebase.service";
import { getString } from "tns-core-modules/application-settings/application-settings";



/* ***********************************************************
* Keep data that is displayed in your app drawer in the MyDrawer component class.
* Add new data objects that you want to display in the drawer here in the form of properties.
*************************************************************/
@Component({
    selector: "MyDrawer",
    moduleId: module.id,
    templateUrl: "./my-drawer.component.html",
    styleUrls: ["./my-drawer.component.scss"],
    providers:[ServiceFirebase]
})
export class MyDrawerComponent implements OnInit {
    _serviceFirebase: ServiceFirebase;
    /* ***********************************************************
    * The "selectedPage" is a component input property.
    * It is used to pass the current page title from the containing page component.
    * You can check how it is used in the "isPageSelected" function below.
    *************************************************************/
    @Input() selectedPage: string;
    constructor(private _routEx:RouterExtensions){
        this._serviceFirebase = new ServiceFirebase();
    }

    ngOnInit(): void {
        /* ***********************************************************
        * Use the MyDrawerComponent "onInit" event handler to initialize the properties data values.
        *************************************************************/
       this.getDatosUsuario();
    }

    /* ***********************************************************
    * The "isPageSelected" function is bound to every navigation item on the <MyDrawerItem>.
    * It is used to determine whether the item should have the "selected" class.
    * The "selected" class changes the styles of the item, so that you know which page you are on.
    *************************************************************/
    isPageSelected(pageTitle: string): boolean {
        return pageTitle === this.selectedPage;
    }

    _nameUser="Oscar Mendoza";
    _nameVets="Veterinarias De Colombia";

    /**
     * viewProfile
     */
    public viewProfile() {
        this._routEx.navigate(['profile'],{
            transition:{
                name:"slide",
                duration:400,
                curve:"ease"
            }
        })
    }

    /**
     * getDatosUsuario
     */
    public getDatosUsuario() {
        let idUser = getString("idLogin");
        this._serviceFirebase.consultarDatosUsuario(idUser).then(response =>{
            console.log(JSON.stringify(response.value));
			this._nameUser =response.value[idUser].nombre;
			this._nameVets = response.value[idUser].correo;
        });
    }
    
}
