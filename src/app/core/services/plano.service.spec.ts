import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PlanoService } from './plano.service';
import { Plano } from '../models/plano.model';

describe('PlanoService', () => {
  let service: PlanoService;
  let httpMock: HttpTestingController;

  const baseUrl = 'http://localhost:3000/planos';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlanoService]
    });

    service = TestBed.inject(PlanoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call GET /plans when executing getPlans()', () => {
    const mockPlanos: Plano[] = [
      { id: 1, nome: 'Plano Ouro', codigo_registro_ans: 'ANS-001'},
      { id: 2, nome: 'Plano Prata', codigo_registro_ans: 'ANS-002'}
    ];

    service.getPlanos().subscribe(res => {
      expect(res).toEqual(mockPlanos);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');

    req.flush(mockPlanos);
  });

  it('should call GET /plans/:id when executing getPlan()', () => {
    const planoId = 1;
    const mockPlano: Plano = { id: 1, nome: 'Plano Ouro', codigo_registro_ans: 'ANS-001' };

    service.getPlano(planoId).subscribe(res => {
      expect(res).toEqual(mockPlano);
    });

    const req = httpMock.expectOne(`${baseUrl}/${planoId}`);
    expect(req.request.method).toBe('GET');

    req.flush(mockPlano);
  });

  it('should call GET /plans/:id when executing getPlan()', () => {
    const novoPlano: Plano = { id: 3, nome: 'Plano Bronze', codigo_registro_ans: 'ANS-003' };

    service.createPlano(novoPlano).subscribe(res => {
      expect(res).toEqual(novoPlano);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(novoPlano);

    req.flush(novoPlano);
  });

  it('should call PUT /plans/:id when executing updatePlano()', () => {
    const planoId = 1;
    const updatedPlano: Plano = { id: 1, nome: 'Plano Ouro Plus', codigo_registro_ans: 'ANS-001' };

    service.updatePlano(planoId, updatedPlano).subscribe(res => {
      expect(res).toEqual(updatedPlano);
    });

    const req = httpMock.expectOne(`${baseUrl}/${planoId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedPlano);

    req.flush(updatedPlano);
  });

  it('should be called when executing deletePlan()', () => {
    const planoId = 2;

    service.deletePlano(planoId).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(`${baseUrl}/${planoId}`);
    expect(req.request.method).toBe('DELETE');

    req.flush({ success: true });
  });

});
