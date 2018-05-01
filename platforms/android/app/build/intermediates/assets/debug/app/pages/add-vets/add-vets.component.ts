import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { GlobalComponent } from '../../consts/global.model';
import { DatosVets } from '../../modal/vets.modal';
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';

import * as imagepicker from "nativescript-imagepicker";
import * as fs from "file-system";
import * as firebase from "nativescript-plugin-firebase";
import { getString } from 'tns-core-modules/application-settings/application-settings';
import { ServiceFirebase } from '../../services/firebase.service';

@Component({
	selector: 'add-vets',
	templateUrl: './pages/add-vets/add-vets.component.html',
	styleUrls: ['./pages/add-vets/add-vets.component.css'],
	providers: [ServiceFirebase]
})

export class AddVetsComponent implements OnInit {

	selectCheck: boolean = false;
	_serviceFirebase: ServiceFirebase;
	_pathImg: any;
	_dataVets: DatosVets;
	_globalComponent: GlobalComponent;
	public tabSelectedIndex: number;

	constructor(private _routEx: RouterExtensions) {
		this.tabSelectedIndex = 0;
		this._globalComponent = new GlobalComponent();
		this._dataVets = new DatosVets();
		this._serviceFirebase = new ServiceFirebase();
	}

	changeTab() {
		if (this.tabSelectedIndex === 0) {
			this.tabSelectedIndex = 1;
		} else if (this.tabSelectedIndex === 1) {
			this.tabSelectedIndex = 2;
		} else if (this.tabSelectedIndex === 2) {
			this.tabSelectedIndex = 3;
		} else if (this.tabSelectedIndex === 3) {

		}
	}

	ngOnInit() {
		this.getLocation();
	}



	/**
	 * getLocation
	 */
	public getLocation() {
		this._globalComponent.getUrlLocation().then(res => {
			this._dataVets._coordenadasVets = res.latitude + "," + res.longitude;
			console.log("Coordenadas" + this._dataVets._coordenadasVets)
		})
	}

	/**
	 * getBack
	 */
	public getBack() {
		this._routEx.back();
	}

