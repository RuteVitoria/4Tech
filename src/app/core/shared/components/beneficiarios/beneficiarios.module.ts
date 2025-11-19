import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ListBeneficiariosComponent } from './list-beneficiarios/list-beneficiarios.component';
import { FormBeneficiarioComponent } from './form-beneficiario/form-beneficiario.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { DetalheBeneficiarioComponent } from './detalhe-beneficiario/detalhe-beneficiario.component';

const routes: Routes = [
  { path: '', component: ListBeneficiariosComponent },
  { path: 'novo', component: FormBeneficiarioComponent },
  { path: 'editar/:id', component: FormBeneficiarioComponent },
  { path: 'detalhes/:id', component: DetalheBeneficiarioComponent },
];

@NgModule({
  declarations: [
    ListBeneficiariosComponent,
    FormBeneficiarioComponent,
    DetalheBeneficiarioComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule
  ]
})
export class BeneficiariosModule {}
