import Image from "next/image";
import BorrowBtn from "@/components/borrowBtn";

import { getTokenFromServer } from "@/lib/getTokenFromServer";

interface Book {
  _id: string;
  title: string;
  author: string;
  quantity?: number;
  category: string;
  image: string;
  description: string;
  submittedAt: string;
  addedBy?: {
    name?: string;
    email?: string;
  };
}

interface BookDetailPageProps {
  params: Promise<{ id: string }>;
}

const BookDetailPage = async ({ params }: BookDetailPageProps) => {
  const { id } = await params;

  const token =await getTokenFromServer()

  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/all-books/${id}`, {
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const data: Book = await res.json();

  return (
    <main className="min-h-screen bg-[#FFF8E7] px-4 py-12 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl">
        {/* Page Heading */}
        <div className="mb-10">
          <p className="mb-2 font-semibold text-[#FFAA00]">BOOK DETAILS</p>
          <h1 className="text-3xl font-bold text-[#004D3B] sm:text-4xl">
            Discover Your Next Read
          </h1>
        </div>

        {/* Details Card */}
        <div className="grid overflow-hidden rounded-3xl bg-white shadow-lg md:grid-cols-2">
          {/* Book Image */}
          <div className="relative min-h-87.5 bg-gray-100 sm:min-h-112.5">
            <Image
              src={data.image}
              alt={data.title}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Book Information */}
          <div className="flex flex-col p-6 sm:p-10">
            {/* Category */}
            <span className="mb-5 w-fit rounded-full bg-[#FFAA00]/15 px-4 py-2 text-sm font-semibold text-[#004D3B]">
              {data.category}
            </span>

            {/* Title */}
            <h2 className="text-3xl font-bold leading-tight text-[#004D3B] sm:text-4xl">
              {data.title}
            </h2>

            {/* Author */}
            <p className="mt-4 text-lg text-gray-500">
              Written by{" "}
              <span className="font-semibold text-gray-800">{data.author}</span>
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  (data.quantity ?? 0) > 0
                    ? "bg-[#004D3B]/10 text-[#004D3B]"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {(data.quantity ?? 0) > 0
                  ? `${data.quantity} ${data.quantity === 1 ? "copy" : "copies"} available`
                  : "Not Available"}
              </span>
            </div>

            <div className="my-8 border-t border-gray-200"></div>

            {/* Description */}
            <div>
              <h3 className="mb-3 text-xl font-bold text-[#004D3B]">
                About This Book
              </h3>

              <p className="text-base leading-8 text-gray-600">
                {data.description}
              </p>
            </div>

            {/* Added By */}
            <div className="mt-8 rounded-2xl bg-[#FFF8E7] p-5">
              <h3 className="mb-4 text-lg font-bold text-[#004D3B]">
                Added By
              </h3>

              <p className="font-semibold text-gray-800">
                {data.addedBy?.name || "Unknown User"}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {data.addedBy?.email || "No email available"}
              </p>
            </div>

            {/* Borrow Button */}
            <BorrowBtn data={data} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookDetailPage;
