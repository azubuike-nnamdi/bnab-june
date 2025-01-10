import { legalLinks, links1, links2, links3, links4, socialMediaPlatforms } from "@/lib/data/data";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white ">
      <div className="container mx-auto py-8 px-4">
        <div className="border-b border-gray-700 pb-8 mb-8">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center mb-4 lg:mb-0">
              <Link href="/">
                <h1 className="text-2xl font-bold mr-8">Hyea Me Ha</h1>
              </Link>
              <Link
                className="text-sm hover:underline"
                href="tel:+233241111122"
              >
                +233 24 111 1122
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-lg font-medium">Follow Us</span>
              {socialMediaPlatforms.map((elm) => (
                <Image key={elm.id} src={elm?.img} alt={elm.name} width={15} height={5} />

              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h5 className="text-lg font-medium mb-4">Company</h5>
            <ul className="space-y-2">
              {links1.map((elm) => (
                <li key={elm.id}>
                  <Link className="hover:underline" href={elm.href}>
                    {elm.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-medium mb-4">Top Cities</h5>
            <ul className="space-y-2">
              {links2.map((elm) => (
                <li key={elm.id}>
                  <a className="hover:underline" href={elm.href}>
                    {elm.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-medium mb-4">Explore</h5>
            <ul className="space-y-2">
              {links3.map((elm) => (
                <li key={elm.id}>
                  <a className="hover:underline" href={elm.href}>
                    {elm.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-medium mb-4">Rides</h5>
            <ul className="space-y-2">
              {links4.map((elm) => (
                <li key={elm.id}>
                  <a className="hover:underline" href={elm.href}>
                    {elm.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* <div>
            <h5 className="text-lg font-medium mb-4">Download The App</h5>
            <div className="space-y-4">
              <Link
                className="flex items-center space-x-2 bg-gray-900 hover:bg-gray-700 rounded py-2 px-4"
                href="#"
              >
                <Image
                  width={19}
                  height={23}
                  src="/img/apple-icon.svg"
                  alt="Apple Store"
                />
                <div>
                  <span className="block text-xs">Download on the</span>
                  <span className="font-medium">Apple Store</span>
                </div>
              </Link>
              <Link
                className="flex items-center space-x-2 bg-gray-900 hover:bg-gray-700 rounded py-2 px-4"
                href="#"
              >
                <Image
                  width={23}
                  height={26}
                  src="/img/google-icon.svg"
                  alt="Play Store"
                />
                <div>
                  <span className="block text-xs">Download on the</span>
                  <span className="font-medium">Play Store</span>
                </div>
              </Link>
            </div>
          </div> */}
        </div>
        <div className="border-t border-gray-700 pt-4">
          <div className="flex flex-wrap items-center justify-between">
            <div className="text-sm">
              <span>© {new Date().getFullYear()} Hyea Me Ha</span>
              {/* <ul className="flex space-x-4 mt-2">
                {legalLinks.map((elm) => (
                  <li key={elm.id}>
                    <Link className="hover:underline" href={elm.href}>
                      {elm.name}
                    </Link>
                  </li>
                ))}
              </ul> */}
            </div>
            <div className="flex space-x-4 mt-2">
              <a
                className="hover:underline"
                href="#"
              >
                Ghana
              </a>
              <a
                className="hover:underline"
                href="#"
              >
                English
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
