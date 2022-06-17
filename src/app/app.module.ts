import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { rootRouterConfig } from './app.routes';
import { UsuarioService } from './modules/usuarios/services/usuarios.service';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { EscolaridadeService } from './modules/usuarios/services/escolaridades.service';
import { HistoricoService } from './modules/usuarios/services/historicos.service';

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
    HistoricoService,
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
