import { Component, OnInit } from '@angular/core';
import { TicketService } from '../services/ticket.service';
import { Ticket } from '../models/ticket.models';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];
  pageNumber: number = 1;
  pageSize: number = 5;
  totalTickets: number = 0;

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.ticketService.getTickets(this.pageNumber, this.pageSize).subscribe(response => {
      this.tickets = response.tickets;
      this.totalTickets = response.totalCount;
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
    if (this.pageNumber * this.pageSize < this.totalTickets) {
      this.pageNumber++;
      this.loadTickets();
    }
  }
}
