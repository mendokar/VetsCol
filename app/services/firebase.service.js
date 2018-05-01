"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require("nativescript-plugin-firebase");
var usuario_modal_1 = require("../modal/usuario.modal");
var servicios_modal_1 = require("../modal/servicios.modal");
var application_settings_1 = require("tns-core-modules/application-settings/application-settings");
var ServiceFirebase = /** @class */ (function () {
    function ServiceFirebase() {
        this._usuario = new usuario_modal_1.DatosUsuario();
        this._servicios = new servicios_modal_1.ServiciosVets();
    }
    ServiceFirebase.prototype.ngOnInit = function () {
        throw new Error("Method not implemented.");
    };
    /**
         * iniciarLoginGoogle
         */
    ServiceFirebase.prototype.iniciarLoginGoogleS = function () {
        return firebase.login({
            type: firebase.LoginType.GOOGLE,
        }).then(function (result) {
            return result;
        }, function (errorMessage) {
            console.log("Esto es un error " + errorMessage);
            return errorMessage;
        });
    };
    /**
   * crearUsuario
   */
    ServiceFirebase.prototype.crearUsuario = function (_usuario) {
        var dato;
        return firebase.createUser({
            email: _usuario._correo,
            password: _usuario._clave
        }).then(function (result) {
            return result.key;
        }, function (errorMessage) {
            var errorEmailExist = errorMessage.indexOf("The email address is already in use by another account.");
            if (errorEmailExist >= 0) {
                dato = 'errorEmailExist';
            }
            return dato;
        });
    };
    /**
     * iniciarSesion
     */
    ServiceFirebase.prototype.iniciarSesion = function (_usuario) {
        var dato;
        return firebase.login({
            type: firebase.LoginType.PASSWORD,
            passwordOptions: {
                email: _usuario._correo,
                password: _usuario._clave
            }
        }).then(function (result) {
            return result.uid;
        }, function (errorMessage) {
            var errorEmail = errorMessage.indexOf("The email address is badly formatted.");
            var errorUsuario = errorMessage.indexOf("There is no user record corresponding to this identifier.");
            var errorClave = errorMessage.indexOf("The password is invalid or the user does not have a password.");
            var errorCuenta = errorMessage.indexOf("The user account has been disabled by an administrator.");
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
        });
    };
    /**
     * crearDatosUsuario
     * En esta funcion se crean los datos del usuario en la tabla despues de haber guardado
     */
    ServiceFirebase.prototype.crearDatosUsuario = function (_datosUsuario) {
        var dato;
        var tiempo = new Date().toLocaleString();
        return firebase.setValue('/usuariosVeterinarias/' + _datosUsuario._id, 
        //[] estos crchetes sivern para hacer el ingreso de datos es decir cero, uno , dos tres, 
        {
            fecha_creacion: tiempo,
            nombre: _datosUsuario._nombre,
            correo: _datosUsuario._correo,
            celular: _datosUsuario._celular
        }).then(function (result) {
            result = "guardado";
            console.log("created key: " + result);
            return result;
        }, function (errorMessage) {
            errorMessage = "error";
            console.log("Error key: " + errorMessage);
            return errorMessage;
        });
    };
    /**
     * crearDatosUsuario
     * En esta funcion se crean los datos del usuario en la tabla despues de haber guardado
     */
    ServiceFirebase.prototype.modificarDatosUsuario = function (_datosUsuario) {
        var dato;
        var tiempo = new Date().toLocaleString();
        return firebase.setValue('/usuariosVeterinarias/' + _datosUsuario._id, 
        //[] estos crchetes sivern para hacer el ingreso de datos es decir cero, uno , dos tres, 
        {
            fecha_modificacion: tiempo,
            fecha_creacion: _datosUsuario._fecha_creacion,
            nombre: _datosUsuario._nombre,
            correo: _datosUsuario._correo,
            celular: _datosUsuario._celular
        }).then(function (result) {
            result = "guardado";
            console.log("created key: " + result);
            return result;
        }, function (errorMessage) {
            errorMessage = "error";
            console.log("Error key: " + errorMessage);
            return errorMessage;
        });
    };
    /**
     * consultarDatosUsuario
     * En esta funcion se consultan los datos del usuario de la tabla despues de haber guardado
     */
    ServiceFirebase.prototype.consultarDatosUsuario = function (idUsuario) {
        console.log("Inicia Consulta" + idUsuario);
        var options = {
            singleEvent: true,
            orderBy: {
                type: firebase.QueryOrderByType.KEY,
                value: idUsuario
            },
            range: {
                type: firebase.QueryRangeType.EQUAL_TO,
                value: idUsuario
            }
        };
        return firebase.query(function (queryResult) {
            if (queryResult.value) {
                return (JSON.stringify(queryResult.value));
            }
        }, '/usuariosVeterinarias/', options);
        //console.log("las opciontes" + data);
    };
    /**
    * consultarDatosUsuario
    * En esta funcion se consultan los datos del usuario de la tabla despues de haber guardado
    */
    ServiceFirebase.prototype.consultarExistenciaDatosUsuario = function (idUsuario, tipoRegistro) {
        console.log("Inicia Consulta" + idUsuario);
        var options = {
            singleEvent: true,
            orderBy: {
                type: firebase.QueryOrderByType.KEY,
                value: idUsuario
            },
            range: {
                type: firebase.QueryRangeType.EQUAL_TO,
                value: idUsuario
            }
        };
        return firebase.query(function (queryResult) {
            if (queryResult.value) {
                return (JSON.stringify(queryResult.value));
            }
        }, '/' + tipoRegistro + '/', options);
        //console.log("las opciontes" + data);
    };
    /**
    * consultarServiciosVets
    * Funcion que permite consultar los datos de las todas las Veterinarias en la tabla
    */
    ServiceFirebase.prototype.consultarDatosVeterinariasVets = function () {
        console.log("Inicia Consulta ");
        var data;
        var options = {
            singleEvent: true,
            // order by company.country
            orderBy: {
                type: firebase.QueryOrderByType.CHILD,
                value: 'since' // mandatory when type is 'child'
            },
        };
        return firebase.query(function (queryResult) {
            if (queryResult.value) {
                console.log("Respuesta al consultar el ID" + queryResult.value);
                return (JSON.stringify(queryResult.value));
            }
        }, '/veterinariasRegistradas', options);
    };
    /**
     * crearRegistroVets
     * Funcion que permite crear las veterinarias segun su tipo
     */
    ServiceFirebase.prototype.crearRegistroVets = function (_datosVets) {
        var dato;
        var idUser = application_settings_1.getString('idLogin');
        //idUser ="8PMQTDK3wRPYvMgUfGpivhnjmkh1";
        console.log(idUser);
        var tiempo = new Date().toLocaleString();
        return firebase.setValue('/veterinariasRegistradas/' + idUser + "/veterinaria", 
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
            facebook: _datosVets._facebookVets,
            twitter: _datosVets._twitterVets,
            instagram: _datosVets._InstagramVets,
            whatsapp: _datosVets._whatSappVets,
            horas: _datosVets._24Horas
        }).then(function (result) {
            result = "guardado";
            console.log("created key: " + result);
            return result;
        }, function (errorMessage) {
            errorMessage = "error";
            console.log("Error key: " + errorMessage);
            return errorMessage;
        });
    };
    /**
     * cerrarSesion
     */
    ServiceFirebase.prototype.cerrarSesion = function () {
        firebase.logout();
    };
    /**
     * olvidoClave
     */
    ServiceFirebase.prototype.olvidoClave = function (email) {
        return firebase.resetPassword({
            email: email
        }).then(function (result) {
            // result = "guardado";
            console.log("response send email " + result);
            return result;
        }, function (errorMessage) {
            //errorMessage = "error"
            console.log("Error send email: " + errorMessage);
            return errorMessage;
        });
    };
    /**
     * validateEmailForgotPass
     */
    ServiceFirebase.prototype.validateEmailForgotPass = function (email) {
        console.log("Inicia Consulta" + email);
        var options = {
            singleEvent: true,
            orderBy: {
                type: firebase.QueryOrderByType.CHILD,
                value: 'correo'
            },
            range: {
                type: firebase.QueryRangeType.EQUAL_TO,
                value: email
            }
        };
        return firebase.query(function (queryResult) {
            console.dir(queryResult.value);
            if (queryResult.value) {
                console.log(JSON.stringify(queryResult.value));
                return (JSON.stringify(queryResult.value));
            }
        }, '/usuariosVeterinarias/', options);
    };
    /**
     * searchDataVeterinary
     */
    ServiceFirebase.prototype.searchDataVeterinary = function (iduser) {
        console.log("Inicia Consulta " + iduser);
        var data;
        var options = {
            singleEvent: true,
            // order by company.country
            orderBy: {
                type: firebase.QueryOrderByType.CHILD,
                value: 'since' // mandatory when type is 'child'
            },
        };
        return firebase.query(function (queryResult) {
            if (queryResult.value) {
                console.log("Respuesta al consultar el ID" + queryResult.value);
                return (JSON.stringify(queryResult.value));
            }
        }, '/veterinariasRegistradas/' + iduser, options);
    };
    /**
     * addServicesVets
     * Funcion que permite crear los datos de los servicios en la tabla
     */
    ServiceFirebase.prototype.addServicesVets = function (_datosVets) {
        var dato;
        var tiempo = new Date().toLocaleString();
        return firebase.setValue('/veterinariasRegistradas/' + _datosVets._idUsuario + '/servicios/' + _datosVets._idServicioVet, 
        //[] estos crchetes sivern para hacer el ingreso de datos es decir cero, uno , dos tres, 
        {
            fecha_creacion: tiempo,
            nombre: _datosVets._nombreServicioVet,
            descripcion: _datosVets._descripcionServicioVet,
        }).then(function (result) {
            result = "guardado";
            console.log("created key: " + result);
            return result;
        }, function (errorMessage) {
            errorMessage = "error";
            console.log("Error key: " + errorMessage);
            return errorMessage;
        });
    };
    /**
  * addServicesVets
  * Funcion que permite crear los datos de los servicios en la tabla
  */
    ServiceFirebase.prototype.addProductsVets = function (_datosVets) {
        var dato;
        var tiempo = new Date().toLocaleString();
        return firebase.setValue('/veterinariasRegistradas/' + _datosVets._idUsuario + '/productos/' + _datosVets._idProductsVet, 
        //[] estos crchetes sivern para hacer el ingreso de datos es decir cero, uno , dos tres, 
        {
            fecha_creacion: tiempo,
            nombre: _datosVets._nombreProductVet,
            precio: _datosVets._precioProductoVet,
            descripcion: _datosVets._descripcionProductVet,
            image: _datosVets._imageProductVet
        }).then(function (result) {
            result = "guardado";
            console.log("created key: " + result);
            return result;
        }, function (errorMessage) {
            errorMessage = "error";
            console.log("Error key: " + errorMessage);
            return errorMessage;
        });
    };
    /**
* addServicesVets
* Funcion que permite crear los datos de los servicios en la tabla
*/
    ServiceFirebase.prototype.addPromotionsVets = function (_datosVets) {
        var dato;
        var tiempo = new Date().toLocaleString();
        return firebase.setValue('/veterinariasRegistradas/' + _datosVets._idUsuario + '/promociones/' + _datosVets._idPromotionVet, 
        //[] estos crchetes sivern para hacer el ingreso de datos es decir cero, uno , dos tres, 
        {
            fecha_creacion: tiempo,
            nombre: _datosVets._nombrePromotionVet,
            precio: _datosVets._precioPromotionoVet,
            descripcion: _datosVets._descripcionPromotionVet,
        }).then(function (result) {
            result = "guardado";
            console.log("created key: " + result);
            return result;
        }, function (errorMessage) {
            errorMessage = "error";
            console.log("Error key: " + errorMessage);
            return errorMessage;
        });
    };
    /**
    * getServicesVeterinary
    * Funcion que permite consultar los datos de los servicios en la tabla
    */
    ServiceFirebase.prototype.getServicesVeterinary = function (_datosVets) {
        var email = "";
        console.log("Inicia Consulta" + _datosVets._idUsuario);
        var data;
        var options = {
            singleEvent: true,
            // order by company.country
            orderBy: {
                type: firebase.QueryOrderByType.CHILD,
                value: 'since' // mandatory when type is 'child'
            },
        };
        return firebase.query(function (queryResult) {
            if (queryResult.value) {
                return (JSON.stringify(queryResult.value));
            }
        }, '/veterinariasRegistradas/' + _datosVets._idUsuario, options);
    };
    /**
     * removeServices
     */
    ServiceFirebase.prototype.deleteServices = function (url) {
        return firebase.remove(url).then(function (result) {
        }, function (errorMessage) {
            errorMessage = "error";
            console.log("Error key: " + errorMessage);
            return errorMessage;
        });
    };
    /**
     * deleteImage
     */
    ServiceFirebase.prototype.deleteImage = function (path) {
        return firebase.deleteFile({
            // optional, can also be passed during init() as 'storageBucket' param so we can cache it
            bucket: 'gs://vetscol-1.appspot.com',
            // the full path of an existing file in your Firebase storage
            remoteFullPath: 'uploads/images/telerik-logo-uploaded.png'
        }).then(function () {
            console.log("File deleted.");
            var file;
            return file = "File deleted.";
        }, function (error) {
            console.log("File deletion Error: " + error);
        });
    };
    /**
    * searchDataVeterinary
    */
    ServiceFirebase.prototype.searchDataVeterinaryUsuarios = function () {
        console.log("Inicia Consulta ");
        var data;
        var options = {
            singleEvent: true,
            // order by company.country
            orderBy: {
                type: firebase.QueryOrderByType.CHILD,
                value: 'since' // mandatory when type is 'child'
            },
        };
        return firebase.query(function (queryResult) {
            if (queryResult.value) {
                console.log("Respuesta al consultar el ID" + queryResult.value);
                return (JSON.stringify(queryResult.value));
            }
        }, '/veterinariasRegistradasUsuarios/', options);
    };
    /**
     * crearRegistroVets
     * Funcion que permite crear las veterinarias segun su tipo
     */
    ServiceFirebase.prototype.crearRegistroVetsUsuarios = function (_datosVets, id) {
        var dato;
        var idUser = application_settings_1.getString('idLogin');
        //idUser ="8PMQTDK3wRPYvMgUfGpivhnjmkh1";
        console.log(idUser);
        var tiempo = new Date().toLocaleString();
        return firebase.setValue('/veterinariasRegistradasUsuarios/' + id, 
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
            facebook: _datosVets._facebookVets,
            twitter: _datosVets._twitterVets,
            instagram: _datosVets._InstagramVets,
            whatsapp: _datosVets._whatSappVets,
            horas: _datosVets._24Horas
        }).then(function (result) {
            result = "guardado";
            console.log("created key: " + result);
            return result;
        }, function (errorMessage) {
            errorMessage = "error";
            console.log("Error key: " + errorMessage);
            return errorMessage;
        });
    };
    /**
* searchDataVeterinary
*/
    ServiceFirebase.prototype.getDataIdOpinions = function () {
        console.log("Inicia Consulta ");
        var data;
        var options = {
            singleEvent: true,
            // order by company.country
            orderBy: {
                type: firebase.QueryOrderByType.CHILD,
                value: 'since' // mandatory when type is 'child'
            },
        };
        return firebase.query(function (queryResult) {
            if (queryResult.value) {
                console.log("Respuesta al consultar el ID" + queryResult.value);
                return (JSON.stringify(queryResult.value));
            }
        }, '/opinionesAyudaVeterinarias/', options);
    };
    /**
 * addServicesVets
 * Funcion que permite crear las opiniones de los usuarios
 */
    ServiceFirebase.prototype.addSubjectsVets = function (numero, _dataOpinion) {
        var dato;
        var tiempo = new Date().toLocaleString();
        return firebase.setValue('/opinionesAyudaVeterinarias/' + numero, 
        //[] estos crchetes sivern para hacer el ingreso de datos es decir cero, uno , dos tres, 
        {
            fecha_creacion: tiempo,
            idusuario: _dataOpinion._idUsuario,
            asunto: _dataOpinion._asuntoOpinion,
            descripcion: _dataOpinion._descripcionOpinion,
        }).then(function (result) {
            result = "guardado";
            console.log("created key: " + result);
            return result;
        }, function (errorMessage) {
            errorMessage = "error";
            console.log("Error key: " + errorMessage);
            return errorMessage;
        });
    };
    ///////ASESORIAS
    /**
* searchDataVeterinary
*/
    ServiceFirebase.prototype.getDataIdAdvices = function () {
        console.log("Inicia Consulta ");
        var data;
        var options = {
            singleEvent: true,
            // order by company.country
            orderBy: {
                type: firebase.QueryOrderByType.CHILD,
                value: 'since' // mandatory when type is 'child'
            },
        };
        return firebase.query(function (queryResult) {
            if (queryResult.value) {
                console.log("Respuesta al consultar el ID" + queryResult.value);
                return (JSON.stringify(queryResult.value));
            }
        }, '/asesoriasAyudaVeterinarias/', options);
    };
    /**
 * addServicesVets
 * Funcion que permite crear las opiniones de los usuarios
 */
    ServiceFirebase.prototype.addAdvicesVets = function (numero, _dataOpinion) {
        var dato;
        var tiempo = new Date().toLocaleString();
        return firebase.setValue('/asesoriasAyudaVeterinarias/' + numero, 
        //[] estos crchetes sivern para hacer el ingreso de datos es decir cero, uno , dos tres, 
        {
            fecha_creacion: tiempo,
            idusuario: _dataOpinion._idUsuario,
            asunto: _dataOpinion._asuntoOpinion,
            descripcion: _dataOpinion._descripcionOpinion,
        }).then(function (result) {
            result = "guardado";
            console.log("created key: " + result);
            return result;
        }, function (errorMessage) {
            errorMessage = "error";
            console.log("Error key: " + errorMessage);
            return errorMessage;
        });
    };
    /**
     * getComentarios
     * consulta los comentarios que se le han hecho a la veterinaria
     */
    ServiceFirebase.prototype.getCommentsRating = function (id) {
        console.log("Inicia Consulta " + id);
        var data;
        var options = {
            singleEvent: true,
            // order by company.country
            orderBy: {
                type: firebase.QueryOrderByType.CHILD,
                value: 'since' // mandatory when type is 'child'
            },
        };
        return firebase.query(function (queryResult) {
            if (queryResult.value) {
                console.log("Respuesta al consultar el ID" + queryResult.value);
                return (JSON.stringify(queryResult.value));
            }
        }, 
        //'/veterinariasRegistradas/'+id, options
        '/comentariosRatingsVets/' + id, options);
    };
    return ServiceFirebase;
}());
exports.ServiceFirebase = ServiceFirebase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlyZWJhc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpcmViYXNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSx1REFBMEQ7QUFDMUQsd0RBQXNEO0FBQ3RELDREQUF5RDtBQUN6RCxtR0FBdUY7QUFPdkY7SUFLSTtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSw0QkFBWSxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLCtCQUFhLEVBQUUsQ0FBQztJQUcxQyxDQUFDO0lBRUQsa0NBQVEsR0FBUjtRQUNJLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBQ0Q7O1dBRU87SUFDQSw2Q0FBbUIsR0FBMUI7UUFDSSxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztZQUNsQixJQUFJLEVBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNO1NBR2xDLENBQUMsQ0FBQyxJQUFJLENBQ0gsVUFBQyxNQUFNO1lBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUVsQixDQUFDLEVBQ0QsVUFBQyxZQUFZO1lBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsR0FBRyxZQUFZLENBQUMsQ0FBQztZQUNoRCxNQUFNLENBQUMsWUFBWSxDQUFDO1FBQ3hCLENBQUMsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVEOztLQUVDO0lBQ0Qsc0NBQVksR0FBWixVQUFhLFFBQXNCO1FBQy9CLElBQUksSUFBUyxDQUFDO1FBQ2QsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7WUFDdkIsS0FBSyxFQUFFLFFBQVEsQ0FBQyxPQUFPO1lBQ3ZCLFFBQVEsRUFBRSxRQUFRLENBQUMsTUFBTTtTQUM1QixDQUFDLENBQUMsSUFBSSxDQUNILFVBQVUsTUFBTTtZQUNaLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ3RCLENBQUMsRUFDRCxVQUFV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LE1BQU0sQ0FBQztRQUNsQixDQUFDLEVBQ0csVUFBQSxZQUFZO1lBQ1IsWUFBWSxHQUFHLE9BQU8sQ0FBQTtZQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUMsQ0FBQztZQUUxQyxNQUFNLENBQUMsWUFBWSxDQUFDO1FBQ3hCLENBQUMsQ0FFSixDQUFDO0lBQ04sQ0FBQztJQUVEOzs7T0FHRztJQUVJLDJDQUFpQixHQUF4QixVQUF5QixFQUFFO1FBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDckMsSUFBSSxJQUFJLENBQUM7UUFDVCxJQUFJLE9BQU8sR0FBMEI7WUFDakMsV0FBVyxFQUFFLElBQUk7WUFDakIsMkJBQTJCO1lBQzNCLE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEtBQUs7Z0JBQ3JDLEtBQUssRUFBRSxPQUFPLENBQUMsaUNBQWlDO2FBQ25EO1NBQ0osQ0FBQTtRQUNELE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUNqQixVQUFBLFdBQVc7WUFDUCxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2hFLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDL0MsQ0FBQztRQUNMLENBQUM7UUFDRCx5Q0FBeUM7UUFDekMsMEJBQTBCLEdBQUcsRUFBRSxFQUFFLE9BQU8sQ0FDM0MsQ0FBQztJQUNOLENBQUM7SUFJTCxzQkFBQztBQUFELENBQUMsQUF2eUJELElBdXlCQztBQXZ5QlksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcclxuaW1wb3J0IHsgRGF0b3NVc3VhcmlvIH0gZnJvbSBcIi4uL21vZGFsL3VzdWFyaW8ubW9kYWxcIjtcclxuaW1wb3J0IHsgU2VydmljaW9zVmV0cyB9IGZyb20gXCIuLi9tb2RhbC9zZXJ2aWNpb3MubW9kYWxcIjtcclxuaW1wb3J0IHsgZ2V0U3RyaW5nIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24tc2V0dGluZ3MvYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgR2xvYmFsQ29tcG9uZW50IH0gZnJvbSBcIi4uL2NvbnN0cy9nbG9iYWwubW9kZWxcIjtcclxuaW1wb3J0IHsgUHJvZHVjdHNWZXRzIH0gZnJvbSBcIi4uL21vZGFsL3Byb2R1Y3RzLm1vZGFsXCI7XHJcbmltcG9ydCB7IFByb21vdGlvbnNWZXRzIH0gZnJvbSBcIi4uL21vZGFsL3Byb21vdGlvbnMubW9kYWxcIjtcclxuaW1wb3J0IHsgRGF0b3NWZXRzIH0gZnJvbSBcIi4uL21vZGFsL3ZldHMubW9kYWxcIjtcclxuaW1wb3J0IHsgT3BpbmlvbnNNb2RhbCB9IGZyb20gXCIuLi9tb2RhbC9vcGluaW9ucy5tb2RhbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNlcnZpY2VGaXJlYmFzZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgX2dsb2JhbENvbXBvbmVudDogR2xvYmFsQ29tcG9uZW50O1xyXG4gICAgX3NlcnZpY2lvczogU2VydmljaW9zVmV0cztcclxuICAgIF91c3VhcmlvOiBEYXRvc1VzdWFyaW87XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLl91c3VhcmlvID0gbmV3IERhdG9zVXN1YXJpbygpO1xyXG4gICAgICAgIHRoaXMuX3NlcnZpY2lvcyA9IG5ldyBTZXJ2aWNpb3NWZXRzKCk7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNZXRob2Qgbm90IGltcGxlbWVudGVkLlwiKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICAgICAqIGluaWNpYXJMb2dpbkdvb2dsZVxyXG4gICAgICAgICAqL1xyXG4gICAgcHVibGljIGluaWNpYXJMb2dpbkdvb2dsZVMoKSB7XHJcbiAgICAgICAgcmV0dXJuIGZpcmViYXNlLmxvZ2luKHtcclxuICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuTG9naW5UeXBlLkdPT0dMRSxcclxuICAgICAgICAgICAgLy8gT3B0aW9uYWwgXHJcblxyXG4gICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgIChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAoZXJyb3JNZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVzdG8gZXMgdW4gZXJyb3IgXCIgKyBlcnJvck1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVycm9yTWVzc2FnZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICogY3JlYXJVc3VhcmlvXHJcbiAgICovXHJcbiAgICBjcmVhclVzdWFyaW8oX3VzdWFyaW86IERhdG9zVXN1YXJpbykge1xyXG4gICAgICAgIGxldCBkYXRvOiBhbnk7XHJcbiAgICAgICAgcmV0dXJuIGZpcmViYXNlLmNyZWF0ZVVzZXIoe1xyXG4gICAgICAgICAgICBlbWFpbDogX3VzdWFyaW8uX2NvcnJlbyxcclxuICAgICAgICAgICAgcGFzc3dvcmQ6IF91c3VhcmlvLl9jbGF2ZVxyXG4gICAgICAgIH0pLnRoZW4oXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQua2V5O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZXJyb3JNZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZXJyb3JFbWFpbEV4aXN0ID0gZXJyb3JNZXNzYWdlLmluZGV4T2YoXCJUaGUgZW1haWwgYWRkcmVzcyBpcyBhbHJlYWR5IGluIHVzZSBieSBhbm90aGVyIGFjY291bnQuXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yRW1haWxFeGlzdCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0byA9ICdlcnJvckVtYWlsRXhpc3QnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdG87XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBpbmljaWFyU2VzaW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpbmljaWFyU2VzaW9uKF91c3VhcmlvOiBEYXRvc1VzdWFyaW8pIHtcclxuICAgICAgICBsZXQgZGF0bzogYW55O1xyXG4gICAgICAgIHJldHVybiBmaXJlYmFzZS5sb2dpbih7XHJcbiAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLkxvZ2luVHlwZS5QQVNTV09SRCxcclxuICAgICAgICAgICAgcGFzc3dvcmRPcHRpb25zOiB7XHJcbiAgICAgICAgICAgICAgICBlbWFpbDogX3VzdWFyaW8uX2NvcnJlbyxcclxuICAgICAgICAgICAgICAgIHBhc3N3b3JkOiBfdXN1YXJpby5fY2xhdmVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC51aWQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgZXJyb3JFbWFpbCA9IGVycm9yTWVzc2FnZS5pbmRleE9mKFwiVGhlIGVtYWlsIGFkZHJlc3MgaXMgYmFkbHkgZm9ybWF0dGVkLlwiKTtcclxuICAgICAgICAgICAgICAgIGxldCBlcnJvclVzdWFyaW8gPSBlcnJvck1lc3NhZ2UuaW5kZXhPZihcIlRoZXJlIGlzIG5vIHVzZXIgcmVjb3JkIGNvcnJlc3BvbmRpbmcgdG8gdGhpcyBpZGVudGlmaWVyLlwiKTtcclxuICAgICAgICAgICAgICAgIGxldCBlcnJvckNsYXZlID0gZXJyb3JNZXNzYWdlLmluZGV4T2YoXCJUaGUgcGFzc3dvcmQgaXMgaW52YWxpZCBvciB0aGUgdXNlciBkb2VzIG5vdCBoYXZlIGEgcGFzc3dvcmQuXCIpXHJcbiAgICAgICAgICAgICAgICBsZXQgZXJyb3JDdWVudGEgPSBlcnJvck1lc3NhZ2UuaW5kZXhPZihcIlRoZSB1c2VyIGFjY291bnQgaGFzIGJlZW4gZGlzYWJsZWQgYnkgYW4gYWRtaW5pc3RyYXRvci5cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yRW1haWwgPj0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdG8gPSAnZXJyb3JFbWFpbCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3JVc3VhcmlvID49IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0byA9ICdlcnJvclVzdWFyaW8nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yQ2xhdmUgPj0gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBkYXRvID0gJ2Vycm9yQ2xhdmUnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yQ3VlbnRhID49IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0byA9ICdlcnJvckN1ZW50YSc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3JFbWFpbCA8PSAwICYmIGVycm9yVXN1YXJpbyA8PSAwICYmIGVycm9yQ2xhdmUgPD0gMCAmJiBlcnJvckN1ZW50YSA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0byA9ICdlcnJvckdsb2JhbCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0bztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWFyRGF0b3NVc3VhcmlvXHJcbiAgICAgKiBFbiBlc3RhIGZ1bmNpb24gc2UgY3JlYW4gbG9zIGRhdG9zIGRlbCB1c3VhcmlvIGVuIGxhIHRhYmxhIGRlc3B1ZXMgZGUgaGFiZXIgZ3VhcmRhZG9cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNyZWFyRGF0b3NVc3VhcmlvKF9kYXRvc1VzdWFyaW86IERhdG9zVXN1YXJpbykge1xyXG5cclxuICAgICAgICBsZXQgZGF0bzogYW55O1xyXG4gICAgICAgIHZhciB0aWVtcG8gPSAvL25ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcclxuICAgICAgICAgICAgbmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpO1xyXG4gICAgICAgIHJldHVybiBmaXJlYmFzZS5zZXRWYWx1ZShcclxuICAgICAgICAgICAgJy91c3Vhcmlvc1ZldGVyaW5hcmlhcy8nICsgX2RhdG9zVXN1YXJpby5faWQsXHJcbiAgICAgICAgICAgIC8vW10gZXN0b3MgY3JjaGV0ZXMgc2l2ZXJuIHBhcmEgaGFjZXIgZWwgaW5ncmVzbyBkZSBkYXRvcyBlcyBkZWNpciBjZXJvLCB1bm8gLCBkb3MgdHJlcywgXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZlY2hhX2NyZWFjaW9uOiB0aWVtcG8sXHJcbiAgICAgICAgICAgICAgICBub21icmU6IF9kYXRvc1VzdWFyaW8uX25vbWJyZSxcclxuICAgICAgICAgICAgICAgIGNvcnJlbzogX2RhdG9zVXN1YXJpby5fY29ycmVvLFxyXG4gICAgICAgICAgICAgICAgY2VsdWxhcjogX2RhdG9zVXN1YXJpby5fY2VsdWxhclxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICByZXN1bHQgPSBcImd1YXJkYWRvXCI7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY3JlYXRlZCBrZXk6IFwiICsgcmVzdWx0KTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gXCJlcnJvclwiXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGtleTogXCIgKyBlcnJvck1lc3NhZ2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBlcnJvck1lc3NhZ2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhckRhdG9zVXN1YXJpb1xyXG4gICAgICogRW4gZXN0YSBmdW5jaW9uIHNlIGNyZWFuIGxvcyBkYXRvcyBkZWwgdXN1YXJpbyBlbiBsYSB0YWJsYSBkZXNwdWVzIGRlIGhhYmVyIGd1YXJkYWRvXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtb2RpZmljYXJEYXRvc1VzdWFyaW8oX2RhdG9zVXN1YXJpbzogRGF0b3NVc3VhcmlvKSB7XHJcblxyXG4gICAgICAgIGxldCBkYXRvOiBhbnk7XHJcbiAgICAgICAgdmFyIHRpZW1wbyA9IC8vbmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkpO1xyXG4gICAgICAgICAgICBuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKCk7XHJcbiAgICAgICAgcmV0dXJuIGZpcmViYXNlLnNldFZhbHVlKFxyXG4gICAgICAgICAgICAnL3VzdWFyaW9zVmV0ZXJpbmFyaWFzLycgKyBfZGF0b3NVc3VhcmlvLl9pZCxcclxuICAgICAgICAgICAgLy9bXSBlc3RvcyBjcmNoZXRlcyBzaXZlcm4gcGFyYSBoYWNlciBlbCBpbmdyZXNvIGRlIGRhdG9zIGVzIGRlY2lyIGNlcm8sIHVubyAsIGRvcyB0cmVzLCBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZmVjaGFfbW9kaWZpY2FjaW9uOiB0aWVtcG8sXHJcbiAgICAgICAgICAgICAgICBmZWNoYV9jcmVhY2lvbjogX2RhdG9zVXN1YXJpby5fZmVjaGFfY3JlYWNpb24sXHJcbiAgICAgICAgICAgICAgICBub21icmU6IF9kYXRvc1VzdWFyaW8uX25vbWJyZSxcclxuICAgICAgICAgICAgICAgIGNvcnJlbzogX2RhdG9zVXN1YXJpby5fY29ycmVvLFxyXG4gICAgICAgICAgICAgICAgY2VsdWxhcjogX2RhdG9zVXN1YXJpby5fY2VsdWxhclxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICByZXN1bHQgPSBcImd1YXJkYWRvXCI7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY3JlYXRlZCBrZXk6IFwiICsgcmVzdWx0KTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gXCJlcnJvclwiXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGtleTogXCIgKyBlcnJvck1lc3NhZ2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBlcnJvck1lc3NhZ2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjb25zdWx0YXJEYXRvc1VzdWFyaW9cclxuICAgICAqIEVuIGVzdGEgZnVuY2lvbiBzZSBjb25zdWx0YW4gbG9zIGRhdG9zIGRlbCB1c3VhcmlvIGRlIGxhIHRhYmxhIGRlc3B1ZXMgZGUgaGFiZXIgZ3VhcmRhZG9cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnN1bHRhckRhdG9zVXN1YXJpbyhpZFVzdWFyaW8pIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkluaWNpYSBDb25zdWx0YVwiICsgaWRVc3VhcmlvKTtcclxuICAgICAgICBsZXQgb3B0aW9uczogZmlyZWJhc2UuUXVlcnlPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgb3JkZXJCeToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogaWRVc3VhcmlvXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJhbmdlOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeVJhbmdlVHlwZS5FUVVBTF9UTyxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBpZFVzdWFyaW9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmlyZWJhc2UucXVlcnkoXHJcbiAgICAgICAgICAgIHF1ZXJ5UmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChxdWVyeVJlc3VsdC52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoSlNPTi5zdHJpbmdpZnkocXVlcnlSZXN1bHQudmFsdWUpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJy91c3Vhcmlvc1ZldGVyaW5hcmlhcy8nLCBvcHRpb25zXHJcbiAgICAgICAgKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwibGFzIG9wY2lvbnRlc1wiICsgZGF0YSk7XHJcblxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIGNvbnN1bHRhckRhdG9zVXN1YXJpb1xyXG4gICAgKiBFbiBlc3RhIGZ1bmNpb24gc2UgY29uc3VsdGFuIGxvcyBkYXRvcyBkZWwgdXN1YXJpbyBkZSBsYSB0YWJsYSBkZXNwdWVzIGRlIGhhYmVyIGd1YXJkYWRvXHJcbiAgICAqL1xyXG4gICAgcHVibGljIGNvbnN1bHRhckV4aXN0ZW5jaWFEYXRvc1VzdWFyaW8oaWRVc3VhcmlvLCB0aXBvUmVnaXN0cm8pIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkluaWNpYSBDb25zdWx0YVwiICsgaWRVc3VhcmlvKTtcclxuICAgICAgICBsZXQgb3B0aW9uczogZmlyZWJhc2UuUXVlcnlPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgb3JkZXJCeToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVksXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogaWRVc3VhcmlvXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJhbmdlOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeVJhbmdlVHlwZS5FUVVBTF9UTyxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBpZFVzdWFyaW9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmlyZWJhc2UucXVlcnkoXHJcbiAgICAgICAgICAgIHF1ZXJ5UmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChxdWVyeVJlc3VsdC52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoSlNPTi5zdHJpbmdpZnkocXVlcnlSZXN1bHQudmFsdWUpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJy8nICsgdGlwb1JlZ2lzdHJvICsgJy8nLCBvcHRpb25zXHJcbiAgICAgICAgKTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwibGFzIG9wY2lvbnRlc1wiICsgZGF0YSk7XHJcblxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIGNvbnN1bHRhclNlcnZpY2lvc1ZldHNcclxuICAgICogRnVuY2lvbiBxdWUgcGVybWl0ZSBjb25zdWx0YXIgbG9zIGRhdG9zIGRlIGxhcyB0b2RhcyBsYXMgVmV0ZXJpbmFyaWFzIGVuIGxhIHRhYmxhXHJcbiAgICAqL1xyXG4gICAgcHVibGljIGNvbnN1bHRhckRhdG9zVmV0ZXJpbmFyaWFzVmV0cygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkluaWNpYSBDb25zdWx0YSBcIik7XHJcbiAgICAgICAgdmFyIGRhdGE7XHJcbiAgICAgICAgbGV0IG9wdGlvbnM6IGZpcmViYXNlLlF1ZXJ5T3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXHJcbiAgICAgICAgICAgIC8vIG9yZGVyIGJ5IGNvbXBhbnkuY291bnRyeVxyXG4gICAgICAgICAgICBvcmRlckJ5OiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLkNISUxELFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6ICdzaW5jZScgLy8gbWFuZGF0b3J5IHdoZW4gdHlwZSBpcyAnY2hpbGQnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmaXJlYmFzZS5xdWVyeShcclxuICAgICAgICAgICAgcXVlcnlSZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHF1ZXJ5UmVzdWx0LnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZXNwdWVzdGEgYWwgY29uc3VsdGFyIGVsIElEXCIgKyBxdWVyeVJlc3VsdC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChKU09OLnN0cmluZ2lmeShxdWVyeVJlc3VsdC52YWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAnL3ZldGVyaW5hcmlhc1JlZ2lzdHJhZGFzJywgb3B0aW9uc1xyXG4gICAgICAgICk7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWFyUmVnaXN0cm9WZXRzXHJcbiAgICAgKiBGdW5jaW9uIHF1ZSBwZXJtaXRlIGNyZWFyIGxhcyB2ZXRlcmluYXJpYXMgc2VndW4gc3UgdGlwb1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY3JlYXJSZWdpc3Ryb1ZldHMoIF9kYXRvc1ZldHM6IERhdG9zVmV0cykge1xyXG4gICAgICAgIGxldCBkYXRvOiBhbnk7XHJcbiAgICAgICAgbGV0IGlkVXNlciA9IGdldFN0cmluZygnaWRMb2dpbicpO1xyXG4gICAgICAgIC8vaWRVc2VyID1cIjhQTVFUREszd1JQWXZNZ1VmR3Bpdmhuam1raDFcIjtcclxuICAgICAgICBjb25zb2xlLmxvZyhpZFVzZXIpO1xyXG4gICAgICAgIHZhciB0aWVtcG8gPSAvL25ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcclxuICAgICAgICAgICAgbmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpO1xyXG4gICAgICAgIHJldHVybiBmaXJlYmFzZS5zZXRWYWx1ZShcclxuICAgICAgICAgICAgJy92ZXRlcmluYXJpYXNSZWdpc3RyYWRhcy8nICsgaWRVc2VyICtcIi92ZXRlcmluYXJpYVwiLFxyXG4gICAgICAgICAgICAvL1tdIGVzdG9zIGNyY2hldGVzIHNpdmVybiBwYXJhIGhhY2VyIGVsIGluZ3Jlc28gZGUgZGF0b3MgZXMgZGVjaXIgY2VybywgdW5vICwgZG9zIHRyZXMsIFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmZWNoYV9jcmVhY2lvbjogdGllbXBvLFxyXG4gICAgICAgICAgICAgICAgaW1hZ2U6IF9kYXRvc1ZldHMuX2ltYWdlLFxyXG4gICAgICAgICAgICAgICAgdXN1YXJpb19jcmVhY2lvbjogaWRVc2VyLFxyXG4gICAgICAgICAgICAgICAgbm9tYnJlOiBfZGF0b3NWZXRzLl9ub21icmVWZXQsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwY2lvbjogX2RhdG9zVmV0cy5fZGVzY3JpcGNpb25WZXQsXHJcbiAgICAgICAgICAgICAgICBjb3JyZW86IF9kYXRvc1ZldHMuX2NvcnJlb1ZldCxcclxuICAgICAgICAgICAgICAgIGRpcmVjY2lvbjogX2RhdG9zVmV0cy5fZGlyZWNjaW9uVmV0LFxyXG4gICAgICAgICAgICAgICAgcGFnaW5hX3dlYjogX2RhdG9zVmV0cy5fcGFnaW5hV2ViVmV0LFxyXG4gICAgICAgICAgICAgICAgY2VsdWxhcjogX2RhdG9zVmV0cy5fY2VsdWxhclZldCxcclxuICAgICAgICAgICAgICAgIHRlbGVmb25vOiBfZGF0b3NWZXRzLl90ZWxlZm9ub1ZldCxcclxuICAgICAgICAgICAgICAgIGhvcmFyaW86IF9kYXRvc1ZldHMuX2hvcmFyaW9WZXQsXHJcbiAgICAgICAgICAgICAgICBkaWFzOiBfZGF0b3NWZXRzLl9kaWFzQXRlbmNpb25WZXQsXHJcbiAgICAgICAgICAgICAgICBzZXJ2aWNpb3M6IF9kYXRvc1ZldHMuX3NlcnZpY2lvc1ZldCxcclxuICAgICAgICAgICAgICAgIGNvb3JkZW5hZGFzOiBfZGF0b3NWZXRzLl9jb29yZGVuYWRhc1ZldHMsXHJcbiAgICAgICAgICAgICAgICB0aXBvX3ZldHM6IF9kYXRvc1ZldHMuX3RpcG9WZXQsXHJcbiAgICAgICAgICAgICAgICBjZXJ0aWZpY2FkYTogXCJOT1wiLFxyXG4gICAgICAgICAgICAgICAgbGVtYTogX2RhdG9zVmV0cy5fbGVtYVZldCxcclxuICAgICAgICAgICAgICAgIGlkVmV0czogaWRVc2VyLFxyXG4gICAgICAgICAgICAgICAgZmFjZWJvb2s6X2RhdG9zVmV0cy5fZmFjZWJvb2tWZXRzLFxyXG4gICAgICAgICAgICAgICAgdHdpdHRlcjpfZGF0b3NWZXRzLl90d2l0dGVyVmV0cyxcclxuICAgICAgICAgICAgICAgIGluc3RhZ3JhbTpfZGF0b3NWZXRzLl9JbnN0YWdyYW1WZXRzLFxyXG4gICAgICAgICAgICAgICAgd2hhdHNhcHA6X2RhdG9zVmV0cy5fd2hhdFNhcHBWZXRzLFxyXG4gICAgICAgICAgICAgICAgaG9yYXM6X2RhdG9zVmV0cy5fMjRIb3Jhc1xyXG5cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgKS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IFwiZ3VhcmRhZG9cIjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjcmVhdGVkIGtleTogXCIgKyByZXN1bHQpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBcImVycm9yXCJcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Iga2V5OiBcIiArIGVycm9yTWVzc2FnZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVycm9yTWVzc2FnZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY2VycmFyU2VzaW9uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjZXJyYXJTZXNpb24oKSB7XHJcbiAgICAgICAgZmlyZWJhc2UubG9nb3V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBvbHZpZG9DbGF2ZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgb2x2aWRvQ2xhdmUoZW1haWwpIHtcclxuICAgICAgICByZXR1cm4gZmlyZWJhc2UucmVzZXRQYXNzd29yZCh7XHJcbiAgICAgICAgICAgIGVtYWlsOiBlbWFpbFxyXG4gICAgICAgIH0pLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgLy8gcmVzdWx0ID0gXCJndWFyZGFkb1wiO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc3BvbnNlIHNlbmQgZW1haWwgXCIgKyByZXN1bHQpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH0sIGVycm9yTWVzc2FnZSA9PiB7XHJcbiAgICAgICAgICAgIC8vZXJyb3JNZXNzYWdlID0gXCJlcnJvclwiXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igc2VuZCBlbWFpbDogXCIgKyBlcnJvck1lc3NhZ2UpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGVycm9yTWVzc2FnZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB2YWxpZGF0ZUVtYWlsRm9yZ290UGFzc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdmFsaWRhdGVFbWFpbEZvcmdvdFBhc3MoZW1haWwpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkluaWNpYSBDb25zdWx0YVwiICsgZW1haWwpO1xyXG4gICAgICAgIGxldCBvcHRpb25zOiBmaXJlYmFzZS5RdWVyeU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxyXG4gICAgICAgICAgICBvcmRlckJ5OiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLkNISUxELFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6ICdjb3JyZW8nXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJhbmdlOiB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeVJhbmdlVHlwZS5FUVVBTF9UTyxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBlbWFpbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmaXJlYmFzZS5xdWVyeShcclxuICAgICAgICAgICAgcXVlcnlSZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5kaXIocXVlcnlSZXN1bHQudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHF1ZXJ5UmVzdWx0LnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkocXVlcnlSZXN1bHQudmFsdWUpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoSlNPTi5zdHJpbmdpZnkocXVlcnlSZXN1bHQudmFsdWUpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJy91c3Vhcmlvc1ZldGVyaW5hcmlhcy8nLCBvcHRpb25zXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIHNlYXJjaERhdGFWZXRlcmluYXJ5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZWFyY2hEYXRhVmV0ZXJpbmFyeShpZHVzZXIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkluaWNpYSBDb25zdWx0YSBcIitpZHVzZXIpO1xyXG4gICAgICAgIHZhciBkYXRhO1xyXG4gICAgICAgIGxldCBvcHRpb25zOiBmaXJlYmFzZS5RdWVyeU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxyXG4gICAgICAgICAgICAvLyBvcmRlciBieSBjb21wYW55LmNvdW50cnlcclxuICAgICAgICAgICAgb3JkZXJCeToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5DSElMRCxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiAnc2luY2UnIC8vIG1hbmRhdG9yeSB3aGVuIHR5cGUgaXMgJ2NoaWxkJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmlyZWJhc2UucXVlcnkoXHJcbiAgICAgICAgICAgIHF1ZXJ5UmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChxdWVyeVJlc3VsdC52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVzcHVlc3RhIGFsIGNvbnN1bHRhciBlbCBJRFwiICsgcXVlcnlSZXN1bHQudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoSlNPTi5zdHJpbmdpZnkocXVlcnlSZXN1bHQudmFsdWUpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJy92ZXRlcmluYXJpYXNSZWdpc3RyYWRhcy8nKyBpZHVzZXIsIG9wdGlvbnNcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIGFkZFNlcnZpY2VzVmV0c1xyXG4gICAgICogRnVuY2lvbiBxdWUgcGVybWl0ZSBjcmVhciBsb3MgZGF0b3MgZGUgbG9zIHNlcnZpY2lvcyBlbiBsYSB0YWJsYVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkU2VydmljZXNWZXRzKF9kYXRvc1ZldHM6IFNlcnZpY2lvc1ZldHMpIHtcclxuICAgICAgICBsZXQgZGF0bzogYW55O1xyXG4gICAgICAgIHZhciB0aWVtcG8gPSAvL25ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcclxuICAgICAgICAgICAgbmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpO1xyXG4gICAgICAgIHJldHVybiBmaXJlYmFzZS5zZXRWYWx1ZShcclxuICAgICAgICAgICAgJy92ZXRlcmluYXJpYXNSZWdpc3RyYWRhcy8nICsgX2RhdG9zVmV0cy5faWRVc3VhcmlvICsgJy9zZXJ2aWNpb3MvJyArIF9kYXRvc1ZldHMuX2lkU2VydmljaW9WZXQsXHJcbiAgICAgICAgICAgIC8vW10gZXN0b3MgY3JjaGV0ZXMgc2l2ZXJuIHBhcmEgaGFjZXIgZWwgaW5ncmVzbyBkZSBkYXRvcyBlcyBkZWNpciBjZXJvLCB1bm8gLCBkb3MgdHJlcywgXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZlY2hhX2NyZWFjaW9uOiB0aWVtcG8sXHJcbiAgICAgICAgICAgICAgICBub21icmU6IF9kYXRvc1ZldHMuX25vbWJyZVNlcnZpY2lvVmV0LFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcGNpb246IF9kYXRvc1ZldHMuX2Rlc2NyaXBjaW9uU2VydmljaW9WZXQsXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgKS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IFwiZ3VhcmRhZG9cIjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjcmVhdGVkIGtleTogXCIgKyByZXN1bHQpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBcImVycm9yXCJcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Iga2V5OiBcIiArIGVycm9yTWVzc2FnZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVycm9yTWVzc2FnZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgKiBhZGRTZXJ2aWNlc1ZldHNcclxuICAqIEZ1bmNpb24gcXVlIHBlcm1pdGUgY3JlYXIgbG9zIGRhdG9zIGRlIGxvcyBzZXJ2aWNpb3MgZW4gbGEgdGFibGFcclxuICAqL1xyXG4gICAgcHVibGljIGFkZFByb2R1Y3RzVmV0cyhfZGF0b3NWZXRzOiBQcm9kdWN0c1ZldHMpIHtcclxuICAgICAgICBsZXQgZGF0bzogYW55O1xyXG4gICAgICAgIHZhciB0aWVtcG8gPSAvL25ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcclxuICAgICAgICAgICAgbmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpO1xyXG4gICAgICAgIHJldHVybiBmaXJlYmFzZS5zZXRWYWx1ZShcclxuICAgICAgICAgICAgJy92ZXRlcmluYXJpYXNSZWdpc3RyYWRhcy8nICsgX2RhdG9zVmV0cy5faWRVc3VhcmlvICsgJy9wcm9kdWN0b3MvJyArIF9kYXRvc1ZldHMuX2lkUHJvZHVjdHNWZXQsXHJcbiAgICAgICAgICAgIC8vW10gZXN0b3MgY3JjaGV0ZXMgc2l2ZXJuIHBhcmEgaGFjZXIgZWwgaW5ncmVzbyBkZSBkYXRvcyBlcyBkZWNpciBjZXJvLCB1bm8gLCBkb3MgdHJlcywgXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZlY2hhX2NyZWFjaW9uOiB0aWVtcG8sXHJcbiAgICAgICAgICAgICAgICBub21icmU6IF9kYXRvc1ZldHMuX25vbWJyZVByb2R1Y3RWZXQsXHJcbiAgICAgICAgICAgICAgICBwcmVjaW86IF9kYXRvc1ZldHMuX3ByZWNpb1Byb2R1Y3RvVmV0LFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcGNpb246IF9kYXRvc1ZldHMuX2Rlc2NyaXBjaW9uUHJvZHVjdFZldCxcclxuICAgICAgICAgICAgICAgIGltYWdlOiBfZGF0b3NWZXRzLl9pbWFnZVByb2R1Y3RWZXRcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICApLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gXCJndWFyZGFkb1wiO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNyZWF0ZWQga2V5OiBcIiArIHJlc3VsdCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0+IHtcclxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9IFwiZXJyb3JcIlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBrZXk6IFwiICsgZXJyb3JNZXNzYWdlKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3JNZXNzYWdlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICogYWRkU2VydmljZXNWZXRzXHJcbiAgKiBGdW5jaW9uIHF1ZSBwZXJtaXRlIGNyZWFyIGxvcyBkYXRvcyBkZSBsb3Mgc2VydmljaW9zIGVuIGxhIHRhYmxhXHJcbiAgKi9cclxuIHB1YmxpYyBhZGRQcm9tb3Rpb25zVmV0cyhfZGF0b3NWZXRzOiBQcm9tb3Rpb25zVmV0cykge1xyXG4gICAgbGV0IGRhdG86IGFueTtcclxuICAgIHZhciB0aWVtcG8gPSAvL25ldyBEYXRlKG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcclxuICAgICAgICBuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKCk7XHJcbiAgICByZXR1cm4gZmlyZWJhc2Uuc2V0VmFsdWUoXHJcbiAgICAgICAgJy92ZXRlcmluYXJpYXNSZWdpc3RyYWRhcy8nICsgX2RhdG9zVmV0cy5faWRVc3VhcmlvICsgJy9wcm9tb2Npb25lcy8nICsgX2RhdG9zVmV0cy5faWRQcm9tb3Rpb25WZXQsXHJcbiAgICAgICAgLy9bXSBlc3RvcyBjcmNoZXRlcyBzaXZlcm4gcGFyYSBoYWNlciBlbCBpbmdyZXNvIGRlIGRhdG9zIGVzIGRlY2lyIGNlcm8sIHVubyAsIGRvcyB0cmVzLCBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZlY2hhX2NyZWFjaW9uOiB0aWVtcG8sXHJcbiAgICAgICAgICAgIG5vbWJyZTogX2RhdG9zVmV0cy5fbm9tYnJlUHJvbW90aW9uVmV0LFxyXG4gICAgICAgICAgICBwcmVjaW86IF9kYXRvc1ZldHMuX3ByZWNpb1Byb21vdGlvbm9WZXQsXHJcbiAgICAgICAgICAgIGRlc2NyaXBjaW9uOiBfZGF0b3NWZXRzLl9kZXNjcmlwY2lvblByb21vdGlvblZldCwgICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgKS50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgcmVzdWx0ID0gXCJndWFyZGFkb1wiO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY3JlYXRlZCBrZXk6IFwiICsgcmVzdWx0KTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfSxcclxuICAgICAgICBlcnJvck1lc3NhZ2UgPT4ge1xyXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSBcImVycm9yXCJcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBrZXk6IFwiICsgZXJyb3JNZXNzYWdlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBlcnJvck1lc3NhZ2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICk7XHJcbn1cclxuXHJcbiAgICAvKipcclxuICAgICogZ2V0U2VydmljZXNWZXRlcmluYXJ5XHJcbiAgICAqIEZ1bmNpb24gcXVlIHBlcm1pdGUgY29uc3VsdGFyIGxvcyBkYXRvcyBkZSBsb3Mgc2VydmljaW9zIGVuIGxhIHRhYmxhXHJcbiAgICAqL1xyXG4gICAgcHVibGljIGdldFNlcnZpY2VzVmV0ZXJpbmFyeShfZGF0b3NWZXRzOiBTZXJ2aWNpb3NWZXRzKSB7XHJcbiAgICAgICAgbGV0IGVtYWlsID0gXCJcIjtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkluaWNpYSBDb25zdWx0YVwiICsgX2RhdG9zVmV0cy5faWRVc3VhcmlvKTtcclxuICAgICAgICB2YXIgZGF0YTtcclxuICAgICAgICBsZXQgb3B0aW9uczogZmlyZWJhc2UuUXVlcnlPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgLy8gb3JkZXIgYnkgY29tcGFueS5jb3VudHJ5XHJcbiAgICAgICAgICAgIG9yZGVyQnk6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuQ0hJTEQsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogJ3NpbmNlJyAvLyBtYW5kYXRvcnkgd2hlbiB0eXBlIGlzICdjaGlsZCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZpcmViYXNlLnF1ZXJ5KFxyXG4gICAgICAgICAgICBxdWVyeVJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocXVlcnlSZXN1bHQudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKEpTT04uc3RyaW5naWZ5KHF1ZXJ5UmVzdWx0LnZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICcvdmV0ZXJpbmFyaWFzUmVnaXN0cmFkYXMvJyArIF9kYXRvc1ZldHMuX2lkVXN1YXJpbywgb3B0aW9uc1xyXG4gICAgICAgICk7XHJcblxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiByZW1vdmVTZXJ2aWNlc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVsZXRlU2VydmljZXModXJsKSB7XHJcbiAgICAgICAgcmV0dXJuIGZpcmViYXNlLnJlbW92ZSh1cmwpLnRoZW4ocmVzdWx0ID0+IHtcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0+IHtcclxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9IFwiZXJyb3JcIlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBrZXk6IFwiICsgZXJyb3JNZXNzYWdlKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3JNZXNzYWdlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGRlbGV0ZUltYWdlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkZWxldGVJbWFnZShwYXRoKSB7XHJcbiAgICAgICByZXR1cm4gZmlyZWJhc2UuZGVsZXRlRmlsZSh7XHJcbiAgICAgICAgICAgIC8vIG9wdGlvbmFsLCBjYW4gYWxzbyBiZSBwYXNzZWQgZHVyaW5nIGluaXQoKSBhcyAnc3RvcmFnZUJ1Y2tldCcgcGFyYW0gc28gd2UgY2FuIGNhY2hlIGl0XHJcbiAgICAgICAgICAgIGJ1Y2tldDogJ2dzOi8vdmV0c2NvbC0xLmFwcHNwb3QuY29tJyxcclxuICAgICAgICAgICAgLy8gdGhlIGZ1bGwgcGF0aCBvZiBhbiBleGlzdGluZyBmaWxlIGluIHlvdXIgRmlyZWJhc2Ugc3RvcmFnZVxyXG4gICAgICAgICAgICByZW1vdGVGdWxsUGF0aDogJ3VwbG9hZHMvaW1hZ2VzL3RlbGVyaWstbG9nby11cGxvYWRlZC5wbmcnXHJcbiAgICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlsZSBkZWxldGVkLlwiKTtcclxuICAgICAgICAgICAgICAgIGxldCBmaWxlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbGU9XCJGaWxlIGRlbGV0ZWQuXCI7XHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRmlsZSBkZWxldGlvbiBFcnJvcjogXCIgKyBlcnJvcik7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgIC8qKlxyXG4gICAgICogc2VhcmNoRGF0YVZldGVyaW5hcnlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNlYXJjaERhdGFWZXRlcmluYXJ5VXN1YXJpb3MoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJJbmljaWEgQ29uc3VsdGEgXCIpO1xyXG4gICAgICAgIHZhciBkYXRhO1xyXG4gICAgICAgIGxldCBvcHRpb25zOiBmaXJlYmFzZS5RdWVyeU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxyXG4gICAgICAgICAgICAvLyBvcmRlciBieSBjb21wYW55LmNvdW50cnlcclxuICAgICAgICAgICAgb3JkZXJCeToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5DSElMRCxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiAnc2luY2UnIC8vIG1hbmRhdG9yeSB3aGVuIHR5cGUgaXMgJ2NoaWxkJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmlyZWJhc2UucXVlcnkoXHJcbiAgICAgICAgICAgIHF1ZXJ5UmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChxdWVyeVJlc3VsdC52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVzcHVlc3RhIGFsIGNvbnN1bHRhciBlbCBJRFwiICsgcXVlcnlSZXN1bHQudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoSlNPTi5zdHJpbmdpZnkocXVlcnlSZXN1bHQudmFsdWUpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJy92ZXRlcmluYXJpYXNSZWdpc3RyYWRhc1VzdWFyaW9zLycsIG9wdGlvbnNcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXJSZWdpc3Ryb1ZldHNcclxuICAgICAqIEZ1bmNpb24gcXVlIHBlcm1pdGUgY3JlYXIgbGFzIHZldGVyaW5hcmlhcyBzZWd1biBzdSB0aXBvXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjcmVhclJlZ2lzdHJvVmV0c1VzdWFyaW9zKCBfZGF0b3NWZXRzOiBEYXRvc1ZldHMsaWQpIHtcclxuICAgICAgICBsZXQgZGF0bzogYW55O1xyXG4gICAgICAgIGxldCBpZFVzZXIgPSBnZXRTdHJpbmcoJ2lkTG9naW4nKTtcclxuICAgICAgICAvL2lkVXNlciA9XCI4UE1RVERLM3dSUFl2TWdVZkdwaXZobmpta2gxXCI7XHJcbiAgICAgICAgY29uc29sZS5sb2coaWRVc2VyKTtcclxuICAgICAgICB2YXIgdGllbXBvID0gLy9uZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSk7XHJcbiAgICAgICAgICAgIG5ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoKTtcclxuICAgICAgICByZXR1cm4gZmlyZWJhc2Uuc2V0VmFsdWUoXHJcbiAgICAgICAgICAgICcvdmV0ZXJpbmFyaWFzUmVnaXN0cmFkYXNVc3Vhcmlvcy8nICsgaWQsXHJcbiAgICAgICAgICAgIC8vW10gZXN0b3MgY3JjaGV0ZXMgc2l2ZXJuIHBhcmEgaGFjZXIgZWwgaW5ncmVzbyBkZSBkYXRvcyBlcyBkZWNpciBjZXJvLCB1bm8gLCBkb3MgdHJlcywgXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZlY2hhX2NyZWFjaW9uOiB0aWVtcG8sXHJcbiAgICAgICAgICAgICAgICBpbWFnZTogX2RhdG9zVmV0cy5faW1hZ2UsXHJcbiAgICAgICAgICAgICAgICAvL3VzdWFyaW9fY3JlYWNpb246IGlkVXNlcixcclxuICAgICAgICAgICAgICAgIG5vbWJyZTogX2RhdG9zVmV0cy5fbm9tYnJlVmV0LFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcGNpb246IF9kYXRvc1ZldHMuX2Rlc2NyaXBjaW9uVmV0LFxyXG4gICAgICAgICAgICAgICAgY29ycmVvOiBfZGF0b3NWZXRzLl9jb3JyZW9WZXQsXHJcbiAgICAgICAgICAgICAgICBkaXJlY2Npb246IF9kYXRvc1ZldHMuX2RpcmVjY2lvblZldCxcclxuICAgICAgICAgICAgICAgIHBhZ2luYV93ZWI6IF9kYXRvc1ZldHMuX3BhZ2luYVdlYlZldCxcclxuICAgICAgICAgICAgICAgIGNlbHVsYXI6IF9kYXRvc1ZldHMuX2NlbHVsYXJWZXQsXHJcbiAgICAgICAgICAgICAgICB0ZWxlZm9ubzogX2RhdG9zVmV0cy5fdGVsZWZvbm9WZXQsXHJcbiAgICAgICAgICAgICAgICBob3JhcmlvOiBfZGF0b3NWZXRzLl9ob3JhcmlvVmV0LFxyXG4gICAgICAgICAgICAgICAgZGlhczogX2RhdG9zVmV0cy5fZGlhc0F0ZW5jaW9uVmV0LFxyXG4gICAgICAgICAgICAgICAgc2VydmljaW9zOiBfZGF0b3NWZXRzLl9zZXJ2aWNpb3NWZXQsXHJcbiAgICAgICAgICAgICAgICBjb29yZGVuYWRhczogX2RhdG9zVmV0cy5fY29vcmRlbmFkYXNWZXRzLFxyXG4gICAgICAgICAgICAgICAgdGlwb192ZXRzOiBfZGF0b3NWZXRzLl90aXBvVmV0LFxyXG4gICAgICAgICAgICAgICAgY2VydGlmaWNhZGE6IFwiTk9cIixcclxuICAgICAgICAgICAgICAgIGxlbWE6IF9kYXRvc1ZldHMuX2xlbWFWZXQsXHJcbiAgICAgICAgICAgICAgICBpZFZldHM6IGlkVXNlcixcclxuICAgICAgICAgICAgICAgIGZhY2Vib29rOl9kYXRvc1ZldHMuX2ZhY2Vib29rVmV0cyxcclxuICAgICAgICAgICAgICAgIHR3aXR0ZXI6X2RhdG9zVmV0cy5fdHdpdHRlclZldHMsXHJcbiAgICAgICAgICAgICAgICBpbnN0YWdyYW06X2RhdG9zVmV0cy5fSW5zdGFncmFtVmV0cyxcclxuICAgICAgICAgICAgICAgIHdoYXRzYXBwOl9kYXRvc1ZldHMuX3doYXRTYXBwVmV0cyxcclxuICAgICAgICAgICAgICAgIGhvcmFzOl9kYXRvc1ZldHMuXzI0SG9yYXNcclxuXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICByZXN1bHQgPSBcImd1YXJkYWRvXCI7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY3JlYXRlZCBrZXk6IFwiICsgcmVzdWx0KTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gXCJlcnJvclwiXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGtleTogXCIgKyBlcnJvck1lc3NhZ2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBlcnJvck1lc3NhZ2U7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgLyoqXHJcbiAgICAgKiBzZWFyY2hEYXRhVmV0ZXJpbmFyeVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RGF0YUlkT3BpbmlvbnMoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJJbmljaWEgQ29uc3VsdGEgXCIpO1xyXG4gICAgICAgIHZhciBkYXRhO1xyXG4gICAgICAgIGxldCBvcHRpb25zOiBmaXJlYmFzZS5RdWVyeU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxyXG4gICAgICAgICAgICAvLyBvcmRlciBieSBjb21wYW55LmNvdW50cnlcclxuICAgICAgICAgICAgb3JkZXJCeToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5DSElMRCxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiAnc2luY2UnIC8vIG1hbmRhdG9yeSB3aGVuIHR5cGUgaXMgJ2NoaWxkJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmlyZWJhc2UucXVlcnkoXHJcbiAgICAgICAgICAgIHF1ZXJ5UmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChxdWVyeVJlc3VsdC52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVzcHVlc3RhIGFsIGNvbnN1bHRhciBlbCBJRFwiICsgcXVlcnlSZXN1bHQudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoSlNPTi5zdHJpbmdpZnkocXVlcnlSZXN1bHQudmFsdWUpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgJy9vcGluaW9uZXNBeXVkYVZldGVyaW5hcmlhcy8nLCBvcHRpb25zXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuICAgICAgICAvKipcclxuICAgICAqIGFkZFNlcnZpY2VzVmV0c1xyXG4gICAgICogRnVuY2lvbiBxdWUgcGVybWl0ZSBjcmVhciBsYXMgb3BpbmlvbmVzIGRlIGxvcyB1c3Vhcmlvc1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYWRkU3ViamVjdHNWZXRzKG51bWVybyxfZGF0YU9waW5pb246T3BpbmlvbnNNb2RhbCkge1xyXG4gICAgICAgIGxldCBkYXRvOiBhbnk7XHJcbiAgICAgICAgdmFyIHRpZW1wbyA9IC8vbmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkpO1xyXG4gICAgICAgICAgICBuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKCk7XHJcbiAgICAgICAgcmV0dXJuIGZpcmViYXNlLnNldFZhbHVlKFxyXG4gICAgICAgICAgICAnL29waW5pb25lc0F5dWRhVmV0ZXJpbmFyaWFzLycgK251bWVybyxcclxuICAgICAgICAgICAgLy9bXSBlc3RvcyBjcmNoZXRlcyBzaXZlcm4gcGFyYSBoYWNlciBlbCBpbmdyZXNvIGRlIGRhdG9zIGVzIGRlY2lyIGNlcm8sIHVubyAsIGRvcyB0cmVzLCBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZmVjaGFfY3JlYWNpb246IHRpZW1wbyxcclxuICAgICAgICAgICAgICAgIGlkdXN1YXJpbzpfZGF0YU9waW5pb24uX2lkVXN1YXJpbyxcclxuICAgICAgICAgICAgICAgIGFzdW50bzogX2RhdGFPcGluaW9uLl9hc3VudG9PcGluaW9uLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcGNpb246ICBfZGF0YU9waW5pb24uX2Rlc2NyaXBjaW9uT3BpbmlvbixcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICApLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gXCJndWFyZGFkb1wiO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNyZWF0ZWQga2V5OiBcIiArIHJlc3VsdCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0+IHtcclxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9IFwiZXJyb3JcIlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBrZXk6IFwiICsgZXJyb3JNZXNzYWdlKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3JNZXNzYWdlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy8vL0FTRVNPUklBU1xyXG4gICAgICAgICAvKipcclxuICAgICAqIHNlYXJjaERhdGFWZXRlcmluYXJ5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXREYXRhSWRBZHZpY2VzKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSW5pY2lhIENvbnN1bHRhIFwiKTtcclxuICAgICAgICB2YXIgZGF0YTtcclxuICAgICAgICBsZXQgb3B0aW9uczogZmlyZWJhc2UuUXVlcnlPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgLy8gb3JkZXIgYnkgY29tcGFueS5jb3VudHJ5XHJcbiAgICAgICAgICAgIG9yZGVyQnk6IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuQ0hJTEQsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogJ3NpbmNlJyAvLyBtYW5kYXRvcnkgd2hlbiB0eXBlIGlzICdjaGlsZCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZpcmViYXNlLnF1ZXJ5KFxyXG4gICAgICAgICAgICBxdWVyeVJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocXVlcnlSZXN1bHQudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlc3B1ZXN0YSBhbCBjb25zdWx0YXIgZWwgSURcIiArIHF1ZXJ5UmVzdWx0LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKEpTT04uc3RyaW5naWZ5KHF1ZXJ5UmVzdWx0LnZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICcvYXNlc29yaWFzQXl1ZGFWZXRlcmluYXJpYXMvJywgb3B0aW9uc1xyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgXHJcbiAgICAgICAgLyoqXHJcbiAgICAgKiBhZGRTZXJ2aWNlc1ZldHNcclxuICAgICAqIEZ1bmNpb24gcXVlIHBlcm1pdGUgY3JlYXIgbGFzIG9waW5pb25lcyBkZSBsb3MgdXN1YXJpb3NcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZEFkdmljZXNWZXRzKG51bWVybyxfZGF0YU9waW5pb246T3BpbmlvbnNNb2RhbCkge1xyXG4gICAgICAgIGxldCBkYXRvOiBhbnk7XHJcbiAgICAgICAgdmFyIHRpZW1wbyA9IC8vbmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkpO1xyXG4gICAgICAgICAgICBuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKCk7XHJcbiAgICAgICAgcmV0dXJuIGZpcmViYXNlLnNldFZhbHVlKFxyXG4gICAgICAgICAgICAnL2FzZXNvcmlhc0F5dWRhVmV0ZXJpbmFyaWFzLycgK251bWVybyxcclxuICAgICAgICAgICAgLy9bXSBlc3RvcyBjcmNoZXRlcyBzaXZlcm4gcGFyYSBoYWNlciBlbCBpbmdyZXNvIGRlIGRhdG9zIGVzIGRlY2lyIGNlcm8sIHVubyAsIGRvcyB0cmVzLCBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZmVjaGFfY3JlYWNpb246IHRpZW1wbyxcclxuICAgICAgICAgICAgICAgIGlkdXN1YXJpbzpfZGF0YU9waW5pb24uX2lkVXN1YXJpbyxcclxuICAgICAgICAgICAgICAgIGFzdW50bzogX2RhdGFPcGluaW9uLl9hc3VudG9PcGluaW9uLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcGNpb246ICBfZGF0YU9waW5pb24uX2Rlc2NyaXBjaW9uT3BpbmlvbixcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICApLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gXCJndWFyZGFkb1wiO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNyZWF0ZWQga2V5OiBcIiArIHJlc3VsdCk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0+IHtcclxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSA9IFwiZXJyb3JcIlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBrZXk6IFwiICsgZXJyb3JNZXNzYWdlKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJyb3JNZXNzYWdlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBnZXRDb21lbnRhcmlvcyBcclxuICAgICAqIGNvbnN1bHRhIGxvcyBjb21lbnRhcmlvcyBxdWUgc2UgbGUgaGFuIGhlY2hvIGEgbGEgdmV0ZXJpbmFyaWFcclxuICAgICAqL1xyXG5cclxuICAgIHB1YmxpYyBnZXRDb21tZW50c1JhdGluZyhpZCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSW5pY2lhIENvbnN1bHRhIFwiICsgaWQpO1xyXG4gICAgICAgIHZhciBkYXRhO1xyXG4gICAgICAgIGxldCBvcHRpb25zOiBmaXJlYmFzZS5RdWVyeU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxyXG4gICAgICAgICAgICAvLyBvcmRlciBieSBjb21wYW55LmNvdW50cnlcclxuICAgICAgICAgICAgb3JkZXJCeToge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5DSElMRCxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiAnc2luY2UnIC8vIG1hbmRhdG9yeSB3aGVuIHR5cGUgaXMgJ2NoaWxkJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmlyZWJhc2UucXVlcnkoXHJcbiAgICAgICAgICAgIHF1ZXJ5UmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChxdWVyeVJlc3VsdC52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVzcHVlc3RhIGFsIGNvbnN1bHRhciBlbCBJRFwiICsgcXVlcnlSZXN1bHQudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoSlNPTi5zdHJpbmdpZnkocXVlcnlSZXN1bHQudmFsdWUpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLy8nL3ZldGVyaW5hcmlhc1JlZ2lzdHJhZGFzLycraWQsIG9wdGlvbnNcclxuICAgICAgICAgICAgJy9jb21lbnRhcmlvc1JhdGluZ3NWZXRzLycgKyBpZCwgb3B0aW9uc1xyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn1cclxuXHJcblxyXG4iXX0=