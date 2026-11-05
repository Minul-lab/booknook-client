import Image from "next/image";
import Link from "next/link";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  image: string;
}

const AllBooksPage = async () => {
  let books: Book[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/all-books`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch books");
    }

    books = await res.json();
  } catch (error) {
    console.error(error);
  }

  return (
    <main className="min-h-screen bg-[#FFF8E7] px-4 py-12 sm:px-8 lg:px-16">
      {/* Page Heading */}
      <div className="mx-auto mb-12 max-w-7xl text-center">
        <h1 className="text-3xl font-bold text-[#004D3B] sm:text-4xl">
          Explore Our Books
        </h1>

        <p className="mt-3 text-gray-600">
          Discover your next favorite book from our collection.
        </p>
      </div>

      {/* Books Grid */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <div
            key={book._id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-[#004D3B]/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FFAA00] hover:shadow-lg"
          >
            {/* Book Image */}
            <div className="aspect-4/3 overflow-hidden bg-gray-100">
              <Image
                src={book.image}
                alt={book.title}
                width={150}
                height={300}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Book Information */}
            <div className="flex flex-1 flex-col p-6">
              <span className="mb-3 w-fit rounded-full bg-[#FFAA00]/15 px-3 py-1 text-xs font-semibold text-[#00382B]">
                {book.category}
              </span>

              <h2 className="mb-2 text-xl font-bold text-[#004D3B]">
                {book.title}
              </h2>

              <p className="mb-6 text-sm text-gray-500">By {book.author}</p>

              {/* View Details Button */}
              <Link
                href={`/books/${book._id}`}
                className="mt-auto rounded-lg bg-[#004D3B] px-5 py-3 text-center font-semibold text-white transition-colors duration-200 hover:bg-[#00382B]"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {books.length === 0 && (
        <div className="py-20 text-center">
          <h2 className="text-2xl font-bold text-[#004D3B]">No Books Found</h2>
          <p className="mt-2 text-gray-500">
            There are currently no books available.
          </p>
        </div>
      )}
    </main>
  );
};

export default AllBooksPage;
