// services/ticketService.ts
import { Ticket } from '@/types/ticket';

export const getUserTickets = async (): Promise<Ticket[]> => {
  const res = await fetch('https://api.kamu.com/user/tickets'); // ganti URL-nya
  if (!res.ok) throw new Error('Gagal mengambil data tiket');
  return res.json();
};
