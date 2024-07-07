// src/app/services/event.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private ticketCreatedSource = new Subject<void>();

  ticketCreated$ = this.ticketCreatedSource.asObservable();

  announceTicketCreated() {
    this.ticketCreatedSource.next();
  }
}
