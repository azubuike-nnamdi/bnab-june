import { DedicatedRideBookingProps } from "@/types/declaration";

export const getEmailContent = (formData: DedicatedRideBookingProps) => {
  const {
    firstName,
    lastName,
    pickUpLocation,
    pickUpDate,
    pickUpTime,
    dropOffLocation,
    dropOffDate,
    dropOffTime,
  } = formData;

  // Ensure the dates and times are valid
  const pickUpDateTime = new Date(`${pickUpDate}T${pickUpTime}`);
  const dropOffDateTime = new Date(`${dropOffDate}T${dropOffTime}`);

  if (isNaN(pickUpDateTime.getTime()) || isNaN(dropOffDateTime.getTime())) {
    throw new Error("Invalid date or time format");
  }

  const userContent = `
    Hi ${firstName},

    Your booking has been confirmed.
    Pick-Up Location: ${pickUpLocation}
    Pick-Up Date: ${pickUpDateTime.toLocaleDateString()}
    Pick-Up Time: ${pickUpDateTime.toLocaleTimeString()}
    Drop-Off Location: ${dropOffLocation}
    Drop-Off Date: ${dropOffDateTime.toLocaleDateString()}
    Drop-Off Time: ${dropOffDateTime.toLocaleTimeString()}

    Thank you for choosing our service.
  `;

  const adminContent = `
    New booking made:
    Name: ${firstName} ${lastName}
    Pick-Up Location: ${pickUpLocation}
    Pick-Up Date: ${pickUpDateTime.toLocaleDateString()}
    Drop-Off Location: ${dropOffLocation}
    Drop-Off Date: ${dropOffDateTime.toLocaleDateString()}
  `;

  return { userContent, adminContent };
};
