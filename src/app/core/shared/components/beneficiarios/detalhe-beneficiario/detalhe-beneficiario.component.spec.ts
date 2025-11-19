import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DetalheBeneficiarioComponent } from './detalhe-beneficiario.component';
import { ActivatedRoute } from '@angular/router';
import { BeneficiarioService } from 'src/app/core/services/beneficiario.service';
import { PlanoService } from 'src/app/core/services/plano.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

describe('DetalheBeneficiarioComponent', () => {
  let component: DetalheBeneficiarioComponent;
  let fixture: ComponentFixture<DetalheBeneficiarioComponent>;

  const mockBeneficiario = {
    id: 1,
    nomeCompleto: 'João Silva',
    plano_id: 10
  };

  const mockPlano = {
    id: 10,
    nome: 'Plano Premium'
  };

  const beneficiarioServiceMock = {
    getBeneficiario: jasmine.createSpy('getBeneficiario').and.returnValue(of(mockBeneficiario))
  };

  const planoServiceMock = {
    getPlano: jasmine.createSpy('getPlano').and.returnValue(of(mockPlano))
  };

  const activatedRouteMock = {
    snapshot: {
      paramMap: {
        get: () => '1'
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalheBeneficiarioComponent],
      imports: [
        CommonModule,
        MatCardModule,
        MatIconModule,
      ],
      providers: [
        { provide: BeneficiarioService, useValue: beneficiarioServiceMock },
        { provide: PlanoService, useValue: planoServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    });

    fixture = TestBed.createComponent(DetalheBeneficiarioComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getBeneficiario with the route param ID', () => {
    expect(beneficiarioServiceMock.getBeneficiario).toHaveBeenCalledWith('1');
  });

  it('should set beneficiario with the returned value from BeneficiarioService', () => {
    expect(component.beneficiario).toEqual(mockBeneficiario);
  });

  it('should call getPlano using beneficiario.plano_id', () => {
    expect(planoServiceMock.getPlano).toHaveBeenCalledWith(mockBeneficiario.plano_id);
  });

  it('should set plano with the returned value from PlanoService', () => {
    expect(component.plano).toEqual(mockPlano);
  });
});
