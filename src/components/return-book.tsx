"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

interface ReturnBtnProps {
  book: {
    _id: string;
    title?: string;
    image?: string;
    email?: string;
    borrowedAt?: string;
  };
}

const ReturnBtn = ({ book }: ReturnBtnProps) => {
  const handleReturn = async () => {
    const token = await getTokenFromClient();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/borrow/${book._id}`,
        {
          method: "DELETE",
          headers: { authorization: `Bearer ${token}` },
        },
      );

      if (!res.ok) {
        throw new Error("Failed to return book");
      }

      toast.success("Book returned successfully!");
    } catch (error) {
      toast.error("Could not return the book.");
      console.error(error);
    }
  };

  return (
    <div>
      <Button
        onClick={handleReturn}
        variant="outline"
        className="border-[#004D3B] text-[#004D3B] hover:bg-[#004D3B] hover:text-white"
      >
        Return Book
      </Button>
    </div>
  );
};

export default ReturnBtn;
