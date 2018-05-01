import { OnInit } from "@angular/core";
import firebase = require("nativescript-plugin-firebase");
import { DatosUsuario } from "../modal/usuario.modal";
import { ServiciosVets } from "../modal/servicios.modal";
import { getString } from "tns-core-modules/application-settings/application-settings";
import { GlobalComponent } from "../consts/global.model";
import { ProductsVets } from "../modal/products.modal";
import { PromotionsVets } from "../modal/promotions.modal";
import { DatosVets } from "../modal/vets.modal";
import { OpinionsModal } from "../modal/opinions.modal";

export class ServiceFirebase implements OnInit {

    _globalComponent: GlobalComponent;
    _servicios: ServiciosVets;
    _usuario: DatosUsuario;
    constructor() {
        this._usuario = new DatosUsuario();
        this._servicios = new ServiciosVets();


    }

    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
    /**
         * iniciarLoginGoogle
         */
    public iniciarLoginGoogleS() {
        return firebase.login({
            type: firebase.LoginType.GOOGLE,
            // Optional 

        }).then(
            (result) => {
                return result;

            },
            (errorMessage) => {
                console.log("Esto es un error " + errorMessage);
                return errorMessage;
            }
        );
    }

    /**
   * crearUsuario
   */
    crearUsuario(_usuario: DatosUsuario) {
        let dato: any;
        return firebase.createUser({
            email: _usuario._correo,
            password: _usuario._clave
        }).then(
            function (result) {
                return result.key;
            },
            function (errorMessage) {
                let errorEmailExist = errorMessage.indexOf("The email address is already in use by another account.");
                if (errorEmailExist >= 0) {
                    dato = 'errorEmailExist';
                }
                return dato;

            }
        );

    }

    /**
     * iniciarSesion
     */
    public iniciarSesion(_usuario: DatosUsuario) {
        let dato: any;
        return firebase.login({
            type: firebase.LoginType.PASSWORD,
            passwordOptions: {
                email: _usuario._correo,
                password: _usuario._clave
            }
        }).then(result => {
            return result.uid;
        },
            errorMessage => {

                let errorEmail = errorMessage.indexOf("The email address is badly formatted.");
                let errorUsuario = errorMessage.indexOf("There is no user record corresponding to this identifier.");
                let errorClave = errorMessage.indexOf("The password is invalid or the user does not have a password.")
                let errorCuenta = errorMessage.indexOf("The user account has been disabled by an administrator.");

                if (errorEmail >= 0) {
                    dato = 'errorEmail';
                }
                if (errorUsuario >= 0) {

                    dato = 'errorUsuario';
                }
                if (errorClave >= 0) {

                    dato = 'errorClave';
                }
                if (errorCuenta >= 0) {

                    dato = 'errorCuenta';
                }
                if (errorEmail <= 0 && errorUsuario <= 0 && errorClave <= 0 && errorCuenta <= 0) {
                    dato = 'errorGlobal';
                }
                return dato;
            }
        );

    }


    /**
     * crearDatosUsuario
     * En esta funcion se crean los datos del usuario en la tabla despues de haber guardado
     */
    public crearDatosUsuario(_datosUsuario: DatosUsuario) {

        let dato: any;
        var tiempo = //new Date(new Date().getTime());
            new Date().toLocaleString();
        return firebase.setValue(
            '/usuariosVeterinarias/' + _datosUsuario._id,
            //[] estos crchetes sivern para hacer el ingreso de datos es decir cero, uno , dos tres, 
            {
                fecha_creacion: tiempo,
                nombre: _datosUsuario._nombre,
                correo: _datosUsuario._correo,
                celular: _datosUsuario._celular
            }

        ).then(result => {
            result = "guardado";
            console.log("created key: " + result);
            return result;
        },
            errorMessage => {
                errorMessage = "error"
                console.log("Error key: " + errorMessage);

                return errorMessage;
            }

        );

    }

