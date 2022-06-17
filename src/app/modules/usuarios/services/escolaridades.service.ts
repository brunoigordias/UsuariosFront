import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_PATH } from "src/environments/environment";
import { Observable } from "rxjs";
import { Escolaridade } from "src/business/models/escolaridade.model";

@Injectable()
export class EscolaridadeService {

    service: string = "escolaridade";

    constructor(private http: HttpClient) {        
    }

    getEscolaridades(): Observable<Escolaridade[]>{
        return this.http
        .get<Escolaridade[]>(API_PATH + this.service + "/get-all");
    }

    get(id: string): Observable<Escolaridade>{
        return this.http
        .get<Escolaridade>(API_PATH + this.service + "/get-by-id/" + id);
    }


}