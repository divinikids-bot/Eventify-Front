//dummy-ticket.ts

export interface TicketOption {
    id: string;
    eventId: string;
    title: string;
    price: number;
    description?: string;
    quota?: number;
    discountPercentage?: number;
    saleEndDate?: string;
  }
  
  export const dummyTickets: TicketOption[] = [
    {
      id: "ticket-001",
      eventId: "event-001",
      title: "Presale VIP",
      price: 120000,
      description: "Akses VIP & merchandise",
      quota: 100,
      discountPercentage: 20,
      saleEndDate: "2025-08-01",
    },
    {
      id: "ticket-002",
      eventId: "event-001",
      title: "Regular",
      price: 150000,
      description: "Akses umum festival",
      quota: 500,
    },
    {
      id: "ticket-003",
      eventId: "event-002",
      title: "Workshop Pass",
      price: 250000,
      description: "Termasuk alat & kopi",
      quota: 50,
    },
    {
      id: "ticket-004",
      eventId: "event-003",
      title: "Daily Pass",
      price: 50000,
      description: "Akses sehari penuh pameran",
      quota: 200,
    },
    {
      id: "ticket-005",
      eventId: "event-004",
      title: "Team Registration",
      price: 75000,
      description: "Biaya pendaftaran per tim",
      quota: 40,
    },
    {
      id: "ticket-006",
      eventId: "event-005",
      title: "Standard Seat",
      price: 300000,
      description: "Termasuk 1 minuman gratis",
      quota: 60,
    },
    {
      id: "ticket-007",
      eventId: "event-006",
      title: "Seminar Entry",
      price: 500000,
      description: "Akses ke semua sesi seminar",
      quota: 150,
    },
    {
      id: "ticket-008",
      eventId: "event-007",
      title: "VIP Jazz",
      price: 350000,
      description: "Tempat duduk terbaik & meet and greet",
      quota: 80,
    },
    {
      id: "ticket-009",
      eventId: "event-008",
      title: "Full Marathon",
      price: 400000,
      description: "Termasuk race pack & medali finisher",
      quota: 500,
    },
    {
      id: "ticket-010",
      eventId: "event-009",
      title: "Exhibition Entry",
      price: 35000,
      description: "Akses masuk ke semua booth",
      quota: 1000,
    },
    {
      id: "ticket-011",
      eventId: "event-010",
      title: "Startup Entry",
      price: 200000,
      description: "Untuk peserta pitching",
      quota: 30,
    },
    {
      id: "ticket-012",
      eventId: "event-010",
      title: "Audience Pass",
      price: 100000,
      description: "Untuk penonton umum",
      quota: 100,
    },
  ];
  