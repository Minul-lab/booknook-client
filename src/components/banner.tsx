"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    title: "Discover Your Next Favorite Book",
    description:
      "Explore thousands of stories, ideas, and adventures waiting for you.",
    image: "/banner1.jpg",
  },
  {
    title: "Expand Your Knowledge",
    description:
      "Learn something new every day with books that inspire and educate.",
    image: "/banner2.jpg",
  },
  {
    title: "Share the Joy of Reading",
    description:
      "Find your next great read and become part of our reading community.",
    image: "/banner3.jpg",
  },
];


const Banner = () => {
  return (
    <section className="mx-auto ">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop
        speed={700}
        className="booknook-slider"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.title} className="">
            <div className="container mx-auto relative flex min-h-105 items-center  rounded-2xl px-8 py-16 md:min-h-125 md:px-16">
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-linear-to-r from-[#004D3B]/65 via-[#004D3B]/40 to-transparent" />

              {/* Slide Content */}
              <div className="relative z-10 max-w-2xl space-y-6">
                <h2 className="text-3xl font-bold text-[#FFF8E7] md:text-5xl">
                  {slide.title}
                </h2>

                <p className="text-base leading-relaxed text-[#FFF8E7]/90 md:text-lg">
                  {slide.description}
                </p>

                <Button
                  render={<Link href="/books" />}
                  nativeButton={false}
                  className="bg-[#FFAA00] font-semibold text-[#004D3B] hover:bg-[#FFF8E7]"
                >
                  Browse Books
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;
