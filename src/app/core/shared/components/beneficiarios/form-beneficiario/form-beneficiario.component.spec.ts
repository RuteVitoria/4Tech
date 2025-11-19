import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBeneficiarioComponent } from './form-beneficiario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BeneficiarioService } from 'src/app/core/services/beneficiario.service';
import { PlanoService } from 'src/app/core/services/plano.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('FormBeneficiarioComponent', () => {

  let component: FormBeneficiarioComponent;
  let fixture: ComponentFixture<FormBeneficiarioComponent>;

  const beneficiarioServiceSpy = jasmine.createSpyObj('BeneficiarioService', [
    'createBeneficiario',
    'updateBeneficiario',
    'getBeneficiario'
  ]);

  const planoServiceSpy = jasmine.createSpyObj('PlanoService', [
    'getPlanos'
  ]);

  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
  dialogSpy.open.and.returnValue({ afterClosed: () => of(true) });

  beforeEach(async () => {
    planoServiceSpy.getPlanos.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [FormBeneficiarioComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        { provide: BeneficiarioService, useValue: beneficiarioServiceSpy },
        { provide: PlanoService, useValue: planoServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: ActivatedRoute, useValue: { params: of({}) } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .overrideComponent(FormBeneficiarioComponent, { set: { template: '' }})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBeneficiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default status = ATIVO', () => {
    expect(component.beneficiarioForm.get('status')?.value).toBe('ATIVO');
  });

  it('should navigate back on cancelar()', () => {
    component.cancelar();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/beneficiarios']);
  });

  it('should initialize form as invalid', () => {
    expect(component.beneficiarioForm.valid).toBeFalse();
  });

  it('should keep form invalid if nomeCompleto is filled but plano_id is empty', () => {
    component.beneficiarioForm.patchValue({
      nome_completo: 'João',
      cpf: '12345678901',
      data_nascimento: '1990-01-01',
      plano_id: 1,
      status: 'ATIVO'
    });

    expect(component.beneficiarioForm.valid).toBeFalse();
  });

  it('should NOT call createBeneficiario if form is invalid', () => {
    component.beneficiarioForm.patchValue({
      nome_completo: 'João',
      cpf: '12345678901',
      data_nascimento: '1990-01-01',
      plano_id: 1,
      status: 'ATIVO'
    });

    component.salvar();

    expect(beneficiarioServiceSpy.createBeneficiario).not.toHaveBeenCalled();
    expect(beneficiarioServiceSpy.updateBeneficiario).not.toHaveBeenCalled();
  });

});
