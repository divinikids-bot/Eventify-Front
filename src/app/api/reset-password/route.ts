// /app/api/reset-password/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { token, newPassword } = await req.json();

    console.log('Menerima request reset password:', { token, newPassword });

    // TODO: Validasi token di database dan update password user
    // Di sini kamu biasanya:
    // - Cek apakah token valid dan belum expired
    // - Cari user berdasarkan token
    // - Hash password baru
    // - Update password user di database
    // Untuk sekarang kita pura-pura berhasil dulu ya

    // Simulasi berhasil
    return NextResponse.json({ message: 'Password berhasil direset' }, { status: 200 });
  } catch (error) {
    console.error('Error saat reset password:', error);
    return NextResponse.json({ error: 'Terjadi kesalahan saat reset password' }, { status: 500 });
  }
}
