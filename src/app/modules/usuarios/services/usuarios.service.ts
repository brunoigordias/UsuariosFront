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

        console.log("Usuario chegou no salvar ", usuario);

        // var files = attachment.files;
        // delete attachment.files;

        // formData.append("attachment", JSON.stringify(attachment));

        // for (const index in files) {
        //     if (Object.prototype.hasOwnProperty.call(files, index)) {
        //         formData.append("files", files[index]);
        //     }
        // }



        let form = new FormData();
        let file = usuario.historicoEscolar;
        delete usuario.historicoEscolar;

        form.append("usuario", JSON.stringify(usuario));
        form.append("historicoEscolar", file);
        // form.append("id",usuario.id);
        // form.append("nome",usuario.nome);
        // form.append("sobrenome",usuario.sobrenome);
        // form.append("email",usuario.email);
        // form.append("datanascimento","2022-01-01");
        // form.append("escolaridadeId",usuario.escolaridadeId);
        // form.append("historicoescolarid","0");
        // form.append("escolaridade",usuario.historicoEscolar);

        return this.http
            .post<Usuario>(API_PATH + this.service + "/create", form);
    }

    delete(id: string): Observable<Usuario> {
        return this.http
            .delete<Usuario>(API_PATH + this.service + "/get?id=" + id);
    }


}