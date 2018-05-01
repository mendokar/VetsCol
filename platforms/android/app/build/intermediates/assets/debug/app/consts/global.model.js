"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nativescript_feedback_1 = require("nativescript-feedback");
var color_1 = require("tns-core-modules/color");
var settings = require("tns-core-modules/application-settings/application-settings");
var application_settings_1 = require("tns-core-modules/application-settings/application-settings");
var geolocation = require("nativescript-geolocation");
var firebase_service_1 = require("../services/firebase.service");
var dialogs = require("ui/dialogs");
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
var GlobalComponent = /** @class */ (function () {
    function GlobalComponent() {
        this.loader = new LoadingIndicator();
        this.feedback = new nativescript_feedback_1.Feedback();
        this._firebaseService = new firebase_service_1.ServiceFirebase();
    }
    GlobalComponent.prototype.ngOnInit = function () { };
    GlobalComponent.prototype.mostrarMensa = function (mensaje) {
        this.feedback.error({
            title: mensaje,
            titleColor: new color_1.Color("#222222"),
            position: nativescript_feedback_1.FeedbackPosition.Bottom,
            type: nativescript_feedback_1.FeedbackType.Error,
            message: '',
            messageColor: new color_1.Color("#333333"),
            duration: 3000,
            backgroundColor: new color_1.Color("#ffb732"),
            android: {
                iconColor: new color_1.Color("#222222") // optional, leave out if you don't need it
            },
            onTap: function () { console.log("showCustomIcon tapped"); }
        });
    };
    GlobalComponent.prototype.viewMessageSucces = function (mensaje) {
        this.feedback.success({
            title: mensaje,
            titleColor: new color_1.Color("#222222"),
            position: nativescript_feedback_1.FeedbackPosition.Bottom,
            type: nativescript_feedback_1.FeedbackType.Success,
            message: '',
            messageColor: new color_1.Color("#333333"),
            duration: 3000,
            backgroundColor: new color_1.Color("#ffb732"),
            android: {
                iconColor: new color_1.Color("#222222") // optional, leave out if you don't need it
            },
            onTap: function () { console.log("showCustomIcon tapped"); }
        });
    };
    /**
     * validarCampo
    */
    GlobalComponent.prototype.validarCampo = function (campo) {
        if (campo.length < 15) {
            var mensaje = "El campo " + campo + " es necesario para continuar.";
            this.mostrarMensa(mensaje);
        }
        else {
            var mensaje = campo;
            this.mostrarMensa(mensaje);
        }
    };
    /**
     * validateSuccess
     */
    GlobalComponent.prototype.validateSuccess = function (campo) {
        var mensaje = campo;
        this.viewMessageSucces(mensaje);
    };
    /**
     * validarErrores
     */
    GlobalComponent.prototype.validarErrores = function (error) {
        var mensaje;
        if (error === "errorEmailExist") {
            mensaje = "El correo ingresado ya se encuentra registrado.";
            this.mostrarMensa(mensaje);
        }
        else if (error == 'errorEmail') {
            mensaje = "El correo ingresado se encuentra incompleto.";
            this.mostrarMensa(mensaje);
        }
        else if (error == 'errorUsuario') {
            mensaje = "El correo ingresado no se encuentra registrado en la base de datos.";
            this.mostrarMensa(mensaje);
        }
        else if (error == 'errorClave') {
            mensaje = "La contraseña ingresada no es correcta.";
            this.mostrarMensa(mensaje);
        }
        else if (error == 'errorGlobal') {
            mensaje = "Disculpanos, se estan presentando algunas fallas, por favor intentalo mas tarde.";
            this.mostrarMensa(mensaje);
        }
        else if (error == 'errorCuenta') {
            mensaje = "La cuenta se encuentra deshabilitada,Contáctanos por favor.";
            this.mostrarMensa(mensaje);
        }
        else if (error === "errorCargandoImagen") {
            mensaje = "Estamos presentando problemas técnicos al cargar la imagen,Contáctanos por favor.";
            this.mostrarMensa(mensaje);
        }
        else {
            return false;
        }
    };
    /**
     * elimiarTemporales
     */
    GlobalComponent.prototype.elimiarTemporales = function () {
        settings.clear();
    };
    /**
     * calcularDistanciaEntreCoordenadas
     */
    //public calcularDistanciaEntreCoordenadas(latA,lonA,latB,lonB) {
    GlobalComponent.prototype.calcularDistanciaEntreCoordenadas = function (lonA, latA, lonB, latB) {
        var R = '6372.795477598';
        latA = parseFloat(latA);
        lonA = parseFloat(lonA);
        latB = parseFloat(latB);
        lonB = parseFloat(lonB);
        var PI = '3.1416';
        var distancia = parseFloat(R) * Math.acos((Math.sin(latA)) * (Math.sin(latB)) + (Math.cos(latA)) * (Math.cos(latB)) * (Math.cos(lonA - lonB)));
        console.log("Esta es la distancia", (distancia * parseFloat(PI)) / 180);
        distancia = distancia * parseFloat(PI) / 180;
        return parseFloat(distancia.toFixed(1));
    };
    /**
  * getUrlLocation
  */
    GlobalComponent.prototype.getUrlLocation = function () {
        if (!geolocation.isEnabled()) {
            geolocation.enableLocationRequest().then(function () {
                geolocation.getCurrentLocation({ timeout: 20000 })
                    .then(function (location) {
                    var latitude = location.latitude;
                    var longitude = location.longitude;
                    console.log("Latitud" + latitude);
                    console.log("Longitud" + longitude);
                    application_settings_1.setString("latitud", '' + latitude);
                    application_settings_1.setString("longitud", '' + longitude);
                    return location;
                    //setString("latitud",''+'4.5892016');
                    //setString("longitud",''+'-74.1378283');
                    //this.firstWebViewSRC ="https://www.google.com/maps/search/veterinaria/@"+latitude+","+longitude+",20z";
                    //console.log("URL PARA MAPAS"+this.firstWebViewSRC);
                });
            });
        }
        else {
            return geolocation.getCurrentLocation({ timeout: 20000 })
                .then(function (location) {
                var latitude = location.latitude;
                var longitude = location.longitude;
                console.log("Latitud" + latitude);
                console.log("Longitud" + longitude);
                //setString("latitud",''+'4.5892016');
                //setString("longitud",''+'-74.1378283');
                application_settings_1.setString("latitud", '' + latitude);
                application_settings_1.setString("longitud", '' + longitude);
                return location;
                //this.firstWebViewSRC ="https://www.google.com/maps/search/veterinaria/@"+latitude+","+longitude+",20z";
                //console.log("URL PARA MAPAS"+this.firstWebViewSRC);
            });
        }
    };
    /**
    * MayusPrimera
    * Funcion que permite ingresar la primera letra como Mayuscula.
    */
    GlobalComponent.prototype.MayusPrimera = function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    /**
    * validarEmail
    * Funcion que permite validar el correo
    */
    GlobalComponent.prototype.validarEmail = function (valor) {
        if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)) {
            //alert("La dirección de email " + valor + " es correcta!.");
            return true;
        }
        else {
            return false;
            //alert("La dirección de email es incorrecta!.");
        }
    };
    /**
     * validarFormatMiles
     */
    GlobalComponent.prototype.validarFormatMiles = function (amount, decimals) {
        amount += ''; // por si pasan un numero en vez de un string
        amount = parseFloat(amount.replace(/[^0-9\.]/g, '')); // elimino cualquier cosa que no sea numero o punto
        decimals = decimals || 0; // por si la variable no fue fue pasada
        // si no es un numero o es igual a cero retorno el mismo cero
        if (isNaN(amount) || amount === 0)
            return parseFloat(('0')).toFixed(decimals);
        // si es mayor o menor que cero retorno el valor formateado como numero
        amount = '' + amount.toFixed(decimals);
        var amount_parts = amount.split('.'), regexp = /(\d+)(\d{3})/;
        while (regexp.test(amount_parts[0]))
            amount_parts[0] = amount_parts[0].replace(regexp, '$1' + ',' + '$2');
        return amount_parts.join('.');
    };
    /**
     * loadingView
     */
    GlobalComponent.prototype.loadingView = function () {
        var options = {
            message: 'Cargando...',
            progress: 0.65,
            android: {
                indeterminate: true,
                cancelable: false,
                cancelListener: function (dialog) { console.log("Loading cancelled"); },
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
                color: "#4B9ED6",
                // background box around indicator
                // hideBezel will override this if true
                backgroundColor: "yellow",
                userInteractionEnabled: false,
                hideBezel: true,
            }
        };
        this.loader.show(options);
    };
    /**
     * loadingHide
     */
    GlobalComponent.prototype.loadingHide = function () {
        this.loader.hide();
    };
    /**
     * validateDataRegisterVetrinaty
     */
    GlobalComponent.prototype.validateDataRegisterVetrinaty = function (idUser) {
        return this._firebaseService.searchDataVeterinary(idUser).then(function (response) {
            console.log("RESPUESTA ANY" + response);
            return response;
        });
    };
    /**
     * publicMessage
     */
    GlobalComponent.prototype.viewMessage = function (mensaje) {
        dialogs.alert({
            title: "Información",
            message: mensaje,
            okButtonText: "Aceptar"
        }).then(function () {
            console.log("Dialog closed!");
        });
    };
    return GlobalComponent;
}());
exports.GlobalComponent = GlobalComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2xvYmFsLm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsK0RBQWlGO0FBQ2pGLGdEQUErQztBQUMvQyxxRkFBc0Y7QUFDdEYsbUdBQXVGO0FBQ3ZGLHNEQUF3RDtBQUV4RCxpRUFBK0Q7QUFFL0Qsb0NBQXNDO0FBR3RDLElBQUksZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLGdDQUFnQyxDQUFDLENBQUMsZ0JBQWdCLENBQUM7QUFFbEY7SUFJSTtRQURBLFdBQU0sR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7UUFFNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGdDQUFRLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxrQ0FBZSxFQUFFLENBQUM7SUFDbEQsQ0FBQztJQUVELGtDQUFRLEdBQVIsY0FBYSxDQUFDO0lBSVAsc0NBQVksR0FBbkIsVUFBb0IsT0FBTztRQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztZQUNoQixLQUFLLEVBQUUsT0FBTztZQUNkLFVBQVUsRUFBRSxJQUFJLGFBQUssQ0FBQyxTQUFTLENBQUM7WUFDaEMsUUFBUSxFQUFFLHdDQUFnQixDQUFDLE1BQU07WUFDakMsSUFBSSxFQUFFLG9DQUFZLENBQUMsS0FBSztZQUN4QixPQUFPLEVBQUUsRUFBRTtZQUNYLFlBQVksRUFBRSxJQUFJLGFBQUssQ0FBQyxTQUFTLENBQUM7WUFDbEMsUUFBUSxFQUFFLElBQUk7WUFDZCxlQUFlLEVBQUUsSUFBSSxhQUFLLENBQUMsU0FBUyxDQUFDO1lBQ3JDLE9BQU8sRUFBRTtnQkFDTCxTQUFTLEVBQUUsSUFBSSxhQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsMkNBQTJDO2FBQzlFO1lBQ0QsS0FBSyxFQUFFLGNBQVEsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBLENBQUMsQ0FBQztTQUN4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RUFBRSxhQUFhO1lBQ3BCLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLFlBQVksRUFBRSxTQUFTO1NBQzFCLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDbEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQUFDLEFBOVJELElBOFJDO0FBOVJZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRmVlZGJhY2ssIEZlZWRiYWNrVHlwZSwgRmVlZGJhY2tQb3NpdGlvbiB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZmVlZGJhY2tcIjtcclxuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9jb2xvclwiO1xyXG5pbXBvcnQgKiBhcyBzZXR0aW5ncyBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5ncy9hcHBsaWNhdGlvbi1zZXR0aW5nc1wiXHJcbmltcG9ydCB7IHNldFN0cmluZyB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24tc2V0dGluZ3MvYXBwbGljYXRpb24tc2V0dGluZ3MnO1xyXG5pbXBvcnQgKiBhcyBnZW9sb2NhdGlvbiBmcm9tIFwibmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uXCI7XHJcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSwgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9tb2RhbC1kaWFsb2cnO1xyXG5pbXBvcnQgeyBTZXJ2aWNlRmlyZWJhc2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlJztcclxuXHJcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XHJcblxyXG52YXIgTG9hZGluZ0luZGljYXRvciA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtbG9hZGluZy1pbmRpY2F0b3JcIikuTG9hZGluZ0luZGljYXRvcjtcclxuXHJcbmV4cG9ydCBjbGFzcyBHbG9iYWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgX2ZpcmViYXNlU2VydmljZTogU2VydmljZUZpcmViYXNlO1xyXG4gICAgcHJpdmF0ZSBmZWVkYmFjazogRmVlZGJhY2s7XHJcbiAgICBsb2FkZXIgPSBuZXcgTG9hZGluZ0luZGljYXRvcigpO1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5mZWVkYmFjayA9IG5ldyBGZWVkYmFjaygpO1xyXG4gICAgICAgIHRoaXMuX2ZpcmViYXNlU2VydmljZSA9IG5ldyBTZXJ2aWNlRmlyZWJhc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHsgfVxyXG5cclxuXHJcblxyXG4gICAgcHVibGljIG1vc3RyYXJNZW5zYShtZW5zYWplKSB7XHJcbiAgICAgICAgdGhpcy5mZWVkYmFjay5lcnJvcih7XHJcbiAgICAgICAgICAgIHRpdGxlOiBtZW5zYWplLFxyXG4gICAgICAgICAgICB0aXRsZUNvbG9yOiBuZXcgQ29sb3IoXCIjMjIyMjIyXCIpLFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogRmVlZGJhY2tQb3NpdGlvbi5Cb3R0b20sIC8vIGlPUyBvbmx5XHJcbiAgICAgICAgICAgIHR5cGU6IEZlZWRiYWNrVHlwZS5FcnJvciwgLy8gdGhpcyBpcyB0aGUgZGVmYXVsdCB0eXBlLCBieSB0aGUgd2F5XHJcbiAgICAgICAgICAgIG1lc3NhZ2U6ICcnLFxyXG4gICAgICAgICAgICBtZXNzYWdlQ29sb3I6IG5ldyBDb2xvcihcIiMzMzMzMzNcIiksXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IG5ldyBDb2xvcihcIiNmZmI3MzJcIiksXHJcbiAgICAgICAgICAgIGFuZHJvaWQ6IHtcclxuICAgICAgICAgICAgICAgIGljb25Db2xvcjogbmV3IENvbG9yKFwiIzIyMjIyMlwiKSAvLyBvcHRpb25hbCwgbGVhdmUgb3V0IGlmIHlvdSBkb24ndCBuZWVkIGl0XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uVGFwOiAoKSA9PiB7IGNvbnNvbGUubG9nKFwic2hvd0N1c3RvbUljb24gdGFwcGVkXCIpIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdmlld01lc3NhZ2VTdWNjZXMobWVuc2FqZSkge1xyXG4gICAgICAgIHRoaXMuZmVlZGJhY2suc3VjY2Vzcyh7XHJcbiAgICAgICAgICAgIHRpdGxlOiBtZW5zYWplLFxyXG4gICAgICAgICAgICB0aXRsZUNvbG9yOiBuZXcgQ29sb3IoXCIjMjIyMjIyXCIpLFxyXG4gICAgICAgICAgICBwb3NpdGlvbjogRmVlZGJhY2tQb3NpdGlvbi5Cb3R0b20sIC8vIGlPUyBvbmx5XHJcbiAgICAgICAgICAgIHR5cGU6IEZlZWRiYWNrVHlwZS5TdWNjZXNzLCAvLyB0aGlzIGlzIHRoZSBkZWZhdWx0IHR5cGUsIGJ5IHRoZSB3YXlcclxuICAgICAgICAgICAgbWVzc2FnZTogJycsXHJcbiAgICAgICAgICAgIG1lc3NhZ2VDb2xvcjogbmV3IENvbG9yKFwiIzMzMzMzM1wiKSxcclxuICAgICAgICAgICAgZHVyYXRpb246IDMwMDAsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKFwiI2ZmYjczMlwiKSxcclxuICAgICAgICAgICAgYW5kcm9pZDoge1xyXG4gICAgICAgICAgICAgICAgaWNvbkNvbG9yOiBuZXcgQ29sb3IoXCIjMjIyMjIyXCIpIC8vIG9wdGlvbmFsLCBsZWF2ZSBvdXQgaWYgeW91IGRvbid0IG5lZWQgaXRcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25UYXA6ICgpID0+IHsgY29uc29sZS5sb2coXCJzaG93Q3VzdG9tSWNvbiB0YXBwZWRcIikgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdmFsaWRhckNhbXBvXHJcbiAgICAqL1xyXG4gICAgcHVibGljIHZhbGlkYXJDYW1wbyhjYW1wbykge1xyXG4gICAgICAgIGlmIChjYW1wby5sZW5ndGggPCAxNSkge1xyXG4gICAgICAgICAgICBsZXQgbWVuc2FqZSA9IFwiRWwgY2FtcG8gXCIgKyBjYW1wbyArIFwiIGVzIG5lY2VzYXJpbyBwYXJhIGNvbnRpbnVhci5cIjtcclxuICAgICAgICAgICAgdGhpcy5tb3N0cmFyTWVuc2EobWVuc2FqZSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgbWVuc2FqZSA9IGNhbXBvO1xyXG4gICAgICAgICAgICB0aGlzLm1vc3RyYXJNZW5zYShtZW5zYWplKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdmFsaWRhdGVTdWNjZXNzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB2YWxpZGF0ZVN1Y2Nlc3MoY2FtcG8pIHtcclxuICAgICAgICBsZXQgbWVuc2FqZSA9IGNhbXBvO1xyXG4gICAgICAgIHRoaXMudmlld01lc3NhZ2VTdWNjZXMobWVuc2FqZSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB2YWxpZGFyRXJyb3Jlc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdmFsaWRhckVycm9yZXMoZXJyb3IpIHtcclxuICAgICAgICBsZXQgbWVuc2FqZTtcclxuICAgICAgICBpZiAoZXJyb3IgPT09IFwiZXJyb3JFbWFpbEV4aXN0XCIpIHtcclxuICAgICAgICAgICAgbWVuc2FqZSA9IFwiRWwgY29ycmVvIGluZ3Jlc2FkbyB5YSBzZSBlbmN1ZW50cmEgcmVnaXN0cmFkby5cIlxyXG4gICAgICAgICAgICB0aGlzLm1vc3RyYXJNZW5zYShtZW5zYWplKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGVycm9yID09ICdlcnJvckVtYWlsJykge1xyXG4gICAgICAgICAgICBtZW5zYWplID0gXCJFbCBjb3JyZW8gaW5ncmVzYWRvIHNlIGVuY3VlbnRyYSBpbmNvbXBsZXRvLlwiXHJcbiAgICAgICAgICAgIHRoaXMubW9zdHJhck1lbnNhKG1lbnNhamUpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZXJyb3IgPT0gJ2Vycm9yVXN1YXJpbycpIHtcclxuICAgICAgICAgICAgbWVuc2FqZSA9IFwiRWwgY29ycmVvIGluZ3Jlc2FkbyBubyBzZSBlbmN1ZW50cmEgcmVnaXN0cmFkbyBlbiBsYSBiYXNlIGRlIGRhdG9zLlwiXHJcbiAgICAgICAgICAgIHRoaXMubW9zdHJhck1lbnNhKG1lbnNhamUpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZXJyb3IgPT0gJ2Vycm9yQ2xhdmUnKSB7XHJcbiAgICAgICAgICAgIG1lbnNhamUgPSBcIkxhIGNvbnRyYXNlw7FhIGluZ3Jlc2FkYSBubyBlcyBjb3JyZWN0YS5cIlxyXG4gICAgICAgICAgICB0aGlzLm1vc3RyYXJNZW5zYShtZW5zYWplKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGVycm9yID09ICdlcnJvckdsb2JhbCcpIHtcclxuICAgICAgICAgICAgbWVuc2FqZSA9IFwiRGlzY3VscGFub3MsIHNlIGVzdGFuIHByZXNlbnRhbmRvIGFsZ3VuYXMgZmFsbGFzLCBwb3IgZmF2b3IgaW50ZW50YWxvIG1hcyB0YXJkZS5cIlxyXG4gICAgICAgICAgICB0aGlzLm1vc3RyYXJNZW5zYShtZW5zYWplKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGVycm9yID09ICdlcnJvckN1ZW50YScpIHtcclxuICAgICAgICAgICAgbWVuc2FqZSA9IFwiTGEgY3VlbnRhIHNlIGVuY3VlbnRyYSBkZXNoYWJpbGl0YWRhLENvbnTDoWN0YW5vcyBwb3IgZmF2b3IuXCI7XHJcbiAgICAgICAgICAgIHRoaXMubW9zdHJhck1lbnNhKG1lbnNhamUpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZXJyb3IgPT09IFwiZXJyb3JDYXJnYW5kb0ltYWdlblwiKSB7XHJcbiAgICAgICAgICAgIG1lbnNhamUgPSBcIkVzdGFtb3MgcHJlc2VudGFuZG8gcHJvYmxlbWFzIHTDqWNuaWNvcyBhbCBjYXJnYXIgbGEgaW1hZ2VuLENvbnTDoWN0YW5vcyBwb3IgZmF2b3IuXCI7XHJcbiAgICAgICAgICAgIHRoaXMubW9zdHJhck1lbnNhKG1lbnNhamUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBlbGltaWFyVGVtcG9yYWxlc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZWxpbWlhclRlbXBvcmFsZXMoKSB7XHJcbiAgICAgICAgc2V0dGluZ3MuY2xlYXIoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjYWxjdWxhckRpc3RhbmNpYUVudHJlQ29vcmRlbmFkYXNcclxuICAgICAqL1xyXG4gICAgLy9wdWJsaWMgY2FsY3VsYXJEaXN0YW5jaWFFbnRyZUNvb3JkZW5hZGFzKGxhdEEsbG9uQSxsYXRCLGxvbkIpIHtcclxuICAgIHB1YmxpYyBjYWxjdWxhckRpc3RhbmNpYUVudHJlQ29vcmRlbmFkYXMobG9uQSwgbGF0QSwgbG9uQiwgbGF0Qikge1xyXG4gICAgICAgIGxldCBSID0gJzYzNzIuNzk1NDc3NTk4JztcclxuICAgICAgICBsYXRBID0gcGFyc2VGbG9hdChsYXRBKTtcclxuICAgICAgICBsb25BID0gcGFyc2VGbG9hdChsb25BKTtcclxuICAgICAgICBsYXRCID0gcGFyc2VGbG9hdChsYXRCKTtcclxuICAgICAgICBsb25CID0gcGFyc2VGbG9hdChsb25CKTtcclxuICAgICAgICBsZXQgUEkgPSAnMy4xNDE2JztcclxuICAgICAgICBsZXQgZGlzdGFuY2lhID0gcGFyc2VGbG9hdChSKSAqIE1hdGguYWNvcygoTWF0aC5zaW4obGF0QSkpICogKE1hdGguc2luKGxhdEIpKSArIChNYXRoLmNvcyhsYXRBKSkgKiAoTWF0aC5jb3MobGF0QikpICogKE1hdGguY29zKGxvbkEgLSBsb25CKSkpXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJFc3RhIGVzIGxhIGRpc3RhbmNpYVwiLCAoZGlzdGFuY2lhICogcGFyc2VGbG9hdChQSSkpIC8gMTgwKTtcclxuICAgICAgICBkaXN0YW5jaWEgPSBkaXN0YW5jaWEgKiBwYXJzZUZsb2F0KFBJKSAvIDE4MDtcclxuICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChkaXN0YW5jaWEudG9GaXhlZCgxKSk7XHJcbiAgICB9XHJcblxyXG4gICAvKipcclxuICogZ2V0VXJsTG9jYXRpb25cclxuICovXHJcbnB1YmxpYyBnZXRVcmxMb2NhdGlvbigpIHtcclxuICAgIGlmICghZ2VvbG9jYXRpb24uaXNFbmFibGVkKCkpIHtcclxuICAgICAgICBnZW9sb2NhdGlvbi5lbmFibGVMb2NhdGlvblJlcXVlc3QoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgZ2VvbG9jYXRpb24uZ2V0Q3VycmVudExvY2F0aW9uKHsgdGltZW91dDogMjAwMDAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGxvY2F0aW9uID0+IHtcclxuICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxhdGl0dWRlID0gbG9jYXRpb24ubGF0aXR1ZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxvbmdpdHVkZSA9IGxvY2F0aW9uLmxvbmdpdHVkZTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxhdGl0dWRcIiArIGxhdGl0dWRlKVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTG9uZ2l0dWRcIiArIGxvbmdpdHVkZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0U3RyaW5nKFwibGF0aXR1ZFwiLCAnJyArIGxhdGl0dWRlKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRTdHJpbmcoXCJsb25naXR1ZFwiLCAnJyArIGxvbmdpdHVkZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxvY2F0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vc2V0U3RyaW5nKFwibGF0aXR1ZFwiLCcnKyc0LjU4OTIwMTYnKTtcclxuICAgICAgICAgICAgICAgICAgICAvL3NldFN0cmluZyhcImxvbmdpdHVkXCIsJycrJy03NC4xMzc4MjgzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmZpcnN0V2ViVmlld1NSQyA9XCJodHRwczovL3d3dy5nb29nbGUuY29tL21hcHMvc2VhcmNoL3ZldGVyaW5hcmlhL0BcIitsYXRpdHVkZStcIixcIitsb25naXR1ZGUrXCIsMjB6XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlVSTCBQQVJBIE1BUEFTXCIrdGhpcy5maXJzdFdlYlZpZXdTUkMpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgcmV0dXJuIGdlb2xvY2F0aW9uLmdldEN1cnJlbnRMb2NhdGlvbih7IHRpbWVvdXQ6IDIwMDAwIH0pXHJcbiAgICAgICAgICAgIC50aGVuKGxvY2F0aW9uID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBsYXRpdHVkZSA9IGxvY2F0aW9uLmxhdGl0dWRlO1xyXG4gICAgICAgICAgICAgICAgbGV0IGxvbmdpdHVkZSA9IGxvY2F0aW9uLmxvbmdpdHVkZTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTGF0aXR1ZFwiICsgbGF0aXR1ZGUpXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxvbmdpdHVkXCIgKyBsb25naXR1ZGUpXHJcbiAgICAgICAgICAgICAgICAvL3NldFN0cmluZyhcImxhdGl0dWRcIiwnJysnNC41ODkyMDE2Jyk7XHJcbiAgICAgICAgICAgICAgICAvL3NldFN0cmluZyhcImxvbmdpdHVkXCIsJycrJy03NC4xMzc4MjgzJyk7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHNldFN0cmluZyhcImxhdGl0dWRcIiwgJycgKyBsYXRpdHVkZSk7XHJcbiAgICAgICAgICAgICAgICBzZXRTdHJpbmcoXCJsb25naXR1ZFwiLCAnJyArIGxvbmdpdHVkZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbG9jYXRpb247XHJcbiAgICAgICAgICAgICAgICAvL3RoaXMuZmlyc3RXZWJWaWV3U1JDID1cImh0dHBzOi8vd3d3Lmdvb2dsZS5jb20vbWFwcy9zZWFyY2gvdmV0ZXJpbmFyaWEvQFwiK2xhdGl0dWRlK1wiLFwiK2xvbmdpdHVkZStcIiwyMHpcIjtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJVUkwgUEFSQSBNQVBBU1wiK3RoaXMuZmlyc3RXZWJWaWV3U1JDKTtcclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG5cclxufVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiBNYXl1c1ByaW1lcmFcclxuICAgICogRnVuY2lvbiBxdWUgcGVybWl0ZSBpbmdyZXNhciBsYSBwcmltZXJhIGxldHJhIGNvbW8gTWF5dXNjdWxhLlxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBNYXl1c1ByaW1lcmEoc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICogdmFsaWRhckVtYWlsXHJcbiAgICAqIEZ1bmNpb24gcXVlIHBlcm1pdGUgdmFsaWRhciBlbCBjb3JyZW9cclxuICAgICovXHJcbiAgICBwdWJsaWMgdmFsaWRhckVtYWlsKHZhbG9yKSB7XHJcbiAgICAgICAgaWYgKC9eKChbXjw+KClbXFxdXFwuLDs6XFxzQFxcXCJdKyhcXC5bXjw+KClbXFxdXFwuLDs6XFxzQFxcXCJdKykqKXwoXFxcIi4rXFxcIikpQCgoW148PigpW1xcXVxcLiw7Olxcc0BcXFwiXStcXC4pK1tePD4oKVtcXF1cXC4sOzpcXHNAXFxcIl17Mix9KSQvaS50ZXN0KHZhbG9yKSl7XHJcbiAgICAgICAgIC8vYWxlcnQoXCJMYSBkaXJlY2Npw7NuIGRlIGVtYWlsIFwiICsgdmFsb3IgKyBcIiBlcyBjb3JyZWN0YSEuXCIpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgLy9hbGVydChcIkxhIGRpcmVjY2nDs24gZGUgZW1haWwgZXMgaW5jb3JyZWN0YSEuXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdmFsaWRhckZvcm1hdE1pbGVzXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB2YWxpZGFyRm9ybWF0TWlsZXMoYW1vdW50LCBkZWNpbWFscykge1xyXG5cclxuICAgICAgICAgICAgYW1vdW50ICs9ICcnOyAvLyBwb3Igc2kgcGFzYW4gdW4gbnVtZXJvIGVuIHZleiBkZSB1biBzdHJpbmdcclxuICAgICAgICAgICAgYW1vdW50ID0gcGFyc2VGbG9hdChhbW91bnQucmVwbGFjZSgvW14wLTlcXC5dL2csICcnKSk7IC8vIGVsaW1pbm8gY3VhbHF1aWVyIGNvc2EgcXVlIG5vIHNlYSBudW1lcm8gbyBwdW50b1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBkZWNpbWFscyA9IGRlY2ltYWxzIHx8IDA7IC8vIHBvciBzaSBsYSB2YXJpYWJsZSBubyBmdWUgZnVlIHBhc2FkYVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gc2kgbm8gZXMgdW4gbnVtZXJvIG8gZXMgaWd1YWwgYSBjZXJvIHJldG9ybm8gZWwgbWlzbW8gY2Vyb1xyXG4gICAgICAgICAgICBpZiAoaXNOYU4oYW1vdW50KSB8fCBhbW91bnQgPT09IDApIFxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQoKCcwJykpLnRvRml4ZWQoZGVjaW1hbHMpO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICAvLyBzaSBlcyBtYXlvciBvIG1lbm9yIHF1ZSBjZXJvIHJldG9ybm8gZWwgdmFsb3IgZm9ybWF0ZWFkbyBjb21vIG51bWVyb1xyXG4gICAgICAgICAgICBhbW91bnQgPSAnJyArIGFtb3VudC50b0ZpeGVkKGRlY2ltYWxzKTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGFtb3VudF9wYXJ0cyA9IGFtb3VudC5zcGxpdCgnLicpLFxyXG4gICAgICAgICAgICAgICAgcmVnZXhwID0gLyhcXGQrKShcXGR7M30pLztcclxuICAgICAgICBcclxuICAgICAgICAgICAgd2hpbGUgKHJlZ2V4cC50ZXN0KGFtb3VudF9wYXJ0c1swXSkpXHJcbiAgICAgICAgICAgICAgICBhbW91bnRfcGFydHNbMF0gPSBhbW91bnRfcGFydHNbMF0ucmVwbGFjZShyZWdleHAsICckMScgKyAnLCcgKyAnJDInKTtcclxuICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIGFtb3VudF9wYXJ0cy5qb2luKCcuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBsb2FkaW5nVmlld1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZGluZ1ZpZXcoKSB7XHJcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdDYXJnYW5kby4uLicsXHJcbiAgICAgICAgICAgIHByb2dyZXNzOiAwLjY1LFxyXG4gICAgICAgICAgICBhbmRyb2lkOiB7XHJcbiAgICAgICAgICAgICAgICBpbmRldGVybWluYXRlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgY2FuY2VsYWJsZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBjYW5jZWxMaXN0ZW5lcjogZnVuY3Rpb24gKGRpYWxvZykgeyBjb25zb2xlLmxvZyhcIkxvYWRpbmcgY2FuY2VsbGVkXCIpIH0sXHJcbiAgICAgICAgICAgICAgICBtYXg6IDEwMCxcclxuICAgICAgICAgICAgICAgIHByb2dyZXNzTnVtYmVyRm9ybWF0OiBcIiUxZC8lMmRcIixcclxuICAgICAgICAgICAgICAgIHByb2dyZXNzUGVyY2VudEZvcm1hdDogMC41MyxcclxuICAgICAgICAgICAgICAgIHByb2dyZXNzU3R5bGU6IDEsXHJcbiAgICAgICAgICAgICAgICBzZWNvbmRhcnlQcm9ncmVzczogMVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpb3M6IHtcclxuICAgICAgICAgICAgICAgIGRldGFpbHM6IFwiQWRkaXRpb25hbCBkZXRhaWwgbm90ZSFcIixcclxuICAgICAgICAgICAgICAgIG1hcmdpbjogMTAsXHJcbiAgICAgICAgICAgICAgICBkaW1CYWNrZ3JvdW5kOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBcIiM0QjlFRDZcIiwgLy8gY29sb3Igb2YgaW5kaWNhdG9yIGFuZCBsYWJlbHNcclxuICAgICAgICAgICAgICAgIC8vIGJhY2tncm91bmQgYm94IGFyb3VuZCBpbmRpY2F0b3JcclxuICAgICAgICAgICAgICAgIC8vIGhpZGVCZXplbCB3aWxsIG92ZXJyaWRlIHRoaXMgaWYgdHJ1ZVxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBcInllbGxvd1wiLFxyXG4gICAgICAgICAgICAgICAgdXNlckludGVyYWN0aW9uRW5hYmxlZDogZmFsc2UsIC8vIGRlZmF1bHQgdHJ1ZS4gU2V0IGZhbHNlIHNvIHRoYXQgdGhlIHRvdWNoZXMgd2lsbCBmYWxsIHRocm91Z2ggaXQuXHJcbiAgICAgICAgICAgICAgICBoaWRlQmV6ZWw6IHRydWUsIC8vIGRlZmF1bHQgZmFsc2UsIGNhbiBoaWRlIHRoZSBzdXJyb3VuZGluZyBiZXplbFxyXG4gICAgICAgICAgICAgICAgLy8gdmlldzogVUlWaWV3LCAvLyBUYXJnZXQgdmlldyB0byBzaG93IG9uIHRvcCBvZiAoRGVmYXVsdHMgdG8gZW50aXJlIHdpbmRvdylcclxuICAgICAgICAgICAgICAgIC8vbW9kZTogLy8gc2VlIGlPUyBzcGVjaWZpYyBvcHRpb25zIGJlbG93XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMubG9hZGVyLnNob3cob3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBsb2FkaW5nSGlkZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZGluZ0hpZGUoKSB7XHJcblxyXG4gICAgICAgIHRoaXMubG9hZGVyLmhpZGUoKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB2YWxpZGF0ZURhdGFSZWdpc3RlclZldHJpbmF0eVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdmFsaWRhdGVEYXRhUmVnaXN0ZXJWZXRyaW5hdHkoaWRVc2VyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpcmViYXNlU2VydmljZS5zZWFyY2hEYXRhVmV0ZXJpbmFyeShpZFVzZXIpLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJFU1BVRVNUQSBBTllcIiArIHJlc3BvbnNlKVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcHVibGljTWVzc2FnZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdmlld01lc3NhZ2UobWVuc2FqZSkge1xyXG4gICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xyXG4gICAgICAgICAgICB0aXRsZTogXCJJbmZvcm1hY2nDs25cIixcclxuICAgICAgICAgICAgbWVzc2FnZTogbWVuc2FqZSxcclxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIkFjZXB0YXJcIlxyXG4gICAgICAgIH0pLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpOyAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iXX0=