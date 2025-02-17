import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getKeysAsTitleCase(jsonObject) {
  if (typeof jsonObject !== "object" || jsonObject === null) {
    return []; // Return empty array for invalid input
  }

  let output = [];

  for (let key in jsonObject) {
    if (typeof jsonObject[key] !== "object") {
      let titleCaseKey = key.replace(/([A-Z])/g, " $1"); // Add space before uppercase letters
      titleCaseKey =
        titleCaseKey.charAt(0).toUpperCase() + titleCaseKey.slice(1); // Capitalize the first letter
      output.push({ title: titleCaseKey, value: key });
    }
  }

  return output;
}
