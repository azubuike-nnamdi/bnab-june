// components/ticket-master/SkeletonBookingTicketCard.tsx

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const SkeletonBookingTicketCard = () => {
  return (
    <Card className="p-4">
      <CardHeader>
        <Skeleton className="w-full h-48" /> {/* Image Placeholder */}
      </CardHeader>
      <CardContent>
        <Skeleton className="h-6 w-1/2 mb-4" /> {/* Title Placeholder */}
        <Skeleton className="h-4 w-full mb-2" /> {/* Description Placeholder */}
        <Skeleton className="h-4 w-3/4 mb-4" /> {/* Address Placeholder */}
        <div className="flex gap-3 py-3">
          <Skeleton className="h-4 w-1/4" /> {/* Time Placeholder */}
          <Skeleton className="h-4 w-1/4" /> {/* Date Placeholder */}
        </div>
        <div className="flex gap-4 items-center mb-4">
          <Skeleton className="h-4 w-1/4" /> {/* Phone Number Placeholder */}
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-1/2" /> {/* Button Placeholder */}
      </CardFooter>
    </Card>
  );
};

export default SkeletonBookingTicketCard;