    /**
     * crearDatosUsuario
     * En esta funcion se crean los datos del usuario en la tabla despues de haber guardado
     */
    public modificarDatosUsuario(_datosUsuario: DatosUsuario) {

        let dato: any;
        var tiempo = //new Date(new Date().getTime());
            new Date().toLocaleString();
        return firebase.setValue(
            '/usuariosVeterinarias/' + _datosUsuario._id,
            //[] estos crchetes sivern para hacer el ingreso de datos es decir cero, uno , dos tres, 
            {
                fecha_modificacion: tiempo,
                fecha_creacion: _datosUsuario._fecha_creacion,
                nombre: _datosUsuario._nombre,
                correo: _datosUsuario._correo,
                celular: _datosUsuario._celular
            }

        ).then(result => {
            result = "guardado";
            console.log("created key: " + result);
            return result;
        },
            errorMessage => {
                errorMessage = "error"
                console.log("Error key: " + errorMessage);

                return errorMessage;
            }

        );

    }

    /**
     * consultarDatosUsuario
     * En esta funcion se consultan los datos del usuario de la tabla despues de haber guardado
     */
    public consultarDatosUsuario(idUsuario) {
        console.log("Inicia Consulta" + idUsuario);
        let options: firebase.QueryOptions = {
            singleEvent: true,
            orderBy: {
                type: firebase.QueryOrderByType.KEY,
                value: idUsuario
            },
            range: {
                type: firebase.QueryRangeType.EQUAL_TO,
                value: idUsuario
            }
        }
        return firebase.query(
            queryResult => {
                if (queryResult.value) {
                    return (JSON.stringify(queryResult.value));
                }
            },
            '/usuariosVeterinarias/', options
        );
        //console.log("las opciontes" + data);


    }


    /**
    * consultarDatosUsuario
    * En esta funcion se consultan los datos del usuario de la tabla despues de haber guardado
    */
    public consultarExistenciaDatosUsuario(idUsuario, tipoRegistro) {
        console.log("Inicia Consulta" + idUsuario);
        let options: firebase.QueryOptions = {
            singleEvent: true,
            orderBy: {
                type: firebase.QueryOrderByType.KEY,
                value: idUsuario
            },
            range: {
                type: firebase.QueryRangeType.EQUAL_TO,
                value: idUsuario
            }
        }
        return firebase.query(
            queryResult => {
                if (queryResult.value) {
                    return (JSON.stringify(queryResult.value));
                }
            },
            '/' + tipoRegistro + '/', options
        );
        //console.log("las opciontes" + data);


    }


    /**
    * consultarServiciosVets
    * Funcion que permite consultar los datos de las todas las Veterinarias en la tabla
    */
    public consultarDatosVeterinariasVets() {
        console.log("Inicia Consulta ");
        var data;
        let options: firebase.QueryOptions = {
            singleEvent: true,
            // order by company.country
            orderBy: {
                type: firebase.QueryOrderByType.CHILD,
                value: 'since' // mandatory when type is 'child'
            },
        }
        return firebase.query(
            queryResult => {
                if (queryResult.value) {
                    console.log("Respuesta al consultar el ID" + queryResult.value);
                    return (JSON.stringify(queryResult.value));
                }
            },
            '/veterinariasRegistradas', options
        );


    }

    /**
     * crearRegistroVets
     * Funcion que permite crear las veterinarias segun su tipo
     */
    public crearRegistroVets( _datosVets: DatosVets) {
        let dato: any;
        let idUser = getString('idLogin');
        //idUser ="8PMQTDK3wRPYvMgUfGpivhnjmkh1";
        console.log(idUser);
        var tiempo = //new Date(new Date().getTime());
            new Date().toLocaleString();
        return firebase.setValue(
            '/veterinariasRegistradas/' + idUser +"/veterinaria",
            //[] estos crchetes sivern para hacer el ingreso de datos es decir cero, uno , dos tres, 
            {
                fecha_creacion: tiempo,
                image: _datosVets._image,
                usuario_creacion: idUser,
                nombre: _datosVets._nombreVet,
                descripcion: _datosVets._descripcionVet,
                correo: _datosVets._correoVet,
                direccion: _datosVets._direccionVet,
                pagina_web: _datosVets._paginaWebVet,
                celular: _datosVets._celularVet,
                telefono: _datosVets._telefonoVet,
                horario: _datosVets._horarioVet,
                dias: _datosVets._diasAtencionVet,
                servicios: _datosVets._serviciosVet,
                coordenadas: _datosVets._coordenadasVets,
                tipo_vets: _datosVets._tipoVet,
                certificada: "NO",
                lema: _datosVets._lemaVet,
                idVets: idUser,
                facebook:_datosVets._facebookVets,
                twitter:_datosVets._twitterVets,
                instagram:_datosVets._InstagramVets,
                whatsapp:_datosVets._whatSappVets,
                horas:_datosVets._24Horas


            }

        ).then(result => {
            result = "guardado";
            console.log("created key: " + result);
            return result;
        },
            errorMessage => {
                errorMessage = "error"
                console.log("Error key: " + errorMessage);

                return errorMessage;
            }

        );
    }

