
'use client'


import { features } from "@/lib/data/feature-data";
import Image from "next/image";
import { Fade } from "react-awesome-reveal";

export default function Features() {
  return (
    <Fade direction="up" cascade>
      <section className="mt-28">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl font-medium text-gray-800 wow fadeInUp">
              Elevate Your Experience with Us
            </h2>
          </div>
          <div className="flex flex-wrap justify-center mt-12">
            {features.map((elm, i) => (
              <div key={i} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                <div className="bg-white p-6  wow fadeInUp">
                  <div className="relative flex justify-center mb-4 w-12 h-12 bg-[#FCEFEC] rounded-full mx-auto">
                    <Image
                      width={48}
                      height={48}
                      src={elm.icon}
                      alt={elm.title}
                      className="absolute inset-0 m-auto w-6 h-6"
                    />
                  </div>
                  <h5 className="text-xl font-medium text-gray-800 mb-2">
                    {elm.title}
                  </h5>
                  <p className="text-base text-gray-600">
                    {elm.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Fade>
  );
}
