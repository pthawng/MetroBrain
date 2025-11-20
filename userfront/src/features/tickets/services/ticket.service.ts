export interface Ticket {
  id: string;
  type: 'SINGLE' | 'DAY_PASS' | 'MONTH_PASS';
  status: 'ACTIVE' | 'USED' | 'EXPIRED' | 'CANCELLED';
  fromStationId?: string;
  toStationId?: string;
  fromStationName?: string;
  toStationName?: string;
  price: number;
  purchasedAt: string;
  expiresAt: string;
  qrCode: string;
}

class TicketService {
  private mockTickets: Ticket[] = [
    {
      id: 'TKT_001_A7',
      type: 'SINGLE',
      status: 'ACTIVE',
      fromStationId: 'st_01',
      fromStationName: 'Bến Thành',
      toStationId: 'st_14',
      toStationName: 'Suối Tiên',
      price: 15000,
      purchasedAt: new Date(Date.now() - 3600000).toISOString(),
      expiresAt: new Date(Date.now() + 7200000).toISOString(),
      qrCode: 'METRO_QR_ACTIVE_001_A7'
    },
    {
      id: 'TKT_002_B2',
      type: 'DAY_PASS',
      status: 'USED',
      price: 40000,
      purchasedAt: new Date(Date.now() - 86400000).toISOString(),
      expiresAt: new Date(Date.now() - 3600000).toISOString(),
      qrCode: 'METRO_QR_USED_002_B2'
    },
    {
      id: 'TKT_003_C5',
      type: 'SINGLE',
      status: 'EXPIRED',
      fromStationId: 'st_05',
      fromStationName: 'Lê Văn Việt',
      toStationId: 'st_01',
      toStationName: 'Bến Thành',
      price: 12000,
      purchasedAt: new Date(Date.now() - 172800000).toISOString(),
      expiresAt: new Date(Date.now() - 86400000).toISOString(),
      qrCode: 'METRO_QR_EXPIRED_003_C5'
    }
  ];

  async getMyTickets(): Promise<Ticket[]> {
    await new Promise(resolve => setTimeout(resolve, 800));
    return this.mockTickets;
  }

  async getTicketById(id: string): Promise<Ticket | null> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.mockTickets.find(t => t.id === id) || null;
  }

  async useTicket(id: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const ticket = this.mockTickets.find(t => t.id === id);
    if (ticket && ticket.status === 'ACTIVE') {
      ticket.status = 'USED';
      return true;
    }
    return false;
  }
}

export const ticketService = new TicketService();
