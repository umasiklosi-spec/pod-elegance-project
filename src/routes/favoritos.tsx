import { createFileRoute } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { usePlayer } from "@/contexts/PlayerContext";
import { podcasts } from "@/data/podcasts";
import { PodcastCard } from "@/components/PodcastCard";

export const Route = createFileRoute("/favoritos")({
  component: FavoritosPage,
  head: () => ({ meta: [{ title: "Favoritos · PodEDS" }] }),
});

function FavoritosPage() {
  const { favorites } = usePlayer();
  const list = podcasts.filter((p) => favorites.has(p.id));

  return (
    <div className="space-y-6 px-4 pt-2 md:px-0">
      <header>
        <h1 className="font-display text-3xl">Tus favoritos</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Una colección curada por ti, lista para acompañarte.
        </p>
      </header>

      {list.length === 0 ? (
        <div className="bg-card shadow-card flex flex-col items-center gap-3 rounded-3xl p-10 text-center">
          <span className="bg-gradient-soft grid h-16 w-16 place-items-center rounded-full">
            <Heart className="text-primary h-6 w-6" />
          </span>
          <p className="font-display text-xl">Aún no hay favoritos</p>
          <p className="text-muted-foreground text-sm">
            Toca el corazón en cualquier podcast para guardarlo aquí.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {list.map((p) => (
            <PodcastCard key={p.id} podcast={p} variant="row" />
          ))}
        </div>
      )}
    </div>
  );
}
