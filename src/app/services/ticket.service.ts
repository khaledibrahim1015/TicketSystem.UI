import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedTicketsResponse, CreateTicketRequest, Ticket } from '../models/ticket.models';
import { map } from 'rxjs/operators'; // Import map operator

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'http://localhost:49051/api/tickets'; 

  constructor(private http: HttpClient) { }

  createTicket(request: CreateTicketRequest): Observable<any> {
    return this.http.post(this.apiUrl, request);
  }

  getTickets(pageNumber: number, pageSize: number): Observable<PaginatedTicketsResponse> {
    return this.http.get<PaginatedTicketsResponse>(`${this.apiUrl}/paginated?pageNumber=${pageNumber}&pageSize=${pageSize}`)
      .pipe(
        map(response => response) 
      );
  }

  handleTicket(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}/handle`);
  }
}
