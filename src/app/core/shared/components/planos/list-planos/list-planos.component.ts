import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PlanoService } from 'src/app/core/services/plano.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-planos',
  templateUrl: './list-planos.component.html',
  styleUrls: ['./list-planos.component.scss'],
})
export class ListPlanosComponent implements OnInit {
  @ViewChild('confirmDialog') confirmDialog!: TemplateRef<any>;
  displayedColumns: string[] = ['nome', 'codigo', 'acoes'];
  planos: any[] = [];
  loading = false;

  constructor(
    private planoService: PlanoService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getPlanos();
  }

  getPlanos(): void {
    this.loading = true;
    this.planoService.getPlanos().subscribe({
      next: (data) => {
        this.planos = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar planos', err);
        this.snackBar.open('Erro ao carregar planos', 'Fechar', {
          duration: 3000,
          panelClass: ['snackbar-error'],
        });
        this.loading = false;
      },
    });
  }

  novoPlano(): void {
    this.router.navigate(['/planos/novo']);
  }

  editarPlano(id: number): void {
    this.router.navigate([`/planos/editar/${id}`]);
  }

  excluirPlano(id: number): void {
    const dialogRef = this.dialog.open(this.confirmDialog, {
      width: '350px',
      data: { message: 'Deseja realmente excluir este plano?' },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed === true) {
        this.planoService.deletePlano(id).subscribe({
          next: () => {
            this.snackBar.open('Plano excluído com sucesso!', 'Fechar', {
              duration: 3000,
              panelClass: ['snackbar-success'],
            });
            this.getPlanos();
          },
          error: () => {
            this.snackBar.open('Erro ao excluir plano', 'Fechar', {
              duration: 3000,
              panelClass: ['snackbar-error'],
            });
          },
        });
      }
    });
  }
}
