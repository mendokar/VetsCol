"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page/page");
var router_1 = require("nativescript-angular/router");
//import { RouterExtensions } from 'nativescript-angular';
//import { TextField } from 'ui/text-field';
//import { EventData } from 'data/observable';
//import { ActivatedRoute } from '@angular/router';
var firebase_service_1 = require("../../services/firebase.service");
var global_model_1 = require("../../consts/global.model");
var application_settings_1 = require("tns-core-modules/application-settings/application-settings");
var products_modal_1 = require("../../modal/products.modal");
var servicios_modal_1 = require("../../modal/servicios.modal");
var fs = require("file-system");
var firebase = require("nativescript-plugin-firebase");
var imagepicker = require("nativescript-imagepicker");
var AddProductsComponent = /** @class */ (function () {
    function AddProductsComponent(_page, _routEx, _servicioFirebase, _changeDetectionRef) {
        this._page = _page;
        this._routEx = _routEx;
        this._servicioFirebase = _servicioFirebase;
        this._changeDetectionRef = _changeDetectionRef;
        this._imageFinal = "~/images/placeholder.png";
        this.imageAssets = [];
        this.isSingleMode = true;
        this.thumbSize = 80;
        this.previewSize = 300;
        this._dataProducts = new products_modal_1.ProductsVets();
        this._dataService = new servicios_modal_1.ServiciosVets();
        this._globalComponent = new global_model_1.GlobalComponent();
    }
    AddProductsComponent.prototype.ngOnInit = function () {
        this.getIdServices();
    };
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
    AddProductsComponent.prototype.getIdServices = function () {
        var _this = this;
        this._dataService._idUsuario = application_settings_1.getString("idLogin");
        this._servicioFirebase.getServicesVeterinary(this._dataService).then(function (response) {
            //console.log("response"+JSON.stringify(response));
            console.log(JSON.stringify(response));
            if (response !== null) {
                var strJSON = JSON.stringify(response);
                var objJSON = eval("(function(){return " + strJSON + ";})()");
                if (objJSON.value.productos !== null && objJSON.value.productos !== undefined) {
                    var size = objJSON.value.productos.length;
                    _this._dataProducts._idProductsVet = size;
                    console.log("ID Producto" + size);
                }
                else {
                    _this._dataProducts._idProductsVet = "0";
                    console.log("ID Producto" + _this._dataProducts._idProductsVet);
                }
            }
        });
    };
    /**
     * getBack
     */
    AddProductsComponent.prototype.getBack = function () {
        this._routEx.navigate(['product'], {
            clearHistory: true,
            transition: {
                name: "slideRight",
                duration: 400,
                curve: "ease"
            }
        });
    };
    AddProductsComponent.prototype.onSelectSingleTap = function () {
        this.isSingleMode = true;
        var context = imagepicker.create({
            mode: "single"
        });
        this.startSelection(context);
    };
    AddProductsComponent.prototype.startSelection = function (context) {
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
            _this._dataProducts._imageProductVet = _this._pathImg;
            console.log("Path para guardar las imagenes" + id + "/productos/producto" + _this._dataProducts._idProductsVet);
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
    };
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
    AddProductsComponent.prototype.subirImagen = function (paths, _imgName) {
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
    AddProductsComponent.prototype.getFownloadUrl = function (_imgName) {
        var _this = this;
        firebase.getDownloadUrl({
            // optional, can also be passed during init() as 'storageBucket' param so we can cache it
            bucket: "gs://vetscol-1.appspot.com",
            // the full path of an existing file in your Firebase storage
            remoteFullPath: _imgName + '.png'
        }).then(function (url) {
            console.log("Remote URL: " + url);
            console.log("Remote URL: " + url);
            _this.addProductsVets(url);
        }).catch(function (error) {
            console.log("Error: " + error);
            error = "errorCargandoImagen";
            _this._globalComponent.validarErrores(error);
            _this._globalComponent.loadingHide();
        });
    };
    /**
     * validarDatos
     */
    AddProductsComponent.prototype.validarDatos = function () {
        this._globalComponent.loadingView();
        var id = application_settings_1.getString("idLogin");
        console.log("Path para guardar las imagenes" + id + "/productos/producto" + this._dataProducts._idProductsVet);
        this._mensaje = "";
        console.log(this._dataProducts._nombreProductVet);
        if (this._dataProducts._imageProductVet !== undefined && this._dataProducts._imageProductVet !== null && this._dataProducts._imageProductVet !== "") {
            if (this._dataProducts._nombreProductVet !== undefined && this._dataProducts._nombreProductVet !== null && this._dataProducts._nombreProductVet !== "") {
                if (this._dataProducts._precioProductoVet !== undefined && this._dataProducts._precioProductoVet !== null && this._dataProducts._precioProductoVet !== "") {
                    if (this._dataProducts._descripcionProductVet !== undefined && this._dataProducts._descripcionProductVet !== null && this._dataProducts._descripcionProductVet !== "") {
                        //this._mensaje = "";
                        //this._dataProducts._idUsuario = getString("idLogin");
                        this.subirImagen(this._pathImg, id + "/productos/producto" + this._dataProducts._idProductsVet);
                    }
                    else {
                        this._globalComponent.validarCampo("descripción");
                        this._globalComponent.loadingHide();
                    }
                }
                else {
                    this._globalComponent.validarCampo("precio");
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
    };
    AddProductsComponent.prototype.addProductsVets = function (url) {
        var _this = this;
        this._mensaje = "";
        console.log(this._dataProducts._nombreProductVet);
        this._dataProducts._imageProductVet = url;
        if (this._dataProducts._nombreProductVet !== undefined && this._dataProducts._nombreProductVet !== null && this._dataProducts._nombreProductVet !== "") {
            if (this._dataProducts._precioProductoVet !== undefined && this._dataProducts._precioProductoVet !== null && this._dataProducts._precioProductoVet !== "") {
                if (this._dataProducts._nombreProductVet !== undefined && this._dataProducts._nombreProductVet !== null && this._dataProducts._nombreProductVet !== "") {
                    this._dataProducts._idUsuario = application_settings_1.getString("idLogin");
                    this._dataProducts._precioProductoVet = this._globalComponent.validarFormatMiles(this._dataProducts._precioProductoVet, '');
                    this._servicioFirebase.addProductsVets(this._dataProducts).then(function (response) {
                        if (response === "guardado") {
                            _this._globalComponent.loadingHide();
                            _this._globalComponent.viewMessageSucces("Producto registrado correctamente.");
                            _this.getBack();
                            //this.getIdServices();
                            _this.limpiarCampos();
                        }
                        else {
                            _this._globalComponent.validarErrores(response);
                        }
                    });
                }
                else {
                    this._globalComponent.validarCampo("descripción");
                }
            }
            else {
                this._globalComponent.validarCampo("precio");
            }
        }
        else {
            this._globalComponent.validarCampo("nombre");
        }
    };
    /**
     * limpiarCampos
     */
    AddProductsComponent.prototype.limpiarCampos = function () {
        this.imageSrc = "";
        this._dataProducts = new products_modal_1.ProductsVets();
    };
    AddProductsComponent = __decorate([
        core_1.Component({
            selector: 'add-products',
            templateUrl: './pages/add-products/add-products.component.html',
            styleUrls: ['./pages/add-products/add-products.component.scss'],
            providers: [firebase_service_1.ServiceFirebase]
        }),
        __metadata("design:paramtypes", [page_1.Page,
            router_1.RouterExtensions,
            firebase_service_1.ServiceFirebase,
            core_1.ChangeDetectorRef])
    ], AddProductsComponent);
    return AddProductsComponent;
}());
exports.AddProductsComponent = AddProductsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLXByb2R1Y3RzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFkZC1wcm9kdWN0cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBcUU7QUFDckUsc0RBQXFEO0FBQ3JELHNEQUErRDtBQUMvRCwwREFBMEQ7QUFDMUQsNENBQTRDO0FBQzVDLDhDQUE4QztBQUM5QyxtREFBbUQ7QUFFbkQsb0VBQWtFO0FBRWxFLDBEQUE0RDtBQUM1RCxtR0FBdUY7QUFDdkYsNkRBQTBEO0FBQzFELCtEQUE0RDtBQUU1RCxnQ0FBa0M7QUFDbEMsdURBQXlEO0FBQ3pELHNEQUF3RDtBQVV4RDtJQVVDLDhCQUNTLEtBQVcsRUFDWCxPQUF5QixFQUN6QixpQkFBa0MsRUFDbEMsbUJBQXNDO1FBSHRDLFVBQUssR0FBTCxLQUFLLENBQU07UUFDWCxZQUFPLEdBQVAsT0FBTyxDQUFrQjtRQUN6QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWlCO1FBQ2xDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBbUI7UUFML0MsZ0JBQVcsR0FBRywwQkFBMEIsQ0FBQztRQW9GekMsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFFakIsaUJBQVksR0FBWSxJQUFJLENBQUM7UUFDN0IsY0FBUyxHQUFXLEVBQUUsQ0FBQztRQUN2QixnQkFBVyxHQUFXLEdBQUcsQ0FBQztRQWxGekIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLDZCQUFZLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksK0JBQWEsRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLDhCQUFlLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBRUQsdUNBQVEsR0FBUjtRQUNDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQ7O09BRU07SUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXNCRztJQUVIOztPQUVH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QztnQkFDbkQsQ0FBQztZQUNGLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDUCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzlDLENBQUM7UUFDRixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDUCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLENBQUM7SUFHRixDQUFDO0lBRUQ7O09BRUc7SUFDSSw0Q0FBYSxHQUFwQjtRQUNDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSw2QkFBWSxFQUFFLENBQUM7SUFDekMsQ0FBQztJQTNTVyxvQkFBb0I7UUFQaEMsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFdBQVcsRUFBRSxrREFBa0Q7WUFDL0QsU0FBUyxFQUFFLENBQUMsa0RBQWtELENBQUM7WUFDL0QsU0FBUyxFQUFFLENBQUMsa0NBQWUsQ0FBQztTQUM1QixDQUFDO3lDQWFlLFdBQUk7WUFDRix5QkFBZ0I7WUFDTixrQ0FBZTtZQUNiLHdCQUFpQjtPQWRuQyxvQkFBb0IsQ0E0U2hDO0lBQUQsMkJBQUM7Q0FBQSxBQTVTRCxJQTRTQztBQTVTWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2UvcGFnZSc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbi8vaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyJztcbi8vaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSAndWkvdGV4dC1maWVsZCc7XG4vL2ltcG9ydCB7IEV2ZW50RGF0YSB9IGZyb20gJ2RhdGEvb2JzZXJ2YWJsZSc7XG4vL2ltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgU2VydmljZUZpcmViYXNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2ZpcmViYXNlLnNlcnZpY2VcIjtcblxuaW1wb3J0IHsgR2xvYmFsQ29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL2NvbnN0cy9nbG9iYWwubW9kZWxcIjtcbmltcG9ydCB7IGdldFN0cmluZyB9IGZyb20gJ3Rucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24tc2V0dGluZ3MvYXBwbGljYXRpb24tc2V0dGluZ3MnO1xuaW1wb3J0IHsgUHJvZHVjdHNWZXRzIH0gZnJvbSAnLi4vLi4vbW9kYWwvcHJvZHVjdHMubW9kYWwnO1xuaW1wb3J0IHsgU2VydmljaW9zVmV0cyB9IGZyb20gJy4uLy4uL21vZGFsL3NlcnZpY2lvcy5tb2RhbCc7XG5cbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmaWxlLXN5c3RlbVwiO1xuaW1wb3J0ICogYXMgZmlyZWJhc2UgZnJvbSBcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIjtcbmltcG9ydCAqIGFzIGltYWdlcGlja2VyIGZyb20gXCJuYXRpdmVzY3JpcHQtaW1hZ2VwaWNrZXJcIjtcblxuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6ICdhZGQtcHJvZHVjdHMnLFxuXHR0ZW1wbGF0ZVVybDogJy4vcGFnZXMvYWRkLXByb2R1Y3RzL2FkZC1wcm9kdWN0cy5jb21wb25lbnQuaHRtbCcsXG5cdHN0eWxlVXJsczogWycuL3BhZ2VzL2FkZC1wcm9kdWN0cy9hZGQtcHJvZHVjdHMuY29tcG9uZW50LnNjc3MnXSxcblx0cHJvdmlkZXJzOiBbU2VydmljZUZpcmViYXNlXVxufSlcblxuZXhwb3J0IGNsYXNzIEFkZFByb2R1Y3RzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuXG5cdF9nbG9iYWxDb21wb25lbnQ6IEdsb2JhbENvbXBvbmVudDtcblx0X2FkZEltYWdlOiBzdHJpbmc7XG5cdF9wYXRoSW1nO1xuXHRfZGF0YVByb2R1Y3RzOiBQcm9kdWN0c1ZldHM7XG5cdF9kYXRhU2VydmljZTogU2VydmljaW9zVmV0cztcblx0X21lbnNhamU6IHN0cmluZztcblx0X2ltYWdlRmluYWwgPSBcIn4vaW1hZ2VzL3BsYWNlaG9sZGVyLnBuZ1wiO1xuXHRjb25zdHJ1Y3Rvcihcblx0XHRwcml2YXRlIF9wYWdlOiBQYWdlLFxuXHRcdHByaXZhdGUgX3JvdXRFeDogUm91dGVyRXh0ZW5zaW9ucyxcblx0XHRwcml2YXRlIF9zZXJ2aWNpb0ZpcmViYXNlOiBTZXJ2aWNlRmlyZWJhc2UsXG5cdFx0cHJpdmF0ZSBfY2hhbmdlRGV0ZWN0aW9uUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuXHRcdHRoaXMuX2RhdGFQcm9kdWN0cyA9IG5ldyBQcm9kdWN0c1ZldHMoKTtcblx0XHR0aGlzLl9kYXRhU2VydmljZSA9IG5ldyBTZXJ2aWNpb3NWZXRzKCk7XG5cdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50ID0gbmV3IEdsb2JhbENvbXBvbmVudCgpO1xuXHR9XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0dGhpcy5nZXRJZFNlcnZpY2VzKCk7XG5cdH1cblxuXHQvKipcbiAgICAgKiBhZGRQcm9kdWN0c1ZldHNcbiAgICAgKi9cbiAgICAvKnB1YmxpYyBhZGRQcm9kdWN0c1ZldHMoKSB7XG4gICAgICAgIHRoaXMuX21lbnNhamUgPSBcIlwiO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLl9kYXRhU2VydmljZS5fbm9tYnJlU2VydmljaW9WZXQpO1xuICAgICAgICBpZiAodGhpcy5fZGF0YVNlcnZpY2UuX25vbWJyZVNlcnZpY2lvVmV0ICE9PSB1bmRlZmluZWQgJiYgdGhpcy5fZGF0YVNlcnZpY2UuX25vbWJyZVNlcnZpY2lvVmV0ICE9PSBudWxsICYmIHRoaXMuX2RhdGFTZXJ2aWNlLl9ub21icmVTZXJ2aWNpb1ZldCAhPT0gXCJcIikge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2RhdGFTZXJ2aWNlLl9kZXNjcmlwY2lvblNlcnZpY2lvVmV0ICE9PSB1bmRlZmluZWQgJiYgdGhpcy5fZGF0YVNlcnZpY2UuX2Rlc2NyaXBjaW9uU2VydmljaW9WZXQgIT09IG51bGwgJiYgdGhpcy5fZGF0YVNlcnZpY2UuX2Rlc2NyaXBjaW9uU2VydmljaW9WZXQgIT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tZW5zYWplID0gXCJcIjtcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRhU2VydmljZS5faWRVc3VhcmlvID0gZ2V0U3RyaW5nKFwiaWRMb2dpblwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXJ2aWNpb0ZpcmViYXNlLmFkZFByb2R1Y3RzVmV0cyh0aGlzLl9kYXRhU2VydmljZSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHJlc3BvbnNlID09PSBcImd1YXJkYWRvXCIpe1x0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0dGhpcy5fZ2xvYmFsQ29uc3Qudmlld01lc3NhZ2VTdWNjZXMoXCJQcm9kdWN0byByZWdpc3RyYWRvIGNvcnJlY3RhbWVudGUuXCIpXG4gICAgICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2xvYmFsQ29uc3QudmFsaWRhckVycm9yZXMocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2dsb2JhbENvbnN0LnZhbGlkYXJDYW1wbyhcImRlc2NyaXBjacOzblwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2dsb2JhbENvbnN0LnZhbGlkYXJDYW1wbyhcIm5vbWJyZVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgXG4gICAgfSovXG5cbiAgICAvKipcbiAgICAgKiBnZXRJZFNlcnZpY2VzXG4gICAgICovXG5cdHB1YmxpYyBnZXRJZFNlcnZpY2VzKCkge1xuXHRcdHRoaXMuX2RhdGFTZXJ2aWNlLl9pZFVzdWFyaW8gPSBnZXRTdHJpbmcoXCJpZExvZ2luXCIpO1xuXHRcdHRoaXMuX3NlcnZpY2lvRmlyZWJhc2UuZ2V0U2VydmljZXNWZXRlcmluYXJ5KHRoaXMuX2RhdGFTZXJ2aWNlKS50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdC8vY29uc29sZS5sb2coXCJyZXNwb25zZVwiK0pTT04uc3RyaW5naWZ5KHJlc3BvbnNlKSk7XG5cblx0XHRcdGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlKSk7XG5cdFx0XHRpZiAocmVzcG9uc2UgIT09IG51bGwpIHtcblx0XHRcdFx0dmFyIHN0ckpTT04gPSBKU09OLnN0cmluZ2lmeShyZXNwb25zZSk7XG5cdFx0XHRcdHZhciBvYmpKU09OID0gZXZhbChcIihmdW5jdGlvbigpe3JldHVybiBcIiArIHN0ckpTT04gKyBcIjt9KSgpXCIpO1xuXHRcdFx0XHRpZiAob2JqSlNPTi52YWx1ZS5wcm9kdWN0b3MgIT09IG51bGwgJiYgb2JqSlNPTi52YWx1ZS5wcm9kdWN0b3MgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdGxldCBzaXplID0gb2JqSlNPTi52YWx1ZS5wcm9kdWN0b3MubGVuZ3RoO1xuXHRcdFx0XHRcdHRoaXMuX2RhdGFQcm9kdWN0cy5faWRQcm9kdWN0c1ZldCA9IHNpemU7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJJRCBQcm9kdWN0b1wiICsgc2l6ZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5fZGF0YVByb2R1Y3RzLl9pZFByb2R1Y3RzVmV0ID0gXCIwXCJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIklEIFByb2R1Y3RvXCIgKyB0aGlzLl9kYXRhUHJvZHVjdHMuX2lkUHJvZHVjdHNWZXQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH1cblxuXHRcdH0pO1xuXHR9XG5cblx0LyoqXG5cdCAqIGdldEJhY2tcblx0ICovXG5cdHB1YmxpYyBnZXRCYWNrKCkge1xuXHRcdHRoaXMuX3JvdXRFeC5uYXZpZ2F0ZShbJ3Byb2R1Y3QnXSx7XG5cdFx0XHRjbGVhckhpc3Rvcnk6dHJ1ZSxcblx0XHRcdHRyYW5zaXRpb246e1xuXHRcdFx0XHRuYW1lOlwic2xpZGVSaWdodFwiLFxuXHRcdFx0XHRkdXJhdGlvbjo0MDAsXG5cdFx0XHRcdGN1cnZlOlwiZWFzZVwiXG5cdFx0XHR9XG5cdFx0fSlcblx0fVxuXG5cblxuXHRpbWFnZUFzc2V0cyA9IFtdO1xuXHRpbWFnZVNyYztcblx0aXNTaW5nbGVNb2RlOiBib29sZWFuID0gdHJ1ZTtcblx0dGh1bWJTaXplOiBudW1iZXIgPSA4MDtcblx0cHJldmlld1NpemU6IG51bWJlciA9IDMwMDtcblxuXHRwdWJsaWMgb25TZWxlY3RTaW5nbGVUYXAoKSB7XG5cdFx0dGhpcy5pc1NpbmdsZU1vZGUgPSB0cnVlO1xuXG5cdFx0bGV0IGNvbnRleHQgPSBpbWFnZXBpY2tlci5jcmVhdGUoe1xuXHRcdFx0bW9kZTogXCJzaW5nbGVcIlxuXHRcdH0pO1xuXHRcdHRoaXMuc3RhcnRTZWxlY3Rpb24oY29udGV4dCk7XG5cdH1cblxuXHRwcml2YXRlIHN0YXJ0U2VsZWN0aW9uKGNvbnRleHQpIHtcblx0XHRsZXQgdGhhdCA9IHRoaXM7XG5cblx0XHRjb250ZXh0XG5cdFx0XHQuYXV0aG9yaXplKClcblx0XHRcdC50aGVuKCgpID0+IHtcblx0XHRcdFx0dGhhdC5pbWFnZUFzc2V0cyA9IFtdO1xuXHRcdFx0XHR0aGF0LmltYWdlU3JjID0gbnVsbDtcblx0XHRcdFx0cmV0dXJuIGNvbnRleHQucHJlc2VudCgpO1xuXHRcdFx0fSlcblx0XHRcdC50aGVuKChzZWxlY3Rpb24pID0+IHtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJTZWxlY3Rpb24gZG9uZTogXCIgKyBKU09OLnN0cmluZ2lmeShzZWxlY3Rpb24pKTtcblx0XHRcdFx0dGhhdC5pbWFnZVNyYyA9IHRoYXQuaXNTaW5nbGVNb2RlICYmIHNlbGVjdGlvbi5sZW5ndGggPiAwID8gc2VsZWN0aW9uWzBdIDogbnVsbDtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJFc3RhIGVzIGxhIHJ1dGEgaW1hZ2VuXCIgKyBzZWxlY3Rpb25bMF0uX2FuZHJvaWQpO1xuXHRcdFx0XHRsZXQgaWQgPSBnZXRTdHJpbmcoXCJpZExvZ2luXCIpO1xuXHRcdFx0XHR0aGlzLl9wYXRoSW1nID0gc2VsZWN0aW9uWzBdLl9hbmRyb2lkO1xuXHRcdFx0XHR0aGlzLl9kYXRhUHJvZHVjdHMuX2ltYWdlUHJvZHVjdFZldCA9IHRoaXMuX3BhdGhJbWc7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiUGF0aCBwYXJhIGd1YXJkYXIgbGFzIGltYWdlbmVzXCIgKyBpZCArIFwiL3Byb2R1Y3Rvcy9wcm9kdWN0b1wiICsgdGhpcy5fZGF0YVByb2R1Y3RzLl9pZFByb2R1Y3RzVmV0KVxuXHRcdFx0XHQvL3RoaXMuc3ViaXJJbWFnZW4oc2VsZWN0aW9uWzBdLl9hbmRyb2lkLGlkK1wiL3Byb2R1Y3Rvcy9pbWFnZVwiK3RoaXMuX2RhdGFQcm9kdWN0cy5faWRQcm9kdWN0c1ZldCk7XG5cdFx0XHRcdC8vIHNldCB0aGUgaW1hZ2VzIHRvIGJlIGxvYWRlZCBmcm9tIHRoZSBhc3NldHMgd2l0aCBvcHRpbWFsIHNpemVzIChvcHRpbWl6ZSBtZW1vcnkgdXNhZ2UpXG5cdFx0XHRcdHNlbGVjdGlvbi5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cdFx0XHRcdFx0ZWxlbWVudC5vcHRpb25zLndpZHRoID0gdGhhdC5pc1NpbmdsZU1vZGUgPyB0aGF0LnByZXZpZXdTaXplIDogdGhhdC50aHVtYlNpemU7XG5cdFx0XHRcdFx0ZWxlbWVudC5vcHRpb25zLmhlaWdodCA9IHRoYXQuaXNTaW5nbGVNb2RlID8gdGhhdC5wcmV2aWV3U2l6ZSA6IHRoYXQudGh1bWJTaXplO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHR0aGF0LmltYWdlQXNzZXRzID0gc2VsZWN0aW9uO1xuXHRcdFx0fSkuY2F0Y2goZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0Y29uc29sZS5sb2coZSk7XG5cdFx0XHR9KTtcblx0fVxuXG5cdC8qc3RhcnRTZWxlY3Rpb24oY29udGV4dCkge1xuXHRcdGxldCBfdGhhdCA9IHRoaXM7XG5cdFx0bGV0IHBhdGg7XG5cdFx0Y29udGV4dFxuXHRcdFx0LmF1dGhvcml6ZSgpXG5cdFx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRcdF90aGF0Lml0ZW1zID0gW107XG5cdFx0XHRcdHJldHVybiBjb250ZXh0LnByZXNlbnQoKTtcblx0XHRcdH0pXG5cdFx0XHQudGhlbigoc2VsZWN0aW9uKSA9PiB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiU2VsZWN0aW9uIGRvbmU6XCIpO1xuXHRcdFx0XHRzZWxlY3Rpb24uZm9yRWFjaChmdW5jdGlvbiAoc2VsZWN0ZWQpIHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcIi0tLS0tLS0tLS0tLS0tLS1cIik7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJ1cmk6IFwiICsgc2VsZWN0ZWQudXJpKTtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcImZpbGVVcmk6IFwiICsgc2VsZWN0ZWQuZmlsZVVyaSk7XG5cdFx0XHRcdFx0cGF0aCA9IChzZWxlY3RlZC5maWxlVXJpKTtcblxuXHRcdFx0XHR9KTtcblx0XHRcdFx0dGhpcy5fcGF0aEltZyA9IHBhdGg7XG5cdFx0XHRcdHRoaXMuX2FkZEltYWdlID0gXCJJbWFnZW4gQWRqdW50YWRhXCJcblx0XHRcdFx0Y29uc29sZS5sb2coXCJBcXVpIHlhIHNlIGNhcmdvIGxhIEltYWdlblwiICsgdGhpcy5fcGF0aEltZyk7XG5cdFx0XHRcdC8vY29uc3QgSU1HX0FTX0JBU0U2NF9TVFJJTkcgPSB0aGlzLl9wYXRoSW1nLnRvQmFzZTY0U3RyaW5nKFwicG5nXCIpO1xuXHRcdFx0XHQvL3RoaXMuYmFzZTY0SW1hZ2VTb3VyY2UgPSBmcm9tQmFzZTY0KElNR19BU19CQVNFNjRfU1RSSU5HKTtcblx0XHRcdFx0Ly90aGlzLl9pbWFnZUZpbmFsID0gdGhpcy5fcGF0aEltZztcblx0XHRcdFx0Ly90aGlzLnN1YmlySW1hZ2VuKHBhdGgsXCJfaW1nTmFtZVwiKTtcblx0XHRcdFx0bGV0IGlkID0gIGdldFN0cmluZyhcImlkTG9naW5cIik7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiUGF0aCBwYXJhIGd1YXJkYXIgbGFzIGltYWdlbmVzXCIraWQrXCIvcHJvZHVjdG9zL2ltYWdlXCIrdGhpcy5fZGF0YVByb2R1Y3RzLl9pZFByb2R1Y3RzVmV0KVxuXHRcdFx0XHQvL3RoaXMuc3ViaXJJbWFnZW4ocGF0aCxpZCtcIi9wcm9kdWN0b3MvaW1hZ2VcIit0aGlzLl9kYXRhUHJvZHVjdHMuX2lkUHJvZHVjdHNWZXQpO1xuXHRcdFx0XHRfdGhhdC5pdGVtcyA9IHNlbGVjdGlvbjtcblx0XHRcdFx0X3RoYXQuX2NoYW5nZURldGVjdGlvblJlZi5kZXRlY3RDaGFuZ2VzKCk7XG5cdFx0XHR9KS5jYXRjaChmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhlKTtcblx0XHRcdH0pO1xuXHR9Ki9cblxuXG5cdHB1YmxpYyBzdWJpckltYWdlbihwYXRocywgX2ltZ05hbWUpIHtcblx0XHR2YXIgYXBwUGF0aCA9IGZzLmtub3duRm9sZGVycy5jdXJyZW50QXBwKCkucGF0aDtcblx0XHRjb25zb2xlLmxvZyhhcHBQYXRoKTtcblx0XHQvLyBkZXRlcm1pbmUgdGhlIHBhdGggdG8gYSBmaWxlIGluIHRoZSBhcHAvcmVzIGZvbGRlclxuXHRcdC8vdmFyIGxvZ29QYXRoID0gYXBwUGF0aCArIFwiL2ltYWdlcy92ZXRlcmluYXJ5LnBuZ1wiO1xuXHRcdHZhciBsb2dvUGF0aCA9IHBhdGhzO1xuXHRcdC8vIG5vdyB1cGxvYWQgdGhlIGZpbGUgd2l0aCBlaXRoZXIgb2YgdGhlIG9wdGlvbnMgYmVsb3c6XG5cdFx0ZmlyZWJhc2UudXBsb2FkRmlsZSh7XG5cdFx0XHQvLyBvcHRpb25hbCwgY2FuIGFsc28gYmUgcGFzc2VkIGR1cmluZyBpbml0KCkgYXMgJ3N0b3JhZ2VCdWNrZXQnIHBhcmFtIHNvIHdlIGNhbiBjYWNoZSBpdCAoZmluZCBpdCBpbiB0aGUgRmlyZWJhc2UgY29uc29sZSlcblx0XHRcdGJ1Y2tldDogXCJnczovL3ZldHNjb2wtMS5hcHBzcG90LmNvbVwiLFxuXHRcdFx0Ly8gdGhlIGZ1bGwgcGF0aCBvZiB0aGUgZmlsZSBpbiB5b3VyIEZpcmViYXNlIHN0b3JhZ2UgKGZvbGRlcnMgd2lsbCBiZSBjcmVhdGVkKVxuXHRcdFx0cmVtb3RlRnVsbFBhdGg6IF9pbWdOYW1lICsgJy5wbmcnLFxuXHRcdFx0Ly8gb3B0aW9uIDE6IGEgZmlsZS1zeXN0ZW0gbW9kdWxlIEZpbGUgb2JqZWN0XG5cdFx0XHRsb2NhbEZpbGU6IGZzLkZpbGUuZnJvbVBhdGgobG9nb1BhdGgpLFxuXHRcdFx0Ly8gb3B0aW9uIDI6IGEgZnVsbCBmaWxlIHBhdGggKGlnbm9yZWQgaWYgJ2xvY2FsRmlsZScgaXMgc2V0KVxuXHRcdFx0bG9jYWxGdWxsUGF0aDogbG9nb1BhdGgsXG5cdFx0XHQvLyBnZXQgbm90aWZpZWQgb2YgZmlsZSB1cGxvYWQgcHJvZ3Jlc3Ncblx0XHRcdG9uUHJvZ3Jlc3M6IHN0YXR1cyA9PiB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiVXBsb2FkZWQgZnJhY3Rpb246IFwiICsgc3RhdHVzLmZyYWN0aW9uQ29tcGxldGVkKTtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJQZXJjZW50YWdlIGNvbXBsZXRlOiBcIiArIHN0YXR1cy5wZXJjZW50YWdlQ29tcGxldGVkKTtcblx0XHRcdH1cblx0XHR9KS50aGVuKHVwbG9hZGVkRmlsZSA9PiB7XG5cdFx0XHRjb25zb2xlLmxvZyhcIkZpbGUgdXBsb2FkZWQ6IFwiICsgSlNPTi5zdHJpbmdpZnkodXBsb2FkZWRGaWxlKSk7XG5cdFx0XHRjb25zb2xlLmxvZyhcIkZpbGUgdXBsb2FkZWQ6IFwiICsgSlNPTi5zdHJpbmdpZnkodXBsb2FkZWRGaWxlKSk7XG5cdFx0XHR0aGlzLmdldEZvd25sb2FkVXJsKF9pbWdOYW1lKTtcblx0XHR9KS5jYXRjaChlcnIgPT4ge1xuXHRcdFx0Y29uc29sZS5sb2coZXJyKTtcblx0XHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC5sb2FkaW5nSGlkZSgpO1xuXHRcdH0pXG5cdH1cblxuXG5cdHB1YmxpYyBnZXRGb3dubG9hZFVybChfaW1nTmFtZSkge1xuXHRcdGZpcmViYXNlLmdldERvd25sb2FkVXJsKHtcblx0XHRcdC8vIG9wdGlvbmFsLCBjYW4gYWxzbyBiZSBwYXNzZWQgZHVyaW5nIGluaXQoKSBhcyAnc3RvcmFnZUJ1Y2tldCcgcGFyYW0gc28gd2UgY2FuIGNhY2hlIGl0XG5cdFx0XHRidWNrZXQ6IFwiZ3M6Ly92ZXRzY29sLTEuYXBwc3BvdC5jb21cIixcblx0XHRcdC8vIHRoZSBmdWxsIHBhdGggb2YgYW4gZXhpc3RpbmcgZmlsZSBpbiB5b3VyIEZpcmViYXNlIHN0b3JhZ2Vcblx0XHRcdHJlbW90ZUZ1bGxQYXRoOiBfaW1nTmFtZSArICcucG5nJ1xuXHRcdH0pLnRoZW4odXJsID0+IHtcblx0XHRcdGNvbnNvbGUubG9nKFwiUmVtb3RlIFVSTDogXCIgKyB1cmwpO1xuXHRcdFx0Y29uc29sZS5sb2coXCJSZW1vdGUgVVJMOiBcIiArIHVybCk7XG5cdFx0XHR0aGlzLmFkZFByb2R1Y3RzVmV0cyh1cmwpO1xuXHRcdH0pLmNhdGNoKGVycm9yID0+IHtcblx0XHRcdGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IpO1xuXHRcdFx0ZXJyb3IgPSBcImVycm9yQ2FyZ2FuZG9JbWFnZW5cIjtcblx0XHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC52YWxpZGFyRXJyb3JlcyhlcnJvcik7XG5cdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQubG9hZGluZ0hpZGUoKTtcblx0XHR9KVxuXHR9XG5cblx0LyoqXG5cdCAqIHZhbGlkYXJEYXRvc1xuXHQgKi9cblx0cHVibGljIHZhbGlkYXJEYXRvcygpIHtcblx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQubG9hZGluZ1ZpZXcoKTtcblx0XHRsZXQgaWQgPSBnZXRTdHJpbmcoXCJpZExvZ2luXCIpO1xuXHRcdGNvbnNvbGUubG9nKFwiUGF0aCBwYXJhIGd1YXJkYXIgbGFzIGltYWdlbmVzXCIgKyBpZCArIFwiL3Byb2R1Y3Rvcy9wcm9kdWN0b1wiICsgdGhpcy5fZGF0YVByb2R1Y3RzLl9pZFByb2R1Y3RzVmV0KVxuXHRcdHRoaXMuX21lbnNhamUgPSBcIlwiO1xuXHRcdGNvbnNvbGUubG9nKHRoaXMuX2RhdGFQcm9kdWN0cy5fbm9tYnJlUHJvZHVjdFZldCk7XG5cdFx0aWYgKHRoaXMuX2RhdGFQcm9kdWN0cy5faW1hZ2VQcm9kdWN0VmV0ICE9PSB1bmRlZmluZWQgJiYgdGhpcy5fZGF0YVByb2R1Y3RzLl9pbWFnZVByb2R1Y3RWZXQgIT09IG51bGwgJiYgdGhpcy5fZGF0YVByb2R1Y3RzLl9pbWFnZVByb2R1Y3RWZXQgIT09IFwiXCIpIHtcblx0XHRcdGlmICh0aGlzLl9kYXRhUHJvZHVjdHMuX25vbWJyZVByb2R1Y3RWZXQgIT09IHVuZGVmaW5lZCAmJiB0aGlzLl9kYXRhUHJvZHVjdHMuX25vbWJyZVByb2R1Y3RWZXQgIT09IG51bGwgJiYgdGhpcy5fZGF0YVByb2R1Y3RzLl9ub21icmVQcm9kdWN0VmV0ICE9PSBcIlwiKSB7XG5cdFx0XHRcdGlmICh0aGlzLl9kYXRhUHJvZHVjdHMuX3ByZWNpb1Byb2R1Y3RvVmV0ICE9PSB1bmRlZmluZWQgJiYgdGhpcy5fZGF0YVByb2R1Y3RzLl9wcmVjaW9Qcm9kdWN0b1ZldCAhPT0gbnVsbCAmJiB0aGlzLl9kYXRhUHJvZHVjdHMuX3ByZWNpb1Byb2R1Y3RvVmV0ICE9PSBcIlwiKSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMuX2RhdGFQcm9kdWN0cy5fZGVzY3JpcGNpb25Qcm9kdWN0VmV0ICE9PSB1bmRlZmluZWQgJiYgdGhpcy5fZGF0YVByb2R1Y3RzLl9kZXNjcmlwY2lvblByb2R1Y3RWZXQgIT09IG51bGwgJiYgdGhpcy5fZGF0YVByb2R1Y3RzLl9kZXNjcmlwY2lvblByb2R1Y3RWZXQgIT09IFwiXCIpIHtcblx0XHRcdFx0XHRcdC8vdGhpcy5fbWVuc2FqZSA9IFwiXCI7XG5cdFx0XHRcdFx0XHQvL3RoaXMuX2RhdGFQcm9kdWN0cy5faWRVc3VhcmlvID0gZ2V0U3RyaW5nKFwiaWRMb2dpblwiKTtcblx0XHRcdFx0XHRcdHRoaXMuc3ViaXJJbWFnZW4odGhpcy5fcGF0aEltZywgaWQgKyBcIi9wcm9kdWN0b3MvcHJvZHVjdG9cIiArIHRoaXMuX2RhdGFQcm9kdWN0cy5faWRQcm9kdWN0c1ZldCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC52YWxpZGFyQ2FtcG8oXCJkZXNjcmlwY2nDs25cIik7XG5cdFx0XHRcdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQubG9hZGluZ0hpZGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LnZhbGlkYXJDYW1wbyhcInByZWNpb1wiKTtcblx0XHRcdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQubG9hZGluZ0hpZGUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LnZhbGlkYXJDYW1wbyhcIm5vbWJyZVwiKTtcblx0XHRcdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LmxvYWRpbmdIaWRlKCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC52YWxpZGFyQ2FtcG8oXCJpbWFnZW5cIik7XG5cdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQubG9hZGluZ0hpZGUoKTtcblx0XHR9XG5cdH1cblxuXG5cdHB1YmxpYyBhZGRQcm9kdWN0c1ZldHModXJsKSB7XG5cdFx0dGhpcy5fbWVuc2FqZSA9IFwiXCI7XG5cdFx0Y29uc29sZS5sb2codGhpcy5fZGF0YVByb2R1Y3RzLl9ub21icmVQcm9kdWN0VmV0KTtcblx0XHR0aGlzLl9kYXRhUHJvZHVjdHMuX2ltYWdlUHJvZHVjdFZldCA9IHVybDtcblx0XHRpZiAodGhpcy5fZGF0YVByb2R1Y3RzLl9ub21icmVQcm9kdWN0VmV0ICE9PSB1bmRlZmluZWQgJiYgdGhpcy5fZGF0YVByb2R1Y3RzLl9ub21icmVQcm9kdWN0VmV0ICE9PSBudWxsICYmIHRoaXMuX2RhdGFQcm9kdWN0cy5fbm9tYnJlUHJvZHVjdFZldCAhPT0gXCJcIikge1xuXHRcdFx0aWYgKHRoaXMuX2RhdGFQcm9kdWN0cy5fcHJlY2lvUHJvZHVjdG9WZXQgIT09IHVuZGVmaW5lZCAmJiB0aGlzLl9kYXRhUHJvZHVjdHMuX3ByZWNpb1Byb2R1Y3RvVmV0ICE9PSBudWxsICYmIHRoaXMuX2RhdGFQcm9kdWN0cy5fcHJlY2lvUHJvZHVjdG9WZXQgIT09IFwiXCIpIHtcblx0XHRcdFx0aWYgKHRoaXMuX2RhdGFQcm9kdWN0cy5fbm9tYnJlUHJvZHVjdFZldCAhPT0gdW5kZWZpbmVkICYmIHRoaXMuX2RhdGFQcm9kdWN0cy5fbm9tYnJlUHJvZHVjdFZldCAhPT0gbnVsbCAmJiB0aGlzLl9kYXRhUHJvZHVjdHMuX25vbWJyZVByb2R1Y3RWZXQgIT09IFwiXCIpIHtcblx0XHRcdFx0XHR0aGlzLl9kYXRhUHJvZHVjdHMuX2lkVXN1YXJpbyA9IGdldFN0cmluZyhcImlkTG9naW5cIik7XG5cdFx0XHRcdFx0dGhpcy5fZGF0YVByb2R1Y3RzLl9wcmVjaW9Qcm9kdWN0b1ZldCA9IHRoaXMuX2dsb2JhbENvbXBvbmVudC52YWxpZGFyRm9ybWF0TWlsZXModGhpcy5fZGF0YVByb2R1Y3RzLl9wcmVjaW9Qcm9kdWN0b1ZldCwnJyk7XG5cdFx0XHRcdFx0dGhpcy5fc2VydmljaW9GaXJlYmFzZS5hZGRQcm9kdWN0c1ZldHModGhpcy5fZGF0YVByb2R1Y3RzKS50aGVuKHJlc3BvbnNlID0+IHtcblx0XHRcdFx0XHRcdGlmIChyZXNwb25zZSA9PT0gXCJndWFyZGFkb1wiKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX2dsb2JhbENvbXBvbmVudC5sb2FkaW5nSGlkZSgpO1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQudmlld01lc3NhZ2VTdWNjZXMoXCJQcm9kdWN0byByZWdpc3RyYWRvIGNvcnJlY3RhbWVudGUuXCIpXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0dGhpcy5nZXRCYWNrKCk7XG5cdFx0XHRcdFx0XHRcdC8vdGhpcy5nZXRJZFNlcnZpY2VzKCk7XG5cdFx0XHRcdFx0XHRcdHRoaXMubGltcGlhckNhbXBvcygpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0dGhpcy5fZ2xvYmFsQ29tcG9uZW50LnZhbGlkYXJFcnJvcmVzKHJlc3BvbnNlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQudmFsaWRhckNhbXBvKFwiZGVzY3JpcGNpw7NuXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQudmFsaWRhckNhbXBvKFwicHJlY2lvXCIpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9nbG9iYWxDb21wb25lbnQudmFsaWRhckNhbXBvKFwibm9tYnJlXCIpO1xuXHRcdH1cblxuXG5cdH1cblxuXHQvKipcblx0ICogbGltcGlhckNhbXBvc1xuXHQgKi9cblx0cHVibGljIGxpbXBpYXJDYW1wb3MoKSB7XG5cdFx0dGhpcy5pbWFnZVNyYyA9IFwiXCI7XG5cdFx0dGhpcy5fZGF0YVByb2R1Y3RzID0gbmV3IFByb2R1Y3RzVmV0cygpO1xuXHR9XG59Il19