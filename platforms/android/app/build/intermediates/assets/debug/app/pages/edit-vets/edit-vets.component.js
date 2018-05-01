"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var global_model_1 = require("../../consts/global.model");
var vets_modal_1 = require("../../modal/vets.modal");
var firebase_service_1 = require("../../services/firebase.service");
var application_settings_1 = require("tns-core-modules/application-settings/application-settings");
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';
var imagepicker = require("nativescript-imagepicker");
var fs = require("file-system");
var firebase = require("nativescript-plugin-firebase");
var EditVetsComponent = /** @class */ (function () {
    function EditVetsComponent(_routEx) {
        this._routEx = _routEx;
        this.tipo1 = "";
        this.tipo2 = "";
        this.tipo3 = "";
        this.tipo4 = "";
        this.tipo5 = "";
        this.tipo6 = "";
        this.opcionDias = "";
        this.opcionHoraInicio = "";
        this.opcionHoraFin = "";
        this.imageAssets = [];
        this.imageSrc = "~/images/placeholder.png";
        this.isSingleMode = true;
        this.thumbSize = 80;
        this.previewSize = 300;
        this._globalComponent = new global_model_1.GlobalComponent();
        this._dataVets = new vets_modal_1.DatosVets();
        this._serviceFirebase = new firebase_service_1.ServiceFirebase();
    }
    EditVetsComponent.prototype.ngOnInit = function () {
        this.getDataVeterinary();
    };
    EditVetsComponent.prototype.onFirstChecked = function (args) {
        if (this._seleccion1 == false) {
            this._seleccion1 = true;
            this.tipo1 = "Clinica Veterinaria";
        }
        else {
            this._seleccion1 = false;
            this.tipo1 = "";
        }
    };
    EditVetsComponent.prototype.onSecondChecked = function (args) {
        if (this._seleccion2 == false) {
            this._seleccion2 = true;
            this.tipo2 = "Tienda Veterinaria";
        }
        else {
            this._seleccion2 = false;
            this.tipo2 = "";
        }
    };
    EditVetsComponent.prototype.onThreeChecked = function (args) {
        if (this._seleccion3 == false) {
            this._seleccion3 = true;
            this.tipo3 = "Spa Veterinario";
        }
        else {
            this._seleccion3 = false;
            this.tipo3 = "";
        }
    };
    EditVetsComponent.prototype.onFourChecked = function (args) {
        if (this._seleccion4 == false) {
            this._seleccion4 = true;
            this.tipo4 = "Funeraria Veterinaria";
        }
        else {
            this._seleccion4 = false;
            this.tipo4 = "";
        }
    };
    EditVetsComponent.prototype.onFiveChecked = function (args) {
        if (this._seleccion5 == false) {
            this._seleccion5 = true;
            this.tipo5 = "Guarderia Veterinaria";
        }
        else {
            this._seleccion5 = false;
            this.tipo5 = "";
        }
    };
    EditVetsComponent.prototype.onSixChecked = function (args) {
        if (this._seleccion6 == false) {
            this._seleccion6 = true;
            this.tipo6 = "Escuela Veterinaria";
        }
        else {
            this._seleccion6 = false;
            this.tipo6 = "";
        }
    };
    /**
     * validarDatos
     */
    EditVetsComponent.prototype.validarDatos = function () {
        if (this._seleccion1 !== false || this._seleccion2 !== false || this._seleccion3 !== false || this._seleccion4 !== false || this._seleccion5 !== false || this._seleccion6 !== false) {
            var cadena = this.tipo1 + "," + this.tipo2 + "," + this.tipo3 + "," + this.tipo4 + "," + this.tipo5 + "," + this.tipo6;
            console.log("Esta es la cadena" + cadena);
            var arreglo = cadena.split(",");
            cadena = "";
            for (var index = 0; index < arreglo.length; index++) {
                var dato = arreglo[index];
                if (dato !== "") {
                    if (cadena === "") {
                        cadena = dato;
                    }
                    else {
                        cadena = cadena + " , " + dato;
                    }
                }
            }
            console.log("Esta es la cadena Final" + cadena);
            this._dataVets._tipoVet = cadena;
            //this.changeTab();
            //setString("cadenaTipo",''+cadena);
            //this._modal.closeCallback();
            //this._errorMensaje = ("");
        }
        else {
            this._globalComponent.validarCampo("selecciona una opción tipo Vets");
        }
    };
    EditVetsComponent.prototype.onFirstCheckeds = function (args) {
        var dato = this.switch.nativeElement;
        var dato1 = this.switch1.nativeElement;
        var dato2 = this.switch2.nativeElement;
        if (dato.checked === true) {
            dato1.checked = false;
            dato2.checked = false;
            this.opcionDias = "Lunes a Viernes";
        }
        else {
            this.opcionDias = "";
        }
    };
    EditVetsComponent.prototype.onSecondCheckeds = function (args) {
        var dato = this.switch.nativeElement;
        var dato1 = this.switch1.nativeElement;
        var dato2 = this.switch2.nativeElement;
        if (dato1.checked === true) {
            dato.checked = false;
            dato2.checked = false;
            this.opcionDias = "Lunes a Sabado";
        }
        else {
            this.opcionDias = "";
        }
    };
    EditVetsComponent.prototype.onThreeCheckeds = function (args) {
        var dato = this.switch.nativeElement;
        var dato1 = this.switch1.nativeElement;
        var dato2 = this.switch2.nativeElement;
        if (dato2.checked === true) {
            dato.checked = false;
            dato1.checked = false;
            this.opcionDias = "Lunes a Domingo";
        }
        else {
            this.opcionDias = "";
        }
    };
    EditVetsComponent.prototype.onTimeChanged = function (args) {
        var res = args.value;
        console.log(res);
        var fecha = res.toString();
        var tamano = fecha.length;
        fecha = fecha.substring(16, tamano);
        var horas = fecha.substring(0, 8);
        var hora = horas.substring(0, 2);
        var minutos = horas.substring(3, 5);
        //hora = hora.parseInt();
        var zona = "AM";
        var numero = parseInt(hora);
        if (hora === '00') {
            hora = "12";
        }
        else {
            if (numero > 12) {
                hora = hora - 12;
                zona = "PM";
            }
            if (numero === 12) {
                zona = "PM";
            }
        }
        if (hora < 10 && hora.length < 2) {
            hora = "0" + hora;
        }
        var horaFinal = hora + ":" + minutos + " " + zona;
        console.log("HORA INICIAL PARA GUARDAR" + horaFinal);
        this.opcionHoraInicio = horaFinal;
    };
    EditVetsComponent.prototype.onTimeChangeds = function (args) {
        var res = args.value;
        console.log(res);
        var fecha = res.toString();
        var tamano = fecha.length;
        fecha = fecha.substring(16, tamano);
        var horas = fecha.substring(0, 8);
        var hora = horas.substring(0, 2);
        var minutos = horas.substring(3, 5);
        //hora = hora.parseInt();
        var zona = "AM";
        var numero = parseInt(hora);
        if (hora === '00') {
            hora = "12";
        }
        else {
            if (numero > 12) {
                hora = hora - 12;
                zona = "PM";
            }
            if (numero === 12) {
                zona = "PM";
            }
        }
        if (hora < 10 && hora.length < 2) {
            hora = "0" + hora;
        }
        var horaFinal = hora + ":" + minutos + " " + zona;
        console.log("HORA INICIAL PARA GUARDAR" + horaFinal);
        this.opcionHoraFin = horaFinal;
    };
    EditVetsComponent.prototype.validarDatosDOS = function () {
        if (this.opcionDias !== "") {
            //setString('opcionDias',''+this.opcionDias);
            //setString('opcionHora',''+this.opcionHoraInicio + " a " + this.opcionHoraFin);
            //this._modal.closeCallback();
            this._dataVets._diasAtencionVet = this.opcionDias;
            this._dataVets._horarioVet = this.opcionHoraInicio + " a " + this.opcionHoraFin;
            //this.changeTab();
        }
        else {
            this._globalComponent.validarCampo("selecciona una opción de dias de atención.");
        }
    };
    /**
     * getDataVeterinary
     */
    EditVetsComponent.prototype.getDataVeterinary = function () {
        var _this = this;
        this._globalComponent.loadingView();
        var iduser = application_settings_1.getString("idLogin");
        this._serviceFirebase.searchDataVeterinary(iduser).then(function (response) {
            console.log("RESP" + JSON.stringify(response));
            if (response.value !== null) {
                //this._viewShared = true;
                //this._viewAdd = false;
                console.log("RESP" + JSON.stringify(response.value.veterinaria));
                var data = response.value.veterinaria;
                _this._dataVets._nombreVet = data.nombre;
                _this._dataVets._lemaVet = data.lema;
                _this._dataVets._image = data.image;
                _this._dataVets._descripcionVet = data.descripcion;
                _this._dataVets._tipoVet = data.tipo_vets;
                _this._dataVets._correoVet = data.correo;
                _this._dataVets._direccionVet = data.direccion;
                _this._dataVets._telefonoVet = data.telefono;
                _this._dataVets._celularVet = data.celular;
                _this._dataVets._paginaWebVet = data.pagina_web;
                _this._dataVets._horarioVet = data.dias + " de " + data.horario;
                _this._dataVets._facebookVets = data.facebook;
                _this._dataVets._twitterVets = data.twitter;
                _this._dataVets._InstagramVets = data.instagram;
                _this._dataVets._whatSappVets = data.whatsapp;
                if (_this._dataVets._facebookVets !== null && _this._dataVets._facebookVets !== "" && _this._dataVets._facebookVets !== undefined) {
                    //this._viewF = true;
                }
                if (_this._dataVets._twitterVets !== null && _this._dataVets._twitterVets !== "" && _this._dataVets._twitterVets !== undefined) {
                    //this._viewT = true;
                }
                if (_this._dataVets._InstagramVets !== null && _this._dataVets._InstagramVets !== "" && _this._dataVets._InstagramVets !== undefined) {
                    //this._viewI = true;
                }
                if (_this._dataVets._whatSappVets !== null && _this._dataVets._whatSappVets !== "" && _this._dataVets._whatSappVets !== undefined) {
                    //this._viewW = true;
                }
                _this.validarMetodos();
            }
            else {
                //this._viewShared = false;
                //this._viewAdd = true;
            }
        });
    };
    /**
     * validarMetodos
     */
    EditVetsComponent.prototype.validarMetodos = function () {
        ///valida tipo veterinaria
        var tipo = [];
        tipo = this._dataVets._tipoVet.split(',');
        for (var i = 0; i < tipo.length; i++) {
            if (tipo[i].trim() === "Clinica Veterinaria") {
                this._seleccion1 = true;
                this.tipo1 = "Clinica Veterinaria";
            }
            if (tipo[i].trim() === "Tienda Veterinaria") {
                this._seleccion2 = true;
                this.tipo2 = "Tienda Veterinaria";
            }
            if (tipo[i].trim() === "Spa Veterinario") {
                this._seleccion3 = true;
                this.tipo3 = "Spa Veterinario";
            }
            if (tipo[i].trim() === "Funeraria Veterinaria") {
                this._seleccion4 = true;
                this.tipo4 = "Funeraria Veterinaria";
            }
            if (tipo[i].trim() === "Guarderia Veterinaria") {
                this._seleccion5 = true;
                this.tipo5 = "Guarderia Veterinaria";
            }
            if (tipo[i].trim() === "Escuela Veterinaria") {
                this._seleccion6 = true;
                this.tipo6 = "Escuela Veterinaria";
            }
        }
        this._globalComponent.loadingHide();
    };
    /**
     * saveVets
     */
    EditVetsComponent.prototype.saveVets = function () {
        this._globalComponent.loadingView();
        if (this._seleccion1 !== false || this._seleccion2 !== false || this._seleccion3 !== false || this._seleccion4 !== false || this._seleccion5 !== false || this._seleccion6 !== false) {
            if (this._dataVets._image !== "" && this._dataVets._image !== null && this._dataVets._image !== undefined) {
                if (this._dataVets._nombreVet !== "" && this._dataVets._nombreVet !== null && this._dataVets._nombreVet !== undefined) {
                    if (this._dataVets._direccionVet !== "" && this._dataVets._direccionVet !== null && this._dataVets._direccionVet !== undefined) {
                        if (this._dataVets._telefonoVet !== "" && this._dataVets._telefonoVet !== null && this._dataVets._telefonoVet !== undefined) {
                            if (this._dataVets._celularVet !== "" && this._dataVets._celularVet !== null && this._dataVets._celularVet !== undefined) {
                                if (this.opcionDias !== "") {
                                    //setString('opcionDias',''+this.opcionDias);
                                    //setString('opcionHora',''+this.opcionHoraInicio + " a " + this.opcionHoraFin);
                                    //this._modal.closeCallback();
                                    //this.changeTab();
                                    var id = application_settings_1.getString("idLogin");
                                    this.subirImagen(this._pathImg, id + "/veterinaria/logo");
                                }
                                else {
                                    this._globalComponent.validarCampo("selecciona una opción de dias de atención.");
                                    this._globalComponent.loadingHide();
                                }
                            }
                            else {
                                this._globalComponent.validarCampo("celular");
                                this._globalComponent.loadingHide();
                            }
                        }
                        else {
                            this._globalComponent.validarCampo("telefono");
                            this._globalComponent.loadingHide();
                        }
                    }
                    else {
                        this._globalComponent.validarCampo("dirección");
                        this._globalComponent.loadingHide();
                    }
                }
                else {
                    this._globalComponent.validarCampo("nombre");
                    this._globalComponent.loadingHide();
                }
            }
            else {
                this._globalComponent.validarCampo("imagen");
                this._globalComponent.loadingHide();
            }
        }
        else {
            this._globalComponent.validarCampo("selecciona una opción tipo Vets");
            this._globalComponent.loadingHide();
        }
    };
    /**
     * name
     */
    EditVetsComponent.prototype.onSelectSingleTap = function () {
        this.isSingleMode = true;
        var context = imagepicker.create({
            mode: "single"
        });
        this.startSelection(context);
    };
    EditVetsComponent.prototype.startSelection = function (context) {
        var _this = this;
        var that = this;
        context
            .authorize()
            .then(function () {
            that.imageAssets = [];
            that.imageSrc = null;
            return context.present();
        })
            .then(function (selection) {
            console.log("Selection done: " + JSON.stringify(selection));
            that.imageSrc = that.isSingleMode && selection.length > 0 ? selection[0] : null;
            console.log("Esta es la ruta imagen" + selection[0]._android);
            var id = application_settings_1.getString("idLogin");
            _this._pathImg = selection[0]._android;
            _this._dataVets._image = _this._pathImg;
            console.log("Path para guardar las imagenes" + id + "/veterinaria/veterinaria1");
            //this.subirImagen(selection[0]._android,id+"/veterinaria/logo");
            // set the images to be loaded from the assets with optimal sizes (optimize memory usage)
            selection.forEach(function (element) {
                element.options.width = that.isSingleMode ? that.previewSize : that.thumbSize;
                element.options.height = that.isSingleMode ? that.previewSize : that.thumbSize;
            });
            that.imageAssets = selection;
        }).catch(function (e) {
            console.log(e);
        });
    };
    EditVetsComponent.prototype.subirImagen = function (paths, _imgName) {
        var _this = this;
        var appPath = fs.knownFolders.currentApp().path;
        console.log(appPath);
        // determine the path to a file in the app/res folder
        //var logoPath = appPath + "/images/veterinary.png";
        var logoPath = paths;
        // now upload the file with either of the options below:
        firebase.uploadFile({
            // optional, can also be passed during init() as 'storageBucket' param so we can cache it (find it in the Firebase console)
            bucket: "gs://vetscol-1.appspot.com",
            // the full path of the file in your Firebase storage (folders will be created)
            remoteFullPath: _imgName + '.png',
            // option 1: a file-system module File object
            localFile: fs.File.fromPath(logoPath),
            // option 2: a full file path (ignored if 'localFile' is set)
            localFullPath: logoPath,
            // get notified of file upload progress
            onProgress: function (status) {
                console.log("Uploaded fraction: " + status.fractionCompleted);
                console.log("Percentage complete: " + status.percentageCompleted);
            }
        }).then(function (uploadedFile) {
            console.log("File uploaded: " + JSON.stringify(uploadedFile));
            console.log("File uploaded: " + JSON.stringify(uploadedFile));
            _this.getFownloadUrl(_imgName);
        }).catch(function (err) {
            console.log(err);
            _this._globalComponent.loadingHide();
        });
    };
    EditVetsComponent.prototype.getFownloadUrl = function (_imgName) {
        var _this = this;
        firebase.getDownloadUrl({
            // optional, can also be passed during init() as 'storageBucket' param so we can cache it
            bucket: "gs://vetscol-1.appspot.com",
            // the full path of an existing file in your Firebase storage
            remoteFullPath: _imgName + '.png'
        }).then(function (url) {
            console.log("Remote URL: " + url);
            console.log("Remote URL: " + url);
            _this._dataVets._image = url;
            _this.addVeterinaryVets();
        }).catch(function (error) {
            console.log("Error: " + error);
            error = "errorCargandoImagen";
            _this._globalComponent.validarErrores(error);
            _this._globalComponent.loadingHide();
        });
    };
    /**
     * addProductosVets
     */
    EditVetsComponent.prototype.addVeterinaryVets = function () {
        var _this = this;
        this._serviceFirebase.crearRegistroVets(this._dataVets).then(function (response) {
            console.log(JSON.stringify(response));
            _this._globalComponent.loadingHide();
            if (response === "guardado") {
                _this._globalComponent.validateSuccess("Veterinaria actualizada correctamente");
                _this._routEx.navigate(['create-vets'], { clearHistory: true,
                    transition: {
                        name: "slideRight",
                        duration: 400,
                        curve: "ease"
                    }
                });
                //this.searchDataVeterinaryUsuarios();
            }
            else {
                _this._globalComponent.validarErrores(response);
            }
        });
    };
    __decorate([
        core_1.ViewChild("switch6"),
        __metadata("design:type", core_1.ElementRef)
    ], EditVetsComponent.prototype, "switch", void 0);
    __decorate([
        core_1.ViewChild("switch7"),
        __metadata("design:type", core_1.ElementRef)
    ], EditVetsComponent.prototype, "switch1", void 0);
    __decorate([
        core_1.ViewChild("switch8"),
        __metadata("design:type", core_1.ElementRef)
    ], EditVetsComponent.prototype, "switch2", void 0);
    EditVetsComponent = __decorate([
        core_1.Component({
            selector: 'edit-vets',
            templateUrl: './pages/edit-vets/edit-vets.component.html',
            styleUrls: ['./pages/edit-vets/edit-vets.component.css']
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions])
    ], EditVetsComponent);
    return EditVetsComponent;
}());
exports.EditVetsComponent = EditVetsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC12ZXRzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVkaXQtdmV0cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUU7QUFDekUsc0RBQStEO0FBQy9ELDBEQUE0RDtBQUM1RCxxREFBbUQ7QUFDbkQsb0VBQWtFO0FBQ2xFLG1HQUF1RjtBQUN2RiwwREFBMEQ7QUFDMUQsNENBQTRDO0FBQzVDLDhDQUE4QztBQUM5QyxtREFBbUQ7QUFHbkQsc0RBQXdEO0FBQ3hELGdDQUFrQztBQUNsQyx1REFBeUQ7QUFRekQ7SUFNQywyQkFBb0IsT0FBeUI7UUFBekIsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7UUFpQjdDLFVBQUssR0FBRyxFQUFFLENBQUM7UUFDWCxVQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ1gsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUNYLFVBQUssR0FBRyxFQUFFLENBQUM7UUFDWCxVQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ1gsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQXlHWCxlQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLHFCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUN0QixrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQThSbkIsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsYUFBUSxHQUFHLDBCQUEwQixDQUFDO1FBQ3RDLGlCQUFZLEdBQVksSUFBSSxDQUFDO1FBQzdCLGNBQVMsR0FBVyxFQUFFLENBQUM7UUFDdkIsZ0JBQVcsR0FBVyxHQUFHLENBQUM7UUFsYXpCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLDhCQUFlLEVBQUUsQ0FBQztRQUM5QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksc0JBQVMsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLGtDQUFlLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBRUQsb0NBQVEsR0FBUjtRQUNDLElBQUksQ0FBQyxp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dUMsQ0FBQyxDQUFDO2dCQUMvRSxLQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUMsWUFBWSxFQUFDLElBQUk7b0JBQ3pDLFVBQVUsRUFBRTt3QkFDUixJQUFJLEVBQUUsWUFBWTt3QkFDbEIsUUFBUSxFQUFFLEdBQUc7d0JBQ2IsS0FBSyxFQUFFLE1BQU07cUJBQ2hCO2lCQUNoQixDQUFDLENBQUM7Z0JBQ0gsc0NBQXNDO1lBQ3ZDLENBQUM7WUFBQSxJQUFJLENBQUEsQ0FBQztnQkFDTCxLQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2hELENBQUM7UUFDRixDQUFDLENBQUMsQ0FBQTtJQUNILENBQUM7SUE5WnFCO1FBQXJCLGdCQUFTLENBQUMsU0FBUyxDQUFDO2tDQUFTLGlCQUFVO3FEQUFDO0lBQ25CO1FBQXJCLGdCQUFTLENBQUMsU0FBUyxDQUFDO2tDQUFVLGlCQUFVO3NEQUFDO0lBQ3BCO1FBQXJCLGdCQUFTLENBQUMsU0FBUyxDQUFDO2tDQUFVLGlCQUFVO3NEQUFDO0lBbkk5QixpQkFBaUI7UUFON0IsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFdBQVcsRUFBRSw0Q0FBNEM7WUFDekQsU0FBUyxFQUFFLENBQUMsMkNBQTJDLENBQUM7U0FDeEQsQ0FBQzt5Q0FRNEIseUJBQWdCO09BTmpDLGlCQUFpQixDQWtpQjdCO0lBQUQsd0JBQUM7Q0FBQSxBQWxpQkQsSUFraUJDO0FBbGlCWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEdsb2JhbENvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvbnN0cy9nbG9iYWwubW9kZWwnO1xuaW1wb3J0IHsgRGF0b3NWZXRzIH0gZnJvbSAnLi4vLi4vbW9kYWwvdmV0cy5tb2RhbCc7XG5pbXBvcnQgeyBTZXJ2aWNlRmlyZWJhc2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlJztcbmltcG9ydCB7IGdldFN0cmluZyB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24tc2V0dGluZ3MvYXBwbGljYXRpb24tc2V0dGluZ3MnO1xuLy9pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXInO1xuLy9pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tICd1aS90ZXh0LWZpZWxkJztcbi8vaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcbi8vaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5cbmltcG9ydCAqIGFzIGltYWdlcGlja2VyIGZyb20gXCJuYXRpdmVzY3JpcHQtaW1hZ2VwaWNrZXJcIjtcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmaWxlLXN5c3RlbVwiO1xuaW1wb3J0ICogYXMgZmlyZWJhc2UgZnJvbSBcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIjtcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnZWRpdC12ZXRzJyxcblx0dGVtcGxhdGVVcmw6ICcuL3BhZ2VzL2VkaXQtdmV0cy9lZGl0LXZldHMuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnLi9wYWdlcy9lZGl0LXZldHMvZWRpdC12ZXRzLmNvbXBvbmVudC5jc3MnXVxufSlcblxuZXhwb3J0IGNsYXNzIEVkaXRWZXRzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblx0XG5cdF9wYXRoSW1nOiBhbnk7XG5cdF9zZXJ2aWNlRmlyZWJhc2U6IFNlcnZpY2VGaXJlYmFzZTtcblx0X2RhdGFWZXRzOiBEYXRvc1ZldHM7XG5cdF9nbG9iYWxDb21wb25lbnQ6IEdsb2JhbENvbXBvbmVudDtcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBfcm91dEV4OiBSb3V0ZXJFeHRlbnNpb25zKSB7XG5cdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50ID0gbmV3IEdsb2JhbENvbXBvbmVudCgpO1xuXHRcdHRoaXMuX2RhdGFWZXRzID0gbmV3IERhdG9zVmV0cygpO1xuXHRcdHRoaXMuX3NlcnZpY2VGaXJlYmFzZSA9IG5ldyBTZXJ2aWNlRmlyZWJhc2UoKTtcblx0fVxuXG5cdG5nT25Jbml0KCkge1xuXHRcdHRoaXMuZ2V0RGF0YVZldGVyaW5hcnkoKTtcblx0fVxuXG5cdF9zZWxlY2Npb24xOiBib29sZWFuO1xuXHRfc2VsZWNjaW9uMjogYm9vbGVhbjtcblx0X3NlbGVjY2lvbjM6IGJvb2xlYW47XG5cdF9zZWxlY2Npb240OiBib29sZWFuO1xuXHRfc2VsZWNjaW9uNTogYm9vbGVhbjtcblx0X3NlbGVjY2lvbjY6IGJvb2xlYW47XG5cblx0dGlwbzEgPSBcIlwiO1xuXHR0aXBvMiA9IFwiXCI7XG5cdHRpcG8zID0gXCJcIjtcblx0dGlwbzQgPSBcIlwiO1xuXHR0aXBvNSA9IFwiXCI7XG5cdHRpcG82ID0gXCJcIjtcblxuXHRwdWJsaWMgb25GaXJzdENoZWNrZWQoYXJncykge1xuXHRcdGlmICh0aGlzLl9zZWxlY2Npb24xID09IGZhbHNlKSB7XG5cdFx0XHR0aGlzLl9zZWxlY2Npb24xID0gdHJ1ZTtcblx0XHRcdHRoaXMudGlwbzEgPSBcIkNsaW5pY2EgVmV0ZXJpbmFyaWFcIjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fc2VsZWNjaW9uMSA9IGZhbHNlO1xuXHRcdFx0dGhpcy50aXBvMSA9IFwiXCI7XG5cdFx0fVxuXHR9XG5cblx0cHVibGljIG9uU2Vjb25kQ2hlY2tlZChhcmdzKSB7XG5cdFx0aWYgKHRoaXMuX3NlbGVjY2lvbjIgPT0gZmFsc2UpIHtcblx0XHRcdHRoaXMuX3NlbGVjY2lvbjIgPSB0cnVlO1xuXHRcdFx0dGhpcy50aXBvMiA9IFwiVGllbmRhIFZldGVyaW5hcmlhXCI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX3NlbGVjY2lvbjIgPSBmYWxzZTtcblx0XHRcdHRoaXMudGlwbzIgPSBcIlwiO1xuXHRcdH1cblx0fVxuXG5cdHB1YmxpYyBvblRocmVlQ2hlY2tlZChhcmdzKSB7XG5cdFx0aWYgKHRoaXMuX3NlbGVjY2lvbjMgPT0gZmFsc2UpIHtcblx0XHRcdHRoaXMuX3NlbGVjY2lvbjMgPSB0cnVlO1xuXHRcdFx0dGhpcy50aXBvMyA9IFwiU3BhIFZldGVyaW5hcmlvXCI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX3NlbGVjY2lvbjMgPSBmYWxzZTtcblx0XHRcdHRoaXMudGlwbzMgPSBcIlwiO1xuXHRcdH1cblx0fVxuXG5cdHB1YmxpYyBvbkZvdXJDaGVja2VkKGFyZ3MpIHtcblx0XHRpZiAodGhpcy5fc2VsZWNjaW9uNCA9PSBmYWxzZSkge1xuXHRcdFx0dGhpcy5fc2VsZWNjaW9uNCA9IHRydWU7XG5cdFx0XHR0aGlzLnRpcG80ID0gXCJGdW5lcmFyaWEgVmV0ZXJpbmFyaWFcIjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fc2VsZWNjaW9uNCA9IGZhbHNlO1xuXHRcdFx0dGhpcy50aXBvNCA9IFwiXCI7XG5cdFx0fVxuXHR9XG5cblx0cHVibGljIG9uRml2ZUNoZWNrZWQoYXJncykge1xuXHRcdGlmICh0aGlzLl9zZWxlY2Npb241ID09IGZhbHNlKSB7XG5cdFx0XHR0aGlzLl9zZWxlY2Npb241ID0gdHJ1ZTtcblx0XHRcdHRoaXMudGlwbzUgPSBcIkd1YXJkZXJpYSBWZXRlcmluYXJpYVwiO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9zZWxlY2Npb241ID0gZmFsc2U7XG5cdFx0XHR0aGlzLnRpcG81ID0gXCJcIjtcblx0XHR9XG5cdH1cblxuXHRwdWJsaWMgb25TaXhDaGVja2VkKGFyZ3MpIHtcblx0XHRpZiAodGhpcy5fc2VsZWNjaW9uNiA9PSBmYWxzZSkge1xuXHRcdFx0dGhpcy5fc2VsZWNjaW9uNiA9IHRydWU7XG5cdFx0XHR0aGlzLnRpcG82ID0gXCJFc2N1ZWxhIFZldGVyaW5hcmlhXCI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX3NlbGVjY2lvbjYgPSBmYWxzZTtcblx0XHRcdHRoaXMudGlwbzYgPSBcIlwiO1xuXHRcdH1cblx0fVxuXG5cblxuXHQvKipcblx0ICogdmFsaWRhckRhdG9zXG5cdCAqL1xuXHRwdWJsaWMgdmFsaWRhckRhdG9zKCkge1xuXHRcdGlmICh0aGlzLl9zZWxlY2Npb24xICE9PSBmYWxzZSB8fCB0aGlzLl9zZWxlY2Npb24yICE9PSBmYWxzZSB8fCB0aGlzLl9zZWxlY2Npb24zICE9PSBmYWxzZSB8fCB0aGlzLl9zZWxlY2Npb240ICE9PSBmYWxzZSB8fCB0aGlzLl9zZWxlY2Npb241ICE9PSBmYWxzZSB8fCB0aGlzLl9zZWxlY2Npb242ICE9PSBmYWxzZSkge1xuXG5cdFx0XHRsZXQgY2FkZW5hID0gdGhpcy50aXBvMSArIFwiLFwiICsgdGhpcy50aXBvMiArIFwiLFwiICsgdGhpcy50aXBvMyArIFwiLFwiICsgdGhpcy50aXBvNCArIFwiLFwiICsgdGhpcy50aXBvNSArIFwiLFwiICsgdGhpcy50aXBvNjtcblx0XHRcdGNvbnNvbGUubG9nKFwiRXN0YSBlcyBsYSBjYWRlbmFcIiArIGNhZGVuYSk7XG5cdFx0XHRsZXQgYXJyZWdsbyA9IGNhZGVuYS5zcGxpdChcIixcIik7XG5cdFx0XHRjYWRlbmEgPSBcIlwiO1xuXHRcdFx0Zm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IGFycmVnbG8ubGVuZ3RoOyBpbmRleCsrKSB7XG5cdFx0XHRcdGxldCBkYXRvID0gYXJyZWdsb1tpbmRleF07XG5cdFx0XHRcdGlmIChkYXRvICE9PSBcIlwiKSB7XG5cdFx0XHRcdFx0aWYgKGNhZGVuYSA9PT0gXCJcIikge1xuXHRcdFx0XHRcdFx0Y2FkZW5hID0gZGF0bztcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Y2FkZW5hID0gY2FkZW5hICsgXCIgLCBcIiArIGRhdG87XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdH1cblx0XHRcdGNvbnNvbGUubG9nKFwiRXN0YSBlcyBsYSBjYWRlbmEgRmluYWxcIiArIGNhZGVuYSk7XG5cdFx0XHR0aGlzLl9kYXRhVmV0cy5fdGlwb1ZldCA9IGNhZGVuYTtcblx0XHRcdC8vdGhpcy5jaGFuZ2VUYWIoKTtcblx0XHRcdC8vc2V0U3RyaW5nKFwiY2FkZW5hVGlwb1wiLCcnK2NhZGVuYSk7XG5cdFx0XHQvL3RoaXMuX21vZGFsLmNsb3NlQ2FsbGJhY2soKTtcblx0XHRcdC8vdGhpcy5fZXJyb3JNZW5zYWplID0gKFwiXCIpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQudmFsaWRhckNhbXBvKFwic2VsZWNjaW9uYSB1bmEgb3BjacOzbiB0aXBvIFZldHNcIik7XG5cdFx0fVxuXHR9XG5cblx0LypcbipmdW5jaW9uZXMgcGFyYSB2YWxpZGFyIGxvcyBkaWFzIHkgaG9yYXMgZGUgZnVuY2lvbmFtaWVudG9cbiovXG5cblx0X2Vycm9yTWVuc2FqZTogc3RyaW5nO1xuXHRAVmlld0NoaWxkKFwic3dpdGNoNlwiKSBzd2l0Y2g6IEVsZW1lbnRSZWY7XG5cdEBWaWV3Q2hpbGQoXCJzd2l0Y2g3XCIpIHN3aXRjaDE6IEVsZW1lbnRSZWY7XG5cdEBWaWV3Q2hpbGQoXCJzd2l0Y2g4XCIpIHN3aXRjaDI6IEVsZW1lbnRSZWY7XG5cblx0b3BjaW9uRGlhcyA9IFwiXCI7XG5cdG9wY2lvbkhvcmFJbmljaW8gPSBcIlwiO1xuXHRvcGNpb25Ib3JhRmluID0gXCJcIjtcblxuXHRwdWJsaWMgb25GaXJzdENoZWNrZWRzKGFyZ3MpIHtcblx0XHRsZXQgZGF0byA9IHRoaXMuc3dpdGNoLm5hdGl2ZUVsZW1lbnQ7XG5cdFx0bGV0IGRhdG8xID0gdGhpcy5zd2l0Y2gxLm5hdGl2ZUVsZW1lbnQ7XG5cdFx0bGV0IGRhdG8yID0gdGhpcy5zd2l0Y2gyLm5hdGl2ZUVsZW1lbnQ7XG5cdFx0aWYgKGRhdG8uY2hlY2tlZCA9PT0gdHJ1ZSkge1xuXHRcdFx0ZGF0bzEuY2hlY2tlZCA9IGZhbHNlO1xuXHRcdFx0ZGF0bzIuY2hlY2tlZCA9IGZhbHNlO1xuXHRcdFx0dGhpcy5vcGNpb25EaWFzID0gXCJMdW5lcyBhIFZpZXJuZXNcIjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5vcGNpb25EaWFzID0gXCJcIjtcblx0XHR9XG5cblxuXG5cblx0fVxuXG5cdHB1YmxpYyBvblNlY29uZENoZWNrZWRzKGFyZ3MpIHtcblx0XHRsZXQgZGF0byA9IHRoaXMuc3dpdGNoLm5hdGl2ZUVsZW1lbnQ7XG5cdFx0bGV0IGRhdG8xID0gdGhpcy5zd2l0Y2gxLm5hdGl2ZUVsZW1lbnQ7XG5cdFx0bGV0IGRhdG8yID0gdGhpcy5zd2l0Y2gyLm5hdGl2ZUVsZW1lbnQ7XG5cdFx0aWYgKGRhdG8xLmNoZWNrZWQgPT09IHRydWUpIHtcblx0XHRcdGRhdG8uY2hlY2tlZCA9IGZhbHNlO1xuXHRcdFx0ZGF0bzIuY2hlY2tlZCA9IGZhbHNlO1xuXHRcdFx0dGhpcy5vcGNpb25EaWFzID0gXCJMdW5lcyBhIFNhYmFkb1wiO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLm9wY2lvbkRpYXMgPSBcIlwiO1xuXHRcdH1cblxuXHR9XG5cdHB1YmxpYyBvblRocmVlQ2hlY2tlZHMoYXJncykge1xuXHRcdGxldCBkYXRvID0gdGhpcy5zd2l0Y2gubmF0aXZlRWxlbWVudDtcblx0XHRsZXQgZGF0bzEgPSB0aGlzLnN3aXRjaDEubmF0aXZlRWxlbWVudDtcblx0XHRsZXQgZGF0bzIgPSB0aGlzLnN3aXRjaDIubmF0aXZlRWxlbWVudDtcblxuXHRcdGlmIChkYXRvMi5jaGVja2VkID09PSB0cnVlKSB7XG5cdFx0XHRkYXRvLmNoZWNrZWQgPSBmYWxzZTtcblx0XHRcdGRhdG8xLmNoZWNrZWQgPSBmYWxzZTtcblx0XHRcdHRoaXMub3BjaW9uRGlhcyA9IFwiTHVuZXMgYSBEb21pbmdvXCI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMub3BjaW9uRGlhcyA9IFwiXCI7XG5cdFx0fVxuXG5cblx0fVxuXG5cdG9uVGltZUNoYW5nZWQoYXJncykge1xuXHRcdGxldCByZXMgPSBhcmdzLnZhbHVlO1xuXHRcdGNvbnNvbGUubG9nKHJlcyk7XG5cdFx0bGV0IGZlY2hhID0gcmVzLnRvU3RyaW5nKCk7XG5cdFx0bGV0IHRhbWFubyA9IGZlY2hhLmxlbmd0aDtcblx0XHRmZWNoYSA9IGZlY2hhLnN1YnN0cmluZygxNiwgdGFtYW5vKTtcblx0XHRsZXQgaG9yYXMgPSBmZWNoYS5zdWJzdHJpbmcoMCwgOCk7XG5cdFx0bGV0IGhvcmEgPSBob3Jhcy5zdWJzdHJpbmcoMCwgMik7XG5cdFx0bGV0IG1pbnV0b3MgPSBob3Jhcy5zdWJzdHJpbmcoMywgNSk7XG5cdFx0Ly9ob3JhID0gaG9yYS5wYXJzZUludCgpO1xuXHRcdGxldCB6b25hID0gXCJBTVwiO1xuXHRcdGxldCBudW1lcm8gPSBwYXJzZUludChob3JhKTtcblx0XHRpZiAoaG9yYSA9PT0gJzAwJykge1xuXHRcdFx0aG9yYSA9IFwiMTJcIlxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAobnVtZXJvID4gMTIpIHtcblx0XHRcdFx0aG9yYSA9IGhvcmEgLSAxMjtcblx0XHRcdFx0em9uYSA9IFwiUE1cIlxuXHRcdFx0fVxuXG5cdFx0XHRpZiAobnVtZXJvID09PSAxMikge1xuXHRcdFx0XHR6b25hID0gXCJQTVwiXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGhvcmEgPCAxMCAmJiBob3JhLmxlbmd0aCA8IDIpIHtcblx0XHRcdGhvcmEgPSBcIjBcIiArIGhvcmE7XG5cdFx0fVxuXHRcdGxldCBob3JhRmluYWwgPSBob3JhICsgXCI6XCIgKyBtaW51dG9zICsgXCIgXCIgKyB6b25hO1xuXHRcdGNvbnNvbGUubG9nKFwiSE9SQSBJTklDSUFMIFBBUkEgR1VBUkRBUlwiICsgaG9yYUZpbmFsKTtcblx0XHR0aGlzLm9wY2lvbkhvcmFJbmljaW8gPSBob3JhRmluYWw7XG5cblxuXG5cdH1cblxuXHRvblRpbWVDaGFuZ2VkcyhhcmdzKSB7XG5cdFx0bGV0IHJlcyA9IGFyZ3MudmFsdWU7XG5cdFx0Y29uc29sZS5sb2cocmVzKTtcblx0XHRsZXQgZmVjaGEgPSByZXMudG9TdHJpbmcoKTtcblx0XHRsZXQgdGFtYW5vID0gZmVjaGEubGVuZ3RoO1xuXHRcdGZlY2hhID0gZmVjaGEuc3Vic3RyaW5nKDE2LCB0YW1hbm8pO1xuXHRcdGxldCBob3JhcyA9IGZlY2hhLnN1YnN0cmluZygwLCA4KTtcblx0XHRsZXQgaG9yYSA9IGhvcmFzLnN1YnN0cmluZygwLCAyKTtcblx0XHRsZXQgbWludXRvcyA9IGhvcmFzLnN1YnN0cmluZygzLCA1KTtcblx0XHQvL2hvcmEgPSBob3JhLnBhcnNlSW50KCk7XG5cdFx0bGV0IHpvbmEgPSBcIkFNXCI7XG5cdFx0bGV0IG51bWVybyA9IHBhcnNlSW50KGhvcmEpO1xuXHRcdGlmIChob3JhID09PSAnMDAnKSB7XG5cdFx0XHRob3JhID0gXCIxMlwiXG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmIChudW1lcm8gPiAxMikge1xuXHRcdFx0XHRob3JhID0gaG9yYSAtIDEyO1xuXHRcdFx0XHR6b25hID0gXCJQTVwiXG5cdFx0XHR9XG5cblx0XHRcdGlmIChudW1lcm8gPT09IDEyKSB7XG5cdFx0XHRcdHpvbmEgPSBcIlBNXCJcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoaG9yYSA8IDEwICYmIGhvcmEubGVuZ3RoIDwgMikge1xuXHRcdFx0aG9yYSA9IFwiMFwiICsgaG9yYTtcblx0XHR9XG5cdFx0bGV0IGhvcmFGaW5hbCA9IGhvcmEgKyBcIjpcIiArIG1pbnV0b3MgKyBcIiBcIiArIHpvbmE7XG5cdFx0Y29uc29sZS5sb2coXCJIT1JBIElOSUNJQUwgUEFSQSBHVUFSREFSXCIgKyBob3JhRmluYWwpO1xuXHRcdHRoaXMub3BjaW9uSG9yYUZpbiA9IGhvcmFGaW5hbDtcblxuXG5cblx0fVxuXG5cblx0dmFsaWRhckRhdG9zRE9TKCkge1xuXHRcdGlmICh0aGlzLm9wY2lvbkRpYXMgIT09IFwiXCIpIHtcblx0XHRcdC8vc2V0U3RyaW5nKCdvcGNpb25EaWFzJywnJyt0aGlzLm9wY2lvbkRpYXMpO1xuXHRcdFx0Ly9zZXRTdHJpbmcoJ29wY2lvbkhvcmEnLCcnK3RoaXMub3BjaW9uSG9yYUluaWNpbyArIFwiIGEgXCIgKyB0aGlzLm9wY2lvbkhvcmFGaW4pO1xuXHRcdFx0Ly90aGlzLl9tb2RhbC5jbG9zZUNhbGxiYWNrKCk7XG5cdFx0XHR0aGlzLl9kYXRhVmV0cy5fZGlhc0F0ZW5jaW9uVmV0ID0gdGhpcy5vcGNpb25EaWFzO1xuXHRcdFx0dGhpcy5fZGF0YVZldHMuX2hvcmFyaW9WZXQgPSB0aGlzLm9wY2lvbkhvcmFJbmljaW8gKyBcIiBhIFwiICsgdGhpcy5vcGNpb25Ib3JhRmluO1xuXHRcdFx0Ly90aGlzLmNoYW5nZVRhYigpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQudmFsaWRhckNhbXBvKFwic2VsZWNjaW9uYSB1bmEgb3BjacOzbiBkZSBkaWFzIGRlIGF0ZW5jacOzbi5cIik7XG5cdFx0fVxuXHR9XG5cblxuXHQvKipcbiAgICAgKiBnZXREYXRhVmV0ZXJpbmFyeVxuICAgICAqL1xuXHRwdWJsaWMgZ2V0RGF0YVZldGVyaW5hcnkoKSB7XG5cdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LmxvYWRpbmdWaWV3KCk7XG5cdFx0bGV0IGlkdXNlciA9IGdldFN0cmluZyhcImlkTG9naW5cIik7XG5cdFx0dGhpcy5fc2VydmljZUZpcmViYXNlLnNlYXJjaERhdGFWZXRlcmluYXJ5KGlkdXNlcikudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRjb25zb2xlLmxvZyhcIlJFU1BcIiArIEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlKSk7XG5cdFx0XHRpZiAocmVzcG9uc2UudmFsdWUgIT09IG51bGwpIHtcblx0XHRcdFx0Ly90aGlzLl92aWV3U2hhcmVkID0gdHJ1ZTtcblx0XHRcdFx0Ly90aGlzLl92aWV3QWRkID0gZmFsc2U7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiUkVTUFwiICsgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UudmFsdWUudmV0ZXJpbmFyaWEpKTtcblx0XHRcdFx0bGV0IGRhdGEgPSByZXNwb25zZS52YWx1ZS52ZXRlcmluYXJpYTtcblx0XHRcdFx0dGhpcy5fZGF0YVZldHMuX25vbWJyZVZldCA9IGRhdGEubm9tYnJlO1xuXHRcdFx0XHR0aGlzLl9kYXRhVmV0cy5fbGVtYVZldCA9IGRhdGEubGVtYTtcblx0XHRcdFx0dGhpcy5fZGF0YVZldHMuX2ltYWdlID0gZGF0YS5pbWFnZTtcblx0XHRcdFx0dGhpcy5fZGF0YVZldHMuX2Rlc2NyaXBjaW9uVmV0ID0gZGF0YS5kZXNjcmlwY2lvbjtcblx0XHRcdFx0dGhpcy5fZGF0YVZldHMuX3RpcG9WZXQgPSBkYXRhLnRpcG9fdmV0cztcblx0XHRcdFx0dGhpcy5fZGF0YVZldHMuX2NvcnJlb1ZldCA9IGRhdGEuY29ycmVvO1xuXHRcdFx0XHR0aGlzLl9kYXRhVmV0cy5fZGlyZWNjaW9uVmV0ID0gZGF0YS5kaXJlY2Npb247XG5cdFx0XHRcdHRoaXMuX2RhdGFWZXRzLl90ZWxlZm9ub1ZldCA9IGRhdGEudGVsZWZvbm87XG5cdFx0XHRcdHRoaXMuX2RhdGFWZXRzLl9jZWx1bGFyVmV0ID0gZGF0YS5jZWx1bGFyO1xuXHRcdFx0XHR0aGlzLl9kYXRhVmV0cy5fcGFnaW5hV2ViVmV0ID0gZGF0YS5wYWdpbmFfd2ViO1xuXHRcdFx0XHR0aGlzLl9kYXRhVmV0cy5faG9yYXJpb1ZldCA9IGRhdGEuZGlhcyArIFwiIGRlIFwiICsgZGF0YS5ob3JhcmlvXG5cdFx0XHRcdHRoaXMuX2RhdGFWZXRzLl9mYWNlYm9va1ZldHMgPSBkYXRhLmZhY2Vib29rO1xuXHRcdFx0XHR0aGlzLl9kYXRhVmV0cy5fdHdpdHRlclZldHMgPSBkYXRhLnR3aXR0ZXI7XG5cdFx0XHRcdHRoaXMuX2RhdGFWZXRzLl9JbnN0YWdyYW1WZXRzID0gZGF0YS5pbnN0YWdyYW07XG5cdFx0XHRcdHRoaXMuX2RhdGFWZXRzLl93aGF0U2FwcFZldHMgPSBkYXRhLndoYXRzYXBwO1xuXG5cdFx0XHRcdGlmICh0aGlzLl9kYXRhVmV0cy5fZmFjZWJvb2tWZXRzICE9PSBudWxsICYmIHRoaXMuX2RhdGFWZXRzLl9mYWNlYm9va1ZldHMgIT09IFwiXCIgJiYgdGhpcy5fZGF0YVZldHMuX2ZhY2Vib29rVmV0cyAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0Ly90aGlzLl92aWV3RiA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHRoaXMuX2RhdGFWZXRzLl90d2l0dGVyVmV0cyAhPT0gbnVsbCAmJiB0aGlzLl9kYXRhVmV0cy5fdHdpdHRlclZldHMgIT09IFwiXCIgJiYgdGhpcy5fZGF0YVZldHMuX3R3aXR0ZXJWZXRzICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHQvL3RoaXMuX3ZpZXdUID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodGhpcy5fZGF0YVZldHMuX0luc3RhZ3JhbVZldHMgIT09IG51bGwgJiYgdGhpcy5fZGF0YVZldHMuX0luc3RhZ3JhbVZldHMgIT09IFwiXCIgJiYgdGhpcy5fZGF0YVZldHMuX0luc3RhZ3JhbVZldHMgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdC8vdGhpcy5fdmlld0kgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICh0aGlzLl9kYXRhVmV0cy5fd2hhdFNhcHBWZXRzICE9PSBudWxsICYmIHRoaXMuX2RhdGFWZXRzLl93aGF0U2FwcFZldHMgIT09IFwiXCIgJiYgdGhpcy5fZGF0YVZldHMuX3doYXRTYXBwVmV0cyAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0Ly90aGlzLl92aWV3VyA9IHRydWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLnZhbGlkYXJNZXRvZG9zKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHQvL3RoaXMuX3ZpZXdTaGFyZWQgPSBmYWxzZTtcblx0XHRcdFx0Ly90aGlzLl92aWV3QWRkID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cblxuXHQvKipcblx0ICogdmFsaWRhck1ldG9kb3Ncblx0ICovXG5cdHB1YmxpYyB2YWxpZGFyTWV0b2RvcygpIHtcblx0XHQvLy92YWxpZGEgdGlwbyB2ZXRlcmluYXJpYVxuXHRcdGxldCB0aXBvID0gW107XG5cdFx0dGlwbyA9IHRoaXMuX2RhdGFWZXRzLl90aXBvVmV0LnNwbGl0KCcsJyk7XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHRpcG8ubGVuZ3RoOyBpKyspIHtcblxuXHRcdFx0aWYgKHRpcG9baV0udHJpbSgpID09PSBcIkNsaW5pY2EgVmV0ZXJpbmFyaWFcIikge1xuXHRcdFx0XHR0aGlzLl9zZWxlY2Npb24xID0gdHJ1ZTtcblx0XHRcdFx0dGhpcy50aXBvMSA9IFwiQ2xpbmljYSBWZXRlcmluYXJpYVwiO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGlwb1tpXS50cmltKCkgPT09IFwiVGllbmRhIFZldGVyaW5hcmlhXCIpIHtcblx0XHRcdFx0dGhpcy5fc2VsZWNjaW9uMiA9IHRydWU7XG5cdFx0XHRcdHRoaXMudGlwbzIgPSBcIlRpZW5kYSBWZXRlcmluYXJpYVwiO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGlwb1tpXS50cmltKCkgPT09IFwiU3BhIFZldGVyaW5hcmlvXCIpIHtcblx0XHRcdFx0dGhpcy5fc2VsZWNjaW9uMyA9IHRydWU7XG5cdFx0XHRcdHRoaXMudGlwbzMgPSBcIlNwYSBWZXRlcmluYXJpb1wiO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGlwb1tpXS50cmltKCkgPT09IFwiRnVuZXJhcmlhIFZldGVyaW5hcmlhXCIpIHtcblx0XHRcdFx0dGhpcy5fc2VsZWNjaW9uNCA9IHRydWU7XG5cdFx0XHRcdHRoaXMudGlwbzQgPSBcIkZ1bmVyYXJpYSBWZXRlcmluYXJpYVwiO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGlwb1tpXS50cmltKCkgPT09IFwiR3VhcmRlcmlhIFZldGVyaW5hcmlhXCIpIHtcblx0XHRcdFx0dGhpcy5fc2VsZWNjaW9uNSA9IHRydWU7XG5cdFx0XHRcdHRoaXMudGlwbzUgPSBcIkd1YXJkZXJpYSBWZXRlcmluYXJpYVwiO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGlwb1tpXS50cmltKCkgPT09IFwiRXNjdWVsYSBWZXRlcmluYXJpYVwiKSB7XG5cdFx0XHRcdHRoaXMuX3NlbGVjY2lvbjYgPSB0cnVlO1xuXHRcdFx0dGhpcy50aXBvNiA9IFwiRXNjdWVsYSBWZXRlcmluYXJpYVwiO1xuXHRcdFx0fVxuXG5cdFx0fVxuXHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC5sb2FkaW5nSGlkZSgpO1xuXG5cblxuXHR9XG5cblxuXHQvKipcblx0ICogc2F2ZVZldHNcblx0ICovXG5cdHB1YmxpYyBzYXZlVmV0cygpIHtcblx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQubG9hZGluZ1ZpZXcoKTtcblx0XHRpZih0aGlzLl9zZWxlY2Npb24xICE9PSBmYWxzZSB8fCB0aGlzLl9zZWxlY2Npb24yICE9PSBmYWxzZSB8fCB0aGlzLl9zZWxlY2Npb24zICE9PSBmYWxzZSB8fCB0aGlzLl9zZWxlY2Npb240ICE9PSBmYWxzZSB8fCB0aGlzLl9zZWxlY2Npb241ICE9PSBmYWxzZSB8fCB0aGlzLl9zZWxlY2Npb242ICE9PSBmYWxzZSl7XG5cdFx0XHRpZih0aGlzLl9kYXRhVmV0cy5faW1hZ2UgIT09IFwiXCIgJiYgdGhpcy5fZGF0YVZldHMuX2ltYWdlICE9PSBudWxsICYmIHRoaXMuX2RhdGFWZXRzLl9pbWFnZSAhPT0gdW5kZWZpbmVkICl7XG5cdFx0XHRcdGlmKHRoaXMuX2RhdGFWZXRzLl9ub21icmVWZXQgIT09IFwiXCIgJiYgdGhpcy5fZGF0YVZldHMuX25vbWJyZVZldCAhPT0gbnVsbCAmJiB0aGlzLl9kYXRhVmV0cy5fbm9tYnJlVmV0ICE9PSB1bmRlZmluZWQgKXtcblx0XHRcdFx0XHRpZih0aGlzLl9kYXRhVmV0cy5fZGlyZWNjaW9uVmV0ICE9PSBcIlwiICYmIHRoaXMuX2RhdGFWZXRzLl9kaXJlY2Npb25WZXQgIT09IG51bGwgJiYgdGhpcy5fZGF0YVZldHMuX2RpcmVjY2lvblZldCAhPT0gdW5kZWZpbmVkICl7XG5cdFx0XHRcdFx0XHRpZih0aGlzLl9kYXRhVmV0cy5fdGVsZWZvbm9WZXQgIT09IFwiXCIgJiYgdGhpcy5fZGF0YVZldHMuX3RlbGVmb25vVmV0ICE9PSBudWxsICYmIHRoaXMuX2RhdGFWZXRzLl90ZWxlZm9ub1ZldCAhPT0gdW5kZWZpbmVkICl7XG5cdFx0XHRcdFx0XHRcdGlmKHRoaXMuX2RhdGFWZXRzLl9jZWx1bGFyVmV0ICE9PSBcIlwiICYmIHRoaXMuX2RhdGFWZXRzLl9jZWx1bGFyVmV0ICE9PSBudWxsICYmIHRoaXMuX2RhdGFWZXRzLl9jZWx1bGFyVmV0ICE9PSB1bmRlZmluZWQgKXtcblx0XHRcdFx0XHRcdFx0XHRpZiAodGhpcy5vcGNpb25EaWFzICE9PSBcIlwiKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHQvL3NldFN0cmluZygnb3BjaW9uRGlhcycsJycrdGhpcy5vcGNpb25EaWFzKTtcblx0XHRcdFx0XHRcdFx0XHRcdC8vc2V0U3RyaW5nKCdvcGNpb25Ib3JhJywnJyt0aGlzLm9wY2lvbkhvcmFJbmljaW8gKyBcIiBhIFwiICsgdGhpcy5vcGNpb25Ib3JhRmluKTtcblx0XHRcdFx0XHRcdFx0XHRcdC8vdGhpcy5fbW9kYWwuY2xvc2VDYWxsYmFjaygpO1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly90aGlzLmNoYW5nZVRhYigpO1xuXHRcdFx0XHRcdFx0XHRcdFx0bGV0IGlkID0gZ2V0U3RyaW5nKFwiaWRMb2dpblwiKTtcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuc3ViaXJJbWFnZW4odGhpcy5fcGF0aEltZyxpZCtcIi92ZXRlcmluYXJpYS9sb2dvXCIpO1xuXG5cblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LnZhbGlkYXJDYW1wbyhcInNlbGVjY2lvbmEgdW5hIG9wY2nDs24gZGUgZGlhcyBkZSBhdGVuY2nDs24uXCIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LmxvYWRpbmdIaWRlKCk7XG5cdFx0XHRcdFx0XHRcdFx0fVx0XHRcblx0XHRcdFx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LnZhbGlkYXJDYW1wbyhcImNlbHVsYXJcIik7XG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LmxvYWRpbmdIaWRlKCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQudmFsaWRhckNhbXBvKFwidGVsZWZvbm9cIik7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC5sb2FkaW5nSGlkZSgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LnZhbGlkYXJDYW1wbyhcImRpcmVjY2nDs25cIik7XG5cdFx0XHRcdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQubG9hZGluZ0hpZGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC52YWxpZGFyQ2FtcG8oXCJub21icmVcIik7XG5cdFx0XHRcdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LmxvYWRpbmdIaWRlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1lbHNle1xuXHRcdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQudmFsaWRhckNhbXBvKFwiaW1hZ2VuXCIpO1xuXHRcdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQubG9hZGluZ0hpZGUoKTtcblx0XHRcdH1cblx0XHR9ZWxzZXtcblx0XHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC52YWxpZGFyQ2FtcG8oXCJzZWxlY2Npb25hIHVuYSBvcGNpw7NuIHRpcG8gVmV0c1wiKTtcblx0XHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC5sb2FkaW5nSGlkZSgpO1xuXHRcdH1cblx0fVxuXG5cblx0aW1hZ2VBc3NldHMgPSBbXTtcblx0aW1hZ2VTcmMgPSBcIn4vaW1hZ2VzL3BsYWNlaG9sZGVyLnBuZ1wiO1xuXHRpc1NpbmdsZU1vZGU6IGJvb2xlYW4gPSB0cnVlO1xuXHR0aHVtYlNpemU6IG51bWJlciA9IDgwO1xuXHRwcmV2aWV3U2l6ZTogbnVtYmVyID0gMzAwO1xuXG5cblx0LyoqXG5cdCAqIG5hbWVcblx0ICovXG5cdHB1YmxpYyBvblNlbGVjdFNpbmdsZVRhcCgpIHtcblx0XHR0aGlzLmlzU2luZ2xlTW9kZSA9IHRydWU7XG5cblx0XHRsZXQgY29udGV4dCA9IGltYWdlcGlja2VyLmNyZWF0ZSh7XG5cdFx0XHRtb2RlOiBcInNpbmdsZVwiXG5cdFx0fSk7XG5cdFx0dGhpcy5zdGFydFNlbGVjdGlvbihjb250ZXh0KTtcblx0fVxuXG5cdHByaXZhdGUgc3RhcnRTZWxlY3Rpb24oY29udGV4dCkge1xuXHRcdGxldCB0aGF0ID0gdGhpcztcblxuXHRcdGNvbnRleHRcblx0XHRcdC5hdXRob3JpemUoKVxuXHRcdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHR0aGF0LmltYWdlQXNzZXRzID0gW107XG5cdFx0XHRcdHRoYXQuaW1hZ2VTcmMgPSBudWxsO1xuXHRcdFx0XHRyZXR1cm4gY29udGV4dC5wcmVzZW50KCk7XG5cdFx0XHR9KVxuXHRcdFx0LnRoZW4oKHNlbGVjdGlvbikgPT4ge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcIlNlbGVjdGlvbiBkb25lOiBcIiArIEpTT04uc3RyaW5naWZ5KHNlbGVjdGlvbikpO1xuXHRcdFx0XHR0aGF0LmltYWdlU3JjID0gdGhhdC5pc1NpbmdsZU1vZGUgJiYgc2VsZWN0aW9uLmxlbmd0aCA+IDAgPyBzZWxlY3Rpb25bMF0gOiBudWxsO1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcIkVzdGEgZXMgbGEgcnV0YSBpbWFnZW5cIiArIHNlbGVjdGlvblswXS5fYW5kcm9pZCk7XG5cdFx0XHRcdGxldCBpZCA9IGdldFN0cmluZyhcImlkTG9naW5cIik7XG5cdFx0XHRcdHRoaXMuX3BhdGhJbWcgPSBzZWxlY3Rpb25bMF0uX2FuZHJvaWQ7XG5cdFx0XHRcdHRoaXMuX2RhdGFWZXRzLl9pbWFnZSA9IHRoaXMuX3BhdGhJbWc7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiUGF0aCBwYXJhIGd1YXJkYXIgbGFzIGltYWdlbmVzXCIgKyBpZCArIFwiL3ZldGVyaW5hcmlhL3ZldGVyaW5hcmlhMVwiKVxuXHRcdFx0XHQvL3RoaXMuc3ViaXJJbWFnZW4oc2VsZWN0aW9uWzBdLl9hbmRyb2lkLGlkK1wiL3ZldGVyaW5hcmlhL2xvZ29cIik7XG5cdFx0XHRcdC8vIHNldCB0aGUgaW1hZ2VzIHRvIGJlIGxvYWRlZCBmcm9tIHRoZSBhc3NldHMgd2l0aCBvcHRpbWFsIHNpemVzIChvcHRpbWl6ZSBtZW1vcnkgdXNhZ2UpXG5cdFx0XHRcdHNlbGVjdGlvbi5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdFx0XHRcdFx0ZWxlbWVudC5vcHRpb25zLndpZHRoID0gdGhhdC5pc1NpbmdsZU1vZGUgPyB0aGF0LnByZXZpZXdTaXplIDogdGhhdC50aHVtYlNpemU7XG5cdFx0XHRcdFx0ZWxlbWVudC5vcHRpb25zLmhlaWdodCA9IHRoYXQuaXNTaW5nbGVNb2RlID8gdGhhdC5wcmV2aWV3U2l6ZSA6IHRoYXQudGh1bWJTaXplO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHR0aGF0LmltYWdlQXNzZXRzID0gc2VsZWN0aW9uO1xuXHRcdFx0fSkuY2F0Y2goZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coZSk7XG5cdFx0XHR9KTtcblx0fVxuXG5cdHB1YmxpYyBzdWJpckltYWdlbihwYXRocywgX2ltZ05hbWUpIHtcblx0XHR2YXIgYXBwUGF0aCA9IGZzLmtub3duRm9sZGVycy5jdXJyZW50QXBwKCkucGF0aDtcblx0XHRjb25zb2xlLmxvZyhhcHBQYXRoKTtcblx0XHQvLyBkZXRlcm1pbmUgdGhlIHBhdGggdG8gYSBmaWxlIGluIHRoZSBhcHAvcmVzIGZvbGRlclxuXHRcdC8vdmFyIGxvZ29QYXRoID0gYXBwUGF0aCArIFwiL2ltYWdlcy92ZXRlcmluYXJ5LnBuZ1wiO1xuXHRcdHZhciBsb2dvUGF0aCA9IHBhdGhzO1xuXHRcdC8vIG5vdyB1cGxvYWQgdGhlIGZpbGUgd2l0aCBlaXRoZXIgb2YgdGhlIG9wdGlvbnMgYmVsb3c6XG5cdFx0ZmlyZWJhc2UudXBsb2FkRmlsZSh7XG5cdFx0XHQvLyBvcHRpb25hbCwgY2FuIGFsc28gYmUgcGFzc2VkIGR1cmluZyBpbml0KCkgYXMgJ3N0b3JhZ2VCdWNrZXQnIHBhcmFtIHNvIHdlIGNhbiBjYWNoZSBpdCAoZmluZCBpdCBpbiB0aGUgRmlyZWJhc2UgY29uc29sZSlcblx0XHRcdGJ1Y2tldDogXCJnczovL3ZldHNjb2wtMS5hcHBzcG90LmNvbVwiLFxuXHRcdFx0Ly8gdGhlIGZ1bGwgcGF0aCBvZiB0aGUgZmlsZSBpbiB5b3VyIEZpcmViYXNlIHN0b3JhZ2UgKGZvbGRlcnMgd2lsbCBiZSBjcmVhdGVkKVxuXHRcdFx0cmVtb3RlRnVsbFBhdGg6IF9pbWdOYW1lICsgJy5wbmcnLFxuXHRcdFx0Ly8gb3B0aW9uIDE6IGEgZmlsZS1zeXN0ZW0gbW9kdWxlIEZpbGUgb2JqZWN0XG5cdFx0XHRsb2NhbEZpbGU6IGZzLkZpbGUuZnJvbVBhdGgobG9nb1BhdGgpLFxuXHRcdFx0Ly8gb3B0aW9uIDI6IGEgZnVsbCBmaWxlIHBhdGggKGlnbm9yZWQgaWYgJ2xvY2FsRmlsZScgaXMgc2V0KVxuXHRcdFx0bG9jYWxGdWxsUGF0aDogbG9nb1BhdGgsXG5cdFx0XHQvLyBnZXQgbm90aWZpZWQgb2YgZmlsZSB1cGxvYWQgcHJvZ3Jlc3Ncblx0XHRcdG9uUHJvZ3Jlc3M6IHN0YXR1cyA9PiB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiVXBsb2FkZWQgZnJhY3Rpb246IFwiICsgc3RhdHVzLmZyYWN0aW9uQ29tcGxldGVkKTtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJQZXJjZW50YWdlIGNvbXBsZXRlOiBcIiArIHN0YXR1cy5wZXJjZW50YWdlQ29tcGxldGVkKTtcblx0XHRcdH1cblx0XHR9KS50aGVuKHVwbG9hZGVkRmlsZSA9PiB7XG5cdFx0XHRjb25zb2xlLmxvZyhcIkZpbGUgdXBsb2FkZWQ6IFwiICsgSlNPTi5zdHJpbmdpZnkodXBsb2FkZWRGaWxlKSk7XG5cdFx0XHRjb25zb2xlLmxvZyhcIkZpbGUgdXBsb2FkZWQ6IFwiICsgSlNPTi5zdHJpbmdpZnkodXBsb2FkZWRGaWxlKSk7XG5cdFx0XHR0aGlzLmdldEZvd25sb2FkVXJsKF9pbWdOYW1lKTtcblx0XHR9KS5jYXRjaChlcnIgPT4ge1xuXHRcdFx0Y29uc29sZS5sb2coZXJyKTtcblx0XHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC5sb2FkaW5nSGlkZSgpO1xuXHRcdH0pXG5cdH1cblxuXG5cdHB1YmxpYyBnZXRGb3dubG9hZFVybChfaW1nTmFtZSkge1xuXHRcdGZpcmViYXNlLmdldERvd25sb2FkVXJsKHtcblx0XHRcdC8vIG9wdGlvbmFsLCBjYW4gYWxzbyBiZSBwYXNzZWQgZHVyaW5nIGluaXQoKSBhcyAnc3RvcmFnZUJ1Y2tldCcgcGFyYW0gc28gd2UgY2FuIGNhY2hlIGl0XG5cdFx0XHRidWNrZXQ6IFwiZ3M6Ly92ZXRzY29sLTEuYXBwc3BvdC5jb21cIixcblx0XHRcdC8vIHRoZSBmdWxsIHBhdGggb2YgYW4gZXhpc3RpbmcgZmlsZSBpbiB5b3VyIEZpcmViYXNlIHN0b3JhZ2Vcblx0XHRcdHJlbW90ZUZ1bGxQYXRoOiBfaW1nTmFtZSArICcucG5nJ1xuXHRcdH0pLnRoZW4odXJsID0+IHtcblx0XHRcdGNvbnNvbGUubG9nKFwiUmVtb3RlIFVSTDogXCIgKyB1cmwpO1xuXHRcdFx0Y29uc29sZS5sb2coXCJSZW1vdGUgVVJMOiBcIiArIHVybCk7XG5cdFx0XHR0aGlzLl9kYXRhVmV0cy5faW1hZ2UgPSB1cmw7XG5cdFx0XHR0aGlzLmFkZFZldGVyaW5hcnlWZXRzKCk7XG5cdFx0fSkuY2F0Y2goZXJyb3IgPT4ge1xuXHRcdFx0Y29uc29sZS5sb2coXCJFcnJvcjogXCIgKyBlcnJvcik7XG5cdFx0XHRlcnJvciA9IFwiZXJyb3JDYXJnYW5kb0ltYWdlblwiO1xuXHRcdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LnZhbGlkYXJFcnJvcmVzKGVycm9yKTtcblx0XHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC5sb2FkaW5nSGlkZSgpO1xuXHRcdH0pXG5cdH1cblxuXHQvKipcblx0ICogYWRkUHJvZHVjdG9zVmV0c1xuXHQgKi9cblx0cHVibGljIGFkZFZldGVyaW5hcnlWZXRzKCkge1xuXHRcdHRoaXMuX3NlcnZpY2VGaXJlYmFzZS5jcmVhclJlZ2lzdHJvVmV0cyh0aGlzLl9kYXRhVmV0cykudGhlbihyZXNwb25zZSA9Pntcblx0XHRcdGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlKSk7XG5cdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQubG9hZGluZ0hpZGUoKTtcblx0XHRcdGlmKHJlc3BvbnNlID09PSBcImd1YXJkYWRvXCIpe1xuXHRcdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQudmFsaWRhdGVTdWNjZXNzKFwiVmV0ZXJpbmFyaWEgYWN0dWFsaXphZGEgY29ycmVjdGFtZW50ZVwiKTtcblx0XHRcdFx0dGhpcy5fcm91dEV4Lm5hdmlnYXRlKFsnY3JlYXRlLXZldHMnXSwge2NsZWFySGlzdG9yeTp0cnVlLFxuICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNsaWRlUmlnaHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiA0MDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJ2ZTogXCJlYXNlXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0Ly90aGlzLnNlYXJjaERhdGFWZXRlcmluYXJ5VXN1YXJpb3MoKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQudmFsaWRhckVycm9yZXMocmVzcG9uc2UpO1xuXHRcdFx0fVxuXHRcdH0pXG5cdH1cblxuXG59Il19