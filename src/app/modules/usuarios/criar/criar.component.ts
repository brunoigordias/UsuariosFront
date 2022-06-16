import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Escolaridade } from 'src/business/models/escolaridade.model';
import { EscolaridadeService } from '../services/escolaridades.services';
import { UsuarioService } from '../services/usuarios.service';
import { Usuario } from '../../../../business/models/usuario.model';

@Component({
  selector: 'usuarios-criar',
  templateUrl: './criar.component.html',
  styleUrls: ['./criar.component.css']
})
export class CriarComponent implements OnInit {

  usuarioForm!: FormGroup;
  dataAtual = new Date();
  escolaridades: Escolaridade[] = [];
  usuario!: Usuario;


  constructor(private service: UsuarioService, 
    private serviceEscolaridade: EscolaridadeService, 
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.criarFormulario();
    this.carregarEscolaridades();
  }

  criarFormulario() {
    this.usuarioForm = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      datanascimento: ['', Validators.required],
      escolaridadeid: ['', [Validators.required, Validators.min(1)]],
      historicoescolarid: ['', [Validators.required]],
    });
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


  salvarUsuario() {
    let f = this.usuarioForm.value;
    this.usuario = Object.assign({}, this.usuario, f);
    console.log("form: ", f);
    console.log("usuario: ", this.usuario);


    this.service.save(this.usuario).subscribe(
      data => {
        console.log(data);
      },
      error => console.log("erro ao salvar ", error)
    );
  }


}
