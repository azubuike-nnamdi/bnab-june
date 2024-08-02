import { SERVICES_URL } from "@/config/routes";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";

export default function Services() {
  return (
    <main>
      <div className="container">
        <div className="flex justify-between items-center">
          <h1 className="sm:text-4xl text-xl font-bold wow fadeInUp swiper-title">
            Our Services
          </h1>
          <Link
            className="flex gap-3 items-center fadeInUp"
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

