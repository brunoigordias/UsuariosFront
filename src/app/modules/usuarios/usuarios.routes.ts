import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CriarComponent } from "./criar/criar.component";
import { EditarComponent } from "./editar/editar.component";
import { ListarComponent } from "./listar/listar.component";

const usuariosRouterConfig: Routes = [
    { path: '', component: ListarComponent },   
    { path: 'criar', component: CriarComponent },
    // { path: 'editar/:id', component: EditarComponent }
    { path: 'editar', component: EditarComponent }
];


@NgModule({
    imports: [
        RouterModule.forChild(usuariosRouterConfig)
    ],
    exports :[RouterModule]
})
export class UsuariosRoutingModule { }