import { Link } from "@tanstack/react-router";
import { Heart, Play, Pause } from "lucide-react";
import { usePlayer } from "@/contexts/PlayerContext";
import { formatPlays, type Podcast } from "@/data/podcasts";

export function PodcastCard({ podcast, variant = "row" }: { podcast: Podcast; variant?: "row" | "tile" | "wide" }) {
  const { play, current, isPlaying, toggle, liked, toggleLike } = usePlayer();
  const isCurrent = current?.id === podcast.id;
  const isLiked = liked.has(podcast.id);

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isCurrent) toggle();
    else play(podcast);
  };

  if (variant === "tile") {
    return (
      <Link
        to="/podcast/$id"
        params={{ id: podcast.id }}
        className="group bg-card shadow-card hover:shadow-glow relative flex w-44 shrink-0 flex-col gap-2.5 rounded-3xl p-2.5 transition-all duration-300 hover:-translate-y-0.5"
      >
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={podcast.cover}
            alt={podcast.title}
            width={400}
            height={400}
            loading="lazy"
            className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <button
            onClick={handlePlay}
            aria-label="Reproducir"
            className="bg-gradient-warm text-primary-foreground shadow-glow absolute bottom-2 right-2 grid h-10 w-10 translate-y-2 place-items-center rounded-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 active:scale-95"
          >
            {isCurrent && isPlaying ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
          </button>
        </div>
        <div className="px-1 pb-1">
          <p className="truncate text-sm font-semibold">{podcast.title}</p>
          <p className="text-muted-foreground truncate text-xs">{podcast.author}</p>
        </div>
      </Link>
    );
  }

  if (variant === "wide") {
    return (
      <Link
        to="/podcast/$id"
        params={{ id: podcast.id }}
        className="group bg-card shadow-card relative flex w-[78vw] max-w-[340px] shrink-0 flex-col overflow-hidden rounded-3xl transition-all hover:-translate-y-0.5"
      >
        <div className="relative">
          <img
            src={podcast.cover}
            alt={podcast.title}
            width={680}
            height={400}
            loading="lazy"
            className="h-44 w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0" />
          <span className="glass absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider">
            {podcast.category}
          </span>
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2 text-white">
            <div className="min-w-0">
              <p className="font-display truncate text-lg font-semibold leading-tight">{podcast.title}</p>
              <p className="truncate text-xs opacity-90">{podcast.author} · {formatPlays(podcast.plays)} reproducciones</p>
            </div>
            <button
              onClick={handlePlay}
              aria-label="Reproducir"
              className="bg-primary text-primary-foreground shadow-glow grid h-11 w-11 shrink-0 place-items-center rounded-full transition active:scale-95"
            >
              {isCurrent && isPlaying ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
            </button>
          </div>
        </div>
      </Link>
    );
  }

  // row
  return (
    <Link
      to="/podcast/$id"
      params={{ id: podcast.id }}
      className="group bg-card shadow-soft hover:shadow-card flex items-center gap-3 rounded-3xl p-2.5 transition-all"
    >
      <img
        src={podcast.cover}
        alt={podcast.title}
        width={120}
        height={120}
        loading="lazy"
        className="h-16 w-16 shrink-0 rounded-2xl object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{podcast.title}</p>
        <p className="text-muted-foreground truncate text-xs">{podcast.author}</p>
        <p className="text-muted-foreground mt-0.5 text-[11px]">
          {podcast.duration} · {podcast.category}
        </p>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleLike(podcast.id);
        }}
        aria-label="Me gusta"
        className={`grid h-9 w-9 place-items-center rounded-full transition ${
          isLiked ? "text-primary" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Heart className="h-4 w-4" fill={isLiked ? "currentColor" : "none"} />
      </button>
      <button
        onClick={handlePlay}
        aria-label="Reproducir"
        className="bg-gradient-warm text-primary-foreground shadow-glow grid h-10 w-10 shrink-0 place-items-center rounded-full transition active:scale-95"
      >
        {isCurrent && isPlaying ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
      </button>
    </Link>
  );
}
