import { FaSearch, FaBookmark, FaBookReader, FaUndoAlt } from "react-icons/fa";

const steps = [
  {
    title: "Browse Books",
    description:
      "Explore the full collection and find a book that catches your eye.",
    icon: FaSearch,
  },
  {
    title: "Borrow It",
    description:
      "Open the book details, click Borrow, and confirm. It takes seconds.",
    icon: FaBookmark,
  },
  {
    title: "Enjoy Reading",
    description: "Keep the book for a few days and read at your own pace.",
    icon: FaBookReader,
  },
  {
    title: "Return It",
    description:
      "Done reading? Return it from My Borrows so someone else can enjoy it.",
    icon: FaUndoAlt,
  },
];

const HowBorrowingWorks = () => {
  return (
    <section className="bg-[#FFF8E7] py-16">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[#004D3B] md:text-4xl">
            How Borrowing Works
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-[#004D3B]/70 md:text-base">
            Add a book, borrow a book, return a book. Four simple steps to your
            next read.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ title, description, icon: Icon }, index) => (
            <div
              key={title}
              className="relative flex h-full flex-col items-center rounded-2xl border border-[#004D3B]/15 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FFAA00] hover:shadow-lg"
            >
              <span className="absolute right-4 top-4 text-sm font-bold text-[#FFAA00]">
                0{index + 1}
              </span>

              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#004D3B] text-[#FFAA00]">
                <Icon className="h-7 w-7" />
              </div>

              <h3 className="mb-2 text-lg font-semibold text-[#004D3B]">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-[#004D3B]/70">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowBorrowingWorks;