    /**
     * cerrarSesion
     */
    public cerrarSesion() {
        firebase.logout();
    }

    /**
     * olvidoClave
     */
    public olvidoClave(email) {
        return firebase.resetPassword({
            email: email
        }).then(result => {
            // result = "guardado";
            console.log("response send email " + result);
            return result;
        }, errorMessage => {
            //errorMessage = "error"
            console.log("Error send email: " + errorMessage);

            return errorMessage;
        }
        );
    }


    /**
     * validateEmailForgotPass
     */
    public validateEmailForgotPass(email) {
        console.log("Inicia Consulta" + email);
        let options: firebase.QueryOptions = {
            singleEvent: true,
            orderBy: {
                type: firebase.QueryOrderByType.CHILD,
                value: 'correo'
            },
            range: {
                type: firebase.QueryRangeType.EQUAL_TO,
                value: email
            }
        }
        return firebase.query(
            queryResult => {
                console.dir(queryResult.value);
                if (queryResult.value) {
                    console.log(JSON.stringify(queryResult.value))
                    return (JSON.stringify(queryResult.value));
                }
            },
            '/usuariosVeterinarias/', options
        );
    }




    /**
     * searchDataVeterinary
     */
    public searchDataVeterinary(iduser) {
        console.log("Inicia Consulta "+iduser);
        var data;
        let options: firebase.QueryOptions = {
            singleEvent: true,
            // order by company.country
            orderBy: {
                type: firebase.QueryOrderByType.CHILD,
                value: 'since' // mandatory when type is 'child'
            },
        }
        return firebase.query(
            queryResult => {
                if (queryResult.value) {
                    console.log("Respuesta al consultar el ID" + queryResult.value);
                    return (JSON.stringify(queryResult.value));
                }
            },
            '/veterinariasRegistradas/'+ iduser, options
        );
    }


    /**
     * addServicesVets
     * Funcion que permite crear los datos de los servicios en la tabla
     */
    public addServicesVets(_datosVets: ServiciosVets) {
        let dato: any;
        var tiempo = //new Date(new Date().getTime());
            new Date().toLocaleString();
        return firebase.setValue(
            '/veterinariasRegistradas/' + _datosVets._idUsuario + '/servicios/' + _datosVets._idServicioVet,
            //[] estos crchetes sivern para hacer el ingreso de datos es decir cero, uno , dos tres, 
            {
                fecha_creacion: tiempo,
                nombre: _datosVets._nombreServicioVet,
                descripcion: _datosVets._descripcionServicioVet,
            }

        ).then(result => {
            result = "guardado";
            console.log("created key: " + result);
            return result;
        },
            errorMessage => {
                errorMessage = "error"
                console.log("Error key: " + errorMessage);

                return errorMessage;
            }

        );
    }



    /**
  * addServicesVets
  * Funcion que permite crear los datos de los servicios en la tabla
  */
    public addProductsVets(_datosVets: ProductsVets) {
        let dato: any;
        var tiempo = //new Date(new Date().getTime());
            new Date().toLocaleString();
        return firebase.setValue(
            '/veterinariasRegistradas/' + _datosVets._idUsuario + '/productos/' + _datosVets._idProductsVet,
            //[] estos crchetes sivern para hacer el ingreso de datos es decir cero, uno , dos tres, 
            {
                fecha_creacion: tiempo,
                nombre: _datosVets._nombreProductVet,
                precio: _datosVets._precioProductoVet,
                descripcion: _datosVets._descripcionProductVet,
                image: _datosVets._imageProductVet
            }

        ).then(result => {
            result = "guardado";
            console.log("created key: " + result);
            return result;
        },
            errorMessage => {
                errorMessage = "error"
                console.log("Error key: " + errorMessage);

                return errorMessage;
            }

        );
    }

