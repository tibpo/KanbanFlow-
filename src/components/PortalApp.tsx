"use client";

import React, { useCallback, useEffect, useState } from "react";
import { CatalogView } from "@/components/CatalogView";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroBanner } from "@/components/HeroBanner";
import { PopDetailView } from "@/components/PopDetailView";
import { TriageView } from "@/components/TriageView";
import { POPS } from "@/data/pops";
import type {
  PortalMode,
  ThemeId,
  TriageHistoryEntry,
  TriageOption,
} from "@/types/pop";

const INITIAL_TRIAGE_HISTORY: TriageHistoryEntry[] = [
  { type: "node", key: "start" },
];

function normalizePopParam(raw: string | null): string | null {
  if (!raw) return null;
  const cleaned = raw.trim().toUpperCase();
  const candidate = /^\d{1,3}$/.test(cleaned)
    ? `POP-${cleaned.padStart(3, "0")}`
    : cleaned;
  return POPS.some((p) => p.code === candidate) ? candidate : null;
}

export function PortalApp() {
  const [mode, setMode] = useState<PortalMode>("triage");
  const [previousMode, setPreviousMode] = useState<"triage" | "catalog">(
    "triage"
  );
  const [selectedTheme, setSelectedTheme] = useState<ThemeId>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPopCode, setCurrentPopCode] = useState<string | null>(null);
  const [triageHistory, setTriageHistory] = useState<TriageHistoryEntry[]>(
    INITIAL_TRIAGE_HISTORY
  );

  const scrollToTop = useCallback(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const syncUrl = useCallback(
    (nextMode: PortalMode, nextPopCode: string | null) => {
      if (typeof window === "undefined") return;
      const url = new URL(window.location.href);
      url.searchParams.delete("pop");
      url.searchParams.delete("modo");

      if (nextMode === "detail" && nextPopCode) {
        url.searchParams.set("pop", nextPopCode);
      } else if (nextMode === "catalog") {
        url.searchParams.set("modo", "catalogo");
      }

      const target = `${url.pathname}${url.search}${url.hash}`;
      const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      if (target !== current) {
        window.history.pushState(null, "", target);
      }
    },
    []
  );

  useEffect(() => {
    const applyFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const popCode = normalizePopParam(params.get("pop"));
      if (popCode) {
        setPreviousMode("catalog");
        setCurrentPopCode(popCode);
        setMode("detail");
        return;
      }

      const modoParam = params.get("modo")?.trim().toLowerCase();
      if (modoParam === "catalogo") {
        setCurrentPopCode(null);
        setMode("catalog");
        return;
      }

      setCurrentPopCode(null);
      setMode("triage");
    };

    applyFromUrl();
    window.addEventListener("popstate", applyFromUrl);
    return () => window.removeEventListener("popstate", applyFromUrl);
  }, []);

  const switchMode = useCallback(
    (newMode: PortalMode) => {
      setMode(newMode);
      syncUrl(newMode, newMode === "detail" ? currentPopCode : null);
      scrollToTop();
    },
    [currentPopCode, scrollToTop, syncUrl]
  );

  const resetHome = useCallback(() => {
    setSearchQuery("");
    setTriageHistory(INITIAL_TRIAGE_HISTORY);
    setCurrentPopCode(null);
    setMode("triage");
    syncUrl("triage", null);
    scrollToTop();
  }, [scrollToTop, syncUrl]);

  const handleSearchChange = useCallback(
    (query: string) => {
      setSearchQuery(query);
      if (query.trim().length > 0) {
        setSelectedTheme("all");
        if (mode !== "catalog") {
          setMode("catalog");
          syncUrl("catalog", null);
          scrollToTop();
        }
      }
    },
    [mode, scrollToTop, syncUrl]
  );

  const clearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  const openPop = useCallback(
    (code: string) => {
      if (mode !== "detail") {
        setPreviousMode(mode);
      }
      setCurrentPopCode(code);
      setMode("detail");
      syncUrl("detail", code);
      scrollToTop();
    },
    [mode, scrollToTop, syncUrl]
  );

  const backFromDetail = useCallback(() => {
    setMode(previousMode);
    syncUrl(previousMode, null);
    scrollToTop();
  }, [previousMode, scrollToTop, syncUrl]);

  const handleSelectTriageOption = useCallback(
    (option: TriageOption, optionIndex: number) => {
      setTriageHistory((prev) => {
        const current = prev[prev.length - 1];
        const currentKey = current.type === "node" ? current.key : "start";

        if (option.next) {
          return [...prev, { type: "node", key: option.next }];
        }
        if (option.pops) {
          return [
            ...prev,
            {
              type: "result",
              key: `${currentKey}_res_${optionIndex}`,
              data: {
                pops: option.pops,
                summary: option.summary ?? "",
                actionLink: option.actionLink,
              },
            },
          ];
        }
        return prev;
      });
    },
    []
  );

  const goBackTriage = useCallback(() => {
    setTriageHistory((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, []);

  const restartTriage = useCallback(() => {
    setTriageHistory(INITIAL_TRIAGE_HISTORY);
    setCurrentPopCode(null);
    setMode("triage");
    syncUrl("triage", null);
    scrollToTop();
  }, [scrollToTop, syncUrl]);

  return (
    <>
      <Header
        mode={mode}
        searchQuery={searchQuery}
        onResetHome={resetHome}
        onSwitchMode={switchMode}
        onSearchChange={handleSearchChange}
        onClearSearch={clearSearch}
      />

      {mode !== "detail" && <HeroBanner />}

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {mode === "triage" && (
          <TriageView
            history={triageHistory}
            onSelectOption={handleSelectTriageOption}
            onGoBack={goBackTriage}
            onRestart={restartTriage}
            onOpenPop={openPop}
            onOpenCatalog={() => switchMode("catalog")}
          />
        )}

        {mode === "catalog" && (
          <CatalogView
            selectedTheme={selectedTheme}
            searchQuery={searchQuery}
            onSelectTheme={setSelectedTheme}
            onOpenPop={openPop}
            onClearSearch={clearSearch}
          />
        )}

        {mode === "detail" && currentPopCode && (
          <PopDetailView
            popCode={currentPopCode}
            onBack={backFromDetail}
            onRestartTriage={restartTriage}
            onOpenPop={openPop}
          />
        )}
      </main>

      <Footer />
    </>
  );
}