	/**
	 * saveVets
	 */
	public saveVets() {
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
									let id = getString("idLogin");
									this.subirImagen(this._pathImg, id + "/veterinaria/logo");


								} else {
									this._globalComponent.validarCampo("selecciona una opción de dias de atención.");
									this._globalComponent.loadingHide();
								}
							} else {
								this._globalComponent.validarCampo("celular");
								this._globalComponent.loadingHide();
							}
						} else {
							this._globalComponent.validarCampo("telefono");
							this._globalComponent.loadingHide();
						}
					} else {
						this._globalComponent.validarCampo("dirección");
						this._globalComponent.loadingHide();
					}
				} else {
					this._globalComponent.validarCampo("nombre");
					this._globalComponent.loadingHide();
				}
			} else {
				this._globalComponent.validarCampo("imagen");
				this._globalComponent.loadingHide();
			}
		} else {
			this._globalComponent.validarCampo("selecciona una opción tipo Vets");
			this._globalComponent.loadingHide();
		}




	}



	/**
	 * Funciones para validar los tipos de veterinarias
	 * / 
	 * */

	_seleccion1: boolean = false;
	_seleccion2: boolean = false;
	_seleccion3: boolean = false;
	_seleccion4: boolean = false;
	_seleccion5: boolean = false;
	_seleccion6: boolean = false;
	_seleccion7: boolean = false;
	_seleccion8: boolean = false;


	tipo1 = "";
	tipo2 = "";
	tipo3 = "";
	tipo4 = "";
	tipo5 = "";
	tipo6 = "";
	tipo7 = "";
	tipo8 = "";

	public onFirstChecked(args) {
		if (this._seleccion1 == false) {
			this._seleccion1 = true;
			this.tipo1 = "Clinica Veterinaria";
		} else {
			this._seleccion1 = false;
			this.tipo1 = "";
		}
	}

	public onSecondChecked(args) {
		if (this._seleccion2 == false) {
			this._seleccion2 = true;
			this.tipo2 = "Tienda Veterinaria";
		} else {
			this._seleccion2 = false;
			this.tipo2 = "";
		}
	}

	public onThreeChecked(args) {
		if (this._seleccion3 == false) {
			this._seleccion3 = true;
			this.tipo3 = "Spa Veterinario";
		} else {
			this._seleccion3 = false;
			this.tipo3 = "";
		}
	}

	public onFourChecked(args) {
		if (this._seleccion4 == false) {
			this._seleccion4 = true;
			this.tipo4 = "Funeraria Veterinaria";
		} else {
			this._seleccion4 = false;
			this.tipo4 = "";
		}
	}

	public onFiveChecked(args) {
		if (this._seleccion5 == false) {
			this._seleccion5 = true;
			this.tipo5 = "Guarderia Veterinaria";
		} else {
			this._seleccion5 = false;
			this.tipo5 = "";
		}
	}

	public onSixChecked(args) {
		if (this._seleccion6 == false) {
			this._seleccion6 = true;
			this.tipo6 = "Escuela Veterinaria";
		} else {
			this._seleccion6 = false;
			this.tipo6 = "";
		}
	}

	public onSevenChecked(args) {
		if (this._seleccion7 == false) {
			this._seleccion7 = true;
			this.tipo7 = "Laboratorio Clinico";
		} else {
			this._seleccion7 = false;
			this.tipo7 = "";
		}
	}

	public onEightChecked(args) {
		if (this._seleccion8 == false) {
			this._seleccion8 = true;
			this.tipo8 = "Cirugias";
		} else {
			this._seleccion8 = false;
			this.tipo8 = "";
		}
	}



	/**
	 * validarDatos
	 */
	public validarDatos() {
		if (this._seleccion1 !== false || this._seleccion2 !== false || this._seleccion3 !== false || this._seleccion4 !== false || this._seleccion5 !== false || this._seleccion6 !== false || this._seleccion7 !== false || this._seleccion8 !== false) {

			let cadena = this.tipo1 + "," + this.tipo2 + "," + this.tipo3 + "," + this.tipo4 + "," + this.tipo5 + "," + this.tipo6 +  "," + this.tipo7 + "," + this.tipo8;
			console.log("Esta es la cadena" + cadena);
			let arreglo = cadena.split(",");
			cadena = "";
			for (let index = 0; index < arreglo.length; index++) {
				let dato = arreglo[index];
				if (dato !== "") {
					if (cadena === "") {
						cadena = dato;
					} else {
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
		} else {
			this._globalComponent.validarCampo("selecciona una opción tipo Vets");
		}
	}


	/*
	*funciones para validar los dias y horas de funcionamiento
	*/

	_errorMensaje: string;
	@ViewChild("switch6") switch: ElementRef;
	@ViewChild("switch7") switch1: ElementRef;
	@ViewChild("switch8") switch2: ElementRef;

	opcionDias = "";
	opcionHoraInicio = "";
	opcionHoraFin = "";

	public onFirstCheckeds(args) {
		let dato = this.switch.nativeElement;
		let dato1 = this.switch1.nativeElement;
		let dato2 = this.switch2.nativeElement;
		if (dato.checked === true) {
			dato1.checked = false;
			dato2.checked = false;
			this.opcionDias = "Lunes a Viernes";
		} else {
			this.opcionDias = "";
		}




	}

	public onSecondCheckeds(args) {
		let dato = this.switch.nativeElement;
		let dato1 = this.switch1.nativeElement;
		let dato2 = this.switch2.nativeElement;
		if (dato1.checked === true) {
			dato.checked = false;
			dato2.checked = false;
			this.opcionDias = "Lunes a Sábado";
		} else {
			this.opcionDias = "";
		}

	}
	public onThreeCheckeds(args) {
		let dato = this.switch.nativeElement;
		let dato1 = this.switch1.nativeElement;
		let dato2 = this.switch2.nativeElement;

		if (dato2.checked === true) {
			dato.checked = false;
			dato1.checked = false;
			this.opcionDias = "Lunes a Domingo";
		} else {
			this.opcionDias = "";
		}


	}

	onTimeChanged(args) {
		let res = args.value;
		console.log(res);
		let fecha = res.toString();
		let tamano = fecha.length;
		fecha = fecha.substring(16, tamano);
		let horas = fecha.substring(0, 8);
		let hora = horas.substring(0, 2);
		let minutos = horas.substring(3, 5);
		//hora = hora.parseInt();
		let zona = "AM";
		let numero = parseInt(hora);
		if (hora === '00') {
			hora = "12"
		} else {
			if (numero > 12) {
				hora = hora - 12;
				zona = "PM"
			}

			if (numero === 12) {
				zona = "PM"
			}
		}

		if (hora < 10 && hora.length < 2) {
			hora = "0" + hora;
		}
		let horaFinal = hora + ":" + minutos + " " + zona;
		console.log("HORA INICIAL PARA GUARDAR" + horaFinal);
		this.opcionHoraInicio = horaFinal;



	}

	onTimeChangeds(args) {
		let res = args.value;
		console.log(res);
		let fecha = res.toString();
		let tamano = fecha.length;
		fecha = fecha.substring(16, tamano);
		let horas = fecha.substring(0, 8);
		let hora = horas.substring(0, 2);
		let minutos = horas.substring(3, 5);
		//hora = hora.parseInt();
		let zona = "AM";
		let numero = parseInt(hora);
		if (hora === '00') {
			hora = "12"
		} else {
			if (numero > 12) {
				hora = hora - 12;
				zona = "PM"
			}

			if (numero === 12) {
				zona = "PM"
			}
		}

		if (hora < 10 && hora.length < 2) {
			hora = "0" + hora;
		}
		let horaFinal = hora + ":" + minutos + " " + zona;
		console.log("HORA INICIAL PARA GUARDAR" + horaFinal);
		this.opcionHoraFin = horaFinal;



	}


	validarDatosDOS() {
		if (this.opcionDias !== "") {
			//setString('opcionDias',''+this.opcionDias);
			//setString('opcionHora',''+this.opcionHoraInicio + " a " + this.opcionHoraFin);
			//this._modal.closeCallback();
			this._dataVets._diasAtencionVet = this.opcionDias;
			this._dataVets._horarioVet = this.opcionHoraInicio + " a " + this.opcionHoraFin;
			if (this.selectCheck === false) {
				this._dataVets._24Horas = "";
			} else {
				this._dataVets._24Horas = "24 Horas";
			}

			this.changeTab();
		} else {
			this._globalComponent.validarCampo("selecciona una opción de dias de atención.");
		}
	}


	/**
	 * validarDatosVets
	 */
	public validarDatosVets() {
		if (this._dataVets._image !== "" && this._dataVets._image !== null && this._dataVets._image !== undefined) {
			if (this._dataVets._nombreVet !== "" && this._dataVets._nombreVet !== null && this._dataVets._nombreVet !== undefined) {
				if (this._dataVets._direccionVet !== "" && this._dataVets._direccionVet !== null && this._dataVets._direccionVet !== undefined) {
					if (this._dataVets._telefonoVet !== "" && this._dataVets._telefonoVet !== null && this._dataVets._telefonoVet !== undefined) {
						if (this._dataVets._celularVet !== "" && this._dataVets._celularVet !== null && this._dataVets._celularVet !== undefined) {
							this.changeTab();
						} else {
							this._globalComponent.validarCampo("celular");
						}
					} else {
						this._globalComponent.validarCampo("telefono");
					}
				} else {
					this._globalComponent.validarCampo("dirección");
				}
			} else {
				this._globalComponent.validarCampo("nombre");
			}
		} else {
			this._globalComponent.validarCampo("imagen");
		}
	}


	imageAssets = [];
	imageSrc = "~/images/placeholder.png";
	isSingleMode: boolean = true;
	thumbSize: number = 80;
	previewSize: number = 300;

	/**
	 * name
	 */
	public onSelectSingleTap() {
		this.isSingleMode = true;

		let context = imagepicker.create({
			mode: "single"
		});
		this.startSelection(context);
	}

	private startSelection(context) {
		let that = this;

		context
			.authorize()
			.then(() => {
				that.imageAssets = [];
				that.imageSrc = null;
				return context.present();
			})
			.then((selection) => {
				console.log("Selection done: " + JSON.stringify(selection));
				that.imageSrc = that.isSingleMode && selection.length > 0 ? selection[0] : null;
				console.log("Esta es la ruta imagen" + selection[0]._android);
				let id = getString("idLogin");
				this._pathImg = selection[0]._android;
				this._dataVets._image = this._pathImg;
				console.log("Path para guardar las imagenes" + id + "/veterinaria/veterinaria1")
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
	}

	public subirImagen(paths, _imgName) {
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
			onProgress: status => {
				console.log("Uploaded fraction: " + status.fractionCompleted);
				console.log("Percentage complete: " + status.percentageCompleted);
			}
		}).then(uploadedFile => {
			console.log("File uploaded: " + JSON.stringify(uploadedFile));
			console.log("File uploaded: " + JSON.stringify(uploadedFile));
			this.getFownloadUrl(_imgName);
		}).catch(err => {
			console.log(err);
			this._globalComponent.loadingHide();
		})
	}


	public getFownloadUrl(_imgName) {
		firebase.getDownloadUrl({
			// optional, can also be passed during init() as 'storageBucket' param so we can cache it
			bucket: "gs://vetscol-1.appspot.com",
			// the full path of an existing file in your Firebase storage
			remoteFullPath: _imgName + '.png'
		}).then(url => {
			console.log("Remote URL: " + url);
			console.log("Remote URL: " + url);
			this._dataVets._image = url;
			this.addVeterinaryVets();
		}).catch(error => {
			console.log("Error: " + error);
			error = "errorCargandoImagen";
			this._globalComponent.validarErrores(error);
			this._globalComponent.loadingHide();
		})
	}

	/**
	 * addProductosVets
	 */
	public addVeterinaryVets() {
		if(this.selectCheck === true){			
			this._dataVets._tipoVet = this._dataVets._tipoVet +", 24 horas";
		}
		this._serviceFirebase.crearRegistroVets(this._dataVets).then(response => {
			console.log(JSON.stringify(response));
			this._globalComponent.loadingHide();
			if (response === "guardado") {
				this._globalComponent.validateSuccess("Veterinaria registrada correctamente");
				this._routEx.navigate(['create-vets'], {
					clearHistory: true,
					transition: {
						name: "slideRight",
						duration: 400,
						curve: "ease"
					}
				});
				this.searchDataVeterinaryUsuarios();
			} else {
				this._globalComponent.validarErrores(response);
			}
		})
	}

	/**
     * searchDataVeterinaryUsuarios
     */
	public searchDataVeterinaryUsuarios() {
		this._serviceFirebase.searchDataVeterinaryUsuarios().then(response => {
			console.log("veterinarias usuario" + JSON.stringify(response));

			if (response.value !== null) {
				let tamaño = response.value;
				var strJSON = JSON.stringify(response);
				var objJSON = eval("(function(){return " + strJSON + ";})()");
				let size = objJSON.value.length;
				console.log("Nuevo ID" + size);
				this._serviceFirebase.crearRegistroVetsUsuarios(this._dataVets, size).then(response => {
					console.log("veterinaria registrada");
				});
			} else {
				let id = 0;
				this._serviceFirebase.crearRegistroVetsUsuarios(this._dataVets, id).then(response => {
					console.log("veterinaria registrada");
				});
			}
		});
	}


	@ViewChild("CB1") FirstCheckBox: ElementRef;
	public toggleCheck() {
		this.FirstCheckBox.nativeElement.toggle();
	}

	public getCheckProp() {
		console.log('checked prop value = ' + this.FirstCheckBox.nativeElement.checked);
	}

	/**
	 * validateCheck
	 */
	public validateCheck() {
		if (this.selectCheck === false) {
			this.selectCheck = true;
			this._dataVets._24Horas = "24 Horas";
		} else {
			this.selectCheck = false;
			this._dataVets._24Horas = "";
		}
	}


}