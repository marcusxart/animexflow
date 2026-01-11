import { fetchInstance } from "../utils/https.ts";
import { NotFoundError } from "../utils/appError.ts";
import { load } from "cheerio";

import type {
  HomeResponse,
  TrendingAndTopAnimeResponse,
  AnimeInfoResponse,
  Episode,
  LabelID,
} from "./animeExtractor.d.ts";

import { parseEpisodes, parseSpotlight } from "./animeExtractor.parser.ts";
import formatScrapedText from "../utils/textFormatter.ts";
import { text, attr, src, int } from "../utils/dom.ts";

class AnimeExtractorService {
  static async getHome(): Promise<HomeResponse> {
    const html = (await fetchInstance("/home"))?.data;
    if (!html) {
      return {
        spotlight: [],
        recent_episodes: [],
        newly_added: [],
        top_upcoming: [],
      };
    }

    const $ = load(html);
    const $tabs = $(".tab-content .film_list-wrap");

    return {
      spotlight: parseSpotlight($),
      recent_episodes: parseEpisodes($, $tabs.eq(0)),
      newly_added: parseEpisodes($, $tabs.eq(1)),
      top_upcoming: parseEpisodes($, $tabs.eq(2)),
    };
  }

  static async getTrendingAndTopAnimes(): Promise<TrendingAndTopAnimeResponse> {
    const html = (await fetchInstance("/home"))?.data;
    if (!html) {
      return {
        top_animes: { today: [], week: [], month: [] },
        trending_animes: [],
      };
    }

    const $ = load(html);

    const getTop = (id: string): Episode[] =>
      $(`.cbox-realtime ${id} li`)
        .map((i, el) => {
          const $el = $(el);
          const $detail = $el.find(".film-detail");

          const animeId =
            attr($detail.find(".film-name a"), "href").split("/").pop() ?? "";

          return animeId
            ? {
                id: animeId,
                rank: i + 1,
                title: formatScrapedText(text($detail.find(".film-name a"))),
                japanese_title: attr(
                  $detail.find(".film-name a"),
                  "data-jname"
                ),
                poster: src($el.find(".film-poster-img")),
              }
            : null;
        })
        .get()
        .filter(Boolean) as Episode[];

    return {
      top_animes: {
        today: getTop("#top-viewed-day"),
        week: getTop("#top-viewed-week"),
        month: getTop("#top-viewed-month"),
      },
      trending_animes: $(".trending-list .swiper-slide")
        .map((i, el) => {
          const $el = $(el);
          const id =
            attr($el.find(".film-poster"), "href").split("/").pop() ?? "";

          return id
            ? {
                id,
                rank: i + 1,
                title: formatScrapedText(text($el.find(".film-title"))),
                japanese_title: attr($el.find(".film-title"), "data-jname"),
                poster: src($el.find(".film-poster-img")),
              }
            : null;
        })
        .get()
        .filter(Boolean) as Episode[],
    };
  }

  static async getAnimeInfo(id: string): Promise<AnimeInfoResponse> {
    const html = (await fetchInstance(`/${id}`))?.data;
    if (!html) throw new NotFoundError("Anime not found");

    const $ = load(html);
    const $main = $(".anis-content");
    const $info = $(".anisc-info");

    if (!$main.length) throw new NotFoundError("Anime not found");

    const response: AnimeInfoResponse = {
      id,
      title: formatScrapedText(text($main.find(".film-name"))),
      japanese_title: attr($main.find(".film-name"), "data-jname"),
      poster: src($main.find(".film-poster-img")),
      description: formatScrapedText(
        text($main.find(".film-description .text"))
      ),
      native_japanese_title: "",
      premiered: "",
      MAL_score: 0,
      airing_status: "",
      rated: text($main.find(".tick-pg")),
      type: text($main.find(".film-stats .item").first()),
      episodes_info: {
        sub: int(text($main.find(".tick-sub"))),
        dub: int(text($main.find(".tick-dub"))),
        total_episode: int(text($main.find(".tick-eps"))),
      },
      productions_info: { studios: [], producers: [] },
      genres: [],
      other_seasons: [],
      recommended_animes: parseEpisodes(
        $,
        $(".block_area_category .tab-content")
      ),
    };

    $info.find(".item-title").each((_, el) => {
      const label = text($(el).find(".item-head")).toLowerCase();
      const value = formatScrapedText(text($(el).find(".name")));

      if (label.startsWith("japanese")) response.native_japanese_title = value;
      if (label.startsWith("aired")) response.aired = value;
      if (label.startsWith("duration")) response.duration = value;
      if (label.startsWith("premiered")) response.premiered = value;
      if (label.startsWith("status")) response.airing_status = value;
      if (label.startsWith("mal")) response.MAL_score = parseFloat(value) || 0;

      if (label.startsWith("studios") || label.startsWith("producers")) {
        const list: LabelID[] = [];
        $(el)
          .find("a")
          .each((_, a) => {
            const id = attr($(a), "href").split("/").pop() ?? "";
            list.push({
              id,
              label: formatScrapedText(text($(a))),
            });
          });

        label.startsWith("studios")
          ? (response.productions_info.studios = list)
          : (response.productions_info.producers = list);
      }
    });

    $info.find(".item-list a").each((_, el) => {
      response.genres.push({
        id: attr($(el), "href").split("/").pop() ?? "",
        label: formatScrapedText(text($(el))),
      });
    });

    $(".block_area-seasons .os-list a").each((_, el) => {
      response.other_seasons.push({
        id: attr($(el), "href").split("/").pop() ?? "",
        label: formatScrapedText(text($(el))),
        title: attr($(el), "title"),
      });
    });

    return response;
  }
}

export default AnimeExtractorService;
