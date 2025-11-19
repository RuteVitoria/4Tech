import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanoService } from 'src/app/core/services/plano.service';

@Component({
  selector: 'app-form-plano',
  templateUrl: './form-plano.component.html',
  styleUrls: ['./form-plano.component.scss'],
})
export class FormPlanoComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  planoId?: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private planoService: PlanoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      codigo_registro_ans: ['', Validators.required],
    });

    this.planoId = this.route.snapshot.paramMap.get('id') as unknown as number;
    if (this.planoId) {
      this.isEdit = true;
      this.planoService.getPlano(this.planoId).subscribe((plano) => {
        this.form.patchValue(plano);
      });
    }
  }

  salvar(): void {
    if (this.form.invalid) return;

    const data = this.form.value;

    const obs = this.isEdit
      ? this.planoService.updatePlano(this.planoId!, data)
      : this.planoService.createPlano(data);

    obs.subscribe({
      next: () => {
        this.snackBar.open('Plano salvo com sucesso!', 'Fechar', {
          duration: 3000,
          panelClass: ['snackbar-success'],
        });
        this.router.navigate(['/planos']);
      },
      error: () => {
        this.snackBar.open('Erro ao salvar plano', 'Fechar', {
          duration: 3000,
          panelClass: ['snackbar-error'],
        });
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/planos']);
  }
}
