import React from "react";

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-500">
        <span className="font-semibold text-stone-700">
          ECOVIS BPO • Departamento de Tecnologia da Informação (TI)
        </span>
        <span>
          Manual Interativo de Procedimentos Operacionais Padrão (POP-001 a
          POP-038)
        </span>
      </div>
    </footer>
  );
}
