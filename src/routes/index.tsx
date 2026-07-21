import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Sparkles, TrendingUp } from "lucide-react";
import { categories, podcasts, formatPlays } from "@/data/podcasts";
import { PodcastCard } from "@/components/PodcastCard";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const featured = podcasts.slice(0, 4);
  const recent = [...podcasts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, 6);
  const top = [...podcasts].sort((a, b) => b.plays - a.plays).slice(0, 6);

  return (
    <div className="space-y-10 px-4 md:px-0">
      {/* Hero greeting */}
      <section className="animate-fade-up pt-2">
        <p className="text-muted-foreground text-sm">Buenas tardes, Lucía</p>
        <h1 className="font-display mt-1 text-3xl leading-tight md:text-4xl">
          Hoy hay <span className="text-primary italic">historias</span> nuevas
          <br className="hidden sm:block" /> esperándote.
        </h1>
      </section>

      {/* Featured carousel */}
      <section className="animate-fade-up" style={{ animationDelay: "60ms" }}>
        <SectionHeader title="Destacados" icon={<Sparkles className="h-4 w-4" />} />
        <div className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
          {featured.map((p) => (
            <div key={p.id} className="snap-start">
              <PodcastCard podcast={p} variant="wide" />
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="animate-fade-up" style={{ animationDelay: "120ms" }}>
        <SectionHeader title="Categorías" />
        <div className="scrollbar-hide -mx-4 flex gap-3 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0">
          {categories.map((c) => (
            <Link
              key={c.name}
              to="/buscar"
              className="bg-card shadow-soft hover:shadow-card group flex shrink-0 flex-col items-center gap-2 rounded-3xl p-3 transition hover:-translate-y-0.5"
            >
              <span className="bg-gradient-soft grid h-16 w-16 place-items-center rounded-full text-2xl transition-transform group-hover:scale-105">
                {c.emoji}
              </span>
              <span className="text-xs font-medium">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent */}
      <section className="animate-fade-up" style={{ animationDelay: "180ms" }}>
        <SectionHeader title="Recién subidos" actionLabel="Ver todo" actionTo="/buscar" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {recent.map((p) => (
            <PodcastCard key={p.id} podcast={p} variant="row" />
          ))}
        </div>
      </section>

      {/* Top played */}
      <section className="animate-fade-up" style={{ animationDelay: "240ms" }}>
        <SectionHeader title="Más escuchados" icon={<TrendingUp className="h-4 w-4" />} />
        <div className="scrollbar-hide -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
          {top.map((p, i) => (
            <Link
              key={p.id}
              to="/podcast/$id"
              params={{ id: p.id }}
              className="bg-card shadow-card group relative flex w-56 shrink-0 items-center gap-3 rounded-3xl p-3 transition hover:-translate-y-0.5"
            >
              <span className="font-display text-primary/30 absolute right-3 top-1 text-5xl font-bold leading-none">
                {i + 1}
              </span>
              <img
                src={p.cover}
                alt={p.title}
                width={120}
                height={120}
                loading="lazy"
                className="h-16 w-16 shrink-0 rounded-2xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{p.title}</p>
                <p className="text-muted-foreground truncate text-xs">{p.author}</p>
                <p className="text-muted-foreground mt-1 text-[11px]">{formatPlays(p.plays)} plays</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function SectionHeader({
  title,
  actionLabel,
  actionTo,
  icon,
}: {
  title: string;
  actionLabel?: string;
  actionTo?: "/buscar";
  icon?: React.ReactNode;
}) {
  return (
    <div className="mb-3 flex items-end justify-between">
      <h2 className="font-display flex items-center gap-2 text-xl">
        {icon && <span className="text-primary">{icon}</span>}
        {title}
      </h2>
      {actionLabel && actionTo && (
        <Link to={actionTo} className="text-muted-foreground hover:text-foreground flex items-center text-xs font-medium">
          {actionLabel} <ChevronRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  );
}
