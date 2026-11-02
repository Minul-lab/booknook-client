"use client"
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";



const slides = [
  {
    title: "Discover Your Next Favorite Book",
    description:
      "Explore thousands of stories, ideas, and adventures waiting for you.",
  },
  {
    title: "Expand Your Knowledge",
    description:
      "Learn something new every day with books that inspire and educate.",
  },
  {
    title: "Share the Joy of Reading",
    description:
      "Find your next great read and become part of our reading community.",
  },
];


const Banner = () => {
    return (
      <Swiper>
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <h2>{slide.title}</h2>
            <p>{slide.description}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    );
}

export default Banner;