import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AdministracaoRoutingModule } from './administracao-routing.module';
import { AdmComponent } from './adm.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [AdmComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    AdministracaoRoutingModule,
  ]
})
export class AdministracaoModule {}
