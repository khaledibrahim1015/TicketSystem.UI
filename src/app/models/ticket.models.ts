export interface Ticket {
    id: number;
    phoneNumber: string;
    governorate: string;
    city: string;
    district: string;
    creationDate: Date;
    isHandled: boolean;
    color: string;
  }
  
  export interface PaginatedTicketsResponse {
    totalCount: number;
    items: Ticket[];
  }
  
  export interface CreateTicketRequest {
    phoneNumber: string;
    governorate: string;
    city: string;
    district: string;
  }
  