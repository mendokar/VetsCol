"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var global_model_1 = require("../../consts/global.model");
var vets_modal_1 = require("../../modal/vets.modal");
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';
var imagepicker = require("nativescript-imagepicker");
var fs = require("file-system");
var firebase = require("nativescript-plugin-firebase");
var application_settings_1 = require("tns-core-modules/application-settings/application-settings");
var firebase_service_1 = require("../../services/firebase.service");
var AddVetsComponent = /** @class */ (function () {
    function AddVetsComponent(_routEx) {
        this._routEx = _routEx;
        this.selectCheck = false;
        /**
         * Funciones para validar los tipos de veterinarias
         * /
         * */
        this._seleccion1 = false;
        this._seleccion2 = false;
        this._seleccion3 = false;
        this._seleccion4 = false;
        this._seleccion5 = false;
        this._seleccion6 = false;
        this._seleccion7 = false;
        this._seleccion8 = false;
        this.tipo1 = "";
        this.tipo2 = "";
        this.tipo3 = "";
        this.tipo4 = "";
        this.tipo5 = "";
        this.tipo6 = "";
        this.tipo7 = "";
        this.tipo8 = "";
        this.opcionDias = "";
        this.opcionHoraInicio = "";
        this.opcionHoraFin = "";
        this.imageAssets = [];
        this.imageSrc = "~/images/placeholder.png";
        this.isSingleMode = true;
        this.thumbSize = 80;
        this.previewSize = 300;
        this.tabSelectedIndex = 0;
        this._globalComponent = new global_model_1.GlobalComponent();
        this._dataVets = new vets_modal_1.DatosVets();
        this._serviceFirebase = new firebase_service_1.ServiceFirebase();
    }
    AddVetsComponent.prototype.changeTab = function () {
        if (this.tabSelectedIndex === 0) {
            this.tabSelectedIndex = 1;
        }
        else if (this.tabSelectedIndex === 1) {
            this.tabSelectedIndex = 2;
        }
        else if (this.tabSelectedIndex === 2) {
            this.tabSelectedIndex = 3;
        }
        else if (this.tabSelectedIndex === 3) {
        }
    };
    AddVetsComponent.prototype.ngOnInit = function () {
        this.getLocation();
    };
    /**
     * getLocation
     */
    AddVetsComponent.prototype.getLocation = function () {
        var _this = this;
        this._globalComponent.getUrlLocation().then(function (res) {
            _this._dataVets._coordenadasVets = res.latitude + "," + res.longitude;
            console.log("Coordenadas" + _this._dataVets._coordenadasVets);
        });
    };
    /**
     * getBack
     */
    AddVetsComponent.prototype.getBack = function () {
        this._routEx.back();
    };
    /**
     * saveVets
     */
    AddVetsComponent.prototype.saveVets = function () {
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
    AddVetsComponent.prototype.onFirstChecked = function (args) {
        if (this._seleccion1 == false) {
            this._seleccion1 = true;
            this.tipo1 = "Clinica Veterinaria";
        }
        else {
            this._seleccion1 = false;
            this.tipo1 = "";
        }
    };
    AddVetsComponent.prototype.onSecondChecked = function (args) {
        if (this._seleccion2 == false) {
            this._seleccion2 = true;
            this.tipo2 = "Tienda Veterinaria";
        }
        else {
            this._seleccion2 = false;
            this.tipo2 = "";
        }
    };
    AddVetsComponent.prototype.onThreeChecked = function (args) {
        if (this._seleccion3 == false) {
            this._seleccion3 = true;
            this.tipo3 = "Spa Veterinario";
        }
        else {
            this._seleccion3 = false;
            this.tipo3 = "";
        }
    };
    AddVetsComponent.prototype.onFourChecked = function (args) {
        if (this._seleccion4 == false) {
            this._seleccion4 = true;
            this.tipo4 = "Funeraria Veterinaria";
        }
        else {
            this._seleccion4 = false;
            this.tipo4 = "";
        }
    };
    AddVetsComponent.prototype.onFiveChecked = function (args) {
        if (this._seleccion5 == false) {
            this._seleccion5 = true;
            this.tipo5 = "Guarderia Veterinaria";
        }
        else {
            this._seleccion5 = false;
            this.tipo5 = "";
        }
    };
    AddVetsComponent.prototype.onSixChecked = function (args) {
        if (this._seleccion6 == false) {
            this._seleccion6 = true;
            this.tipo6 = "Escuela Veterinaria";
        }
        else {
            this._seleccion6 = false;
            this.tipo6 = "";
        }
    };
    AddVetsComponent.prototype.onSevenChecked = function (args) {
        if (this._seleccion7 == false) {
            this._seleccion7 = true;
            this.tipo7 = "Laboratorio Clinico";
        }
        else {
            this._seleccion7 = false;
            this.tipo7 = "";
        }
    };
    AddVetsComponent.prototype.onEightChecked = function (args) {
        if (this._seleccion8 == false) {
            this._seleccion8 = true;
            this.tipo8 = "Cirugias";
        }
        else {
            this._seleccion8 = false;
            this.tipo8 = "";
        }
    };
    /**
     * validarDatos
     */
    AddVetsComponent.prototype.validarDatos = function () {
        if (this._seleccion1 !== false || this._seleccion2 !== false || this._seleccion3 !== false || this._seleccion4 !== false || this._seleccion5 !== false || this._seleccion6 !== false || this._seleccion7 !== false || this._seleccion8 !== false) {
            var cadena = this.tipo1 + "," + this.tipo2 + "," + this.tipo3 + "," + this.tipo4 + "," + this.tipo5 + "," + this.tipo6 + "," + this.tipo7 + "," + this.tipo8;
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
            this._dataVets._tipoVet = cadena;
            console.log("Esta es la cadena Final" + this._dataVets._tipoVet);
            this.changeTab();
            //setString("cadenaTipo",''+cadena);
            //this._modal.closeCallback();
            //this._errorMensaje = ("");
        }
        else {
            this._globalComponent.validarCampo("selecciona una opción tipo Vets");
        }
    };
    AddVetsComponent.prototype.onFirstCheckeds = function (args) {
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
    AddVetsComponent.prototype.onSecondCheckeds = function (args) {
        var dato = this.switch.nativeElement;
        var dato1 = this.switch1.nativeElement;
        var dato2 = this.switch2.nativeElement;
        if (dato1.checked === true) {
            dato.checked = false;
            dato2.checked = false;
            this.opcionDias = "Lunes a Sábado";
        }
        else {
            this.opcionDias = "";
        }
    };
    AddVetsComponent.prototype.onThreeCheckeds = function (args) {
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
    AddVetsComponent.prototype.onTimeChanged = function (args) {
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
    AddVetsComponent.prototype.onTimeChangeds = function (args) {
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
    AddVetsComponent.prototype.validarDatosDOS = function () {
        if (this.opcionDias !== "") {
            //setString('opcionDias',''+this.opcionDias);
            //setString('opcionHora',''+this.opcionHoraInicio + " a " + this.opcionHoraFin);
            //this._modal.closeCallback();
            this._dataVets._diasAtencionVet = this.opcionDias;
            this._dataVets._horarioVet = this.opcionHoraInicio + " a " + this.opcionHoraFin;
            if (this.selectCheck === false) {
                this._dataVets._24Horas = "";
            }
            else {
                this._dataVets._24Horas = "24 Horas";
            }
            this.changeTab();
        }
        else {
            this._globalComponent.validarCampo("selecciona una opción de dias de atención.");
        }
    };
    /**
     * validarDatosVets
     */
    AddVetsComponent.prototype.validarDatosVets = function () {
        if (this._dataVets._image !== "" && this._dataVets._image !== null && this._dataVets._image !== undefined) {
            if (this._dataVets._nombreVet !== "" && this._dataVets._nombreVet !== null && this._dataVets._nombreVet !== undefined) {
                if (this._dataVets._direccionVet !== "" && this._dataVets._direccionVet !== null && this._dataVets._direccionVet !== undefined) {
                    if (this._dataVets._telefonoVet !== "" && this._dataVets._telefonoVet !== null && this._dataVets._telefonoVet !== undefined) {
                        if (this._dataVets._celularVet !== "" && this._dataVets._celularVet !== null && this._dataVets._celularVet !== undefined) {
                            this.changeTab();
                        }
                        else {
                            this._globalComponent.validarCampo("celular");
                        }
                    }
                    else {
                        this._globalComponent.validarCampo("telefono");
                    }
                }
                else {
                    this._globalComponent.validarCampo("dirección");
                }
            }
            else {
                this._globalComponent.validarCampo("nombre");
            }
        }
        else {
            this._globalComponent.validarCampo("imagen");
        }
    };
    /**
     * name
     */
    AddVetsComponent.prototype.onSelectSingleTap = function () {
        this.isSingleMode = true;
        var context = imagepicker.create({
            mode: "single"
        });
        this.startSelection(context);
    };
    AddVetsComponent.prototype.startSelection = function (context) {
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
    AddVetsComponent.prototype.subirImagen = function (paths, _imgName) {
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
    AddVetsComponent.prototype.getFownloadUrl = function (_imgName) {
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
    AddVetsComponent.prototype.addVeterinaryVets = function () {
        var _this = this;
        if (this.selectCheck === true) {
            this._dataVets._tipoVet = this._dataVets._tipoVet + ", 24 horas";
        }
        this._serviceFirebase.crearRegistroVets(this._dataVets).then(function (response) {
            console.log(JSON.stringify(response));
            _this._globalComponent.loadingHide();
            if (response === "guardado") {
                _this._globalComponent.validateSuccess("Veterinaria registrada correctamente");
                _this._routEx.navigate(['create-vets'], {
                    clearHistory: true,
                    transition: {
                        name: "slideRight",
                        duration: 400,
                        curve: "ease"
                    }
                });
                _this.searchDataVeterinaryUsuarios();
            }
            else {
                _this._globalComponent.validarErrores(response);
            }
        });
    };
    /**
     * searchDataVeterinaryUsuarios
     */
    AddVetsComponent.prototype.searchDataVeterinaryUsuarios = function () {
        var _this = this;
        this._serviceFirebase.searchDataVeterinaryUsuarios().then(function (response) {
            console.log("veterinarias usuario" + JSON.stringify(response));
            if (response.value !== null) {
                var tamaño = response.value;
                var strJSON = JSON.stringify(response);
                var objJSON = eval("(function(){return " + strJSON + ";})()");
                var size = objJSON.value.length;
                console.log("Nuevo ID" + size);
                _this._serviceFirebase.crearRegistroVetsUsuarios(_this._dataVets, size).then(function (response) {
                    console.log("veterinaria registrada");
                });
            }
            else {
                var id = 0;
                _this._serviceFirebase.crearRegistroVetsUsuarios(_this._dataVets, id).then(function (response) {
                    console.log("veterinaria registrada");
                });
            }
        });
    };
    AddVetsComponent.prototype.toggleCheck = function () {
        this.FirstCheckBox.nativeElement.toggle();
    };
    AddVetsComponent.prototype.getCheckProp = function () {
        console.log('checked prop value = ' + this.FirstCheckBox.nativeElement.checked);
    };
    /**
     * validateCheck
     */
    AddVetsComponent.prototype.validateCheck = function () {
        if (this.selectCheck === false) {
            this.selectCheck = true;
            this._dataVets._24Horas = "24 Horas";
        }
        else {
            this.selectCheck = false;
            this._dataVets._24Horas = "";
        }
    };
    __decorate([
        core_1.ViewChild("switch6"),
        __metadata("design:type", core_1.ElementRef)
    ], AddVetsComponent.prototype, "switch", void 0);
    __decorate([
        core_1.ViewChild("switch7"),
        __metadata("design:type", core_1.ElementRef)
    ], AddVetsComponent.prototype, "switch1", void 0);
    __decorate([
        core_1.ViewChild("switch8"),
        __metadata("design:type", core_1.ElementRef)
    ], AddVetsComponent.prototype, "switch2", void 0);
    __decorate([
        core_1.ViewChild("CB1"),
        __metadata("design:type", core_1.ElementRef)
    ], AddVetsComponent.prototype, "FirstCheckBox", void 0);
    AddVetsComponent = __decorate([
        core_1.Component({
            selector: 'add-vets',
            templateUrl: './pages/add-vets/add-vets.component.html',
            styleUrls: ['./pages/add-vets/add-vets.component.css'],
            providers: [firebase_service_1.ServiceFirebase]
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions])
    ], AddVetsComponent);
    return AddVetsComponent;
}());
exports.AddVetsComponent = AddVetsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLXZldHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWRkLXZldHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBQ3pFLHNEQUErRDtBQUMvRCwwREFBNEQ7QUFDNUQscURBQW1EO0FBQ25ELDBEQUEwRDtBQUMxRCw0Q0FBNEM7QUFDNUMsOENBQThDO0FBQzlDLG1EQUFtRDtBQUVuRCxzREFBd0Q7QUFDeEQsZ0NBQWtDO0FBQ2xDLHVEQUF5RDtBQUN6RCxtR0FBdUY7QUFDdkYsb0VBQWtFO0FBU2xFO0lBU0MsMEJBQW9CLE9BQXlCO1FBQXpCLFlBQU8sR0FBUCxPQUFPLENBQWtCO1FBUDdDLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBeUc3Qjs7O2FBR0s7UUFFTCxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUc3QixVQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ1gsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUNYLFVBQUssR0FBRyxFQUFFLENBQUM7UUFDWCxVQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ1gsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUNYLFVBQUssR0FBRyxFQUFFLENBQUM7UUFDWCxVQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ1gsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQStIWCxlQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLHFCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUN0QixrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQXlLbkIsZ0JBQVcsR0FBRyxFQUFF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O1FBQXJCLGdCQUFTLENBQUMsU0FBUyxDQUFDO2tDQUFTLGlCQUFVO29EQUFDO0lBQ25CO1FBQXJCLGdCQUFTLENBQUMsU0FBUyxDQUFDO2tDQUFVLGlCQUFVO3FEQUFDO0lBQ3BCO1FBQXJCLGdCQUFTLENBQUMsU0FBUyxDQUFDO2tDQUFVLGlCQUFVO3FEQUFDO0lBc1V4QjtRQUFqQixnQkFBUyxDQUFDLEtBQUssQ0FBQztrQ0FBZ0IsaUJBQVU7MkRBQUM7SUFwa0JoQyxnQkFBZ0I7UUFQNUIsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFdBQVcsRUFBRSwwQ0FBMEM7WUFDdkQsU0FBUyxFQUFFLENBQUMseUNBQXlDLENBQUM7WUFDdEQsU0FBUyxFQUFFLENBQUMsa0NBQWUsQ0FBQztTQUM1QixDQUFDO3lDQVc0Qix5QkFBZ0I7T0FUakMsZ0JBQWdCLENBMmxCNUI7SUFBRCx1QkFBQztDQUFBLEFBM2xCRCxJQTJsQkM7QUEzbEJZLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBFbGVtZW50UmVmLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgR2xvYmFsQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29uc3RzL2dsb2JhbC5tb2RlbCc7XG5pbXBvcnQgeyBEYXRvc1ZldHMgfSBmcm9tICcuLi8uLi9tb2RhbC92ZXRzLm1vZGFsJztcbi8vaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyJztcbi8vaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSAndWkvdGV4dC1maWVsZCc7XG4vL2ltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gJ2RhdGEvb2JzZXJ2YWJsZSc7XG4vL2ltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0ICogYXMgaW1hZ2VwaWNrZXIgZnJvbSBcIm5hdGl2ZXNjcmlwdC1pbWFnZXBpY2tlclwiO1xuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZpbGUtc3lzdGVtXCI7XG5pbXBvcnQgKiBhcyBmaXJlYmFzZSBmcm9tIFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiO1xuaW1wb3J0IHsgZ2V0U3RyaW5nIH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5ncy9hcHBsaWNhdGlvbi1zZXR0aW5ncyc7XG5pbXBvcnQgeyBTZXJ2aWNlRmlyZWJhc2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiAnYWRkLXZldHMnLFxuXHR0ZW1wbGF0ZVVybDogJy4vcGFnZXMvYWRkLXZldHMvYWRkLXZldHMuY29tcG9uZW50Lmh0bWwnLFxuXHRzdHlsZVVybHM6IFsnLi9wYWdlcy9hZGQtdmV0cy9hZGQtdmV0cy5jb21wb25lbnQuY3NzJ10sXG5cdHByb3ZpZGVyczogW1NlcnZpY2VGaXJlYmFzZV1cbn0pXG5cbmV4cG9ydCBjbGFzcyBBZGRWZXRzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuXHRzZWxlY3RDaGVjazogYm9vbGVhbiA9IGZhbHNlO1xuXHRfc2VydmljZUZpcmViYXNlOiBTZXJ2aWNlRmlyZWJhc2U7XG5cdF9wYXRoSW1nOiBhbnk7XG5cdF9kYXRhVmV0czogRGF0b3NWZXRzO1xuXHRfZ2xvYmFsQ29tcG9uZW50OiBHbG9iYWxDb21wb25lbnQ7XG5cdHB1YmxpYyB0YWJTZWxlY3RlZEluZGV4OiBudW1iZXI7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSBfcm91dEV4OiBSb3V0ZXJFeHRlbnNpb25zKSB7XG5cdFx0dGhpcy50YWJTZWxlY3RlZEluZGV4ID0gMDtcblx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQgPSBuZXcgR2xvYmFsQ29tcG9uZW50KCk7XG5cdFx0dGhpcy5fZGF0YVZldHMgPSBuZXcgRGF0b3NWZXRzKCk7XG5cdFx0dGhpcy5fc2VydmljZUZpcmViYXNlID0gbmV3IFNlcnZpY2VGaXJlYmFzZSgpO1xuXHR9XG5cblx0Y2hhbmdlVGFiKCkge1xuXHRcdGlmICh0aGlzLnRhYlNlbGVjdGVkSW5kZXggPT09IDApIHtcblx0XHRcdHRoaXMudGFiU2VsZWN0ZWRJbmRleCA9IDE7XG5cdFx0fSBlbHNlIGlmICh0aGlzLnRhYlNlbGVjdGVkSW5kZXggPT09IDEpIHtcblx0XHRcdHRoaXMudGFiU2VsZWN0ZWRJbmRleCA9IDI7XG5cdFx0fSBlbHNlIGlmICh0aGlzLnRhYlNlbGVjdGVkSW5kZXggPT09IDIpIHtcblx0XHRcdHRoaXMudGFiU2VsZWN0ZWRJbmRleCA9IDM7XG5cdFx0fSBlbHNlIGlmICh0aGlzLnRhYlNlbGVjdGVkSW5kZXggPT09IDMpIHtcblxuXHRcdH1cblx0fVxuXG5cdG5nT25Jbml0KCkge1xuXHRcdHRoaXMuZ2V0TG9jYXRpb24oKTtcblx0fVxuXG5cblxuXHQvKipcblx0ICogZ2V0TG9jYXRpb25cblx0ICovXG5cdHB1YmxpYyBnZXRMb2NhdGlvbigpIHtcblx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQuZ2V0VXJsTG9jYXRpb24oKS50aGVuKHJlcyA9PiB7XG5cdFx0XHR0aGlzLl9kYXRhVmV0cy5fY29vcmRlbmFkYXNWZXRzID0gcmVzLmxhdGl0dWRlICsgXCIsXCIgKyByZXMubG9uZ2l0dWRlO1xuXHRcdFx0Y29uc29sZS5sb2coXCJDb29yZGVuYWRhc1wiICsgdGhpcy5fZGF0YVZldHMuX2Nvb3JkZW5hZGFzVmV0cylcblx0XHR9KVxuXHR9XG5cblx0LyoqXG5cdCAqIGdldEJhY2tcblx0ICovXG5cdHB1YmxpYyBnZXRCYWNrKCkge1xuXHRcdHRoaXMuX3JvdXRFeC5iYWNrKCk7XG5cdH1cblxuXHQvKipcblx0ICogc2F2ZVZldHNcblx0ICovXG5cdHB1YmxpYyBzYXZlVmV0cygpIHtcblx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQubG9hZGluZ1ZpZXcoKTtcblx0XHRpZiAodGhpcy5fc2VsZWNjaW9uMSAhPT0gZmFsc2UgfHwgdGhpcy5fc2VsZWNjaW9uMiAhPT0gZmFsc2UgfHwgdGhpcy5fc2VsZWNjaW9uMyAhPT0gZmFsc2UgfHwgdGhpcy5fc2VsZWNjaW9uNCAhPT0gZmFsc2UgfHwgdGhpcy5fc2VsZWNjaW9uNSAhPT0gZmFsc2UgfHwgdGhpcy5fc2VsZWNjaW9uNiAhPT0gZmFsc2UpIHtcblx0XHRcdGlmICh0aGlzLl9kYXRhVmV0cy5faW1hZ2UgIT09IFwiXCIgJiYgdGhpcy5fZGF0YVZldHMuX2ltYWdlICE9PSBudWxsICYmIHRoaXMuX2RhdGFWZXRzLl9pbWFnZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGlmICh0aGlzLl9kYXRhVmV0cy5fbm9tYnJlVmV0ICE9PSBcIlwiICYmIHRoaXMuX2RhdGFWZXRzLl9ub21icmVWZXQgIT09IG51bGwgJiYgdGhpcy5fZGF0YVZldHMuX25vbWJyZVZldCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMuX2RhdGFWZXRzLl9kaXJlY2Npb25WZXQgIT09IFwiXCIgJiYgdGhpcy5fZGF0YVZldHMuX2RpcmVjY2lvblZldCAhPT0gbnVsbCAmJiB0aGlzLl9kYXRhVmV0cy5fZGlyZWNjaW9uVmV0ICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdGlmICh0aGlzLl9kYXRhVmV0cy5fdGVsZWZvbm9WZXQgIT09IFwiXCIgJiYgdGhpcy5fZGF0YVZldHMuX3RlbGVmb25vVmV0ICE9PSBudWxsICYmIHRoaXMuX2RhdGFWZXRzLl90ZWxlZm9ub1ZldCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRcdGlmICh0aGlzLl9kYXRhVmV0cy5fY2VsdWxhclZldCAhPT0gXCJcIiAmJiB0aGlzLl9kYXRhVmV0cy5fY2VsdWxhclZldCAhPT0gbnVsbCAmJiB0aGlzLl9kYXRhVmV0cy5fY2VsdWxhclZldCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKHRoaXMub3BjaW9uRGlhcyAhPT0gXCJcIikge1xuXHRcdFx0XHRcdFx0XHRcdFx0Ly9zZXRTdHJpbmcoJ29wY2lvbkRpYXMnLCcnK3RoaXMub3BjaW9uRGlhcyk7XG5cdFx0XHRcdFx0XHRcdFx0XHQvL3NldFN0cmluZygnb3BjaW9uSG9yYScsJycrdGhpcy5vcGNpb25Ib3JhSW5pY2lvICsgXCIgYSBcIiArIHRoaXMub3BjaW9uSG9yYUZpbik7XG5cdFx0XHRcdFx0XHRcdFx0XHQvL3RoaXMuX21vZGFsLmNsb3NlQ2FsbGJhY2soKTtcblx0XHRcdFx0XHRcdFx0XHRcdC8vdGhpcy5jaGFuZ2VUYWIoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGxldCBpZCA9IGdldFN0cmluZyhcImlkTG9naW5cIik7XG5cdFx0XHRcdFx0XHRcdFx0XHR0aGlzLnN1YmlySW1hZ2VuKHRoaXMuX3BhdGhJbWcsIGlkICsgXCIvdmV0ZXJpbmFyaWEvbG9nb1wiKTtcblxuXG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC52YWxpZGFyQ2FtcG8oXCJzZWxlY2Npb25hIHVuYSBvcGNpw7NuIGRlIGRpYXMgZGUgYXRlbmNpw7NuLlwiKTtcblx0XHRcdFx0XHRcdFx0XHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC5sb2FkaW5nSGlkZSgpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQudmFsaWRhckNhbXBvKFwiY2VsdWxhclwiKTtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQubG9hZGluZ0hpZGUoKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LnZhbGlkYXJDYW1wbyhcInRlbGVmb25vXCIpO1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQubG9hZGluZ0hpZGUoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LnZhbGlkYXJDYW1wbyhcImRpcmVjY2nDs25cIik7XG5cdFx0XHRcdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQubG9hZGluZ0hpZGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LnZhbGlkYXJDYW1wbyhcIm5vbWJyZVwiKTtcblx0XHRcdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQubG9hZGluZ0hpZGUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LnZhbGlkYXJDYW1wbyhcImltYWdlblwiKTtcblx0XHRcdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LmxvYWRpbmdIaWRlKCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC52YWxpZGFyQ2FtcG8oXCJzZWxlY2Npb25hIHVuYSBvcGNpw7NuIHRpcG8gVmV0c1wiKTtcblx0XHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC5sb2FkaW5nSGlkZSgpO1xuXHRcdH1cblxuXG5cblxuXHR9XG5cblxuXG5cdC8qKlxuXHQgKiBGdW5jaW9uZXMgcGFyYSB2YWxpZGFyIGxvcyB0aXBvcyBkZSB2ZXRlcmluYXJpYXNcblx0ICogLyBcblx0ICogKi9cblxuXHRfc2VsZWNjaW9uMTogYm9vbGVhbiA9IGZhbHNlO1xuXHRfc2VsZWNjaW9uMjogYm9vbGVhbiA9IGZhbHNlO1xuXHRfc2VsZWNjaW9uMzogYm9vbGVhbiA9IGZhbHNlO1xuXHRfc2VsZWNjaW9uNDogYm9vbGVhbiA9IGZhbHNlO1xuXHRfc2VsZWNjaW9uNTogYm9vbGVhbiA9IGZhbHNlO1xuXHRfc2VsZWNjaW9uNjogYm9vbGVhbiA9IGZhbHNlO1xuXHRfc2VsZWNjaW9uNzogYm9vbGVhbiA9IGZhbHNlO1xuXHRfc2VsZWNjaW9uODogYm9vbGVhbiA9IGZhbHNlO1xuXG5cblx0dGlwbzEgPSBcIlwiO1xuXHR0aXBvMiA9IFwiXCI7XG5cdHRpcG8zID0gXCJcIjtcblx0dGlwbzQgPSBcIlwiO1xuXHR0aXBvNSA9IFwiXCI7XG5cdHRpcG82ID0gXCJcIjtcblx0dGlwbzcgPSBcIlwiO1xuXHR0aXBvOCA9IFwiXCI7XG5cblx0cHVibGljIG9uRmlyc3RDaGVja2VkKGFyZ3MpIHtcblx0XHRpZiAodGhpcy5fc2VsZWNjaW9uMSA9PSBmYWxzZSkge1xuXHRcdFx0dGhpcy5fc2VsZWNjaW9uMSA9IHRydWU7XG5cdFx0XHR0aGlzLnRpcG8xID0gXCJDbGluaWNhIFZldGVyaW5hcmlhXCI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX3NlbGVjY2lvbjEgPSBmYWxzZTtcblx0XHRcdHRoaXMudGlwbzEgPSBcIlwiO1xuXHRcdH1cblx0fVxuXG5cdHB1YmxpYyBvblNlY29uZENoZWNrZWQoYXJncykge1xuXHRcdGlmICh0aGlzLl9zZWxlY2Npb24yID09IGZhbHNlKSB7XG5cdFx0XHR0aGlzLl9zZWxlY2Npb24yID0gdHJ1ZTtcblx0XHRcdHRoaXMudGlwbzIgPSBcIlRpZW5kYSBWZXRlcmluYXJpYVwiO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9zZWxlY2Npb24yID0gZmFsc2U7XG5cdFx0XHR0aGlzLnRpcG8yID0gXCJcIjtcblx0XHR9XG5cdH1cblxuXHRwdWJsaWMgb25UaHJlZUNoZWNrZWQoYXJncykge1xuXHRcdGlmICh0aGlzLl9zZWxlY2Npb24zID09IGZhbHNlKSB7XG5cdFx0XHR0aGlzLl9zZWxlY2Npb24zID0gdHJ1ZTtcblx0XHRcdHRoaXMudGlwbzMgPSBcIlNwYSBWZXRlcmluYXJpb1wiO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9zZWxlY2Npb24zID0gZmFsc2U7XG5cdFx0XHR0aGlzLnRpcG8zID0gXCJcIjtcblx0XHR9XG5cdH1cblxuXHRwdWJsaWMgb25Gb3VyQ2hlY2tlZChhcmdzKSB7XG5cdFx0aWYgKHRoaXMuX3NlbGVjY2lvbjQgPT0gZmFsc2UpIHtcblx0XHRcdHRoaXMuX3NlbGVjY2lvbjQgPSB0cnVlO1xuXHRcdFx0dGhpcy50aXBvNCA9IFwiRnVuZXJhcmlhIFZldGVyaW5hcmlhXCI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX3NlbGVjY2lvbjQgPSBmYWxzZTtcblx0XHRcdHRoaXMudGlwbzQgPSBcIlwiO1xuXHRcdH1cblx0fVxuXG5cdHB1YmxpYyBvbkZpdmVDaGVja2VkKGFyZ3MpIHtcblx0XHRpZiAodGhpcy5fc2VsZWNjaW9uNSA9PSBmYWxzZSkge1xuXHRcdFx0dGhpcy5fc2VsZWNjaW9uNSA9IHRydWU7XG5cdFx0XHR0aGlzLnRpcG81ID0gXCJHdWFyZGVyaWEgVmV0ZXJpbmFyaWFcIjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fc2VsZWNjaW9uNSA9IGZhbHNlO1xuXHRcdFx0dGhpcy50aXBvNSA9IFwiXCI7XG5cdFx0fVxuXHR9XG5cblx0cHVibGljIG9uU2l4Q2hlY2tlZChhcmdzKSB7XG5cdFx0aWYgKHRoaXMuX3NlbGVjY2lvbjYgPT0gZmFsc2UpIHtcblx0XHRcdHRoaXMuX3NlbGVjY2lvbjYgPSB0cnVlO1xuXHRcdFx0dGhpcy50aXBvNiA9IFwiRXNjdWVsYSBWZXRlcmluYXJpYVwiO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9zZWxlY2Npb242ID0gZmFsc2U7XG5cdFx0XHR0aGlzLnRpcG82ID0gXCJcIjtcblx0XHR9XG5cdH1cblxuXHRwdWJsaWMgb25TZXZlbkNoZWNrZWQoYXJncykge1xuXHRcdGlmICh0aGlzLl9zZWxlY2Npb243ID09IGZhbHNlKSB7XG5cdFx0XHR0aGlzLl9zZWxlY2Npb243ID0gdHJ1ZTtcblx0XHRcdHRoaXMudGlwbzcgPSBcIkxhYm9yYXRvcmlvIENsaW5pY29cIjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fc2VsZWNjaW9uNyA9IGZhbHNlO1xuXHRcdFx0dGhpcy50aXBvNyA9IFwiXCI7XG5cdFx0fVxuXHR9XG5cblx0cHVibGljIG9uRWlnaHRDaGVja2VkKGFyZ3MpIHtcblx0XHRpZiAodGhpcy5fc2VsZWNjaW9uOCA9PSBmYWxzZSkge1xuXHRcdFx0dGhpcy5fc2VsZWNjaW9uOCA9IHRydWU7XG5cdFx0XHR0aGlzLnRpcG84ID0gXCJDaXJ1Z2lhc1wiO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9zZWxlY2Npb244ID0gZmFsc2U7XG5cdFx0XHR0aGlzLnRpcG84ID0gXCJcIjtcblx0XHR9XG5cdH1cblxuXG5cblx0LyoqXG5cdCAqIHZhbGlkYXJEYXRvc1xuXHQgKi9cblx0cHVibGljIHZhbGlkYXJEYXRvcygpIHtcblx0XHRpZiAodGhpcy5fc2VsZWNjaW9uMSAhPT0gZmFsc2UgfHwgdGhpcy5fc2VsZWNjaW9uMiAhPT0gZmFsc2UgfHwgdGhpcy5fc2VsZWNjaW9uMyAhPT0gZmFsc2UgfHwgdGhpcy5fc2VsZWNjaW9uNCAhPT0gZmFsc2UgfHwgdGhpcy5fc2VsZWNjaW9uNSAhPT0gZmFsc2UgfHwgdGhpcy5fc2VsZWNjaW9uNiAhPT0gZmFsc2UgfHwgdGhpcy5fc2VsZWNjaW9uNyAhPT0gZmFsc2UgfHwgdGhpcy5fc2VsZWNjaW9uOCAhPT0gZmFsc2UpIHtcblxuXHRcdFx0bGV0IGNhZGVuYSA9IHRoaXMudGlwbzEgKyBcIixcIiArIHRoaXMudGlwbzIgKyBcIixcIiArIHRoaXMudGlwbzMgKyBcIixcIiArIHRoaXMudGlwbzQgKyBcIixcIiArIHRoaXMudGlwbzUgKyBcIixcIiArIHRoaXMudGlwbzYgKyAgXCIsXCIgKyB0aGlzLnRpcG83ICsgXCIsXCIgKyB0aGlzLnRpcG84O1xuXHRcdFx0Y29uc29sZS5sb2coXCJFc3RhIGVzIGxhIGNhZGVuYVwiICsgY2FkZW5hKTtcblx0XHRcdGxldCBhcnJlZ2xvID0gY2FkZW5hLnNwbGl0KFwiLFwiKTtcblx0XHRcdGNhZGVuYSA9IFwiXCI7XG5cdFx0XHRmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYXJyZWdsby5sZW5ndGg7IGluZGV4KyspIHtcblx0XHRcdFx0bGV0IGRhdG8gPSBhcnJlZ2xvW2luZGV4XTtcblx0XHRcdFx0aWYgKGRhdG8gIT09IFwiXCIpIHtcblx0XHRcdFx0XHRpZiAoY2FkZW5hID09PSBcIlwiKSB7XG5cdFx0XHRcdFx0XHRjYWRlbmEgPSBkYXRvO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjYWRlbmEgPSBjYWRlbmEgKyBcIiAsIFwiICsgZGF0bztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl9kYXRhVmV0cy5fdGlwb1ZldCA9IGNhZGVuYTtcblx0XHRcdGNvbnNvbGUubG9nKFwiRXN0YSBlcyBsYSBjYWRlbmEgRmluYWxcIiArIHRoaXMuX2RhdGFWZXRzLl90aXBvVmV0KTtcblx0XHRcdHRoaXMuY2hhbmdlVGFiKCk7XG5cdFx0XHQvL3NldFN0cmluZyhcImNhZGVuYVRpcG9cIiwnJytjYWRlbmEpO1xuXHRcdFx0Ly90aGlzLl9tb2RhbC5jbG9zZUNhbGxiYWNrKCk7XG5cdFx0XHQvL3RoaXMuX2Vycm9yTWVuc2FqZSA9IChcIlwiKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LnZhbGlkYXJDYW1wbyhcInNlbGVjY2lvbmEgdW5hIG9wY2nDs24gdGlwbyBWZXRzXCIpO1xuXHRcdH1cblx0fVxuXG5cblx0Lypcblx0KmZ1bmNpb25lcyBwYXJhIHZhbGlkYXIgbG9zIGRpYXMgeSBob3JhcyBkZSBmdW5jaW9uYW1pZW50b1xuXHQqL1xuXG5cdF9lcnJvck1lbnNhamU6IHN0cmluZztcblx0QFZpZXdDaGlsZChcInN3aXRjaDZcIikgc3dpdGNoOiBFbGVtZW50UmVmO1xuXHRAVmlld0NoaWxkKFwic3dpdGNoN1wiKSBzd2l0Y2gxOiBFbGVtZW50UmVmO1xuXHRAVmlld0NoaWxkKFwic3dpdGNoOFwiKSBzd2l0Y2gyOiBFbGVtZW50UmVmO1xuXG5cdG9wY2lvbkRpYXMgPSBcIlwiO1xuXHRvcGNpb25Ib3JhSW5pY2lvID0gXCJcIjtcblx0b3BjaW9uSG9yYUZpbiA9IFwiXCI7XG5cblx0cHVibGljIG9uRmlyc3RDaGVja2VkcyhhcmdzKSB7XG5cdFx0bGV0IGRhdG8gPSB0aGlzLnN3aXRjaC5uYXRpdmVFbGVtZW50O1xuXHRcdGxldCBkYXRvMSA9IHRoaXMuc3dpdGNoMS5uYXRpdmVFbGVtZW50O1xuXHRcdGxldCBkYXRvMiA9IHRoaXMuc3dpdGNoMi5uYXRpdmVFbGVtZW50O1xuXHRcdGlmIChkYXRvLmNoZWNrZWQgPT09IHRydWUpIHtcblx0XHRcdGRhdG8xLmNoZWNrZWQgPSBmYWxzZTtcblx0XHRcdGRhdG8yLmNoZWNrZWQgPSBmYWxzZTtcblx0XHRcdHRoaXMub3BjaW9uRGlhcyA9IFwiTHVuZXMgYSBWaWVybmVzXCI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMub3BjaW9uRGlhcyA9IFwiXCI7XG5cdFx0fVxuXG5cblxuXG5cdH1cblxuXHRwdWJsaWMgb25TZWNvbmRDaGVja2VkcyhhcmdzKSB7XG5cdFx0bGV0IGRhdG8gPSB0aGlzLnN3aXRjaC5uYXRpdmVFbGVtZW50O1xuXHRcdGxldCBkYXRvMSA9IHRoaXMuc3dpdGNoMS5uYXRpdmVFbGVtZW50O1xuXHRcdGxldCBkYXRvMiA9IHRoaXMuc3dpdGNoMi5uYXRpdmVFbGVtZW50O1xuXHRcdGlmIChkYXRvMS5jaGVja2VkID09PSB0cnVlKSB7XG5cdFx0XHRkYXRvLmNoZWNrZWQgPSBmYWxzZTtcblx0XHRcdGRhdG8yLmNoZWNrZWQgPSBmYWxzZTtcblx0XHRcdHRoaXMub3BjaW9uRGlhcyA9IFwiTHVuZXMgYSBTw6FiYWRvXCI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMub3BjaW9uRGlhcyA9IFwiXCI7XG5cdFx0fVxuXG5cdH1cblx0cHVibGljIG9uVGhyZWVDaGVja2VkcyhhcmdzKSB7XG5cdFx0bGV0IGRhdG8gPSB0aGlzLnN3aXRjaC5uYXRpdmVFbGVtZW50O1xuXHRcdGxldCBkYXRvMSA9IHRoaXMuc3dpdGNoMS5uYXRpdmVFbGVtZW50O1xuXHRcdGxldCBkYXRvMiA9IHRoaXMuc3dpdGNoMi5uYXRpdmVFbGVtZW50O1xuXG5cdFx0aWYgKGRhdG8yLmNoZWNrZWQgPT09IHRydWUpIHtcblx0XHRcdGRhdG8uY2hlY2tlZCA9IGZhbHNlO1xuXHRcdFx0ZGF0bzEuY2hlY2tlZCA9IGZhbHNlO1xuXHRcdFx0dGhpcy5vcGNpb25EaWFzID0gXCJMdW5lcyBhIERvbWluZ29cIjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5vcGNpb25EaWFzID0gXCJcIjtcblx0XHR9XG5cblxuXHR9XG5cblx0b25UaW1lQ2hhbmdlZChhcmdzKSB7XG5cdFx0bGV0IHJlcyA9IGFyZ3MudmFsdWU7XG5cdFx0Y29uc29sZS5sb2cocmVzKTtcblx0XHRsZXQgZmVjaGEgPSByZXMudG9TdHJpbmcoKTtcblx0XHRsZXQgdGFtYW5vID0gZmVjaGEubGVuZ3RoO1xuXHRcdGZlY2hhID0gZmVjaGEuc3Vic3RyaW5nKDE2LCB0YW1hbm8pO1xuXHRcdGxldCBob3JhcyA9IGZlY2hhLnN1YnN0cmluZygwLCA4KTtcblx0XHRsZXQgaG9yYSA9IGhvcmFzLnN1YnN0cmluZygwLCAyKTtcblx0XHRsZXQgbWludXRvcyA9IGhvcmFzLnN1YnN0cmluZygzLCA1KTtcblx0XHQvL2hvcmEgPSBob3JhLnBhcnNlSW50KCk7XG5cdFx0bGV0IHpvbmEgPSBcIkFNXCI7XG5cdFx0bGV0IG51bWVybyA9IHBhcnNlSW50KGhvcmEpO1xuXHRcdGlmIChob3JhID09PSAnMDAnKSB7XG5cdFx0XHRob3JhID0gXCIxMlwiXG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmIChudW1lcm8gPiAxMikge1xuXHRcdFx0XHRob3JhID0gaG9yYSAtIDEyO1xuXHRcdFx0XHR6b25hID0gXCJQTVwiXG5cdFx0XHR9XG5cblx0XHRcdGlmIChudW1lcm8gPT09IDEyKSB7XG5cdFx0XHRcdHpvbmEgPSBcIlBNXCJcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoaG9yYSA8IDEwICYmIGhvcmEubGVuZ3RoIDwgMikge1xuXHRcdFx0aG9yYSA9IFwiMFwiICsgaG9yYTtcblx0XHR9XG5cdFx0bGV0IGhvcmFGaW5hbCA9IGhvcmEgKyBcIjpcIiArIG1pbnV0b3MgKyBcIiBcIiArIHpvbmE7XG5cdFx0Y29uc29sZS5sb2coXCJIT1JBIElOSUNJQUwgUEFSQSBHVUFSREFSXCIgKyBob3JhRmluYWwpO1xuXHRcdHRoaXMub3BjaW9uSG9yYUluaWNpbyA9IGhvcmFGaW5hbDtcblxuXG5cblx0fVxuXG5cdG9uVGltZUNoYW5nZWRzKGFyZ3MpIHtcblx0XHRsZXQgcmVzID0gYXJncy52YWx1ZTtcblx0XHRjb25zb2xlLmxvZyhyZXMpO1xuXHRcdGxldCBmZWNoYSA9IHJlcy50b1N0cmluZygpO1xuXHRcdGxldCB0YW1hbm8gPSBmZWNoYS5sZW5ndGg7XG5cdFx0ZmVjaGEgPSBmZWNoYS5zdWJzdHJpbmcoMTYsIHRhbWFubyk7XG5cdFx0bGV0IGhvcmFzID0gZmVjaGEuc3Vic3RyaW5nKDAsIDgpO1xuXHRcdGxldCBob3JhID0gaG9yYXMuc3Vic3RyaW5nKDAsIDIpO1xuXHRcdGxldCBtaW51dG9zID0gaG9yYXMuc3Vic3RyaW5nKDMsIDUpO1xuXHRcdC8vaG9yYSA9IGhvcmEucGFyc2VJbnQoKTtcblx0XHRsZXQgem9uYSA9IFwiQU1cIjtcblx0XHRsZXQgbnVtZXJvID0gcGFyc2VJbnQoaG9yYSk7XG5cdFx0aWYgKGhvcmEgPT09ICcwMCcpIHtcblx0XHRcdGhvcmEgPSBcIjEyXCJcblx0XHR9IGVsc2Uge1xuXHRcdFx0aWYgKG51bWVybyA+IDEyKSB7XG5cdFx0XHRcdGhvcmEgPSBob3JhIC0gMTI7XG5cdFx0XHRcdHpvbmEgPSBcIlBNXCJcblx0XHRcdH1cblxuXHRcdFx0aWYgKG51bWVybyA9PT0gMTIpIHtcblx0XHRcdFx0em9uYSA9IFwiUE1cIlxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChob3JhIDwgMTAgJiYgaG9yYS5sZW5ndGggPCAyKSB7XG5cdFx0XHRob3JhID0gXCIwXCIgKyBob3JhO1xuXHRcdH1cblx0XHRsZXQgaG9yYUZpbmFsID0gaG9yYSArIFwiOlwiICsgbWludXRvcyArIFwiIFwiICsgem9uYTtcblx0XHRjb25zb2xlLmxvZyhcIkhPUkEgSU5JQ0lBTCBQQVJBIEdVQVJEQVJcIiArIGhvcmFGaW5hbCk7XG5cdFx0dGhpcy5vcGNpb25Ib3JhRmluID0gaG9yYUZpbmFsO1xuXG5cblxuXHR9XG5cblxuXHR2YWxpZGFyRGF0b3NET1MoKSB7XG5cdFx0aWYgKHRoaXMub3BjaW9uRGlhcyAhPT0gXCJcIikge1xuXHRcdFx0Ly9zZXRTdHJpbmcoJ29wY2lvbkRpYXMnLCcnK3RoaXMub3BjaW9uRGlhcyk7XG5cdFx0XHQvL3NldFN0cmluZygnb3BjaW9uSG9yYScsJycrdGhpcy5vcGNpb25Ib3JhSW5pY2lvICsgXCIgYSBcIiArIHRoaXMub3BjaW9uSG9yYUZpbik7XG5cdFx0XHQvL3RoaXMuX21vZGFsLmNsb3NlQ2FsbGJhY2soKTtcblx0XHRcdHRoaXMuX2RhdGFWZXRzLl9kaWFzQXRlbmNpb25WZXQgPSB0aGlzLm9wY2lvbkRpYXM7XG5cdFx0XHR0aGlzLl9kYXRhVmV0cy5faG9yYXJpb1ZldCA9IHRoaXMub3BjaW9uSG9yYUluaWNpbyArIFwiIGEgXCIgKyB0aGlzLm9wY2lvbkhvcmFGaW47XG5cdFx0XHRpZiAodGhpcy5zZWxlY3RDaGVjayA9PT0gZmFsc2UpIHtcblx0XHRcdFx0dGhpcy5fZGF0YVZldHMuXzI0SG9yYXMgPSBcIlwiO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5fZGF0YVZldHMuXzI0SG9yYXMgPSBcIjI0IEhvcmFzXCI7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuY2hhbmdlVGFiKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC52YWxpZGFyQ2FtcG8oXCJzZWxlY2Npb25hIHVuYSBvcGNpw7NuIGRlIGRpYXMgZGUgYXRlbmNpw7NuLlwiKTtcblx0XHR9XG5cdH1cblxuXG5cdC8qKlxuXHQgKiB2YWxpZGFyRGF0b3NWZXRzXG5cdCAqL1xuXHRwdWJsaWMgdmFsaWRhckRhdG9zVmV0cygpIHtcblx0XHRpZiAodGhpcy5fZGF0YVZldHMuX2ltYWdlICE9PSBcIlwiICYmIHRoaXMuX2RhdGFWZXRzLl9pbWFnZSAhPT0gbnVsbCAmJiB0aGlzLl9kYXRhVmV0cy5faW1hZ2UgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0aWYgKHRoaXMuX2RhdGFWZXRzLl9ub21icmVWZXQgIT09IFwiXCIgJiYgdGhpcy5fZGF0YVZldHMuX25vbWJyZVZldCAhPT0gbnVsbCAmJiB0aGlzLl9kYXRhVmV0cy5fbm9tYnJlVmV0ICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0aWYgKHRoaXMuX2RhdGFWZXRzLl9kaXJlY2Npb25WZXQgIT09IFwiXCIgJiYgdGhpcy5fZGF0YVZldHMuX2RpcmVjY2lvblZldCAhPT0gbnVsbCAmJiB0aGlzLl9kYXRhVmV0cy5fZGlyZWNjaW9uVmV0ICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRpZiAodGhpcy5fZGF0YVZldHMuX3RlbGVmb25vVmV0ICE9PSBcIlwiICYmIHRoaXMuX2RhdGFWZXRzLl90ZWxlZm9ub1ZldCAhPT0gbnVsbCAmJiB0aGlzLl9kYXRhVmV0cy5fdGVsZWZvbm9WZXQgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0aWYgKHRoaXMuX2RhdGFWZXRzLl9jZWx1bGFyVmV0ICE9PSBcIlwiICYmIHRoaXMuX2RhdGFWZXRzLl9jZWx1bGFyVmV0ICE9PSBudWxsICYmIHRoaXMuX2RhdGFWZXRzLl9jZWx1bGFyVmV0ICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5jaGFuZ2VUYWIoKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC52YWxpZGFyQ2FtcG8oXCJjZWx1bGFyXCIpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQudmFsaWRhckNhbXBvKFwidGVsZWZvbm9cIik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC52YWxpZGFyQ2FtcG8oXCJkaXJlY2Npw7NuXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQudmFsaWRhckNhbXBvKFwibm9tYnJlXCIpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQudmFsaWRhckNhbXBvKFwiaW1hZ2VuXCIpO1xuXHRcdH1cblx0fVxuXG5cblx0aW1hZ2VBc3NldHMgPSBbXTtcblx0aW1hZ2VTcmMgPSBcIn4vaW1hZ2VzL3BsYWNlaG9sZGVyLnBuZ1wiO1xuXHRpc1NpbmdsZU1vZGU6IGJvb2xlYW4gPSB0cnVlO1xuXHR0aHVtYlNpemU6IG51bWJlciA9IDgwO1xuXHRwcmV2aWV3U2l6ZTogbnVtYmVyID0gMzAwO1xuXG5cdC8qKlxuXHQgKiBuYW1lXG5cdCAqL1xuXHRwdWJsaWMgb25TZWxlY3RTaW5nbGVUYXAoKSB7XG5cdFx0dGhpcy5pc1NpbmdsZU1vZGUgPSB0cnVlO1xuXG5cdFx0bGV0IGNvbnRleHQgPSBpbWFnZXBpY2tlci5jcmVhdGUoe1xuXHRcdFx0bW9kZTogXCJzaW5nbGVcIlxuXHRcdH0pO1xuXHRcdHRoaXMuc3RhcnRTZWxlY3Rpb24oY29udGV4dCk7XG5cdH1cblxuXHRwcml2YXRlIHN0YXJ0U2VsZWN0aW9uKGNvbnRleHQpIHtcblx0XHRsZXQgdGhhdCA9IHRoaXM7XG5cblx0XHRjb250ZXh0XG5cdFx0XHQuYXV0aG9yaXplKClcblx0XHRcdC50aGVuKCgpID0+IHtcblx0XHRcdFx0dGhhdC5pbWFnZUFzc2V0cyA9IFtdO1xuXHRcdFx0XHR0aGF0LmltYWdlU3JjID0gbnVsbDtcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQucHJlc2VudCgpO1xuXHRcdFx0fSlcblx0XHRcdC50aGVuKChzZWxlY3Rpb24pID0+IHtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJTZWxlY3Rpb24gZG9uZTogXCIgKyBKU09OLnN0cmluZ2lmeShzZWxlY3Rpb24pKTtcblx0XHRcdFx0dGhhdC5pbWFnZVNyYyA9IHRoYXQuaXNTaW5nbGVNb2RlICYmIHNlbGVjdGlvbi5sZW5ndGggPiAwID8gc2VsZWN0aW9uWzBdIDogbnVsbDtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJFc3RhIGVzIGxhIHJ1dGEgaW1hZ2VuXCIgKyBzZWxlY3Rpb25bMF0uX2FuZHJvaWQpO1xuXHRcdFx0XHRsZXQgaWQgPSBnZXRTdHJpbmcoXCJpZExvZ2luXCIpO1xuXHRcdFx0XHR0aGlzLl9wYXRoSW1nID0gc2VsZWN0aW9uWzBdLl9hbmRyb2lkO1xuXHRcdFx0XHR0aGlzLl9kYXRhVmV0cy5faW1hZ2UgPSB0aGlzLl9wYXRoSW1nO1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcIlBhdGggcGFyYSBndWFyZGFyIGxhcyBpbWFnZW5lc1wiICsgaWQgKyBcIi92ZXRlcmluYXJpYS92ZXRlcmluYXJpYTFcIilcblx0XHRcdFx0Ly90aGlzLnN1YmlySW1hZ2VuKHNlbGVjdGlvblswXS5fYW5kcm9pZCxpZCtcIi92ZXRlcmluYXJpYS9sb2dvXCIpO1xuXHRcdFx0XHQvLyBzZXQgdGhlIGltYWdlcyB0byBiZSBsb2FkZWQgZnJvbSB0aGUgYXNzZXRzIHdpdGggb3B0aW1hbCBzaXplcyAob3B0aW1pemUgbWVtb3J5IHVzYWdlKVxuXHRcdFx0XHRzZWxlY3Rpb24uZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuXHRcdFx0XHRcdGVsZW1lbnQub3B0aW9ucy53aWR0aCA9IHRoYXQuaXNTaW5nbGVNb2RlID8gdGhhdC5wcmV2aWV3U2l6ZSA6IHRoYXQudGh1bWJTaXplO1xuXHRcdFx0XHRcdGVsZW1lbnQub3B0aW9ucy5oZWlnaHQgPSB0aGF0LmlzU2luZ2xlTW9kZSA/IHRoYXQucHJldmlld1NpemUgOiB0aGF0LnRodW1iU2l6ZTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0dGhhdC5pbWFnZUFzc2V0cyA9IHNlbGVjdGlvbjtcblx0XHRcdH0pLmNhdGNoKGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKGUpO1xuXHRcdFx0fSk7XG5cdH1cblxuXHRwdWJsaWMgc3ViaXJJbWFnZW4ocGF0aHMsIF9pbWdOYW1lKSB7XG5cdFx0dmFyIGFwcFBhdGggPSBmcy5rbm93bkZvbGRlcnMuY3VycmVudEFwcCgpLnBhdGg7XG5cdFx0Y29uc29sZS5sb2coYXBwUGF0aCk7XG5cdFx0Ly8gZGV0ZXJtaW5lIHRoZSBwYXRoIHRvIGEgZmlsZSBpbiB0aGUgYXBwL3JlcyBmb2xkZXJcblx0XHQvL3ZhciBsb2dvUGF0aCA9IGFwcFBhdGggKyBcIi9pbWFnZXMvdmV0ZXJpbmFyeS5wbmdcIjtcblx0XHR2YXIgbG9nb1BhdGggPSBwYXRocztcblx0XHQvLyBub3cgdXBsb2FkIHRoZSBmaWxlIHdpdGggZWl0aGVyIG9mIHRoZSBvcHRpb25zIGJlbG93OlxuXHRcdGZpcmViYXNlLnVwbG9hZEZpbGUoe1xuXHRcdFx0Ly8gb3B0aW9uYWwsIGNhbiBhbHNvIGJlIHBhc3NlZCBkdXJpbmcgaW5pdCgpIGFzICdzdG9yYWdlQnVja2V0JyBwYXJhbSBzbyB3ZSBjYW4gY2FjaGUgaXQgKGZpbmQgaXQgaW4gdGhlIEZpcmViYXNlIGNvbnNvbGUpXG5cdFx0XHRidWNrZXQ6IFwiZ3M6Ly92ZXRzY29sLTEuYXBwc3BvdC5jb21cIixcblx0XHRcdC8vIHRoZSBmdWxsIHBhdGggb2YgdGhlIGZpbGUgaW4geW91ciBGaXJlYmFzZSBzdG9yYWdlIChmb2xkZXJzIHdpbGwgYmUgY3JlYXRlZClcblx0XHRcdHJlbW90ZUZ1bGxQYXRoOiBfaW1nTmFtZSArICcucG5nJyxcblx0XHRcdC8vIG9wdGlvbiAxOiBhIGZpbGUtc3lzdGVtIG1vZHVsZSBGaWxlIG9iamVjdFxuXHRcdFx0bG9jYWxGaWxlOiBmcy5GaWxlLmZyb21QYXRoKGxvZ29QYXRoKSxcblx0XHRcdC8vIG9wdGlvbiAyOiBhIGZ1bGwgZmlsZSBwYXRoIChpZ25vcmVkIGlmICdsb2NhbEZpbGUnIGlzIHNldClcblx0XHRcdGxvY2FsRnVsbFBhdGg6IGxvZ29QYXRoLFxuXHRcdFx0Ly8gZ2V0IG5vdGlmaWVkIG9mIGZpbGUgdXBsb2FkIHByb2dyZXNzXG5cdFx0XHRvblByb2dyZXNzOiBzdGF0dXMgPT4ge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcIlVwbG9hZGVkIGZyYWN0aW9uOiBcIiArIHN0YXR1cy5mcmFjdGlvbkNvbXBsZXRlZCk7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiUGVyY2VudGFnZSBjb21wbGV0ZTogXCIgKyBzdGF0dXMucGVyY2VudGFnZUNvbXBsZXRlZCk7XG5cdFx0XHR9XG5cdFx0fSkudGhlbih1cGxvYWRlZEZpbGUgPT4ge1xuXHRcdFx0Y29uc29sZS5sb2coXCJGaWxlIHVwbG9hZGVkOiBcIiArIEpTT04uc3RyaW5naWZ5KHVwbG9hZGVkRmlsZSkpO1xuXHRcdFx0Y29uc29sZS5sb2coXCJGaWxlIHVwbG9hZGVkOiBcIiArIEpTT04uc3RyaW5naWZ5KHVwbG9hZGVkRmlsZSkpO1xuXHRcdFx0dGhpcy5nZXRGb3dubG9hZFVybChfaW1nTmFtZSk7XG5cdFx0fSkuY2F0Y2goZXJyID0+IHtcblx0XHRcdGNvbnNvbGUubG9nKGVycik7XG5cdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQubG9hZGluZ0hpZGUoKTtcblx0XHR9KVxuXHR9XG5cblxuXHRwdWJsaWMgZ2V0Rm93bmxvYWRVcmwoX2ltZ05hbWUpIHtcblx0XHRmaXJlYmFzZS5nZXREb3dubG9hZFVybCh7XG5cdFx0XHQvLyBvcHRpb25hbCwgY2FuIGFsc28gYmUgcGFzc2VkIGR1cmluZyBpbml0KCkgYXMgJ3N0b3JhZ2VCdWNrZXQnIHBhcmFtIHNvIHdlIGNhbiBjYWNoZSBpdFxuXHRcdFx0YnVja2V0OiBcImdzOi8vdmV0c2NvbC0xLmFwcHNwb3QuY29tXCIsXG5cdFx0XHQvLyB0aGUgZnVsbCBwYXRoIG9mIGFuIGV4aXN0aW5nIGZpbGUgaW4geW91ciBGaXJlYmFzZSBzdG9yYWdlXG5cdFx0XHRyZW1vdGVGdWxsUGF0aDogX2ltZ05hbWUgKyAnLnBuZydcblx0XHR9KS50aGVuKHVybCA9PiB7XG5cdFx0XHRjb25zb2xlLmxvZyhcIlJlbW90ZSBVUkw6IFwiICsgdXJsKTtcblx0XHRcdGNvbnNvbGUubG9nKFwiUmVtb3RlIFVSTDogXCIgKyB1cmwpO1xuXHRcdFx0dGhpcy5fZGF0YVZldHMuX2ltYWdlID0gdXJsO1xuXHRcdFx0dGhpcy5hZGRWZXRlcmluYXJ5VmV0cygpO1xuXHRcdH0pLmNhdGNoKGVycm9yID0+IHtcblx0XHRcdGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpO1xuXHRcdFx0ZXJyb3IgPSBcImVycm9yQ2FyZ2FuZG9JbWFnZW5cIjtcblx0XHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC52YWxpZGFyRXJyb3JlcyhlcnJvcik7XG5cdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQubG9hZGluZ0hpZGUoKTtcblx0XHR9KVxuXHR9XG5cblx0LyoqXG5cdCAqIGFkZFByb2R1Y3Rvc1ZldHNcblx0ICovXG5cdHB1YmxpYyBhZGRWZXRlcmluYXJ5VmV0cygpIHtcblx0XHRpZih0aGlzLnNlbGVjdENoZWNrID09PSB0cnVlKXtcdFx0XHRcblx0XHRcdHRoaXMuX2RhdGFWZXRzLl90aXBvVmV0ID0gdGhpcy5fZGF0YVZldHMuX3RpcG9WZXQgK1wiLCAyNCBob3Jhc1wiO1xuXHRcdH1cblx0XHR0aGlzLl9zZXJ2aWNlRmlyZWJhc2UuY3JlYXJSZWdpc3Ryb1ZldHModGhpcy5fZGF0YVZldHMpLnRoZW4ocmVzcG9uc2UgPT4ge1xuXHRcdFx0Y29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKTtcblx0XHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC5sb2FkaW5nSGlkZSgpO1xuXHRcdFx0aWYgKHJlc3BvbnNlID09PSBcImd1YXJkYWRvXCIpIHtcblx0XHRcdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LnZhbGlkYXRlU3VjY2VzcyhcIlZldGVyaW5hcmlhIHJlZ2lzdHJhZGEgY29ycmVjdGFtZW50ZVwiKTtcblx0XHRcdFx0dGhpcy5fcm91dEV4Lm5hdmlnYXRlKFsnY3JlYXRlLXZldHMnXSwge1xuXHRcdFx0XHRcdGNsZWFySGlzdG9yeTogdHJ1ZSxcblx0XHRcdFx0XHR0cmFuc2l0aW9uOiB7XG5cdFx0XHRcdFx0XHRuYW1lOiBcInNsaWRlUmlnaHRcIixcblx0XHRcdFx0XHRcdGR1cmF0aW9uOiA0MDAsXG5cdFx0XHRcdFx0XHRjdXJ2ZTogXCJlYXNlXCJcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHR0aGlzLnNlYXJjaERhdGFWZXRlcmluYXJ5VXN1YXJpb3MoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC52YWxpZGFyRXJyb3JlcyhyZXNwb25zZSk7XG5cdFx0XHR9XG5cdFx0fSlcblx0fVxuXG5cdC8qKlxuICAgICAqIHNlYXJjaERhdGFWZXRlcmluYXJ5VXN1YXJpb3NcbiAgICAgKi9cblx0cHVibGljIHNlYXJjaERhdGFWZXRlcmluYXJ5VXN1YXJpb3MoKSB7XG5cdFx0dGhpcy5fc2VydmljZUZpcmViYXNlLnNlYXJjaERhdGFWZXRlcmluYXJ5VXN1YXJpb3MoKS50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdGNvbnNvbGUubG9nKFwidmV0ZXJpbmFyaWFzIHVzdWFyaW9cIiArIEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlKSk7XG5cblx0XHRcdGlmIChyZXNwb25zZS52YWx1ZSAhPT0gbnVsbCkge1xuXHRcdFx0XHRsZXQgdGFtYcOxbyA9IHJlc3BvbnNlLnZhbHVlO1xuXHRcdFx0XHR2YXIgc3RySlNPTiA9IEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlKTtcblx0XHRcdFx0dmFyIG9iakpTT04gPSBldmFsKFwiKGZ1bmN0aW9uKCl7cmV0dXJuIFwiICsgc3RySlNPTiArIFwiO30pKClcIik7XG5cdFx0XHRcdGxldCBzaXplID0gb2JqSlNPTi52YWx1ZS5sZW5ndGg7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiTnVldm8gSURcIiArIHNpemUpO1xuXHRcdFx0XHR0aGlzLl9zZXJ2aWNlRmlyZWJhc2UuY3JlYXJSZWdpc3Ryb1ZldHNVc3Vhcmlvcyh0aGlzLl9kYXRhVmV0cywgc2l6ZSkudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJ2ZXRlcmluYXJpYSByZWdpc3RyYWRhXCIpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGxldCBpZCA9IDA7XG5cdFx0XHRcdHRoaXMuX3NlcnZpY2VGaXJlYmFzZS5jcmVhclJlZ2lzdHJvVmV0c1VzdWFyaW9zKHRoaXMuX2RhdGFWZXRzLCBpZCkudGhlbihyZXNwb25zZSA9PiB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJ2ZXRlcmluYXJpYSByZWdpc3RyYWRhXCIpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cblx0QFZpZXdDaGlsZChcIkNCMVwiKSBGaXJzdENoZWNrQm94OiBFbGVtZW50UmVmO1xuXHRwdWJsaWMgdG9nZ2xlQ2hlY2soKSB7XG5cdFx0dGhpcy5GaXJzdENoZWNrQm94Lm5hdGl2ZUVsZW1lbnQudG9nZ2xlKCk7XG5cdH1cblxuXHRwdWJsaWMgZ2V0Q2hlY2tQcm9wKCkge1xuXHRcdGNvbnNvbGUubG9nKCdjaGVja2VkIHByb3AgdmFsdWUgPSAnICsgdGhpcy5GaXJzdENoZWNrQm94Lm5hdGl2ZUVsZW1lbnQuY2hlY2tlZCk7XG5cdH1cblxuXHQvKipcblx0ICogdmFsaWRhdGVDaGVja1xuXHQgKi9cblx0cHVibGljIHZhbGlkYXRlQ2hlY2soKSB7XG5cdFx0aWYgKHRoaXMuc2VsZWN0Q2hlY2sgPT09IGZhbHNlKSB7XG5cdFx0XHR0aGlzLnNlbGVjdENoZWNrID0gdHJ1ZTtcblx0XHRcdHRoaXMuX2RhdGFWZXRzLl8yNEhvcmFzID0gXCIyNCBIb3Jhc1wiO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLnNlbGVjdENoZWNrID0gZmFsc2U7XG5cdFx0XHR0aGlzLl9kYXRhVmV0cy5fMjRIb3JhcyA9IFwiXCI7XG5cdFx0fVxuXHR9XG5cblxufSJdfQ==