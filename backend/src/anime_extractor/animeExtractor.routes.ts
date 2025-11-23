import { Router } from "express";
import AnimeExtractorController from "./animeExtractor.controller.ts";

const router = Router();

router.get("/home", AnimeExtractorController.getHome);
router.get(
  "/trending-and-top-animes",
  AnimeExtractorController.getTrendingAndTopAnimes
);

export default router;
