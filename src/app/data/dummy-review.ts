export interface Review {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  author?: {
    name: string;}
  
}


export const EventReviews: Review[] = [
  // Reviews for Event 001
  {
    id: "review-001",
    eventId: "event-001",
    userId: "user-001",
    userName: "Andi Pratama",
    rating: 4,
    comment: "Suasana festivalnya sangat hidup! Sound system bagus tapi agak penuh.",
    date: "2025-08-16"
  },
  {
    id: "review-002",
    eventId: "event-001",
    userId: "user-002",
    userName: "Budi Santoso",
    rating: 5,
    comment: "Band-band indie yang tampil sangat berbakat. Worth the money!",
    date: "2025-08-17"
  },
  
  // Reviews for Event 002
  {
    id: "review-003",
    eventId: "event-002",
    userId: "user-003",
    userName: "Citra Dewi",
    rating: 5,
    comment: "Pematerinya sangat berpengalaman dan sabar mengajari peserta.",
    date: "2025-07-23"
  },
  
  // Reviews for Event 003
  {
    id: "review-004",
    eventId: "event-003",
    userId: "user-004",
    userName: "Dian Sastro",
    rating: 4,
    comment: "Karya seninya sangat inspiratif, tapi beberapa instalasi kurang terawat.",
    date: "2025-09-03"
  },
  
  // Reviews for Event 004
  {
    id: "review-005",
    eventId: "event-004",
    userId: "user-005",
    userName: "Eko Nugroho",
    rating: 3,
    comment: "Turnamennya seru tapi wasit kurang konsisten dalam mengambil keputusan.",
    date: "2025-06-12"
  },
  
  // Reviews for Event 005
  {
    id: "review-006",
    eventId: "event-005",
    userId: "user-006",
    userName: "Fira Amalia",
    rating: 4,
    comment: "Sistem matchingnya bagus, sudah dapat beberapa kontak menarik.",
    date: "2025-07-07"
  },
  
  // Reviews for Event 006
  {
    id: "review-007",
    eventId: "event-006",
    userId: "user-007",
    userName: "Gilang Ramadhan",
    rating: 5,
    comment: "Materi seminar sangat update dengan perkembangan industri saat ini.",
    date: "2025-08-29"
  },
  
  // Reviews for Event 007
  {
    id: "review-008",
    eventId: "event-007",
    userId: "user-008",
    userName: "Hana Lestari",
    rating: 5,
    comment: "Suasana romantis dengan musik jazz yang menghanyutkan. Perfect date night!",
    date: "2025-09-14"
  },
  
  // Reviews for Event 008
  {
    id: "review-009",
    eventId: "event-008",
    userId: "user-009",
    userName: "Irfan Maulana",
    rating: 4,
    comment: "Rute lari sangat indah tapi penyediaan air minum kurang banyak.",
    date: "2025-10-07"
  },
  
  // Reviews for Event 009
  {
    id: "review-010",
    eventId: "event-009",
    userId: "user-010",
    userName: "Jihan Aulia",
    rating: 5,
    comment: "Koleksi batiknya lengkap dari berbagai daerah. Beli beberapa kain untuk koleksi.",
    date: "2025-11-03"
  },
  
  // Reviews for Event 010
  {
    id: "review-011",
    eventId: "event-010",
    userId: "user-011",
    userName: "Kevin Anggara",
    rating: 4,
    comment: "Banyak startup menarik yang pitch. Networking opportunity bagus.",
    date: "2025-07-20"
  },
  
  // Additional reviews for Event 001
  {
    id: "review-012",
    eventId: "event-001",
    userId: "user-012",
    userName: "Lia Amelia",
    rating: 3,
    comment: "Parkirannya kurang luas, harus jalan jauh dari tempat parkir ke venue.",
    date: "2025-08-18"
  },
  
  // Additional reviews for Event 007
  {
    id: "review-013",
    eventId: "event-007",
    userId: "user-013",
    userName: "Maman Suherman",
    rating: 4,
    comment: "Pemain saxophone-nya luar biasa! Tapi harga makanan di venue agak mahal.",
    date: "2025-09-15"
  }
];