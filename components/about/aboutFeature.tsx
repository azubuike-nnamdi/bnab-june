import { features7 } from "@/lib/data/feature-data";
import Image from "next/image";

export default function AboutFeature() {
  return (
    <main className="sm:py-12 py-4">
      <h1 className="sm:text-5xl font-semibold text-center text-leading mb-3">Top-notch services that cater to your various needs.</h1>
      <p className="mx-auto sm:w-10/12 text-md">
        We strive to make your experience with us seamless, enjoyable, and hassle-free. Our mission is to deliver exceptional service with a personal touch, ensuring your satisfaction every step of the way. Experience professionalism, reliability, and a customer-centric approach!
      </p>
      <ul className="list-ticks list-ticks-small sm:px-28 px-4 py-4">
        {features7.map((elm, i) => (
          <li key={i} className=" flex items-center gap-2 py-3">
            <Image src={"/img/tick.png"} alt="tick-image" width={20} height={20} />
            {elm}
          </li>
        ))}
      </ul>
    </main>
  )
}