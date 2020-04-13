import { Component, OnInit } from '@angular/core';
import { Agendamento } from 'src/app/shared/models/agendamento';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AgendamentoEmailService } from 'src/app/services/agendamento-email.service';

@Component({
   selector: 'app-home',
   templateUrl: './home.component.html',
   styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

   formAgendamento: FormGroup;
   agendamentos: Agendamento[];

   constructor(
      private formBuilder: FormBuilder,
      private agendamentoService: AgendamentoEmailService
   ) { }

   ngOnInit(): void {
      this.carregarAgendamentos();

      this.formAgendamento = this.formBuilder.group({
         email: [''],
         assunto: [''],
         mensagem: ['']
      });
   }

   carregarAgendamentos() {
      this.agendamentoService
         .obterAgendamentos()
         .pipe(map(agendamentos => this.transformarStatus(agendamentos)))
         .subscribe(agendamentos => this.agendamentos = agendamentos);
   }

   transformarStatus(agendamentos: Agendamento[]): Agendamento[] {
      agendamentos.forEach(ag => ag.status = ag.enviado ? 'Enviado' : 'Não enviado');
      return agendamentos;
   }

   agendar(): void {
      const agendamento = this.formAgendamento.value as Agendamento;
      this.agendamentoService
         .agendar(agendamento)
         .subscribe(
            () => this.atualizarAgendamentoEFormulario(),
            err => this.formAgendamento.setErrors({ server: err.error.mensagens as string[] })
         );
   }

   private atualizarAgendamentoEFormulario() {
      this.carregarAgendamentos();
      this.formAgendamento.reset();
   }
}
