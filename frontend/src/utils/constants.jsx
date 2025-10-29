const links = [
  { text: "Home", to: "/home" },
  { text: "Movies", to: "/home" },
  { text: "Tv series", to: "/home" },
  { text: "New release", to: "/home" },
  { text: "Most popular", to: "/home" },
];

const aboutUs = [
  {
    id: 1,
    text: "9anime is a free anime website where millions visit to watch anime online.",
  },
  {
    id: 2,
    header: "Aniwave.se - Your Ultimate Destination for Free Anime Streaming",
    text: "Aniwave is a free anime streaming website where users can watch and use premium features without registration. By late 2016, we noticed that many free anime streaming sites had poor user interfaces (UI) and user experiences (UX). So, our team created 9anime to give anime fans a better option.",
  },
  {
    id: 3,
    text: "AniWave arrived at the end of 2023. This new name marks a fresh start with better offerings for anime fans.",
  },
  {
    id: 4,
    header: "What is Aniwave.to?",
    text: "Aniwave.to is a free site where you can watch anime online in high definition. You can choose between English subtitles or dubbing. You can also download any anime without registration or payment. Everything on here is free! User accounts are optional for creating watchlists, importing watchlists, saving favorite anime shows, and continuing watching where you left off. You can also make new folders and use Watch2Gether with friends to watch online together.",
  },
  {
    id: 5,
    header: "Is Aniwave.se Safe?",
    text: "Yes, Aniwave is safe. We made this site to improve UX, ensuring user safety. Please report anything suspicious. We do run ads to keep the site going, but we aim to ensure a safe experience.",
  },
  {
    id: 6,
    header: "So what make HiAnime.to the best site to watch anime free online?",

    list: [
      {
        id: 1,
        tab: "Extensive content library:",
        text: `Our library was second only to Kissanime before it shut down. We keep adding new and old anime, making us the largest anime library online.`,
      },
      {
        id: 2,
        tab: "Great streaming experience:",
        text: `We use top-quality streaming servers. You can also pick the fastest one for your location.`,
      },
      {
        id: 3,
        tab: "High-quality resolution:",
        text: `Our videos are in the highest resolution. We also have quality settings so you can enjoy streaming no matter your internet speed.`,
      },
      {
        id: 4,
        tab: "Frequent updates:",
        text: `We update content every hour, mostly automatically, ensuring you get the latest episodes fast.`,
      },
      {
        id: 5,
        tab: "User-friendly interface:",
        text: `We focus on simplicity and ease of use. We have all the features of other anime sites, plus more.`,
      },
      {
        id: 6,
        tab: "Device compatibility:",
        text: `AniWave works well on both desktop and mobile devices, even with old browsers. You can enjoy anime anywhere.`,
      },
    ],
  },
  {
    id: 7,
    text: "So if you're looking for a trustworthy and safe site for your Anime streaming, let's give HiAnime.to a try. And if you like us, please help us to spread the words and do not forget to bookmark our site.",
  },
  {
    id: 8,
    text: "Thank you!",
  },
];

const iconSizes = {
  normal: 1.8,
};

const alphabetData = [
  { label: "All", value: "" },
  { label: "#", value: "other" },
  { label: "0-9", value: "0-9" },
  ...Array.from({ length: 26 }, (_, i) => {
    const letter = String.fromCharCode(65 + i);
    return { label: letter, value: letter.toLowerCase() };
  }),
];

const footerLinks = [
  { text: "FAQ", to: "/faq" },
  { text: "Contact", to: "/contact" },
];

const animeTypeOptions = [
  { label: "All", value: "" },
  { label: "Movie", value: 1 },
  { label: "TV", value: 2 },
  { label: "OVA", value: 3 },
  { label: "ONA", value: 4 },
  { label: "Special", value: 5 },
  { label: "Music", value: 6 },
];
const animeStatusOptions = [
  { label: "All", value: "" },
  { label: "Finished airing", value: 1 },
  { label: "Currently airing", value: 2 },
  { label: "Not yet aired", value: 3 },
];
const animeSeasonOptions = [
  { label: "All", value: "" },
  { label: "Spring", value: 1 },
  { label: "Summer", value: 2 },
  { label: "Fall", value: 3 },
  { label: "Winter", value: 4 },
];
const animeLanguageOptions = [
  { label: "All", value: "" },
  { label: "SUB", value: 1 },
  { label: "DUB", value: 2 },
  { label: "SUB & DUB", value: 3 },
];
const animeSortptions = [
  { label: "Default", value: "" },
  { label: "Recently added", value: "recently_added" },
  { label: "Recently updated", value: "recently_updated" },
  { label: "Sort", value: "score" },
  { label: "Name A-Z", value: "namr_az" },
  { label: "Released date", value: "released_date" },
  { label: "Most watched", value: "most_watched" },
];
const animeRatedOptions = [
  { label: "All", value: "" },
  { label: "G - All ages", value: 1 },
  { label: "PG - Kids & teens", value: 2 },
  { label: "PG-13 - 13+", value: 3 },
  { label: "R - 17+", value: 4 },
  { label: "R+ - Mature", value: 5 },
  { label: "RX - Adult", value: 6 },
];

const currentYear = new Date().getFullYear();

const yearOptions = [
  { label: "Default", value: "" },
  ...Array.from({ length: currentYear - 1917 + 1 }, (_, i) => {
    const year = 1917 + i;
    return { label: `${year}`, value: year };
  }),
];

const genreOptions = [
  { label: "Action", value: 1 },
  { label: "Adventure", value: 2 },
  { label: "Cars", value: 3 },
  { label: "Comedy", value: 4 },
  { label: "Demons", value: 5 },
  { label: "Drama", value: 6 },
  { label: "Ecchi", value: 7 },
  { label: "Fantasy", value: 8 },
  { label: "Game", value: 9 },
  { label: "Harem", value: 10 },
  { label: "Historical", value: 11 },
  { label: "Horror", value: 12 },
  { label: "Isekai", value: 13 },
  { label: "Josei", value: 14 },
  { label: "Kids", value: 15 },
  { label: "Magic", value: 16 },
  { label: "Martial arts", value: 17 },
  { label: "Mecha", value: 18 },
  { label: "Military", value: 19 },
  { label: "Music", value: 20 },
  { label: "Mystery", value: 21 },
  { label: "Parody", value: 22 },
  { label: "Police", value: 23 },
  { label: "Psychological", value: 24 },
  { label: "Romance", value: 25 },
  { label: "Samurai", value: 26 },
  { label: "School", value: 27 },
  { label: "Sci-Fi", value: 28 },
  { label: "Seinen", value: 29 },
  { label: "Shoujo", value: 30 },
  { label: "Shoujo Ai", value: 31 },
  { label: "Shounen", value: 32 },
  { label: "Shounen Ai", value: 33 },
  { label: "Slice of life", value: 34 },
  { label: "Shape", value: 35 },
  { label: "Sports", value: 36 },
  { label: "Super power", value: 37 },
  { label: "Supernatural", value: 38 },
  { label: "Thriller", value: 39 },
  { label: "Vampire", value: 40 },
];

export {
  links,
  aboutUs,
  iconSizes,
  alphabetData,
  footerLinks,
  animeTypeOptions,
  animeStatusOptions,
  animeSeasonOptions,
  animeLanguageOptions,
  animeSortptions,
  animeRatedOptions,
  yearOptions,
  genreOptions,
};
