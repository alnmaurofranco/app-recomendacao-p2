import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Recomendacoes } from '../recomedacao.interface';
import { RecomendacaoService } from '../recomendacao.service';

@Component({
  selector: 'app-recomendacao-inserir',
  templateUrl: './recomendacao-inserir.component.html',
  styleUrls: ['./recomendacao-inserir.component.css'],
})
export class RecomendacaoInserirComponent {
  constructor(private recomendacaoService: RecomendacaoService) {}

  onRecomendacaoAdicionar(form: NgForm) {
    const { invalid, value } = form;

    if (invalid) return;

    this.recomendacaoService.adicionarRecomendacao({
      topic: value.topic,
      message: value.message,
    });

    form.resetForm();
  }
}
