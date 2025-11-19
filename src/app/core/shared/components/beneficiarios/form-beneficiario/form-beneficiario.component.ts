import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-form-beneficiario',
  templateUrl: './form-beneficiario.component.html',
  styleUrls: ['./form-beneficiario.component.scss']
})
export class FormBeneficiarioComponent implements OnInit {
  beneficiarioForm!: FormGroup;
  planos: any[] = [];
  isEdit = false;
  beneficiarioId!: number;
  loading = false;

  @ViewChild('successDialog') successDialog!: any;
  @ViewChild('errorDialog') errorDialog!: any;


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.beneficiarioForm = this.fb.group({
      nomeCompleto: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      dataNascimento: ['', Validators.required],
      plano_id: ['', Validators.required],
      status: ['ATIVO', Validators.required]
    });

    this.getPlanos();

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.beneficiarioId = params['id'];
        this.carregarBeneficiario();
      }
    });
  }

  getPlanos() {
    this.http.get<any[]>('http://localhost:3000/planos').subscribe(data => {
      this.planos = data;
    });
  }

  carregarBeneficiario() {
    this.loading = true;
    this.http.get<any>(`http://localhost:3000/beneficiarios/${this.beneficiarioId}`).subscribe({
      next: data => {
        this.beneficiarioForm.patchValue(data);
        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }

  salvar() {
  if (this.beneficiarioForm.invalid) return;

  const beneficiario = this.beneficiarioForm.value;
  this.loading = true;

  const request = this.isEdit
    ? this.http.put(`http://localhost:3000/beneficiarios/${this.beneficiarioId}`, beneficiario)
    : this.http.post('http://localhost:3000/beneficiarios', beneficiario);

  request.subscribe({
    next: () => {
      this.loading = false;

      const dialogRef = this.dialog.open(this.successDialog, {
        width: '350px',
        data: { message: 'Beneficiário salvo com sucesso!' }
      });

      dialogRef.afterClosed().subscribe(() => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/beneficiarios']);
        });
      });
    },
    error: () => {
      this.loading = false;
      this.dialog.open(this.errorDialog, {
        width: '350px',
        data: { message: 'Erro ao salvar beneficiário.' }
      });
    }
  });
}

cancelar() {
    this.router.navigate(['/beneficiarios']);
  }
}
