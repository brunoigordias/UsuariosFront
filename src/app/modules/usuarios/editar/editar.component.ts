import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Escolaridade } from 'src/business/models/escolaridade.model';
import { Usuario } from 'src/business/models/usuario.model';
import { EscolaridadeService } from '../services/escolaridades.services';
import { UsuarioService } from '../services/usuarios.service';

@Component({
  selector: 'usuarios/editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  usuarioForm!: FormGroup;
  dataAtual = new Date();
  escolaridades: Escolaridade[] = [];
  usuario!: Usuario;

  constructor(private service: UsuarioService,
    private serviceEscolaridade: EscolaridadeService,
    private fb: FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.usuario = new Usuario;

    this.criarFormulario(this.usuario);
    this.carregarEscolaridades();

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
          this.criarFormulario(data);
        },
        error => {
          console.log(error)
        }
      );
  }

  carregarEscolaridades() {
    this.serviceEscolaridade.getEscolaridades()
      .subscribe(
        data => {
          this.escolaridades = data;
        },
        error => console.log(error)
      );
  }

  criarFormulario(usuario: Usuario) {
    this.usuarioForm = this.fb.group({
      nome: [usuario.nome, Validators.required],
      sobrenome: [usuario.sobrenome, Validators.required],
      email: [usuario.email, [Validators.required, Validators.email]],
      datanascimento: [usuario.dataNascimento.toString, Validators.required],
      escolaridadeid: [usuario.escolaridadeId, [Validators.required, Validators.min(1)]],
      historicoescolarid: [usuario.historicoEscolarId, [Validators.required]],
    });
  }

  editarUsuario() {
    console.log("chegou no editar");
  }

}
