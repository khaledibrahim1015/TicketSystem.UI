// src/app/services/ticket.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  PaginatedTicketsResponse, CreateTicketRequest } from '../models/ticket.models';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'http://localhost:5000/api/tickets'; 

  constructor(private http: HttpClient) { }

  createTicket(request: CreateTicketRequest): Observable<any> {
    return this.http.post(this.apiUrl, request);
  }

  getTickets(pageNumber: number, pageSize: number): Observable<PaginatedTicketsResponse> {
    return this.http.get<PaginatedTicketsResponse>(`${this.apiUrl}/paginated?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  handleTicket(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/handle`, {});
  }
}
