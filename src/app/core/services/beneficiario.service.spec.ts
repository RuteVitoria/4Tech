import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BeneficiarioService } from './beneficiario.service';
import { Beneficiario } from '../models/beneficiario.model';

describe('BeneficiarioService', () => {
  let service: BeneficiarioService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BeneficiarioService]
    });

    service = TestBed.inject(BeneficiarioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be called when executing getBeneficiarios()', () => {
    const mockResponse: Beneficiario[] = [];

    service.getBeneficiarios().subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/beneficiarios');
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  it('should call POST /beneficiaries when executing createBeneficiary()', () => {
    const payload: Beneficiario = {
      id: 1,
      nome_completo: 'Teste',
      cpf: '000',
      data_nascimento: '1990-01-01',
      status: 'ATIVO',
      plano_id: 2
    };

    service.createBeneficiario(payload).subscribe(res => {
      expect(res).toEqual(payload);
    });

    const req = httpMock.expectOne('http://localhost:3000/beneficiarios');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);

    req.flush(payload);
  });

});
