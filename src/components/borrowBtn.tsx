"use client"

import { authClient } from "@/lib/auth-client";

const BorrowBtn = ({data}) => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    const handleBorrowData = async () => {
      const borrowData = {
        email: user?.email,
        title: data.title,
        image: data.image,
        borrowedAt: new Date().toISOString(),
      };
      const res = await fetch("http://localhost:8000/borrow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(borrowData),
      });
    };
    return (
      <div>
        <button onClick={handleBorrowData} className="mt-8 w-full rounded-xl bg-[#004D3B] px-6 py-4 font-bold text-white shadow-md transition-all duration-300 hover:bg-[#00382B] hover:shadow-lg">
          Borrow This Book
        </button>
      </div>
    );
};

export default BorrowBtn;