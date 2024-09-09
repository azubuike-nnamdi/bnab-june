import React from "react";
import { DedicatedRideBookingProps } from "@/types/declaration";


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
          <li className="flex justify-between items-center">
            <span className="text-base text-gray-800">Selected vehicle:</span>
            <span className="text-base text-gray-800">{formData.vehicleType}</span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-base text-gray-800">Pickup Location:</span>
            <span className="text-base text-gray-800">{formData.pickUpLocation}</span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-base text-gray-800">Dropoff Location:</span>
            <span className="text-base text-gray-800">{formData.dropOffLocation}</span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-base text-gray-800">Price per day:</span>
            <span className="text-base text-gray-800">${formData.price}</span>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-base text-gray-800">Total Number of Days:</span>
            <span className="text-base text-gray-800">{formData.numberOfDays}</span>
          </li>
        </ul>
      </div>

      <div className="border-t border-gray-200 my-4"></div>

      <div>
        <ul className="list-disc list-inside">
          <li className="flex justify-between items-center">
            <span className="text-lg font-medium text-gray-800">Total:</span>
            <span className="text-lg font-medium text-gray-800">${formData.totalAmount}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BookingSidebar;
