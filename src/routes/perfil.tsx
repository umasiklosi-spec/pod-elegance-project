import { createFileRoute } from "@tanstack/react-router";
import { Settings, UserPlus } from "lucide-react";
import { usePlayer } from "@/contexts/PlayerContext";
import { podcasts } from "@/data/podcasts";
import { PodcastCard } from "@/components/PodcastCard";
import avatar from "@/assets/avatar.jpg";
import { useState } from "react";

export const Route = createFileRoute("/perfil")({
  component: PerfilPage,
  head: () => ({ meta: [{ title: "Perfil · PodEDS" }] }),
});

function PerfilPage() {
  const { favorites, history } = usePlayer();
  const [tab, setTab] = useState<"subidos" | "favoritos" | "historial">("subidos");

  const subidos = podcasts.filter((p) => p.author === "Lucía Mendoza");
  const favs = podcasts.filter((p) => favorites.has(p.id));
  const hist = history.map((id) => podcasts.find((p) => p.id === id)).filter(Boolean) as typeof podcasts;

  const list = tab === "subidos" ? subidos : tab === "favoritos" ? favs : hist;

  return (
    <div className="space-y-6 px-4 pt-2 md:px-0">
      <section className="bg-card shadow-card relative overflow-hidden rounded-3xl">
        <div className="bg-gradient-warm h-28" />
        <div className="-mt-12 flex flex-col items-start gap-3 px-5 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            <img
              src={avatar}
              alt="Lucía Mendoza"
              width={96}
              height={96}
              className="border-card h-24 w-24 rounded-3xl border-4 object-cover shadow-card"
            />
            <div className="pb-1">
              <h1 className="font-display text-2xl">Lucía Mendoza</h1>
              <p className="text-muted-foreground text-sm">@luciamendoza · 1.2K seguidores</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-gradient-warm text-primary-foreground shadow-glow flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold">
              <UserPlus className="h-3.5 w-3.5" /> Seguir
            </button>
            <button className="bg-muted hover:bg-accent grid h-9 w-9 place-items-center rounded-full transition" aria-label="Ajustes">
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-3 gap-3">
        <Stat label="Subidos" value={subidos.length} />
        <Stat label="Seguidores" value="1.2K" />
        <Stat label="Siguiendo" value={84} />
      </div>

      <div className="bg-card shadow-soft inline-flex rounded-full p-1">
        {(["subidos", "favoritos", "historial"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition ${
              tab === t ? "bg-gradient-warm text-primary-foreground shadow-glow" : "text-muted-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <p className="text-muted-foreground py-10 text-center text-sm">Nada por aquí todavía.</p>
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

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-card shadow-soft rounded-2xl p-3 text-center">
      <p className="font-display text-xl">{value}</p>
      <p className="text-muted-foreground text-[11px] uppercase tracking-wider">{label}</p>
    </div>
  );
}
