import { TestBed } from '@angular/core/testing';

import { AgendamentoEmailService } from './agendamento-email.service';

describe('AgendamentoEmailService', () => {
  let service: AgendamentoEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgendamentoEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
