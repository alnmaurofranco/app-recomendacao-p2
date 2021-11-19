import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Recomendacoes } from './recomedacao.interface';

import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

const baseURL: string = 'http://localhost:3333/api';

@Injectable({
  providedIn: 'root',
})
class RecomendacaoService {
  constructor(private httpClient: HttpClient) {}

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
      .post<any>(`${baseURL}/recommendations/create`, recomendacao)
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
  }
}

export { RecomendacaoService };
