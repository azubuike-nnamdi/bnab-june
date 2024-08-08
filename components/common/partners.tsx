import { partners } from "@/lib/data/partner-data";
import Image from "next/image";

export default function Partners() {
  return (
    <main className="sm:px-24 px-4 py-4">
      <section className="grid sm:grid-cols-2 grid-cols-1 items-center">
        <h1 className="sm:text-3xl text-xl font-bold sm:w-6/12 sm:text-start text-center">The partners who sell
          our products</h1>
        <div className="sm:flex justify-between gap-6 ">
          {partners.map((partner) => (
            <Image key={partner.id} src={partner.url} alt="partners"
              width={300} height={300} className="w-[200px] sm:py-0 py-4 mx-auto" />
          ))}
        </div>
      </section>
    </main>
  )
}