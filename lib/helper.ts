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