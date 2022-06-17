import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private service: UsuarioService,
    private serviceEscolaridade: EscolaridadeService,
    private fb: FormBuilder,
    private route: ActivatedRoute) { }

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
      historicoEscolarId: [""],
    });
  }

  arquivoSelecionado(event: Event){

  }

  editarUsuario() {
    console.log("chegou no editar");
  }

}
