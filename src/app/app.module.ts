import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { rootRouterConfig } from './app.routes';
import { UsuarioService } from './modules/usuarios/services/usuarios.service';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { EscolaridadeService } from './modules/usuarios/services/escolaridades.services';

@NgModule({
  declarations: [
    AppComponent,    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    UsuariosModule,
    [RouterModule.forRoot(rootRouterConfig, { useHash: false })]
  ],
  providers: [
    UsuarioService,
    EscolaridadeService,
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
