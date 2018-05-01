import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Feedback, FeedbackType, FeedbackPosition } from "nativescript-feedback";
import { Color } from "tns-core-modules/color";
import * as settings from "tns-core-modules/application-settings/application-settings"
import { setString } from 'tns-core-modules/application-settings/application-settings';
import * as geolocation from "nativescript-geolocation";
import { ModalDialogService, ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { ServiceFirebase } from '../services/firebase.service';

import * as dialogs from "ui/dialogs";
import { RouterExtensions } from 'nativescript-angular/router';

var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;

export class GlobalComponent implements OnInit {
    _firebaseService: ServiceFirebase;
    private feedback: Feedback;
    loader = new LoadingIndicator();
    constructor() {
        this.feedback = new Feedback();
        this._firebaseService = new ServiceFirebase();
    }

    ngOnInit() { }



    public mostrarMensa(mensaje) {
        this.feedback.error({
            title: mensaje,
            titleColor: new Color("#222222"),
            position: FeedbackPosition.Bottom, // iOS only
            type: FeedbackType.Error, // this is the default type, by the way
            message: '',
            messageColor: new Color("#333333"),
            duration: 3000,
            backgroundColor: new Color("#ffb732"),
            android: {
                iconColor: new Color("#222222") // optional, leave out if you don't need it
            },
            onTap: () => { console.log("showCustomIcon tapped") }
        });
    }

    public viewMessageSucces(mensaje) {
        this.feedback.success({
            title: mensaje,
            titleColor: new Color("#222222"),
            position: FeedbackPosition.Bottom, // iOS only
            type: FeedbackType.Success, // this is the default type, by the way
            message: '',
            messageColor: new Color("#333333"),
            duration: 3000,
            backgroundColor: new Color("#ffb732"),
            android: {
                iconColor: new Color("#222222") // optional, leave out if you don't need it
            },
            onTap: () => { console.log("showCustomIcon tapped") }
        });
    }

    /**
     * validarCampo
    */
    public validarCampo(campo) {
        if (campo.length < 15) {
            let mensaje = "El campo " + campo + " es necesario para continuar.";
            this.mostrarMensa(mensaje)
        } else {
            let mensaje = campo;
            this.mostrarMensa(mensaje)
        }

    }


    /**
     * validateSuccess
     */
    public validateSuccess(campo) {
        let mensaje = campo;
        this.viewMessageSucces(mensaje)
    }


    /**
     * validarErrores
     */
    public validarErrores(error) {
        let mensaje;
        if (error === "errorEmailExist") {
            mensaje = "El correo ingresado ya se encuentra registrado."
            this.mostrarMensa(mensaje);
        } else if (error == 'errorEmail') {
            mensaje = "El correo ingresado se encuentra incompleto."
            this.mostrarMensa(mensaje);
        } else if (error == 'errorUsuario') {
            mensaje = "El correo ingresado no se encuentra registrado en la base de datos."
            this.mostrarMensa(mensaje);
        } else if (error == 'errorClave') {
            mensaje = "La contraseña ingresada no es correcta."
            this.mostrarMensa(mensaje);
        } else if (error == 'errorGlobal') {
            mensaje = "Disculpanos, se estan presentando algunas fallas, por favor intentalo mas tarde."
            this.mostrarMensa(mensaje);
        } else if (error == 'errorCuenta') {
            mensaje = "La cuenta se encuentra deshabilitada,Contáctanos por favor.";
            this.mostrarMensa(mensaje);
        } else if (error === "errorCargandoImagen") {
            mensaje = "Estamos presentando problemas técnicos al cargar la imagen,Contáctanos por favor.";
            this.mostrarMensa(mensaje);
        } else {
            return false;
        }
    }

    /**
     * elimiarTemporales
     */
    public elimiarTemporales() {
        settings.clear();
    }


    /**
     * calcularDistanciaEntreCoordenadas
     */
    //public calcularDistanciaEntreCoordenadas(latA,lonA,latB,lonB) {
    public calcularDistanciaEntreCoordenadas(lonA, latA, lonB, latB) {
        let R = '6372.795477598';
        latA = parseFloat(latA);
        lonA = parseFloat(lonA);
        latB = parseFloat(latB);
        lonB = parseFloat(lonB);
        let PI = '3.1416';
        let distancia = parseFloat(R) * Math.acos((Math.sin(latA)) * (Math.sin(latB)) + (Math.cos(latA)) * (Math.cos(latB)) * (Math.cos(lonA - lonB)))
        console.log("Esta es la distancia", (distancia * parseFloat(PI)) / 180);
        distancia = distancia * parseFloat(PI) / 180;
        return parseFloat(distancia.toFixed(1));
    }

   /**
 * getUrlLocation
 */
public getUrlLocation() {
    if (!geolocation.isEnabled()) {
        geolocation.enableLocationRequest().then(() => {
            geolocation.getCurrentLocation({ timeout: 20000 })
                .then(location => {
                  
                    let latitude = location.latitude;
                    let longitude = location.longitude;
                    console.log("Latitud" + latitude)
                    console.log("Longitud" + longitude);
                    setString("latitud", '' + latitude);
                    setString("longitud", '' + longitude);
                    return location;
                    //setString("latitud",''+'4.5892016');
                    //setString("longitud",''+'-74.1378283');
                    //this.firstWebViewSRC ="https://www.google.com/maps/search/veterinaria/@"+latitude+","+longitude+",20z";
                    //console.log("URL PARA MAPAS"+this.firstWebViewSRC);
                })
        });
    }
    else {
       return geolocation.getCurrentLocation({ timeout: 20000 })
            .then(location => {
                let latitude = location.latitude;
                let longitude = location.longitude;
                console.log("Latitud" + latitude)
                console.log("Longitud" + longitude)
                //setString("latitud",''+'4.5892016');
                //setString("longitud",''+'-74.1378283');
                
                setString("latitud", '' + latitude);
                setString("longitud", '' + longitude);
                return location;
                //this.firstWebViewSRC ="https://www.google.com/maps/search/veterinaria/@"+latitude+","+longitude+",20z";
                //console.log("URL PARA MAPAS"+this.firstWebViewSRC);

            })
    }


}

    /**
    * MayusPrimera
    * Funcion que permite ingresar la primera letra como Mayuscula.
    */
    public MayusPrimera(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    /**
    * validarEmail
    * Funcion que permite validar el correo
    */
    public validarEmail(valor) {
        if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)){
         //alert("La dirección de email " + valor + " es correcta!.");
        return true;
        } else {
            return false;
         //alert("La dirección de email es incorrecta!.");
        }
      }

    /**
     * validarFormatMiles
     */
    public validarFormatMiles(amount, decimals) {

            amount += ''; // por si pasan un numero en vez de un string
            amount = parseFloat(amount.replace(/[^0-9\.]/g, '')); // elimino cualquier cosa que no sea numero o punto
        
            decimals = decimals || 0; // por si la variable no fue fue pasada
            
            // si no es un numero o es igual a cero retorno el mismo cero
            if (isNaN(amount) || amount === 0) 
                return parseFloat(('0')).toFixed(decimals);
        
            // si es mayor o menor que cero retorno el valor formateado como numero
            amount = '' + amount.toFixed(decimals);
        
            var amount_parts = amount.split('.'),
                regexp = /(\d+)(\d{3})/;
        
            while (regexp.test(amount_parts[0]))
                amount_parts[0] = amount_parts[0].replace(regexp, '$1' + ',' + '$2');
        
            return amount_parts.join('.');
    }

    /**
     * loadingView
     */
    public loadingView() {
        var options = {
            message: 'Cargando...',
            progress: 0.65,
            android: {
                indeterminate: true,
                cancelable: false,
                cancelListener: function (dialog) { console.log("Loading cancelled") },
                max: 100,
                progressNumberFormat: "%1d/%2d",
                progressPercentFormat: 0.53,
                progressStyle: 1,
                secondaryProgress: 1
            },
            ios: {
                details: "Additional detail note!",
                margin: 10,
                dimBackground: false,
                color: "#4B9ED6", // color of indicator and labels
                // background box around indicator
                // hideBezel will override this if true
                backgroundColor: "yellow",
                userInteractionEnabled: false, // default true. Set false so that the touches will fall through it.
                hideBezel: true, // default false, can hide the surrounding bezel
                // view: UIView, // Target view to show on top of (Defaults to entire window)
                //mode: // see iOS specific options below
            }
        };
        this.loader.show(options);
    }

    /**
     * loadingHide
     */
    public loadingHide() {

        this.loader.hide();
    }


    /**
     * validateDataRegisterVetrinaty
     */
    public validateDataRegisterVetrinaty(idUser) {
        return this._firebaseService.searchDataVeterinary(idUser).then(response => {
            console.log("RESPUESTA ANY" + response)
            return response;
        });
    }


    /**
     * publicMessage
     */
    public viewMessage(mensaje) {
        dialogs.alert({
            title: "Información",
            message: mensaje,
            okButtonText: "Aceptar"
        }).then(() => {
            console.log("Dialog closed!");           
        });
    }
}