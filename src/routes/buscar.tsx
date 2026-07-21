import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { categories, podcasts, type Category } from "@/data/podcasts";
import { PodcastCard } from "@/components/PodcastCard";

export const Route = createFileRoute("/buscar")({
  component: BuscarPage,
  head: () => ({ meta: [{ title: "Explorar · PodEDS" }] }),
});

type Sort = "recientes" | "populares" | "cortos";

function BuscarPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Category | "Todas">("Todas");
  const [sort, setSort] = useState<Sort>("recientes");

  const results = useMemo(() => {
    let list = podcasts.filter((p) => {
      const matchesQ =
        !q ||
        p.title.toLowerCase().includes(q.toLowerCase()) ||
        p.author.toLowerCase().includes(q.toLowerCase());
      const matchesCat = cat === "Todas" || p.category === cat;
      return matchesQ && matchesCat;
    });
    if (sort === "populares") list = [...list].sort((a, b) => b.plays - a.plays);
    else if (sort === "cortos") list = [...list].sort((a, b) => a.durationSec - b.durationSec);
    else list = [...list].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
    return list;
  }, [q, cat, sort]);

  return (
    <div className="space-y-6 px-4 pt-2 md:px-0">
      <h1 className="font-display text-3xl">Explorar</h1>

      <div className="bg-card shadow-card flex items-center gap-2 rounded-2xl px-3 py-2.5">
        <Search className="text-muted-foreground h-4 w-4" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por título o autor"
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>

      <div className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0">
        {(["Todas", ...categories.map((c) => c.name)] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition ${
              cat === c
                ? "bg-gradient-warm text-primary-foreground shadow-glow"
                : "bg-card text-muted-foreground shadow-soft hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-xs">Ordenar:</span>
        {(["recientes", "populares", "cortos"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSort(s)}
            className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition ${
              sort === s ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {results.map((p) => (
          <PodcastCard key={p.id} podcast={p} variant="row" />
        ))}
        {results.length === 0 && (
          <p className="text-muted-foreground col-span-full py-12 text-center text-sm">
            No encontramos podcasts para tu búsqueda.
          </p>
        )}
      </div>
    </div>
  );
}
