import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Plano } from '../models/plano.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PlanoService {
  private base = 'http://localhost:3000/planos';

  constructor(private http: HttpClient) {}

  getPlanos(): Observable<Plano[]> {
    return this.http.get<Plano[]>(this.base);
  }

  getPlano(id: string | number) {
    return this.http.get<Plano>(`${this.base}/${id}`);
  }

  createPlano(plano: Plano) {
    return this.http.post<Plano>(this.base, plano);
  }

  updatePlano(id: number, plano: Plano) {
    return this.http.put<Plano>(`${this.base}/${id}`, plano);
  }

  deletePlano(id: string | number) {
    return this.http.delete(`${this.base}/${id}`);
  }
}
