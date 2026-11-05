"use client";

import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";

const SignUpPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());
    const password = userData.password as string;

    // Password validation
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain an uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain a lowercase letter.");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await authClient.signUp.email({
        name: userData.name as string,
        email: userData.email as string,
        password,
        image: userData.image as string,
      });

      if (error) {
        toast.error(error.message || "Could not create your account.");
        return;
      }

      if (data) {
        toast.success("Account created successfully! Please log in.");
        router.push("/login");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", // where to go after a successful login
      });
    } catch (err) {
      toast.error("Could not sign in with Google.");
      console.error(err);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FFF8E7] px-4 py-12">
      <div className="w-full max-w-md">
        {/* Register Card */}
        <div className="rounded-3xl border border-[#004D3B]/10 bg-white p-6 shadow-xl sm:p-10">
          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-[#004D3B] sm:text-4xl">
              Create Account
            </h1>

            <p className="mt-3 text-gray-500">
              Join BookNook and discover your next favorite book.
            </p>
          </div>

          {/* Register Form */}
          <form className="space-y-5" onSubmit={handleSignUp}>
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-[#004D3B]"
              >
                Full Name
              </label>

              <input
                id="name"
                type="text"
                name="name"
                required
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-gray-200 bg-[#FFF8E7]/40 px-4 py-3 text-gray-800 outline-none transition focus:border-[#004D3B] focus:ring-2 focus:ring-[#004D3B]/10"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-[#004D3B]"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="w-full rounded-xl border border-gray-200 bg-[#FFF8E7]/40 px-4 py-3 text-gray-800 outline-none transition focus:border-[#004D3B] focus:ring-2 focus:ring-[#004D3B]/10"
              />
            </div>

            {/* Photo URL */}
            <div>
              <label
                htmlFor="photo"
                className="mb-2 block text-sm font-semibold text-[#004D3B]"
              >
                Profile Photo URL
              </label>

              <input
                id="photo"
                type="url"
                name="image"
                required
                placeholder="https://example.com/photo.jpg"
                className="w-full rounded-xl border border-gray-200 bg-[#FFF8E7]/40 px-4 py-3 text-gray-800 outline-none transition focus:border-[#004D3B] focus:ring-2 focus:ring-[#004D3B]/10"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-[#004D3B]"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                name="password"
                required
                placeholder="Create a password"
                className="w-full rounded-xl border border-gray-200 bg-[#FFF8E7]/40 px-4 py-3 text-gray-800 outline-none transition focus:border-[#004D3B] focus:ring-2 focus:ring-[#004D3B]/10"
              />

              {/* Password Requirements */}
              <div className="mt-3 space-y-2 text-xs text-gray-500">
                <p>Password must contain:</p>

                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FFAA00]"></span>
                  At least one uppercase letter
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FFAA00]"></span>
                  At least one lowercase letter
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FFAA00]"></span>
                  At least 6 characters long
                </div>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#004D3B] px-6 py-3.5 font-bold text-white shadow-md transition hover:bg-[#00382B] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200"></div>
            <span className="text-sm text-gray-400">OR SIGN UP WITH</span>
            <div className="h-px flex-1 bg-gray-200"></div>
          </div>

          {/* Google Register */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-6 py-3.5 font-semibold text-gray-700 transition hover:border-[#004D3B] hover:bg-[#FFF8E7]"
          >
            <FaGoogle className="text-lg" />
            Continue with Google
          </button>

          {/* Login Link */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/log-in"
              className="font-bold text-[#004D3B] transition hover:text-[#FFAA00]"
            >
              Login Now
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Welcome to your little corner of books.
        </p>
      </div>
    </main>
  );
};

export default SignUpPage;
