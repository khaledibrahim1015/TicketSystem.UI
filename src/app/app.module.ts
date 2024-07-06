import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TicketCreateComponent } from './ticket-create/ticket-create.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StaticDataService } from './services/static-data.service';
import { TicketService } from './services/ticket.service';

@NgModule({
  declarations: [
    AppComponent,
    TicketCreateComponent,
    TicketListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    StaticDataService,
    TicketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
