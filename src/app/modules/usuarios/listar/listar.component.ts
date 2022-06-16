import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/business/models/usuario.model';
import { UsuarioService } from '../services/usuarios.service';

@Component({
  selector: 'usuarios-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  constructor(private service: UsuarioService) {
  }

  usuarios: Usuario[] = [];

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.service.getUsuarios()
      .subscribe(
        usuarios => {
          this.usuarios = usuarios;
        },
        error => console.log(error)
      );
  }

}
