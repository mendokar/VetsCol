import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { RouterExtensions } from 'nativescript-angular/router';
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';

import { ServiceFirebase } from "../../services/firebase.service";

import { GlobalComponent } from "../../consts/global.model";
import { getString } from 'tns-core-modules/application-settings/application-settings';
import { ProductsVets } from '../../modal/products.modal';
import { ServiciosVets } from '../../modal/servicios.modal';

import * as fs from "file-system";
import * as firebase from "nativescript-plugin-firebase";
import * as imagepicker from "nativescript-imagepicker";


@Component({
	selector: 'add-products',
	templateUrl: './pages/add-products/add-products.component.html',
	styleUrls: ['./pages/add-products/add-products.component.scss'],
	providers: [ServiceFirebase]
})

export class AddProductsComponent implements OnInit {


	_globalComponent: GlobalComponent;
	_addImage: string;
	_pathImg;
	_dataProducts: ProductsVets;
	_dataService: ServiciosVets;
	_mensaje: string;
	_imageFinal = "~/images/placeholder.png";
	constructor(
		private _page: Page,
		private _routEx: RouterExtensions,
		private _servicioFirebase: ServiceFirebase,
		private _changeDetectionRef: ChangeDetectorRef) {
		this._dataProducts = new ProductsVets();
		this._dataService = new ServiciosVets();
		this._globalComponent = new GlobalComponent();
	}

	ngOnInit() {
		this.getIdServices();
	}

	/**
     * addProductsVets
     */
    /*public addProductsVets() {
        this._mensaje = "";
        console.log(this._dataService._nombreServicioVet);
        if (this._dataService._nombreServicioVet !== undefined && this._dataService._nombreServicioVet !== null && this._dataService._nombreServicioVet !== "") {
            if (this._dataService._descripcionServicioVet !== undefined && this._dataService._descripcionServicioVet !== null && this._dataService._descripcionServicioVet !== "") {
                this._mensaje = "";
                this._dataService._idUsuario = getString("idLogin");
                this._servicioFirebase.addProductsVets(this._dataService).then(response => {
                    if(response === "guardado"){						
						this._globalConst.viewMessageSucces("Producto registrado correctamente.")
                    }else{
                        this._globalConst.validarErrores(response);
                    }
                });
            } else {
                this._globalConst.validarCampo("descripción");
            }
        } else {
            this._globalConst.validarCampo("nombre");
        }

       
    }*/

    /**
     * getIdServices
     */
	public getIdServices() {
		this._dataService._idUsuario = getString("idLogin");
		this._servicioFirebase.getServicesVeterinary(this._dataService).then(response => {
			//console.log("response"+JSON.stringify(response));

			console.log(JSON.stringify(response));
			if (response !== null) {
				var strJSON = JSON.stringify(response);
				var objJSON = eval("(function(){return " + strJSON + ";})()");
				if (objJSON.value.productos !== null && objJSON.value.productos !== undefined) {
					let size = objJSON.value.productos.length;
					this._dataProducts._idProductsVet = size;
					console.log("ID Producto" + size);
				} else {
					this._dataProducts._idProductsVet = "0"
					console.log("ID Producto" + this._dataProducts._idProductsVet);
				}

			}

		});
	}

	/**
	 * getBack
	 */
	public getBack() {
		this._routEx.navigate(['product'],{
			clearHistory:true,
			transition:{
				name:"slideRight",
				duration:400,
				curve:"ease"
			}
		})
	}



	imageAssets = [];
	imageSrc;
	isSingleMode: boolean = true;
	thumbSize: number = 80;
	previewSize: number = 300;

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
				this._dataProducts._imageProductVet = this._pathImg;
				console.log("Path para guardar las imagenes" + id + "/productos/producto" + this._dataProducts._idProductsVet)
				//this.subirImagen(selection[0]._android,id+"/productos/image"+this._dataProducts._idProductsVet);
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

