import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Search, Upload, Heart, User } from "lucide-react";

const items = [
  { to: "/", label: "Inicio", icon: Home },
  { to: "/buscar", label: "Explorar", icon: Search },
  { to: "/subir", label: "Subir", icon: Upload },
  { to: "/favoritos", label: "Favoritos", icon: Heart },
  { to: "/perfil", label: "Perfil", icon: User },
] as const;

export function SideNav() {
  const { location } = useRouterState();
  return (
    <aside className="sticky top-24 hidden h-[calc(100vh-7rem)] w-56 shrink-0 flex-col gap-1 px-2 md:flex">
      {items.map(({ to, label, icon: Icon }) => {
        const active = location.pathname === to;
        return (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition ${
              active
                ? "bg-gradient-warm text-primary-foreground shadow-glow"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        );
      })}
      <div className="mt-auto px-3 pb-2">
        <p className="text-muted-foreground text-[11px] leading-relaxed">
          PodEDS · podcasts hechos a mano
        </p>
      </div>
    </aside>
  );
}
