import React from "react";
import { DedicatedRideBookingProps } from "@/types/declaration";
import { formatCurrency } from "@/lib/helper";


// interface Car {
//   amt: string;
//   carType: string;
// }

interface SideBarProps {
  // car: Car | null;
  formData: DedicatedRideBookingProps;
}

const BookingSidebar: React.FC<SideBarProps> = ({ formData }) => {

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h6 className="text-lg font-bold text-gray-800">Ride Summary</h6>
        </div>
      </div>

      <div className="mb-6">
        <ul className="list-disc list-inside">
          <li className="flex justify-between items-center my-2">
            <span className="text-base text-gray-800 sm:text-xs">Selected vehicle:</span>
            <span className="text-base text-gray-800">{formData.vehicleType}</span>
          </li>
          <li className="flex justify-between items-center my-2">
            <span className="text-base text-gray-800 sm:text-xs">Pickup Location:</span>
            <span className="text-base text-gray-800">{formData.pickUpLocation}</span>
          </li>
          <li className="flex justify-between items-center my-2">
            <span className="text-base text-gray-800 sm:text-xs">Dropoff Location:</span>
            <span className="text-base text-gray-800">{formData.dropOffLocation}</span>
          </li>
          <li className="flex justify-between items-center my-2">
            <span className="text-base text-gray-800 sm:text-xs">Price:</span>
            <span className="text-base text-gray-800">${formData.price}</span>
          </li>
          <li className="flex justify-between items-center my-2">
            <span className="text-base text-gray-800 sm:text-xs">Total Number of Days:</span>
            <span className="text-base text-gray-800">{formData.numberOfDays}</span>
          </li>
        </ul>
      </div>

      <div className="border-t border-gray-200 my-4"></div>

      <div>
        <ul className="list-disc list-inside">
          <li className="flex justify-between items-center">
            <span className="text-lg font-medium text-gray-800">Total:</span>
            <span className="text-lg font-medium text-gray-800">{formatCurrency(formData.totalAmount)}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BookingSidebar;
