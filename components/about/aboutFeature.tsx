import { features7 } from "@/lib/data/feature-data";
import Image from "next/image";
import Link from "next/link";

export default function AboutFeature() {
  return (
    <main className="sm:py-12 py-4 sm:p-0 p-4">
      <h3 className="sm:text-5xl font-semibold text-center text-gray-800 mb-3">Who We Are</h3>
      <p className="mx-auto sm:w-10/12 text-md">
        Welcome to Hyea Me Ha, your ultimate travel companion for exploring the vibrant and diverse country of Ghana. Our website is designed to make your travel experience seamless, enjoyable, and unforgettable by offering a wide range of services tailored to meet all your travel needs.
      </p>
      <ul className="list-disc list-inside text-lg text-gray-700 dark:text-gray-300 mb-10 sm:px-28 px-4 py-4 sm:mt-14">
        {features7.map((elm) => (
          <Link key={elm.id} href={elm.href}>
            <li className=" flex items-center gap-2 py-3">
              <Image src={"/img/tick.png"} alt="tick-image" width={20} height={20} />
              {elm.title}
            </li>

          </Link>
        ))}
      </ul>
    </main>
  )
}