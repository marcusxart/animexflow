import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ThumbsUp, ThumbsDown } from "lucide-react";
import classNames from "classnames";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import TopAnime from "../components/TopAnime";
import Header from "../components/Header";

// 🕒 enable relative time (e.g. "2 hours ago")
dayjs.extend(relativeTime);

const servers = {
  sub: ["Server 1", "Server 2"],
  dub: ["Server 1", "Server 2"],
};

const episodes = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  title: `The Path of the Hero ${i + 1}`,
}));

const WatchAnime = () => {
  const [currentEp, setCurrentEp] = useState(1);
  const [currentServer, setCurrentServer] = useState({ type: "sub", index: 0 });
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Kaito",
      avatar: "https://i.pravatar.cc/50?img=1",
      message: "This episode was intense! The animation quality was top-tier.",
      likes: 12,
      dislikes: 1,
      userReaction: null,
      createdAt: dayjs().subtract(45, "minute").toISOString(),
    },
    {
      id: 2,
      user: "Sora",
      avatar: "https://i.pravatar.cc/50?img=2",
      message: "Can't wait for the next one! Story pacing is so good.",
      likes: 8,
      dislikes: 0,
      userReaction: "like",
      createdAt: dayjs().subtract(6, "hour").toISOString(),
    },
  ]);
  const [commentText, setCommentText] = useState("");

  // 🔐 login state
  const isLogin = true;

  const animeId = "attack-on-titan"; // unique key for persistence

  useEffect(() => {
    const saved = localStorage.getItem(`rating_${animeId}`);
    if (saved) setRating(Number(saved));
  }, []);

  const handleRate = (value) => {
    setRating(value);
    localStorage.setItem(`rating_${animeId}`, value);
  };

  const streamUrls = {
    sub: [
      "https://www.example.com/embed/sub-server1",
      "https://www.example.com/embed/sub-server2",
    ],
    dub: [
      "https://www.example.com/embed/dub-server1",
      "https://www.example.com/embed/dub-server2",
    ],
  };

  const currentSrc =
    streamUrls[currentServer.type]?.[currentServer.index] || "";

  // 💬 Comment actions
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      user: "Guest",
      avatar: "https://i.pravatar.cc/50?img=3",
      message: commentText,
      likes: 0,
      dislikes: 0,
      userReaction: null,
      createdAt: new Date().toISOString(),
    };
    setComments([newComment, ...comments]);
    setCommentText("");
  };

  const handleReaction = (id, type) => {
    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id !== id) return comment;

        let updated = { ...comment };

        if (type === "like") {
          if (comment.userReaction === "like") {
            updated.likes -= 1;
            updated.userReaction = null;
          } else {
            updated.likes += 1;
            if (comment.userReaction === "dislike") updated.dislikes -= 1;
            updated.userReaction = "like";
          }
        } else if (type === "dislike") {
          if (comment.userReaction === "dislike") {
            updated.dislikes -= 1;
            updated.userReaction = null;
          } else {
            updated.dislikes += 1;
            if (comment.userReaction === "like") updated.likes -= 1;
            updated.userReaction = "dislike";
          }
        }

        return updated;
      })
    );
  };

  return (
    <div className="grid grid-cols-[1fr_350px] gap-10">
      <div className="w-full flex flex-col gap-8 pb-20">
        {/* --- VIDEO PLAYER --- */}
        <div className="bg-black rounded-xl overflow-hidden">
          <iframe
            src={currentSrc}
            allowFullScreen
            className="w-full h-[480px] border-0 rounded-xl"
            title={`Episode ${currentEp}`}
          />
        </div>

        {/* --- SERVER + EPISODES SECTION --- */}
        <div className="bg-body-2 p-5 rounded-xl flex flex-col gap-5">
          {/* Next Episode Info */}
          <div className="text-center text-sm text-gray-300 mt-1 font-medium">
            Next episode is expected to air on{" "}
            <span className="text-primary font-semibold">Nov 2, 2025</span>.
          </div>

          {/* Servers */}
          <div className="flex flex-col gap-4 mt-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-gray-300">Sub:</span>
              {servers.sub.map((srv, i) => (
                <button
                  key={srv}
                  onClick={() => setCurrentServer({ type: "sub", index: i })}
                  className={classNames(
                    "px-3 py-1.5 rounded-full text-sm transition font-medium",
                    currentServer.type === "sub" && currentServer.index === i
                      ? "bg-primary text-white"
                      : "bg-body-3 hover:bg-primary/40 text-gray-300"
                  )}
                >
                  {srv}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-gray-300">Dub:</span>
              {servers.dub.map((srv, i) => (
                <button
                  key={srv}
                  onClick={() => setCurrentServer({ type: "dub", index: i })}
                  className={classNames(
                    "px-3 py-1.5 rounded-full text-sm transition font-medium",
                    currentServer.type === "dub" && currentServer.index === i
                      ? "bg-primary text-white"
                      : "bg-body-3 hover:bg-primary/40 text-gray-300"
                  )}
                >
                  {srv}
                </button>
              ))}
            </div>
          </div>

          {/* Warning */}
          <p className="text-xs text-gray-400 italic">
            ⚠ If a server doesn’t work, switch to another one.
          </p>

          {/* Episodes */}
          <div className="mt-1">
            <h3 className="text-base font-semibold mb-2 text-white">
              Episodes
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 max-h-[280px] overflow-y-auto">
              {episodes.map((ep) => (
                <button
                  key={ep.id}
                  onClick={() => setCurrentEp(ep.id)}
                  className={classNames(
                    "flex flex-col items-start justify-center px-3 py-2 rounded-md text-left transition truncate",
                    currentEp === ep.id
                      ? "bg-secondary text-white"
                      : "bg-body-3 hover:bg-secondary/40 text-gray-300"
                  )}
                >
                  <span className="text-xs opacity-80 mb-0.5">EP {ep.id}</span>
                  <span className="text-sm truncate w-full">{ep.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* --- DETAILS --- */}
        <div className="bg-body-2 p-6 rounded-xl flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <img
                src="https://cdn.myanimelist.net/images/anime/10/47347l.jpg"
                alt="Anime Poster"
                className="rounded-lg w-full h-[400px] object-cover"
              />
            </div>

            <div className="flex flex-col justify-between w-full md:w-2/3">
              <div>
                <Header title="Attack on Titan" />
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Humans are nearly exterminated by giant creatures called
                  Titans. The story follows Eren Yeager and his friends as they
                  join the Scout Regiment to fight back and uncover the secrets
                  behind the Titans and their world.
                </p>

                <div className="grid sm:grid-cols-2 gap-y-1.5 text-sm text-gray-400">
                  <p>
                    <span className="text-gray-300 font-medium">Type:</span> TV
                  </p>
                  <p>
                    <span className="text-gray-300 font-medium">Source:</span>{" "}
                    Light Novel
                  </p>
                  <p>
                    <span className="text-gray-300 font-medium">
                      Premiered:
                    </span>{" "}
                    2025
                  </p>
                  <p>
                    <span className="text-gray-300 font-medium">Status:</span>{" "}
                    Currently Airing
                  </p>
                  <p>
                    <span className="text-gray-300 font-medium">Genres:</span>{" "}
                    Action, Adventure, Fantasy
                  </p>
                  <p>
                    <span className="text-gray-300 font-medium">MAL:</span>{" "}
                    <span className="text-primary font-semibold">7.34</span> by
                    9319 reviews
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="mt-6">
                <h3 className="font-semibold mb-2 text-sm text-gray-300">
                  Your Rating:
                </h3>
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => {
                    const ratingValue = i + 1;
                    const isActive = ratingValue <= (hover || rating);

                    return (
                      <motion.button
                        key={i}
                        type="button"
                        whileTap={{ scale: 0.85 }}
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleRate(ratingValue)}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                        className="focus:outline-none"
                      >
                        <Star
                          size={28}
                          className={classNames(
                            "transition-colors",
                            isActive
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-500"
                          )}
                        />
                      </motion.button>
                    );
                  })}
                  <span className="text-sm text-gray-400 ml-2">
                    {rating ? `${rating} / 5` : "No rating yet"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* --- Comments --- */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-2">Comments</h3>

            {/* Login warning */}
            {!isLogin && (
              <p className="text-sm text-gray-400 mb-4">
                You must{" "}
                <a href="/login" className="text-primary hover:underline">
                  login
                </a>{" "}
                to post a comment.
              </p>
            )}

            {/* Comment form */}
            {isLogin && (
              <form
                onSubmit={handleAddComment}
                className="flex items-start gap-3 mb-6"
              >
                <img
                  src="https://i.pravatar.cc/50?img=4"
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="w-full bg-body-3 text-sm text-gray-200 placeholder-gray-500 rounded-lg px-4 py-2 outline-none resize-none focus:ring-1 focus:ring-primary"
                    rows="3"
                  />
                  <button
                    type="submit"
                    className="mt-2 px-4 py-1.5 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary/90 transition"
                  >
                    Post Comment
                  </button>
                </div>
              </form>
            )}

            {/* Comment list */}
            <div className="flex flex-col gap-4">
              {comments.map((c) => (
                <div key={c.id} className="flex items-start gap-3">
                  <img
                    src={c.avatar}
                    alt={c.user}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-200 text-sm">
                        {c.user}
                      </p>
                      <span className="text-xs text-gray-500">
                        {dayjs(c.createdAt).fromNow()}
                      </span>
                    </div>
                    <p className="text-gray-300 text-sm mb-2">{c.message}</p>
                    <div className="flex items-center gap-4 text-gray-400 text-xs">
                      <button
                        onClick={() => handleReaction(c.id, "like")}
                        className={classNames(
                          "flex items-center gap-1 hover:text-primary transition",
                          c.userReaction === "like" && "text-primary"
                        )}
                      >
                        <ThumbsUp size={14} /> {c.likes}
                      </button>
                      <button
                        onClick={() => handleReaction(c.id, "dislike")}
                        className={classNames(
                          "flex items-center gap-1 hover:text-red-500 transition",
                          c.userReaction === "dislike" && "text-red-500"
                        )}
                      >
                        <ThumbsDown size={14} /> {c.dislikes}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <TopAnime />
    </div>
  );
};

export default WatchAnime;
