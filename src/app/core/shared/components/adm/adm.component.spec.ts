import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdmComponent } from './adm.component';
import { PlanoService } from 'src/app/core/services/plano.service';
import { BeneficiarioService } from 'src/app/core/services/beneficiario.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

describe('AdmComponent', () => {
  let component: AdmComponent;
  let fixture: ComponentFixture<AdmComponent>;

  const mockPlanos = [
    { id: 1, nome: 'Plano A' },
    { id: 2, nome: 'Plano B' },
    { id: 3, nome: 'Plano C' }
  ];

  const mockBeneficiarios = [
    { id: 1, nome_completo: 'João Silva' },
    { id: 2, nome_completo: 'Maria Souza' },
    { id: 3, nome_completo: 'Carlos Lima' }
  ];

  const planoServiceMock = {
    getPlanos: jasmine.createSpy('getPlanos').and.returnValue(of(mockPlanos))
  };

  const beneficiarioServiceMock = {
    getBeneficiarios: jasmine.createSpy('getBeneficiarios').and.returnValue(of(mockBeneficiarios))
  };

  const routerMock = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmComponent],
      imports: [
        CommonModule,
        MatCardModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule
      ],
      providers: [
        { provide: PlanoService, useValue: planoServiceMock },
        { provide: BeneficiarioService, useValue: beneficiarioServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load correctly (plans + beneficiaries)', () => {
    component.carregarDashboard();

    expect(planoServiceMock.getPlanos).toHaveBeenCalled();
    expect(beneficiarioServiceMock.getBeneficiarios).toHaveBeenCalled();

    expect(component.totalPlanos).toBe(3);
    expect(component.totalBeneficiarios).toBe(3);

    expect(component.ultimosRegistros.length).toBe(5);

    expect(component.ultimosRegistros.some(r => r.tipo === 'Plano')).toBeTrue();
    expect(component.ultimosRegistros.some(r => r.tipo === 'Beneficiário')).toBeTrue();
  });

  it('should navigate to Plan details when the type is "Plan"', () => {
    const item = { tipo: 'Plano', id: 10 };

    component.verDetalhes(item);

    expect(routerMock.navigate).toHaveBeenCalledWith(['/planos/detalhes', 10]);
  });

  it('should navigate to Beneficiary details when the type is "Beneficiary"', () => {
    const item = { tipo: 'Beneficiário', id: 22 };

    component.verDetalhes(item);

    expect(routerMock.navigate).toHaveBeenCalledWith(['/beneficiarios/detalhes', 22]);
  });

});
