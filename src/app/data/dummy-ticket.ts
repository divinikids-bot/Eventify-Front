//dummy-ticket.ts

export interface TicketOption {
  id: string;
  eventId: string;
  title: string;
  price: number;
  description?: string;
  quota?: number;
  discountPercentage?: number;
  saleStartDate?: string; // ✅ Tambahkan ini
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
      saleStartDate: "2025-06-01T08:00:00",
      saleEndDate: "2025-06-30T23:59:59",
    },
    {
      id: "ticket-002",
      eventId: "event-001",
      title: "Regular",
      price: 150000,
      description: "Akses umum festival",
      quota: 500,
      saleStartDate: "2025-01-01T00:01:00",
      saleEndDate: "2025-07-22T23:59:59",
    },
    {
      id: "ticket-003",
      eventId: "event-002",
      title: "Workshop Pass",
      price: 250000,
      description: "Termasuk alat & kopi",
      quota: 50,
      discountPercentage: 10,
      saleStartDate: "2025-08-01T09:00:00",
      saleEndDate: "2025-08-15T17:00:00",
    },
    {
      id: "ticket-004",
      eventId: "event-003",
      title: "Daily Pass",
      price: 50000,
      description: "Akses sehari penuh pameran",
      quota: 200,
      saleStartDate: "2025-05-10T00:00:00",
      saleEndDate: "2025-05-20T23:59:59",
    },
    {
      id: "ticket-005",
      eventId: "event-004",
      title: "Team Registration",
      price: 75000,
      description: "Biaya pendaftaran per tim",
      quota: 40,
      saleStartDate: "2025-06-05T10:00:00",
      saleEndDate: "2025-06-25T18:00:00",
    },
    {
      id: "ticket-006",
      eventId: "event-005",
      title: "Standard Seat",
      price: 300000,
      description: "Termasuk 1 minuman gratis",
      quota: 60,
      saleStartDate: "2025-07-01T00:00:00",
      saleEndDate: "2025-07-20T23:59:59",
    },
    {
      id: "ticket-007",
      eventId: "event-006",
      title: "Seminar Entry",
      price: 500000,
      description: "Akses ke semua sesi seminar",
      quota: 150,
      saleStartDate: "2025-09-01T08:00:00",
      saleEndDate: "2025-09-30T23:59:59",
    },
    {
      id: "ticket-008",
      eventId: "event-007",
      title: "VIP Jazz",
      price: 350000,
      description: "Tempat duduk terbaik & meet and greet",
      quota: 80,
      discountPercentage: 15,
      saleStartDate: "2025-08-01T08:00:00",
      saleEndDate: "2025-08-25T22:00:00",
    },
    {
      id: "ticket-009",
      eventId: "event-008",
      title: "Full Marathon",
      price: 400000,
      description: "Termasuk race pack & medali finisher",
      quota: 500,
      saleStartDate: "2025-06-15T07:00:00",
      saleEndDate: "2025-07-10T23:59:59",
    },
    {
      id: "ticket-010",
      eventId: "event-009",
      title: "Exhibition Entry",
      price: 35000,
      description: "Akses masuk ke semua booth",
      quota: 1000,
      saleStartDate: "2025-05-01T00:00:00",
      saleEndDate: "2025-05-15T23:59:59",
    },
    {
      id: "ticket-011",
      eventId: "event-010",
      title: "Startup Entry",
      price: 200000,
      description: "Untuk peserta pitching",
      quota: 30,
      saleStartDate: "2025-07-01T00:00:00",
      saleEndDate: "2025-07-31T23:59:59",
    },
    {
      id: "ticket-012",
      eventId: "event-010",
      title: "Audience Pass",
      price: 100000,
      description: "Untuk penonton umum",
      quota: 100,
      saleStartDate: "2025-07-15T00:00:00",
      saleEndDate: "2025-08-01T23:59:59",
    },
  ];
  
  