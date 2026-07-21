import { Link } from "@tanstack/react-router";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { usePlayer } from "@/contexts/PlayerContext";

export function MiniPlayer() {
  const { current, isPlaying, progress, toggle } = usePlayer();
  if (!current) return null;

  return (
    <div className="pointer-events-none fixed bottom-20 left-0 right-0 z-40 px-3 md:bottom-4 md:left-auto md:right-4 md:max-w-sm">
      <div className="pointer-events-auto glass shadow-card overflow-hidden rounded-3xl">
        <div className="bg-muted relative h-1 w-full">
          <div
            className="bg-gradient-warm absolute inset-y-0 left-0"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <div className="flex items-center gap-3 p-2.5">
          <Link to="/podcast/$id" params={{ id: current.id }} className="shrink-0">
            <img
              src={current.cover}
              alt={current.title}
              width={48}
              height={48}
              className="h-12 w-12 rounded-2xl object-cover"
            />
          </Link>
          <Link to="/podcast/$id" params={{ id: current.id }} className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              {isPlaying && (
                <span className="flex items-end gap-0.5">
                  <span className="bg-primary eq-bar h-3 w-0.5 rounded-full" style={{ animationDelay: "0ms" }} />
                  <span className="bg-primary eq-bar h-3 w-0.5 rounded-full" style={{ animationDelay: "150ms" }} />
                  <span className="bg-primary eq-bar h-3 w-0.5 rounded-full" style={{ animationDelay: "300ms" }} />
                </span>
              )}
              <p className="truncate text-sm font-semibold">{current.title}</p>
            </div>
            <p className="text-muted-foreground truncate text-xs">{current.author}</p>
          </Link>
          <div className="flex items-center gap-0.5">
            <button className="text-muted-foreground hover:text-foreground hidden h-9 w-9 place-items-center rounded-full sm:grid" aria-label="Anterior">
              <SkipBack className="h-4 w-4" />
            </button>
            <button
              onClick={toggle}
              aria-label={isPlaying ? "Pausar" : "Reproducir"}
              className="bg-gradient-warm shadow-glow grid h-10 w-10 place-items-center rounded-full text-primary-foreground transition active:scale-95"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
            </button>
            <button className="text-muted-foreground hover:text-foreground hidden h-9 w-9 place-items-center rounded-full sm:grid" aria-label="Siguiente">
              <SkipForward className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
