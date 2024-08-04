
import Hero from "@/components/common/hero";
import Faq from '@/components/common/faq';
import Fleet from "@/components/home/fleet";
import Services from "@/components/home/service";
import Process from "@/components/home/process";
import Features from "@/components/home/feature";
export default function Home() {
  return (
    <main className="">
      <Hero />
      <Fleet />
      <Services />
      <Process />
      <Features />
      <Faq />
    </main>
  );
}
