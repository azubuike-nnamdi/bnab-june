import { format, parseISO } from "date-fns";
import { ALPHABET, ALPHANUMERIC, NUMERIC } from "./constants";
import { customAlphabet } from 'nanoid'
import { TransactionIdParams } from "@/types/declaration";


export const truncateText = (text: string, length: number) => {
  if (!text) return '';
  if (text.length <= length) return text;
  return `${text.substring(0, length)}...`;
};



export const formatDateString = (dateString: string) => {
  const date = parseISO(dateString);
  return format(date, "MM/dd/yyyy");
};


// Function to combine the date and time strings into a valid ISO datetime string
export const formatDateTime = (date: string, time: string): string | undefined => {
  const dateTimeString = `${date}T${time}`;
  const dateTime = new Date(dateTimeString);

  // Check if the date is valid
  if (isNaN(dateTime.getTime())) {
    return undefined; // return undefined if the date is invalid
  }

  return dateTime.toISOString();
};

// Function to format a date string to "yyyy-MM-dd"
export const formatDate = (date: Date): string => format(date, "yyyy-MM-dd");

// Function to format a time string to "HH:mm"
export const formatTime = (date: Date): string => format(date, "HH:mm");
/**
 * Generates the specified length of characters as alphanumeric string transaction ID.
 * @param {TransactionIdParams['entropy']} [entropy] - Optional parameter to specify the entropy of the transaction ID. Must be 'alphabet' or 'alphanumeric' or 'numeric'. Defaults to 'alphanumeric' if not provided.
 * @param {TransactionIdParams['len']} [len] - Optional parameter to specify the length of the transaction ID. Defaults to 21 if not provided.
 * @returns {string} - The generated transaction ID.
 */
export const genId = (entropy?: TransactionIdParams['entropy'], len?: TransactionIdParams['len']): string => {
  const isEntropyValue = (): any => {
    switch (entropy) {
      case 'alphabet':
        return ALPHABET
      case 'alphanumeric':
        return ALPHANUMERIC
      case 'numeric':
        return NUMERIC
      default:
        return ALPHANUMERIC
    }
  }

  const useParams: TransactionIdParams = {
    entropy: isEntropyValue(),
    len: len ?? 21,
  }

  return customAlphabet(useParams.entropy, useParams.len)()
}


// Function to format numbers as currency
export const formatCurrency = (amount: number) => {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};