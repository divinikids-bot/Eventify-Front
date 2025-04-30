export interface EventData {
    namaEvent: string;
    eventOrganizer: string;
    hargaEvent: number;
    tanggalEvent: string;
    deskripsiEvent: string;
    lokasiEvent: string;
    kategori: 'music' | 'sport' | 'performing visual & arts' | 'dating' | 'business';
  }
  export const dummyEvents: EventData[] = [
    {
      namaEvent: "Festival Musik Indie Jakarta",
      eventOrganizer: "Gelora Production",
      hargaEvent: 150000,
      tanggalEvent: "2025-08-15",
      deskripsiEvent: "Nikmati penampilan band-band indie terbaik tanah air di festival musik outdoor yang seru!",
      lokasiEvent: "Lapangan Parkir Timur Senayan, Jakarta Pusat",
      kategori: 'music',
    },
    {
      namaEvent: "Workshop Kopi Manual Brewing Bandung",
      eventOrganizer: "Kopi Enthusiast Community",
      hargaEvent: 250000,
      tanggalEvent: "2025-07-22",
      deskripsiEvent: "Pelajari teknik-teknik manual brewing kopi dari ahlinya. Cocok untuk pemula maupun yang sudah berpengalaman.",
      lokasiEvent: "Kafé Kopi Aroma, Bandung, Jawa Barat",
      kategori: 'performing visual & arts', // Kita anggap ini masuk kategori seni
    },
    {
      namaEvent: "Pameran Seni Rupa Kontemporer Yogyakarta",
      eventOrganizer: "Sanggar Merah Putih",
      hargaEvent: 50000,
      tanggalEvent: "2025-09-01",
      deskripsiEvent: "Saksikan karya-karya seni rupa kontemporer dari berbagai seniman muda berbakat Indonesia.",
      lokasiEvent: "Jogja National Museum, Yogyakarta, DI Yogyakarta",
      kategori: 'performing visual & arts',
    },
    {
      namaEvent: "Lomba Lari 10K Surabaya",
      eventOrganizer: "Surabaya Runners Club",
      hargaEvent: 100000,
      tanggalEvent: "2025-06-10",
      deskripsiEvent: "Uji ketahanan fisikmu dalam lomba lari 10 kilometer yang diadakan di pusat kota Surabaya.",
      lokasiEvent: "Jalan Tunjungan, Surabaya, Jawa Timur",
      kategori: 'sport',
    },
    {
      namaEvent: "Pelatihan Digital Marketing Bali",
      eventOrganizer: "Creative Digital Agency",
      hargaEvent: 500000,
      tanggalEvent: "2025-10-28",
      deskripsiEvent: "Tingkatkan kemampuan digital marketing-mu melalui pelatihan intensif bersama para praktisi ahli di Bali.",
      lokasiEvent: "Impact Hub Bali, Seminyak, Bali",
      kategori: 'business',
    },
    {
      namaEvent: "Festival Film Internasional Bandung",
      eventOrganizer: "Yayasan Citra Film Indonesia",
      hargaEvent: 75000,
      tanggalEvent: "2025-11-15",
      deskripsiEvent: "Saksikan berbagai film independen dan internasional terbaik dalam festival film tahunan di Bandung.",
      lokasiEvent: "CGV Paris Van Java, Bandung, Jawa Barat",
      kategori: 'performing visual & arts',
    },
    {
      namaEvent: "Konser Amal Glenn Fredly untuk NTT",
      eventOrganizer: "Sahabat Glenn Fredly Foundation",
      hargaEvent: 300000,
      tanggalEvent: "2025-07-05",
      deskripsiEvent: "Malam penggalangan dana untuk membantu masyarakat Nusa Tenggara Timur, dimeriahkan oleh musisi-musisi ternama.",
      lokasiEvent: "Convention Hall Kupang, Nusa Tenggara Timur",
      kategori: 'music',
    },
    {
      namaEvent: "Pelatihan Membatik Tradisional Pekalongan",
      eventOrganizer: "Sanggar Batik Puspa Kencana",
      hargaEvent: 400000,
      tanggalEvent: "2025-09-20",
      deskripsiEvent: "Belajar langsung teknik membatik tulis dan cap dari pengrajin batik berpengalaman di Pekalongan.",
      lokasiEvent: "Kampung Batik Kauman, Pekalongan, Jawa Tengah",
      kategori: 'performing visual & arts',
    },
    {
      namaEvent: "Pendakian Gunung Rinjani Bersama",
      eventOrganizer: "Lombok Adventure Club",
      hargaEvent: 1200000,
      tanggalEvent: "2025-08-01",
      deskripsiEvent: "Ekspedisi mendaki Gunung Rinjani selama 3 hari 2 malam dengan pemandangan danau Segara Anak yang menakjubkan.",
      lokasiEvent: "Desa Sembalun, Lombok Timur, Nusa Tenggara Barat",
      kategori: 'sport',
    },
    {
      namaEvent: "Festival Kuliner Nusantara Medan",
      eventOrganizer: "Medan Food Society",
      hargaEvent: 35000,
      tanggalEvent: "2025-06-25",
      deskripsiEvent: "Cicipi berbagai hidangan khas dari seluruh penjuru Nusantara dalam festival kuliner terbesar di Medan.",
      lokasiEvent: "Lapangan Merdeka Medan, Sumatera Utara",
      kategori: 'performing visual & arts', // Kita anggap kuliner sebagai bagian dari seni dan visual
    },
  ];