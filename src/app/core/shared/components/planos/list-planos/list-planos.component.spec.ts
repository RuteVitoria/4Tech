import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListPlanosComponent } from './list-planos.component';
import { PlanoService } from 'src/app/core/services/plano.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA, TemplateRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

describe('ListPlanosComponent', () => {
  let component: ListPlanosComponent;
  let fixture: ComponentFixture<ListPlanosComponent>;

  let planoServiceSpy: jasmine.SpyObj<PlanoService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    planoServiceSpy = jasmine.createSpyObj('PlanoService', [
      'getPlanos',
      'deletePlano'
    ]);

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      declarations: [ListPlanosComponent],
      imports: [
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        MatTableModule,
        MatIconModule,
        ReactiveFormsModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: PlanoService, useValue: planoServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: MatDialog, useValue: dialogSpy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = TestBed.createComponent(ListPlanosComponent);
    component = fixture.componentInstance;

    component.confirmDialog = {} as TemplateRef<any>;

    planoServiceSpy.getPlanos.and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load plans on init', () => {
    const mockPlanos = [
      { id: 1, nome: 'Plano A', codigo_registro_ans: '123' }
    ];

    planoServiceSpy.getPlanos.and.returnValue(of(mockPlanos));

    component.getPlanos();

    expect(component.planos.length).toBe(1);
    expect(component.loading).toBeFalse();
  });

  it('should show error when getPlanos fails', () => {
    planoServiceSpy.getPlanos.and.returnValue(throwError(() => 'erro'));

    component.getPlanos();

    expect(snackBarSpy.open).toHaveBeenCalled();
    expect(component.loading).toBeFalse();
  });

  it('should navigate to create new plan', () => {
    component.novoPlano();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/planos/novo']);
  });

  it('should navigate to edit plan', () => {
    component.editarPlano(5);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/planos/editar/5']);
  });

  it('should delete plan when confirmed', () => {
    const dialogRefMock = {
      afterClosed: () => of(true)
    };

    dialogSpy.open.and.returnValue(dialogRefMock as any);

    planoServiceSpy.deletePlano.and.returnValue(of({}));
    planoServiceSpy.getPlanos.and.returnValue(of([]));

    component.excluirPlano(10);

    expect(dialogSpy.open).toHaveBeenCalled();
    expect(planoServiceSpy.deletePlano).toHaveBeenCalledWith(10);
    expect(snackBarSpy.open).toHaveBeenCalled();
  });

  it('should NOT delete plan when canceled', () => {
    const dialogRefMock = {
      afterClosed: () => of(false)
    };

    dialogSpy.open.and.returnValue(dialogRefMock as any);

    component.excluirPlano(10);

    expect(planoServiceSpy.deletePlano).not.toHaveBeenCalled();
  });
});
