import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Image as ImageIcon, Music, Upload as UploadIcon } from "lucide-react";
import { categories, type Category } from "@/data/podcasts";

export const Route = createFileRoute("/subir")({
  component: SubirPage,
  head: () => ({ meta: [{ title: "Subir podcast · PodEDS" }] }),
});

function SubirPage() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState<Category>("Tecnología");
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [audioName, setAudioName] = useState<string | null>(null);

  const onCover = (file: File) => {
    const url = URL.createObjectURL(file);
    setCoverUrl(url);
  };

  const previewReady = useMemo(() => title && desc && (coverUrl || audioName), [title, desc, coverUrl, audioName]);

  return (
    <div className="space-y-6 px-4 pt-2 md:px-0">
      <header>
        <h1 className="font-display text-3xl">Subir un podcast</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Comparte tu voz con la comunidad. Tu episodio aparecerá en “Recién subidos”.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-[1fr_320px]">
        <form className="space-y-4">
          <Field label="Título">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Un nombre que dé curiosidad"
              className="bg-card shadow-soft w-full rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            />
          </Field>

          <Field label="Descripción">
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={4}
              placeholder="¿De qué trata este episodio?"
              className="bg-card shadow-soft w-full resize-none rounded-2xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40"
            />
          </Field>

          <Field label="Categoría">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  type="button"
                  key={c.name}
                  onClick={() => setCat(c.name)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    cat === c.name
                      ? "bg-gradient-warm text-primary-foreground shadow-glow"
                      : "bg-card text-muted-foreground shadow-soft hover:text-foreground"
                  }`}
                >
                  {c.emoji} {c.name}
                </button>
              ))}
            </div>
          </Field>

          <div className="grid gap-3 sm:grid-cols-2">
            <FileDrop
              label="Imagen de portada"
              icon={<ImageIcon className="h-4 w-4" />}
              hint="JPG o PNG · 1:1"
              accept="image/*"
              onFile={onCover}
              filename={coverUrl ? "Portada cargada" : null}
            />
            <FileDrop
              label="Archivo de audio"
              icon={<Music className="h-4 w-4" />}
              hint="MP3, WAV · hasta 200MB"
              accept="audio/*"
              onFile={(f) => setAudioName(f.name)}
              filename={audioName}
            />
          </div>

          <button
            type="button"
            disabled={!previewReady}
            className="bg-gradient-warm text-primary-foreground shadow-glow flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <UploadIcon className="h-4 w-4" /> Publicar episodio
          </button>
        </form>

        {/* Preview */}
        <aside className="space-y-3">
          <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Vista previa</p>
          <div className="bg-card shadow-card overflow-hidden rounded-3xl">
            <div className="bg-gradient-soft relative aspect-square">
              {coverUrl ? (
                <img src={coverUrl} alt="Portada" className="h-full w-full object-cover" />
              ) : (
                <div className="text-muted-foreground/60 grid h-full place-items-center text-xs">
                  Tu portada aparecerá aquí
                </div>
              )}
            </div>
            <div className="space-y-1 p-4">
              <span className="text-muted-foreground text-[10px] font-semibold uppercase tracking-wider">{cat}</span>
              <p className="font-display text-lg leading-tight">{title || "Sin título"}</p>
              <p className="text-muted-foreground line-clamp-3 text-xs">
                {desc || "Una breve descripción de tu episodio…"}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function FileDrop({
  label,
  icon,
  hint,
  accept,
  onFile,
  filename,
}: {
  label: string;
  icon: React.ReactNode;
  hint: string;
  accept: string;
  onFile: (f: File) => void;
  filename: string | null;
}) {
  return (
    <label className="bg-card shadow-soft hover:shadow-card group block cursor-pointer rounded-2xl border-2 border-dashed border-border p-4 text-center transition">
      <input
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
        }}
      />
      <div className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-gradient-soft text-foreground/70 transition group-hover:scale-105">
        {icon}
      </div>
      <p className="mt-2 text-sm font-semibold">{label}</p>
      <p className="text-muted-foreground text-[11px]">{filename ?? hint}</p>
    </label>
  );
}
