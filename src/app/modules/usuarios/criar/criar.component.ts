import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Escolaridade } from 'src/business/models/escolaridade.model';
import { EscolaridadeService } from '../services/escolaridades.service';
import { UsuarioService } from '../services/usuarios.service';
import { Usuario } from '../../../../business/models/usuario.model';
import { Router } from '@angular/router';

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
  arquivo!: string;
  mensagem!: string;


  constructor(private service: UsuarioService,
    private serviceEscolaridade: EscolaridadeService,
    private fb: FormBuilder,
    private route: Router) { }

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
      escolaridadeid: ['', [Validators.required]],
      arquivo: ['', [Validators.required]],
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

  onArquivoSelecionado(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.arquivo = file;
      console.log("file ", file);
    }
  }


  salvarUsuario() {
    let f = this.usuarioForm.value;
    this.usuario = Object.assign({}, this.usuario, f);
    this.usuario.historicoEscolar = this.arquivo;

    this.service.create(this.usuario).subscribe({
      next: data => {
        console.log(data);
        this.route.navigate(["/usuarios"]);        
      },
      error: error => { 
        this.mensagem = "Erro ao salvar o Usu??rio";
      }
    });
  }


}
