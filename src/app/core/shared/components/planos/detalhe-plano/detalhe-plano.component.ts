import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlanoService } from 'src/app/core/services/plano.service';

@Component({
  selector: 'app-detalhe-plano',
  templateUrl: './detalhe-plano.component.html',
  styleUrls: ['./detalhe-plano.component.scss'],
})
export class DetalhePlanoComponent implements OnInit {

  plano: any = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private planoService: PlanoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.planoService.getPlano(id).subscribe({
      next: (data) => {
        this.plano = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