	/*startSelection(context) {
		let _that = this;
		let path;
		context
			.authorize()
			.then(() => {
				_that.items = [];
				return context.present();
			})
			.then((selection) => {
				console.log("Selection done:");
				selection.forEach(function (selected) {
					console.log("----------------");
					console.log("uri: " + selected.uri);
					console.log("fileUri: " + selected.fileUri);
					path = (selected.fileUri);

				});
				this._pathImg = path;
				this._addImage = "Imagen Adjuntada"
				console.log("Aqui ya se cargo la Imagen" + this._pathImg);
				//const IMG_AS_BASE64_STRING = this._pathImg.toBase64String("png");
				//this.base64ImageSource = fromBase64(IMG_AS_BASE64_STRING);
				//this._imageFinal = this._pathImg;
				//this.subirImagen(path,"_imgName");
				let id =  getString("idLogin");
				console.log("Path para guardar las imagenes"+id+"/productos/image"+this._dataProducts._idProductsVet)
				//this.subirImagen(path,id+"/productos/image"+this._dataProducts._idProductsVet);
				_that.items = selection;
				_that._changeDetectionRef.detectChanges();
			}).catch(function (e) {
				console.log(e);
			});
	}*/


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
			this.addProductsVets(url);
		}).catch(error => {
			console.log("Error: " + error);
			error = "errorCargandoImagen";
			this._globalComponent.validarErrores(error);
			this._globalComponent.loadingHide();
		})
	}

	/**
	 * validarDatos
	 */
	public validarDatos() {
		this._globalComponent.loadingView();
		let id = getString("idLogin");
		console.log("Path para guardar las imagenes" + id + "/productos/producto" + this._dataProducts._idProductsVet)
		this._mensaje = "";
		console.log(this._dataProducts._nombreProductVet);
		if (this._dataProducts._imageProductVet !== undefined && this._dataProducts._imageProductVet !== null && this._dataProducts._imageProductVet !== "") {
			if (this._dataProducts._nombreProductVet !== undefined && this._dataProducts._nombreProductVet !== null && this._dataProducts._nombreProductVet !== "") {
				if (this._dataProducts._precioProductoVet !== undefined && this._dataProducts._precioProductoVet !== null && this._dataProducts._precioProductoVet !== "") {
					if (this._dataProducts._descripcionProductVet !== undefined && this._dataProducts._descripcionProductVet !== null && this._dataProducts._descripcionProductVet !== "") {
						//this._mensaje = "";
						//this._dataProducts._idUsuario = getString("idLogin");
						this.subirImagen(this._pathImg, id + "/productos/producto" + this._dataProducts._idProductsVet);
					} else {
						this._globalComponent.validarCampo("descripción");
						this._globalComponent.loadingHide();
					}
				} else {
					this._globalComponent.validarCampo("precio");
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
	}


	public addProductsVets(url) {
		this._mensaje = "";
		console.log(this._dataProducts._nombreProductVet);
		this._dataProducts._imageProductVet = url;
		if (this._dataProducts._nombreProductVet !== undefined && this._dataProducts._nombreProductVet !== null && this._dataProducts._nombreProductVet !== "") {
			if (this._dataProducts._precioProductoVet !== undefined && this._dataProducts._precioProductoVet !== null && this._dataProducts._precioProductoVet !== "") {
				if (this._dataProducts._nombreProductVet !== undefined && this._dataProducts._nombreProductVet !== null && this._dataProducts._nombreProductVet !== "") {
					this._dataProducts._idUsuario = getString("idLogin");
					this._dataProducts._precioProductoVet = this._globalComponent.validarFormatMiles(this._dataProducts._precioProductoVet,'');
					this._servicioFirebase.addProductsVets(this._dataProducts).then(response => {
						if (response === "guardado") {
							this._globalComponent.loadingHide();
							this._globalComponent.viewMessageSucces("Producto registrado correctamente.")							
							this.getBack();
							//this.getIdServices();
							this.limpiarCampos();
						} else {
							this._globalComponent.validarErrores(response);
						}
					});
				} else {
					this._globalComponent.validarCampo("descripción");
				}
			} else {
				this._globalComponent.validarCampo("precio");
			}
		} else {
			this._globalComponent.validarCampo("nombre");
		}


	}

	/**
	 * limpiarCampos
	 */
	public limpiarCampos() {
		this.imageSrc = "";
		this._dataProducts = new ProductsVets();
	}
}