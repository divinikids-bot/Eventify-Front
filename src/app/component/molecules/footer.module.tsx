// app/components/footer.tsx
import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#172B4D] text-white px-6 md:px-20 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand & Description */}
        <div>
          <h2 className="font-bold text-lg mb-2">Eventify</h2>
          <p className="text-sm text-gray-300 mb-4">
            Find and join exciting events happening around you.
          </p>
          <div className="flex gap-3">
            <Facebook size={18} className="cursor-pointer hover:text-gray-400" />
            <Twitter size={18} className="cursor-pointer hover:text-gray-400" />
            <Instagram size={18} className="cursor-pointer hover:text-gray-400" />
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="font-semibold text-white mb-3">Company</h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="font-semibold text-white mb-3">Support</h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        {/* Subscribe Form */}
        <div>
          <h3 className="font-semibold text-white mb-3">Subscribe</h3>
          <p className="text-sm text-gray-300 mb-3">
            Stay updated with our latest events and offers.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 w-full bg-white border border-white text-gray-800 placeholder-gray-400 rounded-l-md focus:outline-none"
            />
            <button
              type="submit"
              className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-r-md hover:bg-yellow-300"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-gray-400">
        © 2025 Eventify. All rights reserved.
      </div>
    </footer>
  );
}
