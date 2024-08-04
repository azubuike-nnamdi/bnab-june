import Image from "next/image";

export default function Hero() {
  return (
    <Image
      src="https://bnab-june.s3.amazonaws.com/img/about-banner.png"
      width={1920}
      height={550}
      alt="about-hero-image" />
  )
}