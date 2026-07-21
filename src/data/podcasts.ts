import cover1 from "@/assets/cover-1.jpg";
import cover2 from "@/assets/cover-2.jpg";
import cover3 from "@/assets/cover-3.jpg";
import cover4 from "@/assets/cover-4.jpg";
import cover5 from "@/assets/cover-5.jpg";
import cover6 from "@/assets/cover-6.jpg";
import cover7 from "@/assets/cover-7.jpg";
import cover8 from "@/assets/cover-8.jpg";

export type Category =
  | "Tecnología"
  | "Crimen"
  | "Psicología"
  | "Historia"
  | "Entretenimiento"
  | "Otros";

export type Podcast = {
  id: string;
  title: string;
  author: string;
  cover: string;
  duration: string; // mm:ss or hh:mm:ss display
  durationSec: number;
  category: Category;
  plays: number;
  description: string;
  publishedAt: string; // ISO
  liked?: boolean;
};

export const categories: { name: Category; emoji: string }[] = [
  { name: "Tecnología", emoji: "🛰" },
  { name: "Crimen", emoji: "🔎" },
  { name: "Psicología", emoji: "🧠" },
  { name: "Historia", emoji: "🏛" },
  { name: "Entretenimiento", emoji: "🎭" },
  { name: "Otros", emoji: "✨" },
];

export const podcasts: Podcast[] = [
  {
    id: "p1",
    title: "Raíces del silencio",
    author: "Lucía Mendoza",
    cover: cover1,
    duration: "42:18",
    durationSec: 2538,
    category: "Psicología",
    plays: 128_430,
    description:
      "Una conversación pausada sobre el silencio interior, la ansiedad moderna y cómo volver a casa dentro de uno mismo.",
    publishedAt: "2026-04-15",
  },
  {
    id: "p2",
    title: "Frecuencia humana",
    author: "Mateo Ríos",
    cover: cover2,
    duration: "1:02:55",
    durationSec: 3775,
    category: "Entretenimiento",
    plays: 312_900,
    description:
      "Historias contadas a viva voz por personas comunes con vidas extraordinarias. Cada episodio, una frecuencia distinta.",
    publishedAt: "2026-04-18",
  },
  {
    id: "p3",
    title: "Estudio Terracota",
    author: "Camila Soler",
    cover: cover3,
    duration: "28:40",
    durationSec: 1720,
    category: "Entretenimiento",
    plays: 89_120,
    description:
      "Detrás de cámaras de los mejores podcasts independientes. Producción, micrófonos y la magia de la voz.",
    publishedAt: "2026-04-12",
  },
  {
    id: "p4",
    title: "Cartografía emocional",
    author: "Andrés Vega",
    cover: cover4,
    duration: "55:10",
    durationSec: 3310,
    category: "Psicología",
    plays: 204_770,
    description:
      "Mapas para territorios internos. Una guía narrada sobre cómo navegar emociones difíciles sin perderse en ellas.",
    publishedAt: "2026-04-10",
  },
  {
    id: "p5",
    title: "Crimen entre líneas",
    author: "Sofía Aguirre",
    cover: cover5,
    duration: "47:02",
    durationSec: 2822,
    category: "Crimen",
    plays: 540_220,
    description:
      "Casos reales reconstruidos con rigor, sin morbo. Investigación, archivo y testimonios que reescriben la historia.",
    publishedAt: "2026-04-19",
  },
  {
    id: "p6",
    title: "Cerebro abierto",
    author: "Dra. Helena Cruz",
    cover: cover6,
    duration: "36:44",
    durationSec: 2204,
    category: "Psicología",
    plays: 175_380,
    description:
      "Neurociencia para curiosos. Cómo aprende, recuerda y se equivoca tu cerebro, contado por una neurocientífica.",
    publishedAt: "2026-04-17",
  },
  {
    id: "p7",
    title: "Voces del Imperio",
    author: "Tomás Iriarte",
    cover: cover7,
    duration: "1:14:22",
    durationSec: 4462,
    category: "Historia",
    plays: 268_010,
    description:
      "Roma, Bizancio y los imperios olvidados. Historia narrada como una buena novela, con fuentes y sin atajos.",
    publishedAt: "2026-04-08",
  },
  {
    id: "p8",
    title: "Código abierto",
    author: "Renata Salinas",
    cover: cover8,
    duration: "39:11",
    durationSec: 2351,
    category: "Tecnología",
    plays: 421_540,
    description:
      "IA, software libre y la cultura hacker contemporánea. Conversaciones con quienes están construyendo el futuro.",
    publishedAt: "2026-04-20",
  },
];

export const getById = (id: string) => podcasts.find((p) => p.id === id);

export const formatPlays = (n: number) => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
};
