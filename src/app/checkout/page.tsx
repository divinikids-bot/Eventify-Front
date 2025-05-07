'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { dummyTickets, TicketOption } from '@/app/data/dummy-ticket';
import { dummyEvents, EventData } from '@/app/data/dummy-events';
import { MapPin, Calendar } from 'lucide-react';

const vouchers = [
  { code: 'DISKON10', type: 'percentage', value: 10 },
  { code: 'POTONG50K', type: 'amount', value: 50000 },
];

const POINT_VALUE = 100;
const MAX_USER_POINTS = 300;

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [tickets, setTickets] = useState<TicketOption[]>([]);
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [voucherCode, setVoucherCode] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState<any>(null);
  const [userPoints, setUserPoints] = useState(0);
  const [eventId, setEventId] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const queryCart = searchParams.get('cart');
    const eventId = searchParams.get('eventId');

    if (queryCart && eventId) {
      const parsedCart = JSON.parse(decodeURIComponent(queryCart));
      setCart(parsedCart);
      setEventId(eventId);
      const filteredTickets = dummyTickets.filter((ticket) => ticket.eventId === eventId);
      setTickets(filteredTickets);
      
      const foundEvent = dummyEvents.find((event) => event.id === eventId);
      if (foundEvent) {
        setEvent(foundEvent);
      }
    }

    setLoading(false);
  }, []);

  const getDiscountedPrice = (ticket: TicketOption) =>
    ticket.discountPercentage && ticket.discountPercentage > 0
      ? ticket.price * (1 - ticket.discountPercentage / 100)
      : ticket.price;

  const calculateSubtotal = () =>
    tickets.reduce((total, ticket) => {
      const quantity = cart[ticket.id] ?? 0;
      return total + quantity * getDiscountedPrice(ticket);
    }, 0);

  const getVoucherDiscount = (subtotal: number) =>
    appliedVoucher
      ? appliedVoucher.type === 'percentage'
        ? (appliedVoucher.value / 100) * subtotal
        : appliedVoucher.value
      : 0;

  const getPointDiscount = () => Math.min(userPoints, MAX_USER_POINTS) * POINT_VALUE;

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    return Math.max(0, subtotal - getVoucherDiscount(subtotal) - getPointDiscount());
  };

  const applyVoucher = () => {
    const found = vouchers.find((v) => v.code.toLowerCase() === voucherCode.toLowerCase());
    if (found) {
      setAppliedVoucher(found);
      alert(`Voucher "${found.code}" berhasil diterapkan.`);
    } else {
      alert('Kode voucher tidak valid.');
    }
  };

  const handlePayment = () => {
    const queryParams = new URLSearchParams({
      cart: JSON.stringify(cart),
      total: calculateTotal().toString(),
      voucher: appliedVoucher?.code || '',
      usedPoints: Math.min(userPoints, MAX_USER_POINTS).toString(),
    }).toString();

    router.push(`/payment?${queryParams}`);
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Memuat data...</p>;

  const selectedTickets = tickets.filter((ticket) => cart[ticket.id] && cart[ticket.id] > 0);
  if (selectedTickets.length === 0)
    return <p className="text-center mt-10 text-gray-500">Tidak ada tiket yang dipilih.</p>;

  const subtotal = calculateSubtotal();
  const voucherDiscount = getVoucherDiscount(subtotal);
  const pointDiscount = getPointDiscount();
  const total = calculateTotal();

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* HEADER */}
      <div className="bg-gradient-to-br from-[#172B4D] to-[#172B4D] text-white py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold">Beli Tiket</h1>
          <p className="text-sm opacity-90 mt-1">Pilih tiket untuk acara favoritmu</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* EVENT INFO */}
        {event && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
            <img
              src={event.imageUrl || '/placeholder.svg'}
              alt={event.namaEvent}
              className="w-[970px] h-[250px] rounded-lg object-cover"
            />
            <div>
              <h2 className="text-xl font-bold text-black">{event.namaEvent}</h2>
              <div className="flex items-center text-sm text-gray-600 gap-2 mt-1">
                <MapPin size={14} /> {event.lokasiEvent}
              </div>
              <div className="flex items-center text-sm text-gray-600 gap-2">
                <Calendar size={14} /> {event.tanggalEvent}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Kiri: Daftar Tiket */}
          <div className="flex-1 space-y-4">
            {selectedTickets.map((ticket) => {
              const quantity = cart[ticket.id];
              const discounted = getDiscountedPrice(ticket);

              return (
                <div
                  key={ticket.id}
                  className="border rounded-xl p-4 shadow-sm bg-white text-gray-800 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start flex-wrap gap-4">
                    <div className="space-y-1">
                      {ticket.discountPercentage && (
                        <span className="inline-block bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded-full">
                          Promo {ticket.discountPercentage}% OFF
                        </span>
                      )}
                      <h2 className="font-semibold text-lg">{ticket.title}</h2>
                      <p className="text-sm text-gray-600">{ticket.description}</p>
                      <p className="text-sm mt-1">Jumlah: {quantity}</p>
                      {ticket.saleEndDate && (
                        <p className="text-xs text-blue-600">
                          Penjualan berakhir:{' '}
                          {new Date(ticket.saleEndDate).toLocaleString('id-ID')}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      {ticket.discountPercentage ? (
                        <>
                          <p className="text-red-600 font-semibold">
                            Rp{discounted.toLocaleString('id-ID')}
                          </p>
                          <p className="line-through text-sm text-gray-400">
                            Rp{ticket.price.toLocaleString('id-ID')}
                          </p>
                        </>
                      ) : (
                        <p className="font-semibold text-gray-700">
                          Rp{ticket.price.toLocaleString('id-ID')}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Kanan: Ringkasan Pembayaran */}
          <div className="w-full lg:w-[320px] space-y-4 h-fit sticky top-6">
            <div className="border rounded-xl p-4 bg-white shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Ringkasan Pembayaran</h3>
              <div className="text-sm space-y-1 text-gray-700">
                <p>Subtotal: Rp{subtotal.toLocaleString('id-ID')}</p>
                {appliedVoucher && (
                  <p className="text-green-600">
                    Voucher ({appliedVoucher.code}): -Rp{voucherDiscount.toLocaleString('id-ID')}
                  </p>
                )}
                {userPoints > 0 && (
                  <p className="text-green-600">
                    Poin ({userPoints.toLocaleString('id-ID')}): -Rp{pointDiscount.toLocaleString('id-ID')}
                  </p>
                )}
                <hr className="my-2" />
                <p className="font-bold text-blue-700 text-lg">
                  Total: Rp{total.toLocaleString('id-ID')}
                </p>
              </div>

              {/* Input voucher */}
              <div className="mt-4 space-y-2">
                <label className="text-sm font-medium">Kode Voucher</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    className="w-full border rounded px-3 py-2 text-sm"
                    placeholder="Masukkan kode"
                  />
                  <button
                    onClick={applyVoucher}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 text-sm rounded transition"
                  >
                    Terapkan
                  </button>
                </div>
              </div>

              {/* Input poin */}
              <div className="mt-4">
                <label className="text-sm font-medium">
                  Gunakan Poin (maks. {MAX_USER_POINTS})
                </label>
                <input
                  type="number"
                  value={userPoints}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (!isNaN(value)) setUserPoints(value);
                  }}
                  className="w-full border rounded px-3 py-2 text-sm mt-1"
                  min={0}
                  max={MAX_USER_POINTS}
                />
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={total === 0}
              className={`w-full py-3   text-white font-semibold text-sm rounded-xl transition ${
                total === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#172B4D] hover:bg-blue-800'
              }`}
            >
              Bayar Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}