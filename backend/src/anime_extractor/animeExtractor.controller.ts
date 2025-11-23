import asyncHandler from "../utils/asyncHandler.ts";
import AnimeExtractorService from "./animeExtractor.service.ts";

class AnimeExtractorController {
  static getHome = asyncHandler(async (_, res) => {
    const data = await AnimeExtractorService.getHome();

    res.status(200).json({
      status: "success",
      data,
    });
  });

  static getTrendingAndTopAnimes = asyncHandler(async (_, res) => {
    const data = await AnimeExtractorService.getTrendingAndTopAnimes();

    res.status(200).json({
      status: "success",
      data,
    });
  });
}

export default AnimeExtractorController;
