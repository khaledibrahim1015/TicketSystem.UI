// src/app/services/ticket.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { PaginatedTicketsResponse, CreateTicketRequest } from '../models/ticket.models';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'http://localhost:49051/api/tickets';

  constructor(private http: HttpClient, private eventService: EventService) { }

  createTicket(request: CreateTicketRequest): Observable<any> {
    return this.http.post(this.apiUrl, request).pipe(
      tap(() => this.eventService.announceTicketCreated())
    );
  }

  getTickets(pageNumber: number, pageSize: number): Observable<PaginatedTicketsResponse> {
    return this.http.get<PaginatedTicketsResponse>(`${this.apiUrl}/paginated?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  handleTicket(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/handle`);
  }
}
