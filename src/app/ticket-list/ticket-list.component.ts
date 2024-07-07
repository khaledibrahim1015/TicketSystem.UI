// src/app/ticket-list/ticket-list.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TicketService } from '../services/ticket.service';
import { EventService } from '../services/event.service';
import { Ticket, PaginatedTicketsResponse } from '../models/ticket.models';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit, OnDestroy {
  tickets: Ticket[] = [];
  pageNumber = 1;
  pageSize = 5;
  totalTickets = 0;
  private subscription!: Subscription;

  constructor(private ticketService: TicketService, private eventService: EventService) {}

  ngOnInit(): void {
    this.loadTickets();
    this.subscription = this.eventService.ticketCreated$.subscribe(() => {
      this.loadTickets();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadTickets(): void {
    this.ticketService.getTickets(this.pageNumber, this.pageSize).subscribe({
      next: (response: PaginatedTicketsResponse) => {
        console.log('Response received:', response);
        this.tickets = response.items;
        this.totalTickets = response.totalCount;
        console.log('Total tickets:', this.totalTickets); 
      },
      error: (error) => {
        console.error('Error loading tickets:', error);
      }
    });
  }

  handleTicket(id: number): void {
    this.ticketService.handleTicket(id).subscribe(() => {
      this.loadTickets();
    });
  }

  previousPage(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.loadTickets();
    }
  }

  nextPage(): void {
    const totalPages = Math.ceil(this.totalTickets / this.pageSize);
    if (this.pageNumber < totalPages) {
      this.pageNumber++;
      this.loadTickets();
    }
  }
}
