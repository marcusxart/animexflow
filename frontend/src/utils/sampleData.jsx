import { bokuNoHero, dandadan, spyFamily } from "../assets/images/animes";

export const animeData = [
  {
    id: 1,
    title: "Boku no Hero Academia",
    image: bokuNoHero,
    genre: ["Action", "Superhero", "Shounen"],
    rating: 8.7,
    episodes: 138,
    year: 2016,
    type: "tv",
    language: {
      sub: true,
      dub: true,
    },
    description:
      "In a world where most people have superpowers known as Quirks, Izuku Midoriya dreams of becoming a hero despite being born without one.",
  },
  {
    id: 2,
    title: "Dandadan",
    image: dandadan,
    genre: ["Action", "Comedy", "Supernatural"],
    rating: 8.9,
    episodes: 12,
    year: 2024,
    type: "movie",
    language: {
      sub: true,
      dub: false,
    },
    description:
      "Two high school students one who believes in ghosts and another who believes in aliens get caught up in bizarre supernatural phenomena.",
  },
  {
    id: 3,
    title: "Spy x Family",
    image: spyFamily,
    genre: ["Action", "Comedy", "Slice of Life"],
    rating: 9.1,
    episodes: 25,
    year: 2022,
    type: "tv",
    language: {
      sub: true,
      dub: true,
    },
    description:
      "A spy must build a fake family to complete his mission, but his wife is an assassin and his daughter a telepath — none of them aware of each other’s secrets.",
  },
];

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const generateRandomAnimeData = (count) => {
  const generated = [];

  for (let i = 0; i < count; i++) {
    const baseAnime = randomItem(animeData);
    const randomId = Date.now() + i;

    generated.push({
      id: randomId,
      title: baseAnime.title,
      image: baseAnime.image,
      genre: randomItem([
        baseAnime.genre,
        ["Action", "Fantasy"],
        ["Drama", "Psychological"],
        ["Adventure", "Comedy"],
      ]),
      rating: (Math.random() * 2 + 7).toFixed(1),
      episodes: Math.floor(Math.random() * 100) + 6,
      year: Math.floor(Math.random() * (2025 - 2000 + 1)) + 2000,
      language: {
        sub: Math.random() > 0.2,
        dub: Math.random() > 0.5,
      },
      description: baseAnime.description,
      type: baseAnime.type,
    });
  }

  return generated;
};
