import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Recomendacoes } from '../recomendacao.interface';

import { RecomendacaoService } from '../recomendacao.service';

@Component({
  selector: 'app-recomendacao-listar',
  templateUrl: './recomendacao-listar.component.html',
  styleUrls: ['./recomendacao-listar.component.css'],
})
export class RecomendacaoListarComponent implements OnInit, OnDestroy {
  recomendacoes: Recomendacoes[] = [];

  private recomendacaoSubscription: Subscription;

  constructor(private recomendacaoService: RecomendacaoService) {}

  ngOnInit(): void {
    this.recomendacaoService.getRecomendacoes();

    this.recomendacaoSubscription = this.recomendacaoService
      .getListaDeRecomendacoesAtualizadaObservable()
      .subscribe((recomendacoes: Recomendacoes[]) => {
        this.recomendacoes = recomendacoes;
      });
  }

  ngOnDestroy(): void {
    this.recomendacaoSubscription.unsubscribe();
  }
}
