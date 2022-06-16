import { Routes } from "@angular/router";


export const rootRouterConfig: Routes = [
    // { path: '', redirectTo: '/', pathMatch: 'full' },
    {
        path: 'usuarios', loadChildren: () => import("./modules/usuarios/usuarios.module").then(
            (m) => m.UsuariosModule
        )
    },
];