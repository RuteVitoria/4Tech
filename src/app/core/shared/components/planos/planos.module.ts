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

import { ListPlanosComponent } from './list-planos/list-planos.component';
import { FormPlanoComponent } from './form-plano/form-plano.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DetalhePlanoComponent } from './detalhe-plano/detalhe-plano.component';

const routes: Routes = [
  { path: '', component: ListPlanosComponent },
  { path: 'novo', component: FormPlanoComponent },
  { path: 'editar/:id', component: FormPlanoComponent },
  { path: 'detalhes/:id', component: DetalhePlanoComponent },
];

@NgModule({
  declarations: [ListPlanosComponent, FormPlanoComponent, DetalhePlanoComponent],
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
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatProgressBarModule
  ],
})
export class PlanosModule {}
