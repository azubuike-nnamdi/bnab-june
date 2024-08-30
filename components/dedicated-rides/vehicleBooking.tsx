'use client'
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Car } from "@/types/declaration";
import { Button } from "../ui/button";

interface VehicleBookingProps {
  car: Car;
}

const VehicleBooking: React.FC<VehicleBookingProps> = ({ car }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleBooking = async (carId: number) => {
    // if (!session) {
    //   await signIn();
    //   router.push(`/dedicated-rides/booking/${carId}`);
    // } else {
    //   router.push(`/dedicated-rides/booking/${carId}`);
    // }
    router.push(`/dedicated-rides/booking/${carId}`);

  }

  return (
    <section className="sm:p-24 p-4">
      <div className="pt-20">
        <h2 className="text-4xl font-medium mb-8">Book Your Ride</h2>
        <div className="flex flex-wrap mt-12">
          <div className="w-full lg:w-2/3 mb-8 lg:mb-0">
            <h5 className="text-2xl font-medium text-gray-800 mb-2">{car.title}</h5>
            <p className="text-base text-gray-600 mb-4">{car.description}</p>
            <div className="mt-5 text-gray-600">
              <span className="mr-5">Passengers: {car.passenger}</span>
              <span>Luggage: {car.luggage}</span>
            </div>
            <div className="mt-8 text-center">
              <Image
                width={700}
                height={326}
                className="mx-auto"
                src={car.imgSrc}
                alt={car.title}
              />
            </div>
          </div>
          <div className="w-full lg:w-1/3">
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <ul className="mb-8">
                <li className="flex justify-between py-2 border-b border-gray-300">
                  <span>Day rate</span>
                  <span>{car.amt}</span>
                </li>
              </ul>
              <div className="mt-8">
                <Button
                  className="w-full py-3  text-white font-semibold rounded-lg flex justify-center items-center hover:bg-black-700"
                  onClick={() => handleBooking(car.id)}
                >
                  Book Now
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                    ></path>
                  </svg>
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap mt-8">
              <div className="w-1/2 mb-4 flex items-center">
                <span className="text-gray-600">Meet & Greet included</span>
              </div>
              <div className="w-1/2 mb-4 flex items-center">
                <span className="text-gray-600">Free cancellation</span>
              </div>
              <div className="w-1/2 mb-4 flex items-center">
                <span className="text-gray-600">Free Waiting time</span>
              </div>
              <div className="w-1/2 mb-4 flex items-center">
                <span className="text-gray-600">Safe and secure travel</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VehicleBooking;
