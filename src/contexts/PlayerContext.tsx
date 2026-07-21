import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { podcasts, type Podcast } from "@/data/podcasts";


type PlayerState = {
  current: Podcast | null;
  isPlaying: boolean;
  progress: number; // 0..1
  liked: Set<string>;
  favorites: Set<string>;
  history: string[];
  play: (p: Podcast) => void;
  toggle: () => void;
  next: () => void;
  previous: () => void;
  toggleLike: (id: string) => void;
  toggleFavorite: (id: string) => void;
  seek: (v: number) => void;

};

const PlayerContext = createContext<PlayerState | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<Podcast | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const [favorites, setFavorites] = useState<Set<string>>(new Set(["p2", "p5"]));
  const [history, setHistory] = useState<string[]>([]);

  const play = useCallback((p: Podcast) => {
    setCurrent(p);
    setIsPlaying(true);
    setProgress(0);
    setHistory((h) => [p.id, ...h.filter((x) => x !== p.id)].slice(0, 20));
  }, []);

  const toggle = useCallback(() => setIsPlaying((v) => !v), []);

  const next = useCallback(() => {
    if (!current) return;
    const i = podcasts.findIndex((p) => p.id === current.id);
    const nextP = podcasts[(i + 1) % podcasts.length];
    play(nextP);
  }, [current, play]);

  const previous = useCallback(() => {
    if (!current) return;
    const i = podcasts.findIndex((p) => p.id === current.id);
    const prevP = podcasts[(i - 1 + podcasts.length) % podcasts.length];
    play(prevP);
  }, [current, play]);


  const toggleLike = useCallback((id: string) => {
    setLiked((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }, []);

  const seek = useCallback((v: number) => setProgress(Math.max(0, Math.min(1, v))), []);

  // Simulate progress
  useEffect(() => {
    if (!isPlaying || !current) return;
    const id = setInterval(() => {
      setProgress((p) => {
        const next = p + 1 / current.durationSec;
        if (next >= 1) {
          setIsPlaying(false);
          return 1;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [isPlaying, current]);

  const value = useMemo(
    () => ({ current, isPlaying, progress, liked, favorites, history, play, toggle, next, previous, toggleLike, toggleFavorite, seek }),
    [current, isPlaying, progress, liked, favorites, history, play, toggle, next, previous, toggleLike, toggleFavorite, seek],
  );


  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}
