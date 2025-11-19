import { Routes } from "@angular/router";
import { ListBeneficiariosComponent } from "./list-beneficiarios/list-beneficiarios.component";
import { FormBeneficiarioComponent } from "./form-beneficiario/form-beneficiario.component";
import { DetalheBeneficiarioComponent } from "./detalhe-beneficiario/detalhe-beneficiario.component";

const routes: Routes = [
  { path: '/beneficiarios', component: ListBeneficiariosComponent },
  { path: '/beneficiarios/novo', component: FormBeneficiarioComponent },
  { path: '/beneficiarios/editar/:id', component: FormBeneficiarioComponent },
  { path: 'detalhes/:id', component: DetalheBeneficiarioComponent },
];