        /**
  * addServicesVets
  * Funcion que permite crear los datos de los servicios en la tabla
  */
 public addPromotionsVets(_datosVets: PromotionsVets) {
    let dato: any;
    var tiempo = //new Date(new Date().getTime());
        new Date().toLocaleString();
    return firebase.setValue(
        '/veterinariasRegistradas/' + _datosVets._idUsuario + '/promociones/' + _datosVets._idPromotionVet,
        //[] estos crchetes sivern para hacer el ingreso de datos es decir cero, uno , dos tres, 
        {
            fecha_creacion: tiempo,
            nombre: _datosVets._nombrePromotionVet,
            precio: _datosVets._precioPromotionoVet,
            descripcion: _datosVets._descripcionPromotionVet,            
        }

    ).then(result => {
        result = "guardado";
        console.log("created key: " + result);
        return result;
    },
        errorMessage => {
            errorMessage = "error"
            console.log("Error key: " + errorMessage);

            return errorMessage;
        }

    );
}

    /**
    * getServicesVeterinary
    * Funcion que permite consultar los datos de los servicios en la tabla
    */
    public getServicesVeterinary(_datosVets: ServiciosVets) {
        let email = "";
        console.log("Inicia Consulta" + _datosVets._idUsuario);
        var data;
        let options: firebase.QueryOptions = {
            singleEvent: true,
            // order by company.country
            orderBy: {
                type: firebase.QueryOrderByType.CHILD,
                value: 'since' // mandatory when type is 'child'
            },
        }
        return firebase.query(
            queryResult => {
                if (queryResult.value) {
                    return (JSON.stringify(queryResult.value));
                }
            },
            '/veterinariasRegistradas/' + _datosVets._idUsuario, options
        );


    }


    /**
     * removeServices
     */
    public deleteServices(url) {
        return firebase.remove(url).then(result => {

        },
            errorMessage => {
                errorMessage = "error"
                console.log("Error key: " + errorMessage);

                return errorMessage;
            });
    }

    /**
     * deleteImage
     */
    public deleteImage(path) {
       return firebase.deleteFile({
            // optional, can also be passed during init() as 'storageBucket' param so we can cache it
            bucket: 'gs://vetscol-1.appspot.com',
            // the full path of an existing file in your Firebase storage
            remoteFullPath: 'uploads/images/telerik-logo-uploaded.png'
          }).then(
              function () {
                console.log("File deleted.");
                let file;
                return file="File deleted.";
              },
              function (error) {
                console.log("File deletion Error: " + error);
              }
          );
    }


     /**
     * searchDataVeterinary
     */
    public searchDataVeterinaryUsuarios() {
        console.log("Inicia Consulta ");
        var data;
        let options: firebase.QueryOptions = {
            singleEvent: true,
            // order by company.country
            orderBy: {
                type: firebase.QueryOrderByType.CHILD,
                value: 'since' // mandatory when type is 'child'
            },
        }
        return firebase.query(
            queryResult => {
                if (queryResult.value) {
                    console.log("Respuesta al consultar el ID" + queryResult.value);
                    return (JSON.stringify(queryResult.value));
                }
            },
            '/veterinariasRegistradasUsuarios/', options
        );
    }

    /**
     * crearRegistroVets
     * Funcion que permite crear las veterinarias segun su tipo
     */
    public crearRegistroVetsUsuarios( _datosVets: DatosVets,id) {
        let dato: any;
        let idUser = getString('idLogin');
        //idUser ="8PMQTDK3wRPYvMgUfGpivhnjmkh1";
        console.log(idUser);
        var tiempo = //new Date(new Date().getTime());
            new Date().toLocaleString();
        return firebase.setValue(
            '/veterinariasRegistradasUsuarios/' + id,
            //[] estos crchetes sivern para hacer el ingreso de datos es decir cero, uno , dos tres, 
            {
                fecha_creacion: tiempo,
                image: _datosVets._image,
                //usuario_creacion: idUser,
                nombre: _datosVets._nombreVet,
                descripcion: _datosVets._descripcionVet,
                correo: _datosVets._correoVet,
                direccion: _datosVets._direccionVet,
                pagina_web: _datosVets._paginaWebVet,
                celular: _datosVets._celularVet,
                telefono: _datosVets._telefonoVet,
                horario: _datosVets._horarioVet,
                dias: _datosVets._diasAtencionVet,
                servicios: _datosVets._serviciosVet,
                coordenadas: _datosVets._coordenadasVets,
                tipo_vets: _datosVets._tipoVet,
                certificada: "NO",
                lema: _datosVets._lemaVet,
                idVets: idUser,
                facebook:_datosVets._facebookVets,
                twitter:_datosVets._twitterVets,
                instagram:_datosVets._InstagramVets,
                whatsapp:_datosVets._whatSappVets,
                horas:_datosVets._24Horas


            }

        ).then(result => {
            result = "guardado";
            console.log("created key: " + result);
            return result;
        },
            errorMessage => {
                errorMessage = "error"
                console.log("Error key: " + errorMessage);

                return errorMessage;
            }

        );
    }



