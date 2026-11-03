import Image from "next/image";
import Link from "next/link";

const NewArrivals = async () => {
  const res = await fetch("http://localhost:8000/latest-books");

  const books = await res.json();

  return (
    <section className="bg-[#FFF8E7] px-4 py-16 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-10 text-center">
          <p className="mb-2 font-semibold uppercase tracking-widest text-[#FFAA00]">
            Fresh From Our Library
          </p>

          <h2 className="text-3xl font-bold text-[#004D3B] sm:text-4xl">
            New Arrivals
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            Explore the newest additions to our collection. Find your next
            favorite book!
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <div
              key={book._id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#004D3B]/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Book Info */}
              <div className="flex flex-1 flex-col p-6">
                <span className="mb-3 w-fit rounded-full bg-[#FFAA00]/15 px-3 py-1 text-xs font-semibold text-[#004D3B]">
                  {book.category}
                </span>

                <h3 className="mb-2 text-xl font-bold text-[#004D3B]">
                  {book.title}
                </h3>

                <p className="mb-6 text-sm text-gray-500">By {book.author}</p>

                {/* Details Button */}
                <Link
                  href={`/books/${book._id}`}
                  className="mt-auto rounded-lg bg-[#004D3B] px-5 py-3 text-center font-semibold text-white transition-colors hover:bg-[#00382B]"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* See All Books */}
        <div className="mt-12 text-center">
          <Link
            href="/books"
            className="inline-block rounded-xl border-2 border-[#004D3B] px-8 py-3 font-bold text-[#004D3B] transition-all hover:bg-[#004D3B] hover:text-white"
          >
            See All Books →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
