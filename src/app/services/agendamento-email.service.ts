import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Agendamento } from '../shared/models/agendamento';
import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';

@Injectable({
   providedIn: 'root'
})
export class AgendamentoEmailService {

   readonly api = env.appUrl;
   readonly agendamentoEndpoint = `${this.api}/agendamentoemail`;

   constructor(
      private http: HttpClient
   ) { }

   obterAgendamentos(): Observable<Agendamento[]> {
      return this.http.get<Agendamento[]>(this.agendamentoEndpoint);
   }

   agendar(agendamento: Agendamento) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post(this.agendamentoEndpoint, agendamento, { headers });
   }

}
