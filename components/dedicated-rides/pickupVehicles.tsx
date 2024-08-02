'use client'
import { cars } from "@/lib/data/car-data";
import { useEffect, useState } from "react";

export default function PickUpVehicles() {
  const [selectedCarTypes, setSelectedCarTypes] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedCars, setSelectedCars] = useState(cars);

  useEffect(() => {
    let items = cars;
    if (selectedCarTypes != "All") {
      items = items.filter((elm) => elm.carType == selectedCarTypes);
    }
    if (selectedBrand != "All") {
      items = items.filter((elm) => elm.brand == selectedBrand);
    }
    setSelectedCars(items);
  }, [selectedCarTypes, selectedBrand]);
  return (
    <main className="pt-12">

    </main>
  )
}