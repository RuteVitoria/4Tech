import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Beneficiario } from '../models/beneficiario.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BeneficiarioService {
  private base = 'http://localhost:3000/beneficiarios';

  constructor(private http: HttpClient) {}

  getBeneficiarios(filters?: { status?: string; plano_id?: number }): Observable<Beneficiario[]> {
    let params = new HttpParams();
    if (filters?.status && filters.status !== 'Todos') params = params.set('status', filters.status);
    if (filters?.plano_id) params = params.set('plano_id', String(filters.plano_id));
    return this.http.get<Beneficiario[]>(this.base, { params });
  }

  getBeneficiario(id: string | number) {
    return this.http.get<Beneficiario>(`${this.base}/${id}`);
  }

  createBeneficiario(b: Beneficiario) {
    return this.http.post<Beneficiario>(this.base, b);
  }

  updateBeneficiario(id: number, b: Beneficiario) {
    return this.http.put<Beneficiario>(`${this.base}/${id}`, b);
  }

  deleteBeneficiario(id: string | number) {
    return this.http.delete(`${this.base}/${id}`);
  }
}
