import { Router } from "express";
import animeExtractor from "./anime_extractor/animeExtractor.routes.ts";

const router = Router();

router.get("/", (_req, res) => {
  res.send("✅Server running");
});

router.use("/anime", animeExtractor);

export default router;
