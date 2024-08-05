'use client'
import { carBrands, cars, carTypes } from "@/lib/data/car-data";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function PickUpVehicles() {
  const [selectedCarTypes, setSelectedCarTypes] = useState<string>("All");
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [selectedCars, setSelectedCars] = useState(cars);

  useEffect(() => {
    let items = cars;
    if (selectedCarTypes !== "All") {
      items = items.filter((elm) => elm.carType === selectedCarTypes);
    }
    if (selectedBrand !== "All") {
      items = items.filter((elm) => elm.brand === selectedBrand);
    }
    setSelectedCars(items);
  }, [selectedCarTypes, selectedBrand]);
  return (
    <main className="pt-12">
      <section className="sm:p-24 p-4 bg-white">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-between mb-8">
            <h2 className="text-2xl font-medium">Choose your Vehicle</h2>
            <div className="flex space-x-4">
              <Select value={selectedCarTypes} onValueChange={setSelectedCarTypes}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Vehicle Type" />
                </SelectTrigger>
                <SelectContent>
                  {carTypes.map((elm) => (
                    <SelectItem key={elm} value={elm}>
                      {elm}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="relative inline-block text-left">
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Car Brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {carBrands.map((elm) => (
                      <SelectItem key={elm} value={elm}>
                        {elm}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap mt-8">
            {selectedCars.slice(0, 6).map((elm) => (
              <div key={elm.id} className="w-full md:w-1/2 lg:w-1/3 p-4">
                <div className="bg-white shadow-lg rounded-lg p-6">
                  <Link href={`/dedicated-rides/${elm.id}`}>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">{elm.title}</h3>
                  </Link>
                  <p className="text-gray-700 mb-4">{elm.description}</p>
                  <Link href={`/dedicated-rides/${elm.id}`}>
                    <Image
                      width={450}
                      height={250}
                      style={{ height: "fit-content" }}
                      src={elm.imgSrc}
                      alt={elm.title}
                    />
                  </Link>
                </div>
              </div>
            ))}
            {!selectedCars.length && <div>No item found. Try another filter</div>}
          </div>
          {/* <div className="text-center mt-10 mb-30">
            <nav className="inline-block">
              <Pagination />
            </nav>
          </div> */}
        </div>
      </section>
    </main>
  )
}