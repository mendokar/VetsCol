import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable as RxObservable } from "rxjs/Observable";



import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import { ConstsModels } from "../consts/const.model";

@Injectable()
export class MapsService {
    url:string="";

    _consts: ConstsModels;
    private serverUrl;

    constructor(private http: Http) { 
        this._consts= new ConstsModels;
    }

    getDataMapsTest(){
        this.serverUrl =this._consts.ulrMapsTest;
        return this.http.get(this.serverUrl).do(res => res);
    }

}