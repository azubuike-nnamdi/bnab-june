import Footer from "@/components/common/footer";
import Hero from "@/components/common/hero";
import Navbar from "@/components/common/navbar";
import Fleet from "@/components/home/fleet";
import Services from "@/components/home/service";
export default function Home() {
  return (
    <main className="">
      <Navbar />
      <Hero />
      <Fleet />
      <Services />
      <Footer />
    </main>
  );
}
