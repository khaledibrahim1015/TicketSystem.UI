export interface CreateTicketRequest {
    phoneNumber: string;
    governorate: string;
    city: string;
    district: string;
  }
  
  export interface GetTicketResponse {
    id: number;
    creationDate: string;
    phoneNumber: string;
    governorate: string;
    city: string;
    district: string;
    isHandled: boolean;
    color: string;
  }
  