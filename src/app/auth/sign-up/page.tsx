'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'regular',
    referralCode: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAccountTypeChange = (type: string) => {
    setFormData({
      ...formData,
      accountType: type,
      referralCode: type === 'regular' ? formData.referralCode : '', // clear referral if not regular
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    setIsSubmitting(true);

    try {
      const encryptedPassword = btoa(formData.password);
      const encryptedConfirmPassword = btoa(formData.confirmPassword);

      console.log('Register Form Data:', {
        ...formData,
        password: encryptedPassword,
        confirmPassword: encryptedConfirmPassword,
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      alert('Registration successful!');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-8">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12">
        {/* Left: Mascot + Text */}
        <div className="flex flex-col items-center gap-6 text-center">
          <Image
            src="/images/mascot.png"
            alt="Sign Up Illustration"
            width={400}
            height={400}
            className="w-full max-w-xs md:max-w-md mx-auto"
            priority
          />
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Bergabunglah bersama Eventify
            </h2>
            <p className="text-gray-800 text-2xl font-bold max-w-md mx-auto">
              Daftar dan temukan pengalaman baru dalam event dan konser favoritmu.
            </p>
          </div>
        </div>

        {/* Right: Sign Up Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 w-full max-w-md mx-auto border border-gray-100">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Create an Account</h2>
            <p className="text-gray-500 mt-2">
              Join Eventify to discover and attend amazing events
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-gray-700 text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border border-gray-300 text-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Your Full Name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 text-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                minLength={8}
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 text-gray-700 rounded-lg px-4 py-2.5 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                required
                minLength={8}
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 text-gray-700 rounded-lg px-4 py-2.5 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={toggleShowConfirmPassword}
                className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Account Type */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Account Type</label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`flex items-center justify-center gap-2 p-3 border rounded-lg cursor-pointer transition ${formData.accountType === 'regular' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}>
                  <input
                    type="radio"
                    name="accountType"
                    value="regular"
                    checked={formData.accountType === 'regular'}
                    onChange={() => handleAccountTypeChange('regular')}
                    className="text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Regular User</span>
                </label>
                <label className={`flex items-center justify-center gap-2 p-3 border rounded-lg cursor-pointer transition ${formData.accountType === 'organizer' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}>
                  <input
                    type="radio"
                    name="accountType"
                    value="organizer"
                    checked={formData.accountType === 'organizer'}
                    onChange={() => handleAccountTypeChange('organizer')}
                    className="text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Event Organizer</span>
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {formData.accountType === 'regular'
                  ? "As a regular user, you can discover and attend events"
                  : "As an organizer, you can create and manage events"}
              </p>
            </div>

            {/* Referral Code - only show for regular users */}
            {formData.accountType === 'regular' && (
              <div>
                <label htmlFor="referralCode" className="block text-gray-700 text-sm font-medium mb-1">
                  Referral Code <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  id="referralCode"
                  name="referralCode"
                  type="text"
                  value={formData.referralCode}
                  onChange={handleChange}
                  className="w-full border border-gray-300 text-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Enter referral code (if any)"
                />
              </div>
            )}

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                />
              </div>
              <label htmlFor="terms" className="ms-2 text-sm text-gray-500">
                I agree to the <a href="#" className="text-blue-600 hover:underline">Terms and Conditions</a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-gray-500 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 font-medium hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
