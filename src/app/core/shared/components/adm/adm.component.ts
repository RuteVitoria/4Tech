import { Component, OnInit } from '@angular/core';
import { PlanoService } from 'src/app/core/services/plano.service';
import { BeneficiarioService } from 'src/app/core/services/beneficiario.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-adm',
  templateUrl: './adm.component.html',
  styleUrls: ['./adm.component.scss']
})
export class AdmComponent implements OnInit {

  totalPlanos = 0;
  totalBeneficiarios = 0;

  colunas = ['tipo', 'nome', 'acoes'];
  ultimosRegistros: any[] = [];

  constructor(
    private planoService: PlanoService,
    private beneficiarioService: BeneficiarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarDashboard();
  }

  carregarDashboard(): void {
  this.planoService.getPlanos().subscribe(planos => {
    this.totalPlanos = planos.length;

    this.beneficiarioService.getBeneficiarios().subscribe(beneficiarios => {
      this.totalBeneficiarios = beneficiarios.length;

      const ultimosPlanos = planos.slice(-3).map((p: any) => ({
        tipo: 'Plano',
        nome: p.nome,
        id: p.id
      }));

      const ultimosBeneficiarios = beneficiarios.slice(-3).map((b: any) => ({
        tipo: 'Beneficiário',
        nome: b.nomeCompleto,
        id: b.id
      }));

      this.ultimosRegistros = [...ultimosPlanos, ...ultimosBeneficiarios]
        .slice(-5)
        .reverse();
    });
    });
  }

  verDetalhes(item: any): void {
    if (item.tipo === 'Plano') {
      this.router.navigate(['/planos/detalhes', item.id]);
      return;
    }

    if (item.tipo === 'Beneficiário') {
      this.router.navigate(['/beneficiarios/detalhes', item.id]);
      return;
    }
  }

}
