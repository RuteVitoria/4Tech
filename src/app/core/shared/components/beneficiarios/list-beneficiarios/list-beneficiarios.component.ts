import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-beneficiarios',
  templateUrl: './list-beneficiarios.component.html',
  styleUrls: ['./list-beneficiarios.component.scss']
})
export class ListBeneficiariosComponent implements OnInit {
  beneficiarios: any[] = [];
  planos: any[] = [];
  statusOptions = ['ATIVO', 'INATIVO'];
  selectedStatus = '';
  selectedPlanoId = '';
  loading = false;

  displayedColumns: string[] = ['nomeCompleto', 'cpf', 'dataNascimento', 'status', 'plano', 'acoes'];
  
  @ViewChild('confirmDialog') confirmDialog!: TemplateRef<any>;

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getPlanos();
    this.getBeneficiarios();
  }

  getPlanos() {
    this.http.get<any[]>('http://localhost:3000/planos').subscribe(data => {
      this.planos = data;
    });
  }

  getBeneficiarios() {
  this.loading = true;
  let url = 'http://localhost:3000/beneficiarios';
  const params: string[] = [];

  if (this.selectedStatus) params.push(`status=${this.selectedStatus}`);
  if (this.selectedPlanoId) params.push(`plano_id=${this.selectedPlanoId}`);
  if (params.length) url += '?' + params.join('&');

  this.http.get<any[]>(url).subscribe({
    next: data => {
      this.beneficiarios = data.map(b => ({
        ...b,
        plano: this.planos.find(p => p.id === b.plano_id)
      }));
      this.loading = false;
    },
    error: () => (this.loading = false)
  });
  }

  novoBeneficiario() {
    this.router.navigate(['/beneficiarios/novo']);
  }

  editarBeneficiario(id: number) {
    this.router.navigate([`/beneficiarios/editar/${id}`]);
  }

  excluirBeneficiario(id: number): void {
    const dialogRef = this.dialog.open(this.confirmDialog, {
      width: '350px',
      data: { message: 'Deseja realmente excluir este beneficiário?' },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed === true) {
        this.http.delete(`http://localhost:3000/beneficiarios/${id}`).subscribe({
          next: () => {
            this.snackBar.open('Beneficiário excluído com sucesso!', 'Fechar', {
              duration: 3000,
              panelClass: ['snackbar-success'],
            });
            this.getBeneficiarios();
          },
          error: () => {
            this.snackBar.open('Erro ao excluir beneficiário', 'Fechar', {
              duration: 3000,
              panelClass: ['snackbar-error'],
            });
          },
        });
      }
    });
  }

  aplicarFiltros() {
    this.getBeneficiarios();
  }
}
