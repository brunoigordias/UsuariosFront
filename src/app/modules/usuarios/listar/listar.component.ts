import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/business/models/usuario.model';
import { HistoricoService } from '../services/historicos.service';
import { UsuarioService } from '../services/usuarios.service';

@Component({
  selector: 'usuarios-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  constructor(private service: UsuarioService, private serviceHistorico: HistoricoService) {
  }

  usuarios: Usuario[] = [];

  ngOnInit(): void {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.service.getUsuarios()
      .subscribe({
        next: usuarios => {
          this.usuarios = usuarios;
        },
        error: error => console.log(error)
      });
  }

  downloadHistorico(id: string) {

    console.log("id download ", id);
    this.serviceHistorico.download(id).subscribe({
      next: data => {
        console.log("download", data);
        // let nomeArquivo = data.headers.get('content-disposition')?.split(';')[1].split('=')[1];

        let blob: Blob = data.body;
        let a = document.createElement('a');
        a.download = "historico_escolar";
        a.href = window.URL.createObjectURL(blob);
        a.click();
      },
      error: error => {
        console.error("erro download", error);
      }
    })
  }




}
