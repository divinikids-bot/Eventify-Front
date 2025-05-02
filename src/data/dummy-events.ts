// data/dummy-data.ts
export interface EventData {
  id: string;
  namaEvent: string;
  tanggalEvent: string;
  waktuEvent?: string;
  lokasiEvent: string;
  deskripsiEvent: string;
  hargaEvent?: number;
  kategori: 'music' | 'sport' | 'performing visual & arts' | 'dating' | 'business';
  imageUrl?: string;
  eventOrganizer?: string;
  organizer?: {
    image?: string;
  };
  attendees?: number;
}


export const dummyEvents: EventData[] = [
  {
    id: "event-001",
    namaEvent: "Festival Musik Indie Jakarta",
    eventOrganizer: "Gelora Production",
    hargaEvent: 150000,
    tanggalEvent: "2025-08-15",
    deskripsiEvent: "Nikmati penampilan band-band indie terbaik tanah air di festival musik outdoor yang seru!",
    lokasiEvent: "Lapangan Parkir Timur Senayan, Jakarta Pusat",
    kategori: 'music',
    imageUrl: "/placeholder.svg",
    waktuEvent: "15:00 - 22:00 WIB"
  },
  {
    id: "event-002",
    namaEvent: "Workshop Kopi Manual Brewing Bandung",
    eventOrganizer: "Kopi Enthusiast Community",
    hargaEvent: 250000,
    tanggalEvent: "2025-07-22",
    deskripsiEvent: "Pelajari teknik-teknik manual brewing kopi dari ahlinya. Cocok untuk pemula maupun yang sudah berpengalaman.",
    lokasiEvent: "Kafé Kopi Aroma, Bandung, Jawa Barat",
    kategori: 'performing visual & arts',
    imageUrl: "/placeholder.svg",
    waktuEvent: "09:00 - 12:00 WIB"
  },
  {
    id: "event-003",
    namaEvent: "Pameran Seni Rupa Kontemporer Yogyakarta",
    eventOrganizer: "Sanggar Merah Putih",
    hargaEvent: 50000,
    tanggalEvent: "2025-09-01",
    deskripsiEvent: "Saksikan karya-karya seni rupa kontemporer dari berbagai seniman muda berbakat Indonesia.",
    lokasiEvent: "Jogja National Museum, Yogyakarta, DI Yogyakarta",
    kategori: 'performing visual & arts',
    imageUrl: "/placeholder.svg",
    waktuEvent: "10:00 - 18:00 WIB"
  },
  {
    id: "event-004",
    namaEvent: "Liga Futsal Amatir Jakarta",
    eventOrganizer: "Jakarta Sports Community",
    hargaEvent: 75000,
    tanggalEvent: "2025-06-10",
    deskripsiEvent: "Turnamen futsal tahunan untuk tim amatir dengan hadiah total 50 juta rupiah.",
    lokasiEvent: "GOR Soemantri Brodjonegoro, Kuningan, Jakarta Selatan",
    kategori: 'sport',
    imageUrl: "/placeholder.svg",
    waktuEvent: "08:00 - 17:00 WIB"
  },
  {
    id: "event-005",
    namaEvent: "Speed Dating Professionals Jakarta",
    eventOrganizer: "Urban Matchmakers",
    hargaEvent: 300000,
    tanggalEvent: "2025-07-05",
    deskripsiEvent: "Acara kencan cepat eksklusif untuk profesional usia 25-35 tahun di venue mejak Jakarta.",
    lokasiEvent: "The Hermitage Hotel, Menteng, Jakarta Pusat",
    kategori: 'dating',
    imageUrl: "/placeholder.svg",
    waktuEvent: "19:00 - 22:00 WIB"
  },
  {
    id: "event-006",
    namaEvent: "Seminar Fintech dan Blockchain",
    eventOrganizer: "Digital Finance Institute",
    hargaEvent: 500000,
    tanggalEvent: "2025-08-28",
    deskripsiEvent: "Peluang dan tantangan teknologi finansial di era digital dengan pembicara dari perusahaan fintech ternama.",
    lokasiEvent: "Balai Kartini, Jakarta Selatan",
    kategori: 'business',
    imageUrl: "/placeholder.svg",
    waktuEvent: "13:00 - 17:00 WIB"
  },
  {
    id: "event-007",
    namaEvent: "Konser Jazz Under The Stars",
    eventOrganizer: "Jazz Lovers Indonesia",
    hargaEvent: 350000,
    tanggalEvent: "2025-09-12",
    deskripsiEvent: "Nikmati malam indah dengan alunan jazz dari musisi ternama di bawah langit berbintang.",
    lokasiEvent: "Taman Menteng, Jakarta Pusat",
    kategori: 'music',
    imageUrl: "/placeholder.svg",
    waktuEvent: "18:00 - 23:00 WIB"
  },
  {
    id: "event-008",
    namaEvent: "Marathon Internasional Bali",
    eventOrganizer: "Bali Tourism Board",
    hargaEvent: 400000,
    tanggalEvent: "2025-10-05",
    deskripsiEvent: "Lari marathon dengan rute indah melewati pantai dan sawah terasering Bali.",
    lokasiEvent: "Start Line: Pantai Kuta, Bali",
    kategori: 'sport',
    imageUrl: "/placeholder.svg",
    waktuEvent: "05:00 - 12:00 WITA"
  },
  {
    id: "event-009",
    namaEvent: "Pameran Batik Nusantara",
    eventOrganizer: "Kementerian Pariwisata",
    hargaEvent: 35000,
    tanggalEvent: "2025-11-01",
    deskripsiEvent: "Pameran batik terbesar dengan koleksi dari berbagai daerah di Indonesia.",
    lokasiEvent: "Jakarta Convention Center, Senayan",
    kategori: 'performing visual & arts',
    imageUrl: "/placeholder.svg",
    waktuEvent: "09:00 - 21:00 WIB"
  },
  {
    id: "event-010",
    namaEvent: "Startup Pitch Competition",
    eventOrganizer: "Tech Ventures Indonesia",
    hargaEvent: 200000,
    tanggalEvent: "2025-07-18",
    deskripsiEvent: "Kompetisi pitch untuk startup early stage dengan hadiah modal usaha 1 miliar rupiah.",
    lokasiEvent: "GoWork Sudirman, Jakarta Pusat",
    kategori: 'business',
    imageUrl: "/placeholder.svg",
    waktuEvent: "10:00 - 16:00 WIB"
  }
];
