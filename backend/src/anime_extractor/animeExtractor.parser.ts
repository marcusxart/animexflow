import type { CheerioAPI, Cheerio } from "cheerio";
import type { EpisodeItem, SpotlightItem } from "./animeExtractor.d.ts";
import { text, attr, src, int } from "../utils/dom.ts";
import formatScrapedText from "../utils/textFormatter.ts";

export const parseEpisodes = (
  $: CheerioAPI,
  $parent: Cheerio<any>
): EpisodeItem[] => {
  return $parent
    .find(".flw-item")
    .map((_, el) => {
      const $el = $(el);
      const $details = $el.find(".film-detail");

      const airedRaw = text($details.find(".fdi-duration"));
      const typeRaw = text($details.find(".fd-infor .fdi-item").first());

      return {
        id: attr($el.find(".film-poster-ahref"), "href").split("/").pop() ?? "",
        title: formatScrapedText(text($details.find(".film-name > a"))),
        japanese_title: attr($details.find(".film-name > a"), "data-jname"),
        poster: src($el.find(".film-poster-img")),
        type: typeRaw.includes("(") ? typeRaw.split("(")[0].trim() : typeRaw,
        duration: airedRaw?.endsWith("m") ? airedRaw : null,
        aired: airedRaw && !airedRaw.endsWith("m") ? airedRaw : null,
        is_adult_rated: !!text($el.find(".tick-rate")),
      };
    })
    .get();
};

export const parseSpotlight = ($: CheerioAPI): SpotlightItem[] => {
  return $(".deslide-wrap .swiper-slide")
    .map((i, el) => {
      const $el = $(el);
      const details = $el.find(".sc-detail");

      const id =
        attr($el.find(".desi-buttons a").first(), "href").split("/").pop() ??
        "";

      if (!id) return null;

      return {
        id,
        rank: i + 1,
        title: formatScrapedText(text($el.find(".desi-head-title"))),
        japanese_title: attr($el.find(".desi-head-title"), "data-jname"),
        description: formatScrapedText(text($el.find(".desi-description"))),
        poster: src($el.find(".film-poster-img")),
        type: text(details.find(".scd-item").eq(0)),
        duration: text(details.find(".scd-item").eq(1)),
        aired: text(details.find(".scd-item.m-hide")),
        episodes_info: {
          sub: int(text(details.find(".tick-sub"))),
          dub: int(text(details.find(".tick-dub"))),
          quality: text(details.find(".quality")),
        },
      };
    })
    .get()
    .filter(Boolean) as SpotlightItem[];
};
