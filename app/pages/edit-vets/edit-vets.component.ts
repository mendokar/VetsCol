import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { GlobalComponent } from '../../consts/global.model';
import { DatosVets } from '../../modal/vets.modal';
import { ServiceFirebase } from '../../services/firebase.service';
import { getString } from 'tns-core-modules/application-settings/application-settings';
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';


import * as imagepicker from "nativescript-imagepicker";
import * as fs from "file-system";
import * as firebase from "nativescript-plugin-firebase";

@Component({
	selector: 'edit-vets',
	templateUrl: './pages/edit-vets/edit-vets.component.html',
	styleUrls: ['./pages/edit-vets/edit-vets.component.css']
})

export class EditVetsComponent implements OnInit {
	
	_pathImg: any;
	_serviceFirebase: ServiceFirebase;
	_dataVets: DatosVets;
	_globalComponent: GlobalComponent;
	constructor(private _routEx: RouterExtensions) {
		this._globalComponent = new GlobalComponent();
		this._dataVets = new DatosVets();
		this._serviceFirebase = new ServiceFirebase();
	}

	ngOnInit() {
		this.getDataVeterinary();
	}

	_seleccion1: boolean;
	_seleccion2: boolean;
	_seleccion3: boolean;
	_seleccion4: boolean;
	_seleccion5: boolean;
	_seleccion6: boolean;

	tipo1 = "";
	tipo2 = "";
	tipo3 = "";
	tipo4 = "";
	tipo5 = "";
	tipo6 = "";

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



	/**
	 * validarDatos
	 */
	public validarDatos() {
		if (this._seleccion1 !== false || this._seleccion2 !== false || this._seleccion3 !== false || this._seleccion4 !== false || this._seleccion5 !== false || this._seleccion6 !== false) {

			let cadena = this.tipo1 + "," + this.tipo2 + "," + this.tipo3 + "," + this.tipo4 + "," + this.tipo5 + "," + this.tipo6;
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
			console.log("Esta es la cadena Final" + cadena);
			this._dataVets._tipoVet = cadena;
			//this.changeTab();
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
			this.opcionDias = "Lunes a Sabado";
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
			//this.changeTab();
		} else {
			this._globalComponent.validarCampo("selecciona una opción de dias de atención.");
		}
	}


	/**
     * getDataVeterinary
     */
	public getDataVeterinary() {
		this._globalComponent.loadingView();
		let iduser = getString("idLogin");
		this._serviceFirebase.searchDataVeterinary(iduser).then(response => {
			console.log("RESP" + JSON.stringify(response));
			if (response.value !== null) {
				//this._viewShared = true;
				//this._viewAdd = false;
				console.log("RESP" + JSON.stringify(response.value.veterinaria));
				let data = response.value.veterinaria;
				this._dataVets._nombreVet = data.nombre;
				this._dataVets._lemaVet = data.lema;
				this._dataVets._image = data.image;
				this._dataVets._descripcionVet = data.descripcion;
				this._dataVets._tipoVet = data.tipo_vets;
				this._dataVets._correoVet = data.correo;
				this._dataVets._direccionVet = data.direccion;
				this._dataVets._telefonoVet = data.telefono;
				this._dataVets._celularVet = data.celular;
				this._dataVets._paginaWebVet = data.pagina_web;
				this._dataVets._horarioVet = data.dias + " de " + data.horario
				this._dataVets._facebookVets = data.facebook;
				this._dataVets._twitterVets = data.twitter;
				this._dataVets._InstagramVets = data.instagram;
				this._dataVets._whatSappVets = data.whatsapp;

				if (this._dataVets._facebookVets !== null && this._dataVets._facebookVets !== "" && this._dataVets._facebookVets !== undefined) {
					//this._viewF = true;
				}
				if (this._dataVets._twitterVets !== null && this._dataVets._twitterVets !== "" && this._dataVets._twitterVets !== undefined) {
					//this._viewT = true;
				}
				if (this._dataVets._InstagramVets !== null && this._dataVets._InstagramVets !== "" && this._dataVets._InstagramVets !== undefined) {
					//this._viewI = true;
				}
				if (this._dataVets._whatSappVets !== null && this._dataVets._whatSappVets !== "" && this._dataVets._whatSappVets !== undefined) {
					//this._viewW = true;
				}

				this.validarMetodos();
			} else {
				//this._viewShared = false;
				//this._viewAdd = true;
			}
		});
	}



	/**
	 * validarMetodos
	 */
	public validarMetodos() {
		///valida tipo veterinaria
		let tipo = [];
		tipo = this._dataVets._tipoVet.split(',');

		for (let i = 0; i < tipo.length; i++) {

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



	}


	/**
	 * saveVets
	 */
	public saveVets() {
		this._globalComponent.loadingView();
		if(this._seleccion1 !== false || this._seleccion2 !== false || this._seleccion3 !== false || this._seleccion4 !== false || this._seleccion5 !== false || this._seleccion6 !== false){
			if(this._dataVets._image !== "" && this._dataVets._image !== null && this._dataVets._image !== undefined ){
				if(this._dataVets._nombreVet !== "" && this._dataVets._nombreVet !== null && this._dataVets._nombreVet !== undefined ){
					if(this._dataVets._direccionVet !== "" && this._dataVets._direccionVet !== null && this._dataVets._direccionVet !== undefined ){
						if(this._dataVets._telefonoVet !== "" && this._dataVets._telefonoVet !== null && this._dataVets._telefonoVet !== undefined ){
							if(this._dataVets._celularVet !== "" && this._dataVets._celularVet !== null && this._dataVets._celularVet !== undefined ){
								if (this.opcionDias !== "") {
									//setString('opcionDias',''+this.opcionDias);
									//setString('opcionHora',''+this.opcionHoraInicio + " a " + this.opcionHoraFin);
									//this._modal.closeCallback();
									//this.changeTab();
									let id = getString("idLogin");
									this.subirImagen(this._pathImg,id+"/veterinaria/logo");


								} else {
									this._globalComponent.validarCampo("selecciona una opción de dias de atención.");
									this._globalComponent.loadingHide();
								}		
							}else{
								this._globalComponent.validarCampo("celular");
								this._globalComponent.loadingHide();
							}
						}else{
							this._globalComponent.validarCampo("telefono");
							this._globalComponent.loadingHide();
						}
					}else{
						this._globalComponent.validarCampo("dirección");
						this._globalComponent.loadingHide();
					}
				}else{
					this._globalComponent.validarCampo("nombre");
					this._globalComponent.loadingHide();
				}
			}else{
				this._globalComponent.validarCampo("imagen");
				this._globalComponent.loadingHide();
			}
		}else{
			this._globalComponent.validarCampo("selecciona una opción tipo Vets");
			this._globalComponent.loadingHide();
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
		this._serviceFirebase.crearRegistroVets(this._dataVets).then(response =>{
			console.log(JSON.stringify(response));
			this._globalComponent.loadingHide();
			if(response === "guardado"){
				this._globalComponent.validateSuccess("Veterinaria actualizada correctamente");
				this._routEx.navigate(['create-vets'], {clearHistory:true,
                    transition: {
                        name: "slideRight",
                        duration: 400,
                        curve: "ease"
                    }
				});
				//this.searchDataVeterinaryUsuarios();
			}else{
				this._globalComponent.validarErrores(response);
			}
		})
	}


}