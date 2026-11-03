import Image from "next/image";

const bookDetailPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:8000/all-books/${id}`);

  const data = await res.json();

  console.log(data);

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
          <div className="relative min-h-[350px] bg-gray-100 sm:min-h-[450px]">
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
            <button className="mt-8 w-full rounded-xl bg-[#004D3B] px-6 py-4 font-bold text-white shadow-md transition-all duration-300 hover:bg-[#00382B] hover:shadow-lg">
              Borrow This Book
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default bookDetailPage;
