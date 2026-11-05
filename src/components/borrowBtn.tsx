"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

interface BorrowBtnProps {
  data: {
    _id: string;
    title: string;
    image: string;
    quantity?: number;
    author?: string;
    category?: string;
    description?: string;
    submittedAt?: string;
    addedBy?: {
      name?: string;
      email?: string;
    };
  };
}

const BorrowBtn = ({ data }: BorrowBtnProps) => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [loading, setLoading] = useState(false);

  const isAvailable = (data.quantity ?? 0) > 0;

  const handleBorrowData = async () => {
    if (!user) {
      router.push(`/login?redirect=/books/${data._id}`);
      return;
    }

    if (!isAvailable) {
      toast.error("This book is not available right now.");
      return;
    }

    try {
      setLoading(true);

      const token = await getTokenFromClient();

      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/borrow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bookId: data._id,
          title: data.title,
          image: data.image,
          borrowedAt: new Date().toISOString(),
        }),
      });

      if (res.status === 409) {
        toast.error("You already borrowed this book.");
        return;
      }

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        toast.error(body?.msg || "Could not borrow the book.");
        return;
      }

      toast.success("Book borrowed successfully!");
      router.refresh(); // reloads the page data so the quantity updates
    } catch (error) {
      toast.error("Could not borrow the book.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleBorrowData}
        disabled={!isAvailable || loading}
        className="mt-8 w-full rounded-xl bg-[#004D3B] px-6 py-4 font-bold text-white shadow-md transition-all duration-300 hover:bg-[#00382B] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-[#004D3B]"
      >
        {!isAvailable
          ? "Not Available"
          : loading
            ? "Borrowing..."
            : "Borrow This Book"}
      </button>
    </div>
  );
};

export default BorrowBtn;
