export interface Ticket {
    id: string;
    eventName: string;
    date: string;
    status: 'active' | 'past';
  }
  