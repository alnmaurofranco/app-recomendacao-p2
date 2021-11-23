import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Recomendacoes } from './recomendacao.interface';

import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

type AdicionarRecomendacaoResponseData = {
  id: string;
  createdAt: Date;
};

const baseURL: string = 'https://api-recommendation.herokuapp.com/api'; // localhost:3333/api

@Injectable({
  providedIn: 'root',
})
class RecomendacaoService {
  constructor(private httpClient: HttpClient, private route: Router) {}

  private recomendacoes: Recomendacoes[] = [];

  private listaRecomendacoesAtualizada = new Subject<Recomendacoes[]>();

  getRecomendacoes() {
    this.httpClient
      .get<Recomendacoes[]>(`${baseURL}/recommendations/getAll`)
      .pipe(
        map((data) => {
          return data.map((recomendacao) => {
            return {
              id: recomendacao.id,
              topic: recomendacao.topic,
              message: recomendacao.message,
              createdAt: recomendacao.createdAt,
            };
          });
        })
      )
      .subscribe((recomendacoes) => {
        this.recomendacoes = recomendacoes;
        this.listaRecomendacoesAtualizada.next([...this.recomendacoes]);
      });
  }

  getListaDeRecomendacoesAtualizadaObservable() {
    return this.listaRecomendacoesAtualizada.asObservable();
  }

  adicionarRecomendacao({ topic, message }: Recomendacoes) {
    const recomendacao: Recomendacoes = {
      topic,
      message,
    };

    this.httpClient
      .post<AdicionarRecomendacaoResponseData>(
        `${baseURL}/recommendations/create`,
        recomendacao
      )
      .subscribe((data) => {
        this.recomendacoes.push({
          id: data.id,
          createdAt: data.createdAt,
          ...recomendacao,
        });

        this.listaRecomendacoesAtualizada.next([
          ...this.recomendacoes.sort((a, b) => {
            if (a.createdAt < b.createdAt) {
              return 1;
            }
            if (a.createdAt > b.createdAt) {
              return -1;
            }
            return 0;
          }),
        ]);
      });

    this.route.navigateByUrl('/');
  }
}

export { RecomendacaoService };
