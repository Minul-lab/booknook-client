import Link from "next/link";
import {
  FaBookOpen,
  FaFlask,
  FaLandmark,
  FaChild,
  FaLayerGroup,
} from "react-icons/fa";

const categories = [
  {
    name: "Fiction",
    description: "Stories, novels and imaginary worlds.",
    icon: FaBookOpen,
  },
  {
    name: "Science",
    description: "Discover how the world and universe work.",
    icon: FaFlask,
  },
  {
    name: "History",
    description: "Travel back through people, places and events.",
    icon: FaLandmark,
  },
  {
    name: "Kids",
    description: "Fun and colorful reads for young readers.",
    icon: FaChild,
  },
  {
    name: "Others",
    description: "Everything else worth reading.",
    icon: FaLayerGroup,
  },
];

const TopCategories = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[#004D3B] md:text-4xl">
            Top Categories
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-[#004D3B]/70 md:text-base">
            Pick a category that matches your mood and start exploring.
          </p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {categories.map(({ name, description, icon: Icon }) => (
            <Link
              key={name}
              href="/books"
              className="group flex h-full flex-col items-center rounded-2xl border border-[#004D3B]/15 bg-[#FFF8E7] p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#FFAA00] hover:bg-[#004D3B] hover:shadow-lg"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#FFAA00]/20 text-[#004D3B] transition-colors group-hover:bg-[#FFAA00]">
                <Icon className="h-6 w-6" />
              </div>

              <h3 className="mb-2 text-lg font-semibold text-[#004D3B] transition-colors group-hover:text-[#FFAA00]">
                {name}
              </h3>
              <p className="text-sm leading-relaxed text-[#004D3B]/70 transition-colors group-hover:text-[#FFF8E7]/80">
                {description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCategories;
