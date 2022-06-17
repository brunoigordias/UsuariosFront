import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_PATH } from "src/environments/environment";


@Injectable()
export class HistoricoService {

    service: string = "historicoescolar";

    constructor(private http: HttpClient) {
    }

    public download(id: string) {
        return this.http.get(API_PATH + this.service + "/download?id=" + id, {
            reportProgress: true,
            observe: 'response',
            responseType: 'blob',
        });
    }

}