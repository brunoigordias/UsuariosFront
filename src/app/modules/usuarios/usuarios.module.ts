import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListarComponent } from './listar/listar.component';
import { CriarComponent } from './criar/criar.component';
import { EditarComponent } from './editar/editar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuariosRoutingModule } from './usuarios.routes';
import { RemoverComponent } from './remover/remover.component';

@NgModule({
  declarations: [
    ListarComponent,
    CriarComponent,
    EditarComponent,
    RemoverComponent
  ],
  imports: [
    RouterModule,
    UsuariosRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UsuariosModule { }
