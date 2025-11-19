import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListBeneficiariosComponent } from './list-beneficiarios.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ListBeneficiariosComponent', () => {
  let component: ListBeneficiariosComponent;
  let fixture: ComponentFixture<ListBeneficiariosComponent>;
  let httpMock: HttpTestingController;

  let routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
  let snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListBeneficiariosComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule,
        MatSnackBarModule
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: MatSnackBar, useValue: snackBarSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBeneficiariosComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);

    fixture.detectChanges();

    const reqPlanos = httpMock.expectOne('http://localhost:3000/planos');
    reqPlanos.flush([{ id: 1, nome: 'Plano A' }]);

    const reqBenef = httpMock.expectOne('http://localhost:3000/beneficiarios');
    reqBenef.flush([]);
  });

  afterEach(() => httpMock.verify());

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should load planos on init', () => {
    expect(component.planos.length).toBe(1);
    expect(component.planos[0].nome).toBe('Plano A');
  });

  it('should load beneficiarios on init', () => {
    expect(component.beneficiarios.length).toBe(0);
  });

  it('should apply filters', () => {
    component.selectedStatus = 'ATIVO';
    component.selectedPlanoId = '1';

    component.aplicarFiltros();

    const req = httpMock.expectOne(
      'http://localhost:3000/beneficiarios?status=ATIVO&plano_id=1'
    );

    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should navigate to new beneficiario', () => {
    component.novoBeneficiario();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/beneficiarios/novo']);
  });

  it('should navigate to edit beneficiario', () => {
    component.editarBeneficiario(25);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/beneficiarios/editar/25']);
  });

  it('should open confirm dialog when deleting', () => {
    dialogSpy.open.and.returnValue({ afterClosed: () => of(false) });

    component.excluirBeneficiario(10);

    expect(dialogSpy.open).toHaveBeenCalled();
  });

  it('should delete beneficiario after confirmation', () => {
    dialogSpy.open.and.returnValue({ afterClosed: () => of(true) });

    component.excluirBeneficiario(5);

    const deleteReq = httpMock.expectOne('http://localhost:3000/beneficiarios/5');
    expect(deleteReq.request.method).toBe('DELETE');
    deleteReq.flush({});

    const reloadReq = httpMock.expectOne('http://localhost:3000/beneficiarios');
    expect(reloadReq.request.method).toBe('GET');
    reloadReq.flush([]);

    expect(snackBarSpy.open).toHaveBeenCalled();
  });

  it('should NOT delete when dialog is cancelled', () => {
    dialogSpy.open.and.returnValue({ afterClosed: () => of(false) });

    component.excluirBeneficiario(99);

    httpMock.expectNone('http://localhost:3000/beneficiarios/99');
  });

  it('should show error snackbar on delete failure', () => {
    dialogSpy.open.and.returnValue({ afterClosed: () => of(true) });

    component.excluirBeneficiario(5);

    const req = httpMock.expectOne('http://localhost:3000/beneficiarios/5');
    req.flush({}, { status: 500, statusText: 'error' });

    expect(snackBarSpy.open).toHaveBeenCalled();
  });
});
