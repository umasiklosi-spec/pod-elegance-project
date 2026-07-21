import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { PlayerProvider } from "@/contexts/PlayerContext";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { MiniPlayer } from "@/components/MiniPlayer";
import { SideNav } from "@/components/SideNav";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Esta frecuencia no existe</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          La página que buscas se perdió entre las ondas.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="bg-gradient-warm text-primary-foreground shadow-glow inline-flex items-center justify-center rounded-2xl px-5 py-2.5 text-sm font-medium transition-transform hover:scale-[1.02]"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "PodEDS · descubre y comparte podcasts" },
      { name: "description", content: "Sube, descubre y reproduce podcasts en una experiencia cálida y minimalista." },
      { name: "author", content: "PodEDS" },
      { property: "og:title", content: "PodEDS · descubre y comparte podcasts" },
      { property: "og:description", content: "Sube, descubre y reproduce podcasts en una experiencia cálida y minimalista." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <ThemeProvider>
      <PlayerProvider>
        <div className="bg-gradient-glow min-h-screen">
          <Header />
          <div className="mx-auto flex w-full max-w-6xl gap-6 px-0 md:px-6">
            <SideNav />
            <main className="min-w-0 flex-1 pb-40 md:pb-24">
              <Outlet />
            </main>
          </div>
          <MiniPlayer />
          <BottomNav />
        </div>
      </PlayerProvider>
    </ThemeProvider>
  );
}
