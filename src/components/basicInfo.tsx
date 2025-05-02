// 'use client';

// import { useState } from 'react';

// interface User {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
//   birthDate: string;
//   gender: string;
// }

// export default function BasicInfo({ user }: { user: User }) {
//   const [form, setForm] = useState(user);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = () => {
//     // Simpan perubahan ke server (misalnya pakai fetch/axios)
//     console.log('Form disimpan:', form);
//     alert('Perubahan disimpan!');
//   };

//   return (
//     <div>
//       <h3 className="text-2xl font-bold mb-4">Informasi Dasar</h3>

//       <div className="space-y-4 max-w-xl">
//         <input name="firstName" value={form.firstName} onChange={handleChange} className="w-full border px-4 py-2 rounded" placeholder="Nama Depan" />
//         <input name="lastName" value={form.lastName} onChange={handleChange} className="w-full border px-4 py-2 rounded" placeholder="Nama Belakang" />
//         <input name="email" value={form.email} disabled className="w-full border px-4 py-2 rounded bg-gray-100" />
//         <input name="phone" value={form.phone} onChange={handleChange} className="w-full border px-4 py-2 rounded" placeholder="Nomor HP" />
//         <input name="birthDate" type="date" value={form.birthDate} onChange={handleChange} className="w-full border px-4 py-2 rounded" />
        
//         <div className="flex gap-4">
//           <label>
//             <input type="radio" name="gender" value="Laki-laki" checked={form.gender === 'Laki-laki'} onChange={handleChange} />
//             Laki-laki
//           </label>
//           <label>
//             <input type="radio" name="gender" value="Perempuan" checked={form.gender === 'Perempuan'} onChange={handleChange} />
//             Perempuan
//           </label>
//         </div>

//         <button onClick={handleSubmit} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//           Simpan Perubahan
//         </button>
//       </div>
//     </div>
//   );
// }
