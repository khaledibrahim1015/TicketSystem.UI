import { Component, OnInit } from '@angular/core';
import { TicketService } from '../services/ticket.service';
import { Ticket, PaginatedTicketsResponse } from '../models/ticket.models';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];
  pageNumber = 1;
  pageSize = 5;
  totalTickets = 0;

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.ticketService.getTickets(this.pageNumber, this.pageSize).subscribe({
      next: (response: PaginatedTicketsResponse) => {
        console.log('Response received:', response);
        this.tickets = response.items;
        this.totalTickets = response.totalCount;
        console.log('Total tickets:', this.totalTickets); // Ensure this prints correctly
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
