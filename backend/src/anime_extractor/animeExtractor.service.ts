import { fetchInstance } from "../utils/https.ts";
// import { NotFoundError } from "../utils/appError.ts";
import { load } from "cheerio";

import type { Cheerio } from "cheerio";
import type { Element } from "domhandler";
import type {
  Episode,
  EpisodeItem,
  HomeResponse,
  SpotlightItem,
  TrendingAndTopAnimeResponse,
} from "./animeExtractor.d.ts";

class AnimeExtractorService {
  static async getHome() {
    const response: HomeResponse = {
      spotlight: [],
      recent_episodes: [],
      newly_added: [],
      top_upcoming: [],
    };

    const result = await fetchInstance("/home");
    if (!result.data) {
      return response;
    }
    const html = result.data;
    const $ = load(html);

    const $spotlight = $(".deslide-wrap .swiper-wrapper .swiper-slide");
    const $tabContent = $(".tab-content .film_list-wrap");
    const $recentEpisodes = $tabContent.eq(0);
    const $newlyAdded = $tabContent.eq(1);
    const $topUpcoming = $tabContent.eq(2);

    // console.log($recentEpisodes.length);

    $($spotlight).each((i, $el) => {
      const id =
        $($el).find(".desi-buttons a").first().attr("href")?.split("/").pop() ||
        "";
      if (id) {
        const details = $($el).find(".deslide-item-content .sc-detail");
        const obj: SpotlightItem = {
          id,
          title: $($el).find(".deslide-item-content .desi-head-title").text(),
          japanese_title:
            $($el)
              .find(".deslide-item-content .desi-head-title")
              .attr("data-jname") ?? "",
          rank: i + 1,
          description: $($el)
            .find(".deslide-item-content .desi-description")
            .text(),
          poster:
            $($el).find(".deslide-cover .film-poster-img").attr("data-src") ??
            "",
          type: details.find(".scd-item").eq(0).text().trim(),
          duration: details.find(".scd-item").eq(1).text().trim(),
          aired: details.find(".scd-item.m-hide").text().trim(),
          episodes_info: {
            sub:
              parseInt(details.find(".scd-item .tick-sub").text().trim()) ?? 0,
            dub:
              parseInt(details.find(".scd-item .tick-dub").text().trim()) ?? 0,
            quality: details.find(".scd-item .tick-quality").text().trim(),
          },
        };

        response.spotlight.push(obj);
      }
      const getEpisodes = ($parentEl: Cheerio<Element>): EpisodeItem[] => {
        if (!$parentEl) return [];
        const $list = $parentEl.find(".film_list-wrap .flw-item");
        const list: EpisodeItem[] = [];

        $($list).each((_, $el) => {
          const id =
            $($el).find(".film-poster-ahref").attr("href")?.split("/").pop() ??
            "";
          if (id) {
            const $details = $($el).find(".film-detail");
            const type = $details.find(".fd-infor .fdi-item").first().text();
            const aired = $details.find(".fdi-duration").text();

            const obj: EpisodeItem = {
              id,
              title: $details.find(".film-name > a").text(),
              japanese_title:
                $details.find(".film-name > a").attr("data-jname") ?? "",
              poster: $($el).find(".film-poster-img").attr("data-src") ?? "",
              type: type.includes("(") ? type.split("(")[0].trim() : type,
              duration:
                !aired || aired === "?" || !aired.endsWith("m") ? null : aired,
              aired:
                !aired || aired === "?" || aired.endsWith("m") ? null : aired,
              is_adult_rated: !!$($el).find(".film-poster .tick-rate").text(),
            };
            list.push(obj);
          }
        });

        return list;
      };

      response.recent_episodes = getEpisodes($recentEpisodes);
      response.newly_added = getEpisodes($newlyAdded);
      response.top_upcoming = getEpisodes($topUpcoming);
    });

    return response;
  }

  static async getTrendingAndTopAnimes() {
    const response: TrendingAndTopAnimeResponse = {
      top_animes: {
        today: [],
        week: [],
        month: [],
      },
      trending_animes: [],
    };
    const result = await fetchInstance("/home");
    if (!result.data) {
      return response;
    }
    const html = result.data;
    const $ = load(html);

    const $topAnimes = $(".block_area-realtime .cbox-realtime");
    const $trendingAnimes = $(".trending-list .swiper-wrapper .swiper-slide");

    const getTopAnimeByTab = (tagID: string): Episode[] => {
      if (!$topAnimes) return [];
      const $list = $topAnimes.find(`${tagID}  li`);

      const list: Episode[] = [];

      $($list).each((i, $el) => {
        const $detail = $($el).find(".film-detail");
        const id =
          $detail.find(".film-name  a").attr("href")?.split("/").pop() ?? "";

        if (id) {
          const obj: Episode = {
            id,
            rank: i + 1,
            poster: $($el).find(".film-poster-img").attr("data-src") ?? "",
            title: $detail.find(".film-name a").text(),
            japanese_title:
              $detail.find(".film-name  a").attr("data-jname") ?? "",
          };

          list.push(obj);
        }
      });

      return list;
    };
    response.top_animes.today = getTopAnimeByTab("#top-viewed-day");
    response.top_animes.week = getTopAnimeByTab("#top-viewed-week");
    response.top_animes.month = getTopAnimeByTab("#top-viewed-month");

    $($trendingAnimes).each((i, $el) => {
      const id =
        $($el).find(".item .film-poster").attr("href")?.split("/").pop() ?? "";

      if (id) {
        const obj: Episode = {
          id,
          title: $($el).find(".item .film-title").text(),
          japanese_title:
            $($el).find(".item .film-title").attr("data-jname") ?? "",
          rank: i + 1,
          poster: $($el).find(".item .film-poster-img").attr("data-src") ?? "",
        };

        response.trending_animes.push(obj);
      }
    });

    return response;
  }
}

export default AnimeExtractorService;
