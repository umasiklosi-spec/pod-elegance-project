import { Link } from "@tanstack/react-router";
import { Bell, Heart, Moon, Search, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import logo from "@/assets/logo.png";

export function Header() {
  const { theme, toggle } = useTheme();
  return (
    <header className="sticky top-0 z-30 px-4 pt-4 pb-3 md:px-8">
      <div className="glass shadow-soft flex items-center gap-3 rounded-3xl px-3 py-2">
        <Link to="/" className="flex items-center gap-2 pl-2 pr-1">
          <span className="shadow-glow grid h-9 w-9 place-items-center overflow-hidden rounded-2xl">
            <img src={logo} alt="PodEDS" className="h-full w-full object-cover" />
          </span>
          <span className="font-display hidden text-lg font-semibold tracking-tight sm:inline">PodEDS</span>
        </Link>

        <Link
          to="/buscar"
          className="bg-muted/60 text-muted-foreground hover:bg-muted flex flex-1 items-center gap-2 rounded-2xl px-3 py-2 text-sm transition"
        >
          <Search className="h-4 w-4" />
          <span className="truncate">Buscar podcasts, autores, temas…</span>
        </Link>

        <div className="flex items-center gap-1">
          <button
            onClick={toggle}
            aria-label="Cambiar tema"
            className="hover:bg-muted grid h-10 w-10 place-items-center rounded-2xl transition"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link
            to="/favoritos"
            className="hover:bg-muted hidden h-10 w-10 place-items-center rounded-2xl transition sm:grid"
            aria-label="Favoritos"
          >
            <Heart className="h-4 w-4" />
          </Link>
          <button
            aria-label="Notificaciones"
            className="hover:bg-muted relative grid h-10 w-10 place-items-center rounded-2xl transition"
          >
            <Bell className="h-4 w-4" />
            <span className="bg-primary absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full" />
          </button>
        </div>
      </div>
    </header>
  );
}
