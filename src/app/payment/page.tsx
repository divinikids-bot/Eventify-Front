'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, Upload, MapPin, Calendar } from 'lucide-react';
import { dummyEvents } from '../data/dummy-events';

export default function PaymentPage() {
  const router = useRouter();
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [total, setTotal] = useState<number>(0);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cartParam = params.get('cart');
    const totalParam = params.get('total');
    const eventId = params.get('eventId');

    if (cartParam && totalParam) {
      setCart(JSON.parse(cartParam));
      setTotal(parseInt(totalParam, 10));
    }

    if (eventId) {
      const foundEvent = dummyEvents.find(event => event.id === eventId);
      if (foundEvent) {
        setEvent(foundEvent);
      }
    }
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      alert('Waktu pembayaran telah habis! Silakan ulangi pemesanan.');
      router.push('/');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, router]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setProofFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proofFile) {
      alert('Silakan unggah bukti pembayaran terlebih dahulu.');
      return;
    }
    alert('Pembayaran Anda sedang diproses!');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6 flex items-center justify-center">
      <div className="text-black max-w-4xl w-full bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
        {/* Event Header Section */}
        {event && (
          <div className="relative">
            <img
              src={event.imageUrl || '/placeholder.svg'}
              alt={event.namaEvent}
              className="w-[970px] h-[250px] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <h1 className="text-2xl font-bold text-white">{event.namaEvent}</h1>
              <div className="flex items-center text-sm text-white/90 gap-2 mt-1">
                <MapPin size={14} /> {event.lokasiEvent}
              </div>
              <div className="flex items-center text-sm text-white/90 gap-2">
                <Calendar size={14} /> {event.tanggalEvent}
              </div>
            </div>
          </div>
        )}

        <div className="p-8">
          {/* Payment Header with Timer */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Konfirmasi Pembayaran</h2>
            <div
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-white font-medium text-sm ${
                timeLeft <= 180 ? 'bg-red-600 animate-pulse' : 'bg-red-500'
              }`}
            >
              <Clock size={16} />
              {formatTime(timeLeft)}
            </div>
          </div>

          {/* Order Summary */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Ringkasan Pesanan</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Jumlah Tiket:</span>
                <span className="font-medium">
                  {Object.values(cart).reduce((a, b) => a + b, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Pembayaran:</span>
                <span className="text-xl font-bold text-blue-700">
                  Rp {total.toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Upload Bukti Pembayaran <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleUploadChange}
                  className="block w-full border border-gray-300 rounded-lg px-4 py-3 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-500 file:text-white hover:file:bg-red-700"
                  required
                />
                <Upload className="absolute top-3 right-4 text-blue-500" size={18} />
              </div>
              {proofFile && (
                <p className="text-sm text-green-600 mt-2 flex items-center">
                  <span className="mr-1">✓</span> {proofFile.name}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-2">
                Format: JPG, PNG, atau PDF (maks. 5MB)
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-[#172B4D] hover:bg-blue-800 transition-colors text-white font-semibold py-3 px-4 rounded-xl shadow-md"
            >
              Konfirmasi Pembayaran
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}