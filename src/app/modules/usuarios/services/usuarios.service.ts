import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_PATH } from "src/environments/environment";
import { Observable } from "rxjs";
import { Usuario } from "src/business/models/usuario.model";

@Injectable()
export class UsuarioService {

    service: string = "usuario";

    constructor(private http: HttpClient) {
    }

    getUsuarios(): Observable<Usuario[]> {
        return this.http
            .get<Usuario[]>(API_PATH + this.service + "/get-all");
    }

    get(id: string): Observable<Usuario> {
        return this.http
            .get<Usuario>(API_PATH + this.service + "/get?id=" + id);
    }

    save(usuario: Usuario) {
        usuario.historicoEscolarId = "0";
        console.log("chegou no salvar ", usuario);
        return this.http
            .post<Usuario>(API_PATH + this.service + "/create", usuario);
    }


}