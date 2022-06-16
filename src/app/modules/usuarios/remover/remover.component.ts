import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/business/models/usuario.model';
import { UsuarioService } from '../services/usuarios.service';

@Component({
  selector: 'app-remover',
  templateUrl: './remover.component.html',
  styleUrls: ['./remover.component.css']
})
export class RemoverComponent implements OnInit {

  usuario: Usuario;

  constructor(private service: UsuarioService, private route: ActivatedRoute) {
    this.usuario = new Usuario;
  }

  ngOnInit(): void {
    this.obterParametro();
  }

  obterParametro() {
    this.route.queryParamMap
      .subscribe((params) => {
        if (params.has("id")) {
          this.carregarUsuario(<string>params.get("id"));
        }
      });
  }

  carregarUsuario(id: string) {
    this.service.get(id)
      .subscribe(
        data => {
          console.log("Usuario GET: ", data);
          this.usuario = data;
        },
        error => {
          console.log(error)
        }
      );
  }

  removerUsuario(){
  }

}
