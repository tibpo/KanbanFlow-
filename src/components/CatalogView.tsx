"use client";

import React, { useMemo } from "react";
import { POPS } from "@/data/pops";
import { THEMES } from "@/data/themes";
import type { ThemeId } from "@/types/pop";

interface CatalogViewProps {
  selectedTheme: ThemeId;
  searchQuery: string;
  onSelectTheme: (themeId: ThemeId) => void;
  onOpenPop: (code: string) => void;
  onClearSearch: () => void;
}

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function CatalogView({
  selectedTheme,
  searchQuery,
  onSelectTheme,
  onOpenPop,
  onClearSearch,
}: CatalogViewProps) {
  const activeTheme = useMemo(
    () => THEMES.find((t) => t.id === selectedTheme) ?? THEMES[0],
    [selectedTheme]
  );

  const filteredPops = useMemo(() => {
    const q = normalizeText(searchQuery.trim());
    return POPS.filter((pop) => {
      const matchTheme =
        selectedTheme === "all" || pop.themeId === selectedTheme;
      if (!matchTheme) return false;
      if (!q) return true;

      const haystack = normalizeText(
        `${pop.code} ${pop.goal} ${pop.title} ${pop.keywords}`
      );
      return haystack.includes(q);
    });
  }, [selectedTheme, searchQuery]);

  return (
    <section className="fade-in">
      {/* Abas dos 5 Temas */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-extrabold uppercase tracking-wider text-stone-500">
            Filtrar por Tema
          </span>
          <span className="text-xs font-bold text-crimson">
            {filteredPops.length}{" "}
            {filteredPops.length === 1 ? "procedimento" : "procedimentos"}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {THEMES.map((t) => {
            const active = selectedTheme === t.id;
            return (
              <button
                key={String(t.id)}
                type="button"
                onClick={() => onSelectTheme(t.id)}
                className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold border transition ${
                  active
                    ? "bg-crimson text-white border-crimson shadow-sm"
                    : "bg-white text-stone-700 border-stone-200 hover:border-crimson hover:text-crimson"
                }`}
              >
                {t.id === "all" ? t.name : `${t.num}. ${t.name}`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Banner descritivo do Tema Selecionado */}
      <div className="bg-white border border-stone-200 border-l-4 border-l-crimson rounded-r-xl p-4 sm:p-5 mb-6 shadow-sm">
        <div className="text-xs font-extrabold uppercase tracking-wider text-crimson mb-1">
          {activeTheme.id === "all"
            ? "Catálogo Completo"
            : `Tema ${activeTheme.num}`}
        </div>
        <h2 className="text-lg sm:text-xl font-extrabold text-stoneink">
          {activeTheme.name}
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          {activeTheme.desc}
        </p>
      </div>

      {/* Grid de Cards Clicáveis (Ordem Invertida: Necessidade -> POP -> Título) */}
      {filteredPops.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPops.map((pop) => {
            const theme = THEMES.find((t) => t.id === pop.themeId);
            return (
              <button
                key={pop.code}
                type="button"
                onClick={() => onOpenPop(pop.code)}
                className="text-left bg-white hover:bg-rose-50/30 border border-stone-200 hover:border-crimson rounded-xl p-4 sm:p-5 transition shadow-sm hover:shadow group flex flex-col justify-between"
              >
                <div>
                  {/* 1º: Objetivo / Necessidade em destaque */}
                  <div className="text-xs font-extrabold uppercase tracking-wide text-crimson mb-2">
                    {pop.goal}
                  </div>

                  {/* 2º e 3º: Selo POP-XXX + Título do procedimento */}
                  <div className="flex items-start gap-2.5">
                    <span className="shrink-0 bg-crimson text-white text-xs font-extrabold px-2.5 py-1 rounded mt-0.5">
                      {pop.code}
                    </span>
                    <h3 className="text-base font-extrabold text-stoneink group-hover:text-crimson transition leading-snug">
                      {pop.title}
                    </h3>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  {theme && (
                    <span className="font-medium">
                      Tema {theme.num} • {theme.name}
                    </span>
                  )}
                  <span className="font-bold text-crimson group-hover:translate-x-0.5 transition">
                    Ver passos →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        /* Estado vazio na busca */
        <div className="bg-white border border-stone-200 rounded-xl p-8 text-center">
          <p className="text-base font-bold text-stoneink">
            Nenhum procedimento encontrado para essa busca.
          </p>
          <p className="text-sm text-stone-500 mt-1">
            Tente termos como &ldquo;lento&rdquo;, &ldquo;senha&rdquo;,
            &ldquo;tela&rdquo;, &ldquo;wi-fi&rdquo;, &ldquo;vírus&rdquo; ou
            &ldquo;chamado&rdquo;.
          </p>
          <button
            type="button"
            onClick={onClearSearch}
            className="mt-4 bg-crimson text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-crimson-dark transition"
          >
            Limpar filtro de busca
          </button>
        </div>
      )}
    </section>
  );
}
