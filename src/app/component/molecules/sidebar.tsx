'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../../lib/utils';

const menuItems = [
  { name: 'Jelajah Event', href: '/events' },
  { name: 'Tiket Saya', href: '/tickets' },
];

const accountItems = [
  { name: 'Informasi Dasar', href: '/account/info' },
  { name: 'Pengaturan', href: '/account/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#0D1B49] min-h-screen text-white p-4 flex flex-col">
      <div className="text-lg font-bold mb-6">🎟️ LOKET</div>

      <div className="mb-6">
        <div className="text-sm font-semibold mb-2">Menu</div>
        {menuItems.map(item => (
          <Link href={item.href} key={item.href}>
            <div
              className={cn(
                'px-4 py-2 rounded hover:bg-blue-600 cursor-pointer',
                pathname === item.href && 'bg-blue-700'
              )}
            >
              {item.name}
            </div>
          </Link>
        ))}
      </div>

      <div className="mb-6">
        <div className="text-sm font-semibold mb-2">Akun</div>
        {accountItems.map(item => (
          <Link href={item.href} key={item.href}>
            <div
              className={cn(
                'px-4 py-2 rounded hover:bg-blue-600 cursor-pointer',
                pathname === item.href && 'bg-blue-700'
              )}
            >
              {item.name}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-auto">
        <Link href="/switch-to-creator">
          <div className="px-4 py-2 rounded bg-white text-[#0D1B49] text-sm font-semibold hover:bg-gray-200 cursor-pointer">
            Beralih ke Event Creator
          </div>
        </Link>
      </div>
    </aside>
  );
}
