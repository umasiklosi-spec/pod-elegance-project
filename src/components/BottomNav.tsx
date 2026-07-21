import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Search, Upload, Heart, User } from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/buscar", label: "Buscar", icon: Search },
  { to: "/subir", label: "Subir", icon: Upload },
  { to: "/favoritos", label: "Favoritos", icon: Heart },
  { to: "/perfil", label: "Perfil", icon: User },
] as const;

export function BottomNav() {
  const { location } = useRouterState();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 px-3 pb-3 pt-2 md:hidden">
      <div className="glass shadow-card rounded-3xl px-2 py-2">
        <ul className="flex items-center justify-between">
          {items.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <li key={to} className="flex-1">
                <Link
                  to={to}
                  className="flex flex-col items-center gap-0.5 rounded-2xl px-2 py-1.5 transition-all"
                  aria-label={label}
                >
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-2xl transition-all ${
                      active ? "bg-gradient-warm text-primary-foreground shadow-glow" : "text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={active ? 2.4 : 1.8} />
                  </span>
                  <span className={`text-[10px] font-medium ${active ? "text-foreground" : "text-muted-foreground"}`}>
                    {label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
