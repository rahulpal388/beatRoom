"use client";
export const decodeHTML = (str: string): string => {
  if (typeof window === "undefined") return str;
  return new DOMParser().parseFromString(str, "text/html").documentElement
    .textContent;
};
