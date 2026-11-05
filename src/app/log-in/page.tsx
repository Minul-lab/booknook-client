"use client";

import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";

// Reads ?redirect=/some-page from the URL. Only allows internal paths.
const getRedirectPath = () => {
  const redirectTo = new URLSearchParams(window.location.search).get(
    "redirect",
  );
  if (
    redirectTo &&
    redirectTo.startsWith("/") &&
    !redirectTo.startsWith("//")
  ) {
    return redirectTo;
  }
  return "/";
};

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    try {
      setLoading(true);

      const { data, error } = await authClient.signIn.email({
        email: userData.email as string,
        password: userData.password as string,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password.");
        return;
      }

      if (data) {
        toast.success("Logged in successfully!");
        router.push(getRedirectPath());
        router.refresh();
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
        callbackURL: getRedirectPath(),
      });
    } catch (err) {
      toast.error("Could not sign in with Google.");
      console.error(err);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FFF8E7] px-4 py-12">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="rounded-3xl border border-[#004D3B]/10 bg-white p-6 shadow-xl sm:p-10">
          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-[#004D3B] sm:text-4xl">
              Welcome Back!
            </h1>

            <p className="mt-3 text-gray-500">
              Log in to your BookNook account
            </p>
          </div>

          {/* Login Form */}
          <form className="space-y-5" onSubmit={handleLogIn}>
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
                placeholder="Enter your password"
                className="w-full rounded-xl border border-gray-200 bg-[#FFF8E7]/40 px-4 py-3 text-gray-800 outline-none transition focus:border-[#004D3B] focus:ring-2 focus:ring-[#004D3B]/10"
              />
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm font-semibold text-[#004D3B] transition hover:text-[#FFAA00]"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#004D3B] px-6 py-3.5 font-bold text-white shadow-md transition hover:bg-[#00382B] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200"></div>
            <span className="text-sm text-gray-400">OR CONTINUE WITH</span>
            <div className="h-px flex-1 bg-gray-200"></div>
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-6 py-3.5 font-semibold text-gray-700 transition hover:border-[#004D3B] hover:bg-[#FFF8E7]"
          >
            <FaGoogle className="text-lg" />
            Continue with Google
          </button>

          {/* Register Link */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-bold text-[#004D3B] transition hover:text-[#FFAA00]"
            >
              Register Now
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Your next favorite book is waiting for you.
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
