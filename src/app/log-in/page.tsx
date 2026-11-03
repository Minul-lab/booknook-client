"use client"
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaGoogle } from "react-icons/fa";

const LoginPage = () => {
  const handleLogIn = async(e: React.FormEvent<HTMLFormElement>)=> {
      e.preventDefault();
      
      const formData = new FormData(e.currentTarget);
      const userData = Object.fromEntries(formData.entries())
      
      const { data, error } = await authClient.signIn.email({
        
        email: userData.email as string,
        password: userData.password as string,
        
      });
      if(data){
        redirect("/")
      }
      if(error){
        alert(error)
      }
  
    }
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

            {/* Error Message Placeholder */}
            {/* Add your toast or error message here later */}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full rounded-xl bg-[#004D3B] px-6 py-3.5 font-bold text-white shadow-md transition hover:bg-[#00382B] hover:shadow-lg"
            >
              Login
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
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-6 py-3.5 font-semibold text-gray-700 transition hover:border-[#004D3B] hover:bg-[#FFF8E7]"
          >
            <FaGoogle className="text-lg" />
            Continue with Google
          </button>

          {/* Register Link */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{" "}
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
