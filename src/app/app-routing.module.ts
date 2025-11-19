import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/shared/components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

  {
    path: 'planos',
    loadChildren: () =>
      import('./core/shared/components/planos/planos.module').then(
        (m) => m.PlanosModule
      ),
  },
  {
    path: 'beneficiarios',
    loadChildren: () =>
      import(
        './core/shared/components/beneficiarios/beneficiarios.module'
      ).then((m) => m.BeneficiariosModule),
  },
  {
    path: 'administracao',
    loadChildren: () =>
      import('./core/shared/components/adm/administracao.module').then(
        (m) => m.AdministracaoModule
      ),
  },

  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
