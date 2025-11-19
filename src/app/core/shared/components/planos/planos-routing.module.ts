import { Routes } from "@angular/router";
import { ListPlanosComponent } from "./list-planos/list-planos.component";
import { FormPlanoComponent } from "./form-plano/form-plano.component";
import { DetalhePlanoComponent } from "./detalhe-plano/detalhe-plano.component";

const routes: Routes = [
  { path: '', component: ListPlanosComponent },
  { path: 'novo', component: FormPlanoComponent },
  { path: 'editar/:id', component: FormPlanoComponent },
  { path: 'detalhes/:id', component: DetalhePlanoComponent },
];
