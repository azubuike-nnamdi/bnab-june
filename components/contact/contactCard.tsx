import { contactCards } from "@/lib/data/contact-data";
import Image from "next/image";
import ContactForm from "./contactForm";

export default function ContactCard() {
  return (
    <main className="grid grid-cols-2 sm:p-24 p-4 sm:gap-6">
      <section>
        <ContactForm />
      </section>
      <section>
        <h1 className="sm:text-3xl text-xl font-medium mb-6">Our offices</h1>
        <div className="grid grid-cols-2 sm:gap-12 gap-4">
          {contactCards.map((contact) => (
            <div key={contact.id}>
              <div className="">
                <Image src={contact.imageSrc} alt={contact.city} width={80} height={50} />
                <h1 className="py-3 text-md font-semibold">{contact.city}</h1>
                <div>
                  <p className="text-sm">{contact.box}</p>
                  <p className="text-sm mb-3">{contact.address}</p>
                  <p className="text-sm mb-3">{contact.phone}</p>
                  <p className="text-sm">{contact.email}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}