import { BreadCrumb } from "@/components/common/breadcrumb";
import Training from "@/components/training";
import { Art } from "@/components/training/Art";
import { Discover } from "@/components/training/Discover";
import TrainingCard from "@/components/training/TrainingCard";
import { trainingLink } from "@/lib/data/breadcrumb";

export default function page() {
  return (
    <main>
      <BreadCrumb title="Training" links={trainingLink} />
      <div className="sm:px-24 p-8">
        <h1 className="text-2xl font-bold mb-6">Training Programme Booking</h1>
        <TrainingCard />

      </div>
      {/* <Training />
      <Art />
      <Discover /> */}
    </main>
  )
}