import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Recomendacoes } from '../app/recomedacao/recomedacao.interface';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private title: Title) {}

  recomendacoes: Recomendacoes[] = [];

  onRecomendacaoInserida(recomendacoes: Recomendacoes) {
    this.recomendacoes = [...this.recomendacoes, recomendacoes];
  }

  ngOnInit(): void {
    this.title.setTitle('Home - Aplicação para Recomendações');
  }
}