         /**
     * searchDataVeterinary
     */
    public getDataIdOpinions() {
        console.log("Inicia Consulta ");
        var data;
        let options: firebase.QueryOptions = {
            singleEvent: true,
            // order by company.country
            orderBy: {
                type: firebase.QueryOrderByType.CHILD,
                value: 'since' // mandatory when type is 'child'
            },
        }
        return firebase.query(
            queryResult => {
                if (queryResult.value) {
                    console.log("Respuesta al consultar el ID" + queryResult.value);
                    return (JSON.stringify(queryResult.value));
                }
            },
            '/opinionesAyudaVeterinarias/', options
        );
    }

    
        /**
     * addServicesVets
     * Funcion que permite crear las opiniones de los usuarios
     */
    public addSubjectsVets(numero,_dataOpinion:OpinionsModal) {
        let dato: any;
        var tiempo = //new Date(new Date().getTime());
            new Date().toLocaleString();
        return firebase.setValue(
            '/opinionesAyudaVeterinarias/' +numero,
            //[] estos crchetes sivern para hacer el ingreso de datos es decir cero, uno , dos tres, 
            {
                fecha_creacion: tiempo,
                idusuario:_dataOpinion._idUsuario,
                asunto: _dataOpinion._asuntoOpinion,
                descripcion:  _dataOpinion._descripcionOpinion,
            }

        ).then(result => {
            result = "guardado";
            console.log("created key: " + result);
            return result;
        },
            errorMessage => {
                errorMessage = "error"
                console.log("Error key: " + errorMessage);

                return errorMessage;
            }

        );
    }

    ///////ASESORIAS
         /**
     * searchDataVeterinary
     */
    public getDataIdAdvices() {
        console.log("Inicia Consulta ");
        var data;
        let options: firebase.QueryOptions = {
            singleEvent: true,
            // order by company.country
            orderBy: {
                type: firebase.QueryOrderByType.CHILD,
                value: 'since' // mandatory when type is 'child'
            },
        }
        return firebase.query(
            queryResult => {
                if (queryResult.value) {
                    console.log("Respuesta al consultar el ID" + queryResult.value);
                    return (JSON.stringify(queryResult.value));
                }
            },
            '/asesoriasAyudaVeterinarias/', options
        );
    }

    
        /**
     * addServicesVets
     * Funcion que permite crear las opiniones de los usuarios
     */
    public addAdvicesVets(numero,_dataOpinion:OpinionsModal) {
        let dato: any;
        var tiempo = //new Date(new Date().getTime());
            new Date().toLocaleString();
        return firebase.setValue(
            '/asesoriasAyudaVeterinarias/' +numero,
            //[] estos crchetes sivern para hacer el ingreso de datos es decir cero, uno , dos tres, 
            {
                fecha_creacion: tiempo,
                idusuario:_dataOpinion._idUsuario,
                asunto: _dataOpinion._asuntoOpinion,
                descripcion:  _dataOpinion._descripcionOpinion,
            }

        ).then(result => {
            result = "guardado";
            console.log("created key: " + result);
            return result;
        },
            errorMessage => {
                errorMessage = "error"
                console.log("Error key: " + errorMessage);

                return errorMessage;
            }

        );
    }

    /**
     * getComentarios 
     * consulta los comentarios que se le han hecho a la veterinaria
     */

    public getCommentsRating(id) {
        console.log("Inicia Consulta " + id);
        var data;
        let options: firebase.QueryOptions = {
            singleEvent: true,
            // order by company.country
            orderBy: {
                type: firebase.QueryOrderByType.CHILD,
                value: 'since' // mandatory when type is 'child'
            },
        }
        return firebase.query(
            queryResult => {
                if (queryResult.value) {
                    console.log("Respuesta al consultar el ID" + queryResult.value);
                    return (JSON.stringify(queryResult.value));
                }
            },
            //'/veterinariasRegistradas/'+id, options
            '/comentariosRatingsVets/' + id, options
        );
    }



}


