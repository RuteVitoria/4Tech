import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormPlanoComponent } from './form-plano.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanoService } from 'src/app/core/services/plano.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('FormPlanoComponent', () => {
  let component: FormPlanoComponent;
  let fixture: ComponentFixture<FormPlanoComponent>;
  let planoServiceSpy: jasmine.SpyObj<PlanoService>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    planoServiceSpy = jasmine.createSpyObj('PlanoService', [
      'getPlano',
      'createPlano',
      'updatePlano'
    ]);

    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [FormPlanoComponent],
      imports: [
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: PlanoService, useValue: planoServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: new Map()
            }
          }
        },
        { provide: Router, useValue: routerSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = TestBed.createComponent(FormPlanoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should initialize form on init', () => {
    fixture.detectChanges();

    expect(component.form).toBeDefined();
    expect(component.form.get('nome')).toBeTruthy();
    expect(component.form.get('codigo_registro_ans')).toBeTruthy();
  });

  it('should load plano data when editing', () => {
    const mockPlano = {
      nome: 'Plano Ouro',
      codigo_registro_ans: '123456'
    };

    (TestBed.inject(ActivatedRoute) as any).snapshot.paramMap.get = () => '1';

    planoServiceSpy.getPlano.and.returnValue(of(mockPlano));

    fixture.detectChanges();

    expect(planoServiceSpy.getPlano).toHaveBeenCalledWith('1');
    expect(component.form.value).toEqual(mockPlano);
    expect(component.isEdit).toBeTrue();
  });

  it('should call createPlano when saving in create mode', () => {
    fixture.detectChanges();

    component.form.setValue({
      nome: 'Plano Bronze',
      codigo_registro_ans: '999'
    });

    const mockPlanoReturn = {
      id: 1,
      nome: 'Plano Bronze',
      codigo_registro_ans: '999'
    };

    planoServiceSpy.createPlano.and.returnValue(of(mockPlanoReturn));

    component.salvar();

    expect(planoServiceSpy.createPlano).toHaveBeenCalledWith({
      nome: 'Plano Bronze',
      codigo_registro_ans: '999'
    });

    expect(snackBarSpy.open).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/planos']);
  });

  it('should not save when form is invalid', () => {
    fixture.detectChanges();

    component.form.setValue({
      nome: '',
      codigo_registro_ans: ''
    });

    component.salvar();

    expect(planoServiceSpy.createPlano).not.toHaveBeenCalled();
    expect(planoServiceSpy.updatePlano).not.toHaveBeenCalled();
  });

  it('should show error snackbar when save fails', () => {
    fixture.detectChanges();

    component.form.setValue({
      nome: 'Teste',
      codigo_registro_ans: '123'
    });

    planoServiceSpy.createPlano.and.returnValue(throwError(() => new Error('erro')));

    component.salvar();

    expect(snackBarSpy.open).toHaveBeenCalledWith(
      'Erro ao salvar plano',
      'Fechar',
      jasmine.any(Object)
    );
  });

  it('should navigate back when canceling', () => {
    fixture.detectChanges();

    component.cancelar();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/planos']);
  });
});
