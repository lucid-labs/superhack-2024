// import { ethers } from "ethers";
// import { decimalPoints } from "./config";

// export const compactNumber = (num: number, decimal: number = 2) => {
//   return Intl.NumberFormat("en", {
//     notation: "compact",
//     maximumFractionDigits: decimal,
//   }).format(num);
// };

// export function capitalizeFirstLetter(string: string) {
//   return string?.charAt(0).toUpperCase() + string?.slice(1);
// }

// export function capitalizeFirstLetterAndSplit(string: string) {
//   return (string?.charAt(0).toUpperCase() + string?.slice(1))
//     .split(/(?=[A-Z])/)
//     .join(" ");
// }

// /** Converts wei form to decimal form, returns the original value without any formatting */
// export const getReadableValue = (val: string, decimal: string | number) => {
//   return val ? ethers.formatUnits(val?.toString(), Number(decimal)) : "0";
// };

// /** Converts wei form to decimal form and then format it to 7 decimals for label displays */
// export const getReadableLabelValue = (
//   val: string,
//   decimal: string | number
// ) => {
//   const readableVal = ethers.formatUnits(val.toString(), Number(decimal));
//   const formattedNum = truncate(readableVal, decimalPoints.token);
//   return formattedNum;
// };

// /** Truncates the digit to specified decimal, avoiding the issue of rounding the last digit */
export const truncate = (num: number | string, places: number) => {
  if (num === "Infinity") {
    return "∞";
  }
  const parts = String(num).split(".");
  let formatNum = "";
  if (parts?.length > 0) {
    formatNum =
      parts[1]?.length > 0
        ? `${parts[0]}.${parts[1].slice(0, places)}`
        : parts[0];
  }
  return formatNum;
};

// TODO: this is temporary function until ethers is installed properly
export const getReadableValue = (val: string, decimal: string | number) => {
  if (!val) return "0";

  const valueInBigInt = BigInt(val.toString());
  const decimalPlaces = Number(decimal);
  const divisor = BigInt(10 ** decimalPlaces);

  const wholePart = valueInBigInt / divisor;
  const fractionalPart = valueInBigInt % divisor;

  const fractionalString = fractionalPart
    .toString()
    .padStart(decimalPlaces, "0")
    .replace(/0+$/, "");

  return fractionalString
    ? `${wholePart.toString()}.${fractionalString}`
    : wholePart.toString();
};
