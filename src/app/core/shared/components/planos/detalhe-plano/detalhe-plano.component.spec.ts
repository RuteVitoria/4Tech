import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalhePlanoComponent } from './detalhe-plano.component';
import { ActivatedRoute } from '@angular/router';
import { PlanoService } from 'src/app/core/services/plano.service';
import { of, throwError } from 'rxjs';
import { Plano } from 'src/app/core/models/plano.model';

describe('DetalhePlanoComponent', () => {
  let component: DetalhePlanoComponent;
  let fixture: ComponentFixture<DetalhePlanoComponent>;

  let planoServiceSpy: jasmine.SpyObj<PlanoService>;

  beforeEach(async () => {
    planoServiceSpy = jasmine.createSpyObj('PlanoService', ['getPlano']);

    await TestBed.configureTestingModule({
      declarations: [DetalhePlanoComponent],
      providers: [
        { provide: PlanoService, useValue: planoServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: new Map([['id', '1']]) } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalhePlanoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load plano on init', () => {
    const mockPlano: Plano = {
      id: 1,
      nome: 'Plano Ouro',
      codigo_registro_ans: '123456',
    };

    planoServiceSpy.getPlano.and.returnValue(of(mockPlano));

    component.ngOnInit();

    expect(planoServiceSpy.getPlano).toHaveBeenCalledWith('1');
    expect(component.plano).toEqual(mockPlano);
    expect(component.loading).toBeFalse();
  });

  it('should set loading to false on error', () => {
    planoServiceSpy.getPlano.and.returnValue(
      throwError(() => new Error('Erro'))
    );

    component.ngOnInit();

    expect(planoServiceSpy.getPlano).toHaveBeenCalledWith('1');
    expect(component.loading).toBeFalse();
    expect(component.plano).toBeNull();
  });
});
