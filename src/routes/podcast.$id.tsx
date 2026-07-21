import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowLeft, Heart, MessageCircle, Pause, Play, Share2, SkipBack, SkipForward } from "lucide-react";
import { useState } from "react";
import { getById, podcasts, formatPlays } from "@/data/podcasts";
import { usePlayer } from "@/contexts/PlayerContext";
import { PodcastCard } from "@/components/PodcastCard";

export const Route = createFileRoute("/podcast/$id")({
  loader: ({ params }) => {
    const podcast = getById(params.id);
    if (!podcast) throw notFound();
    return { podcast };
  },
  component: PodcastDetail,
  notFoundComponent: () => (
    <div className="px-4 py-16 text-center">
      <p className="font-display text-2xl">Podcast no encontrado</p>
      <Link to="/" className="text-primary mt-3 inline-block text-sm">Volver al inicio</Link>
    </div>
  ),
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.podcast.title} · PodEDS` },
      { name: "description", content: loaderData?.podcast.description ?? "" },
      { property: "og:title", content: loaderData?.podcast.title ?? "" },
      { property: "og:description", content: loaderData?.podcast.description ?? "" },
      { property: "og:image", content: loaderData?.podcast.cover ?? "" },
    ],
  }),
});

const seedComments = [
  { id: "c1", user: "Andrea P.", text: "Increíble episodio, no podía dejar de escucharlo.", t: "hace 2h", reacts: 24 },
  { id: "c2", user: "Mario L.", text: "La voz de la autora es hipnótica. Más así por favor 🌿", t: "hace 5h", reacts: 11 },
  { id: "c3", user: "Sofi R.", text: "Me dejó pensando toda la tarde.", t: "ayer", reacts: 7 },
];

function PodcastDetail() {
  const { podcast } = Route.useLoaderData();
  const { play, toggle, current, isPlaying, progress, liked, toggleLike, favorites, toggleFavorite } = usePlayer();
  const isCurrent = current?.id === podcast.id;
  const isLiked = liked.has(podcast.id);
  const isFav = favorites.has(podcast.id);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(seedComments);

  const related = podcasts.filter((p) => p.id !== podcast.id && p.category === podcast.category).slice(0, 4);

  const elapsed = isCurrent ? Math.floor(progress * podcast.durationSec) : 0;

  return (
    <div className="space-y-8 px-4 pt-2 md:px-0">
      <Link to="/" className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-sm">
        <ArrowLeft className="h-4 w-4" /> Volver
      </Link>

      <section className="grid gap-6 md:grid-cols-[300px_1fr] md:items-end">
        <div className="bg-card shadow-card animate-float relative overflow-hidden rounded-3xl">
          <img src={podcast.cover} alt={podcast.title} width={600} height={600} className="aspect-square w-full object-cover" />
        </div>
        <div className="space-y-3">
          <span className="bg-card shadow-soft inline-block rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider">
            {podcast.category}
          </span>
          <h1 className="font-display text-4xl leading-tight md:text-5xl">{podcast.title}</h1>
          <p className="text-muted-foreground text-sm">
            por <span className="text-foreground font-medium">{podcast.author}</span> · {podcast.duration} ·{" "}
            {formatPlays(podcast.plays)} reproducciones
          </p>
          <p className="leading-relaxed">{podcast.description}</p>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <button
              onClick={() => (isCurrent ? toggle() : play(podcast))}
              className="bg-gradient-warm text-primary-foreground shadow-glow inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition hover:scale-[1.02]"
            >
              {isCurrent && isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isCurrent && isPlaying ? "Pausar" : "Reproducir"}
            </button>
            <button
              onClick={() => toggleLike(podcast.id)}
              className={`bg-card shadow-soft inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition ${
                isLiked ? "text-primary" : "text-foreground"
              }`}
            >
              <Heart className="h-4 w-4" fill={isLiked ? "currentColor" : "none"} /> Me gusta
            </button>
            <button
              onClick={() => toggleFavorite(podcast.id)}
              className={`bg-card shadow-soft inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition ${
                isFav ? "text-secondary" : "text-foreground"
              }`}
            >
              {isFav ? "★ Guardado" : "☆ Guardar"}
            </button>
            <button className="bg-card shadow-soft inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium">
              <Share2 className="h-4 w-4" /> Compartir
            </button>
          </div>
        </div>
      </section>

      {/* Big player */}
      <section className="bg-card shadow-card rounded-3xl p-5">
        <div className="bg-muted relative h-1.5 w-full overflow-hidden rounded-full">
          <div className="bg-gradient-warm absolute inset-y-0 left-0" style={{ width: `${(isCurrent ? progress : 0) * 100}%` }} />
        </div>
        <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
          <span>{formatTime(elapsed)}</span>
          <span>{podcast.duration}</span>
        </div>
        <div className="mt-3 flex items-center justify-center gap-4">
          <button className="text-muted-foreground hover:text-foreground" aria-label="Anterior">
            <SkipBack className="h-5 w-5" />
          </button>
          <button
            onClick={() => (isCurrent ? toggle() : play(podcast))}
            aria-label={isPlaying && isCurrent ? "Pausar" : "Reproducir"}
            className="bg-gradient-warm text-primary-foreground shadow-glow grid h-14 w-14 place-items-center rounded-full transition active:scale-95"
          >
            {isCurrent && isPlaying ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" />}
          </button>
          <button className="text-muted-foreground hover:text-foreground" aria-label="Siguiente">
            <SkipForward className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Comments */}
      <section className="space-y-4">
        <h2 className="font-display flex items-center gap-2 text-xl">
          <MessageCircle className="text-primary h-4 w-4" /> Comentarios
        </h2>
        <div className="bg-card shadow-soft flex items-center gap-2 rounded-2xl p-2">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Deja un comentario…"
            className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
          />
          <button
            disabled={!comment.trim()}
            onClick={() => {
              setComments((c) => [
                { id: String(Date.now()), user: "Tú", text: comment.trim(), t: "ahora", reacts: 0 },
                ...c,
              ]);
              setComment("");
            }}
            className="bg-gradient-warm text-primary-foreground rounded-xl px-4 py-2 text-xs font-semibold disabled:opacity-50"
          >
            Publicar
          </button>
        </div>

        <ul className="space-y-3">
          {comments.map((c) => (
            <li key={c.id} className="bg-card shadow-soft rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">{c.user}</p>
                <span className="text-muted-foreground text-[11px]">{c.t}</span>
              </div>
              <p className="mt-1 text-sm leading-relaxed">{c.text}</p>
              <div className="text-muted-foreground mt-2 flex items-center gap-3 text-[11px]">
                <button className="hover:text-primary inline-flex items-center gap-1">
                  <Heart className="h-3 w-3" /> {c.reacts}
                </button>
                <button className="hover:text-foreground">Responder</button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {related.length > 0 && (
        <section className="space-y-3">
          <h2 className="font-display text-xl">Te puede interesar</h2>
          <div className="scrollbar-hide -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
            {related.map((p) => (
              <PodcastCard key={p.id} podcast={p} variant="tile" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
