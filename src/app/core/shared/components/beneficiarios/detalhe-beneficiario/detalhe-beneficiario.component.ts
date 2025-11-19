import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeneficiarioService } from 'src/app/core/services/beneficiario.service';
import { PlanoService } from 'src/app/core/services/plano.service';

@Component({
  selector: 'app-detalhe-beneficiario',
  templateUrl: './detalhe-beneficiario.component.html',
  styleUrls: ['./detalhe-beneficiario.component.scss'],
})
export class DetalheBeneficiarioComponent implements OnInit {

  beneficiario: any = null;
  plano: any = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private beneficiarioService: BeneficiarioService,
    private planosService: PlanoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.beneficiarioService.getBeneficiario(id!).subscribe(beneficiario => {
      this.beneficiario = beneficiario;

      this.planosService.getPlano(beneficiario.plano_id).subscribe(plano => {
        this.plano = plano;
      });
    });
  }
}
