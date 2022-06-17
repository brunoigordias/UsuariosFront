import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Escolaridade } from 'src/business/models/escolaridade.model';
import { Usuario } from 'src/business/models/usuario.model';
import { EscolaridadeService } from '../services/escolaridades.service';
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
  arquivo!: string;
  mensagem!: string;

  constructor(private service: UsuarioService,
    private serviceEscolaridade: EscolaridadeService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.criarFormulario();
    this.carregarEscolaridades();
    this.carregarUsuario(this.route.snapshot.params["id"])
  }

  carregarUsuario(id: string) {
    this.service.get(id)
      .subscribe({
        next: data => {
          console.log("Usuario GET: ", data);
          this.usuarioForm.patchValue({...data,dataNascimento:data.dataNascimento.substring(0,10)});
        },
        error: error => {
          console.log(error)
        }
      });
  }

  carregarEscolaridades() {
    this.serviceEscolaridade.getEscolaridades()
      .subscribe({
        next: data => {
          this.escolaridades = data;
        },
        error: error => console.log(error)
      });
  }

  criarFormulario() {
    this.usuarioForm = this.fb.group({
      nome: ["", Validators.required],
      sobrenome: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      dataNascimento: [null, Validators.required],
      escolaridadeId: ["", [Validators.required, Validators.min(1)]],
      arquivo: [""],
    });
  }

  onArquivoSelecionado(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.arquivo = file;    }
  }

  editarUsuario() {
    console.log("chegou no editar");

    let f = this.usuarioForm.value;
    this.usuario = Object.assign({}, this.usuario, f);
    this.usuario.historicoEscolar = this.arquivo;

    console.log("form: ", f);
    console.log("usuario: ", this.usuario);


    this.service.update(this.usuario).subscribe({
      next: data => {
        console.log(data);
        this.router.navigate(["/usuarios"]);
      },
      error: error => { 
        this.mensagem = "Erro ao editar o Usuário: " + error;
        console.log("erro ao salvar ", error) 
      }
    });
  }

}
