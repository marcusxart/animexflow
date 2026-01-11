import type { Cheerio } from "cheerio";

export const text = ($el: Cheerio<any>): string =>
  $el.length ? $el.text().trim() : "";

export const attr = ($el: Cheerio<any>, name: string): string =>
  $el.attr(name) ?? "";

export const src = ($el: Cheerio<any>): string =>
  attr($el, "data-src") || attr($el, "src");

export const int = (value?: string): number => {
  const n = parseInt(value ?? "", 10);
  return Number.isNaN(n) ? 0 : n;
};
