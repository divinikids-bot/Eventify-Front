export interface EventData {
  id: string;
  namaEvent: string;
  tanggalEvent: string;
  waktuEvent?: string;
  lokasiEvent: string;
  deskripsiEvent: string;
  hargaEvent?: number;
  kategori: 'music' | 'sport' | 'food' | 'beauty';
  imageUrl?: string;
  eventOrganizer?: string;
  organizer?: { image?: string };
  attendees?: number;
}

export const dummyEvents: EventData[] = [
  {
    id: "event-001",
    namaEvent: "Music Festival",
    deskripsiEvent: "Nikmati penampilan band-band indie terbaik tanah air di festival musik outdoor yang seru!",
    eventOrganizer: "Gelora Production",
    hargaEvent: 150000,
    tanggalEvent: "2025-08-15",
    lokasiEvent: "Lapangan Parkir Timur Senayan, Jakarta Pusat",
    kategori: 'music',
    imageUrl: "/placeholder.svg",
    waktuEvent: "15:00 - 22:00 WIB"
  },
  {
    id: "event-002",
    namaEvent: "Coffee Workshop",
    deskripsiEvent: "Pelajari teknik-teknik manual brewing kopi dari ahlinya. Cocok untuk pemula maupun yang sudah berpengalaman.",
    eventOrganizer: "Kopi Enthusiast Community",
    hargaEvent: 250000,
    tanggalEvent: "2025-07-22",
    lokasiEvent: "Kafé Kopi Aroma, Bandung, Jawa Barat",
    kategori: 'food',
    imageUrl: "/placeholder.svg",
    waktuEvent: "09:00 - 12:00 WIB"
  },
  {
    id: "event-003",
    namaEvent: "Pameran Seni Rupa Kontemporer Yogyakarta",
    deskripsiEvent: "Saksikan karya-karya seni rupa kontemporer dari berbagai seniman muda berbakat Indonesia.",
    eventOrganizer: "Sanggar Merah Putih",
    hargaEvent: 50000,
    tanggalEvent: "2025-09-01",
    lokasiEvent: "Jogja National Museum, Yogyakarta, DI Yogyakarta",
    kategori: 'beauty',
    imageUrl: "/placeholder.svg",
    waktuEvent: "10:00 - 18:00 WIB"
  },
  {
    id: "event-004",
    namaEvent: "Liga Futsal Amatir Jakarta",
    deskripsiEvent: "Turnamen futsal tahunan untuk tim amatir dengan hadiah total 50 juta rupiah.",
    eventOrganizer: "Jakarta Sports Community",
    hargaEvent: 75000,
    tanggalEvent: "2025-06-10",
    lokasiEvent: "GOR Soemantri Brodjonegoro, Kuningan, Jakarta Selatan",
    kategori: 'sport',
    imageUrl: "/placeholder.svg",
    waktuEvent: "08:00 - 17:00 WIB"
  },
  {
    id: "event-005",
    namaEvent: "Beauty Expo 2025",
    deskripsiEvent: "Temukan produk kecantikan terbaru dan tren makeup dalam satu acara eksklusif.",
    eventOrganizer: "Glamour Events",
    hargaEvent: 200000,
    tanggalEvent: "2025-07-05",
    lokasiEvent: "The Hermitage Hotel, Menteng, Jakarta Pusat",
    kategori: 'beauty',
    imageUrl: "/placeholder.svg",
    waktuEvent: "10:00 - 18:00 WIB"
  },
  {
    id: "event-006",
    namaEvent: "Marathon Internasional Bali",
    deskripsiEvent: "Lari marathon dengan rute indah melewati pantai dan sawah terasering Bali.",
    eventOrganizer: "Bali Tourism Board",
    hargaEvent: 400000,
    tanggalEvent: "2025-10-05",
    lokasiEvent: "Start Line: Pantai Kuta, Bali",
    kategori: 'sport',
    imageUrl: "/placeholder.svg",
    waktuEvent: "05:00 - 12:00 WITA"
  },
  {
    id: "event-007",
    namaEvent: "Konser Jazz Under The Stars",
    deskripsiEvent: "Nikmati malam indah dengan alunan jazz dari musisi ternama di bawah langit berbintang.",
    eventOrganizer: "Jazz Lovers Indonesia",
    hargaEvent: 350000,
    tanggalEvent: "2025-09-12",
    lokasiEvent: "Taman Menteng, Jakarta Pusat",
    kategori: 'music',
    imageUrl: "/placeholder.svg",
    waktuEvent: "18:00 - 23:00 WIB"
  },
  {
    id: "event-008",
    namaEvent: "Food Tasting Festival",
    deskripsiEvent: "Cicipi berbagai macam kuliner khas Nusantara dalam satu festival besar.",
    eventOrganizer: "Kuliner Nusantara",
    hargaEvent: 100000,
    tanggalEvent: "2025-11-15",
    lokasiEvent: "Jakarta Convention Center, Senayan",
    kategori: 'food',
    imageUrl: "/placeholder.svg",
    waktuEvent: "12:00 - 20:00 WIB"
  },
  {
    id: "event-009",
    namaEvent: "Music Gala Night",
    deskripsiEvent: "Penampilan orkestra dan paduan suara terbaik dalam satu acara malam musik.",
    eventOrganizer: "Symphony Indonesia",
    hargaEvent: 250000,
    tanggalEvent: "2025-12-01",
    lokasiEvent: "Gedung Kesenian Jakarta",
    kategori: 'music',
    imageUrl: "/placeholder.svg",
    waktuEvent: "19:00 - 22:00 WIB"
  },
  {
    id: "event-010",
    namaEvent: "City Marathon Challenge",
    deskripsiEvent: "Tantang dirimu dalam lari kota sepanjang 10K dengan view landmark Jakarta.",
    eventOrganizer: "Jakarta Sports League",
    hargaEvent: 150000,
    tanggalEvent: "2025-09-20",
    lokasiEvent: "Bundaran HI, Jakarta Pusat",
    kategori: 'sport',
    imageUrl: "/placeholder.svg",
    waktuEvent: "06:00 - 11:00 WIB"
  }
];
