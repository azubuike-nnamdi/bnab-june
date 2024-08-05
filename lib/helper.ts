import { format, parseISO } from "date-fns";


export const truncateText = (text: string, length: number) => {
  if (!text) return '';
  if (text.length <= length) return text;
  return `${text.substring(0, length)}...`;
};



export const formatDateString = (dateString: string) => {
  const date = parseISO(dateString);
  return format(date, "MM/dd/yyyy");
};

// export const formatDateString = (dateString: string) => {
//   try {
//     const date = parseISO(dateString);
//     return format(date, "MM/dd/yyyy");
//   } catch (error) {
//     console.error("Error parsing date:", error);
//     return "Invalid Date";
//   }
// };