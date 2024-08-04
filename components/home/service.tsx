import { SERVICES_URL } from "@/config/routes";
import { services } from "@/lib/data/services";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

export default function Services() {

  const settings = {
    spaceBetween: 30,
    slidesPerView: 4,
    slidesPerGroup: 1,
    loop: true,
    navigation: {
      nextEl: ".snbn3",
      prevEl: ".snbp3",
    },
    modules: [Navigation, Autoplay],
    autoplay: {
      delay: 10000,
    },
    breakpoints: {
      1399: {
        slidesPerView: 4,
      },
      1100: {
        slidesPerView: 3,
      },
      600: {
        slidesPerView: 2,
      },
      500: {
        slidesPerView: 1,
      },
      350: {
        slidesPerView: 1,
      },
      150: {
        slidesPerView: 1,
      },
    },
  };
  return (
    <main>
      <div className="container">
        <div className="flex justify-between items-center">
          <h1 className="sm:text-4xl text-xl font-bold wow fadeInUp swiper-title">
            Our Services
          </h1>
          <Link
            className="flex gap-3 items-center fadeInUp hover:text-red-800"
            href={SERVICES_URL}
          >
            More Services
            <MoveUpRight className='h-3 w-3' />
          </Link>
        </div>
        {/* A container for swservicesiper */}

      </div>
    </main>
  )
}

