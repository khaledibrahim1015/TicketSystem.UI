import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StaticDataService } from '../services/static-data.service';
import { TicketService } from '../services/ticket.service';
import { CreateTicketRequest } from '../models/ticket.models';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.css']
})

export class TicketCreateComponent implements OnInit {
  ticketForm!: FormGroup;
  governorates: string[] = [];
  cities: string[] = [];
  districts: string[] = [];

  constructor(
    private fb: FormBuilder,
    private staticDataService: StaticDataService,
    private ticketService: TicketService
  ) { }

  ngOnInit(): void {
    this.ticketForm = this.fb.group({
      phoneNumber: ['', Validators.required],
      governorate: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required]
    });

    this.staticDataService.getGovernorates().subscribe(data => this.governorates = data);
    this.staticDataService.getCities().subscribe(data => this.cities = data);
    this.staticDataService.getDistricts().subscribe(data => this.districts = data);
  }

  onSubmit(): void {
    if (this.ticketForm.valid) {
      const request: CreateTicketRequest = this.ticketForm.value;
      this.ticketService.createTicket(request).subscribe();
    }
  }
}
