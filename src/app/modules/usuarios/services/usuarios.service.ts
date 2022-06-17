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

    create(usuario: Usuario) {
        usuario.id = "0";
        usuario.historicoEscolarId = "0";

        let form = new FormData();
        let file = usuario.historicoEscolar;
        delete usuario.historicoEscolar;

        form.append("usuario", JSON.stringify(usuario));
        form.append("historicoEscolar", file);

        return this.http
            .post<Usuario>(API_PATH + this.service + "/create", form);
    }

    update(usuario: Usuario) {

        console.log("Usuario chegou no editar ", usuario);

        let form = new FormData();
        let file = usuario.historicoEscolar;
        delete usuario.historicoEscolar;

        form.append("usuario", JSON.stringify(usuario));
        form.append("historicoEscolar", file);

        return this.http
            .post<Usuario>(API_PATH + this.service + "/update", form);
    }

    delete(id: string): Observable<Usuario> {
        return this.http
            .delete<Usuario>(API_PATH + this.service + "/delete?id=" + id);
    }


}