import React from "react";

interface PopMockupProps {
  code: string;
}

export function PopMockup({ code }: PopMockupProps) {
  switch (code) {
    case "POP-001":
      return (
        <div className="mt-6 border border-stone-300 rounded-xl overflow-hidden bg-slate-50 shadow-sm">
          <div className="bg-slate-200 px-4 py-2 flex items-center justify-between border-b border-slate-300 text-xs font-semibold text-slate-700">
            <span>Configurações — Windows</span>
            <span className="tracking-widest text-slate-500">— □ ×</span>
          </div>
          <div className="p-4 sm:p-5 bg-white">
            <div className="text-xs font-semibold text-slate-500 mb-3">
              Sistema &gt; Armazenamento &gt;{" "}
              <span className="text-slate-900 font-bold">
                Arquivos temporários
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 border-b border-slate-300">
                    <th className="py-2 px-3 w-12">Sel.</th>
                    <th className="py-2 px-3">Categoria de arquivo</th>
                    <th className="py-2 px-3 text-right">Tamanho</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="bg-rose-50/70 font-semibold text-slate-800">
                    <td className="py-2 px-3 text-blue-600 font-bold">☑</td>
                    <td className="py-2 px-3">
                      Arquivos temporários da Internet e cache
                    </td>
                    <td className="py-2 px-3 text-right">1,42 GB</td>
                  </tr>
                  <tr className="bg-rose-50/70 font-semibold text-slate-800">
                    <td className="py-2 px-3 text-blue-600 font-bold">☑</td>
                    <td className="py-2 px-3">
                      Arquivos de Otimização de Entrega
                    </td>
                    <td className="py-2 px-3 text-right">890 MB</td>
                  </tr>
                  <tr className="bg-rose-50/70 font-semibold text-slate-800">
                    <td className="py-2 px-3 text-blue-600 font-bold">☑</td>
                    <td className="py-2 px-3">
                      Lixeira (itens excluídos anteriormente)
                    </td>
                    <td className="py-2 px-3 text-right">2,15 GB</td>
                  </tr>
                  <tr className="text-slate-700">
                    <td className="py-2 px-3 text-slate-400 font-bold">☐</td>
                    <td className="py-2 px-3">
                      Downloads
                      <span className="ml-2 inline-block bg-amber-100 text-amber-800 border border-amber-300 text-[11px] font-bold px-2 py-0.5 rounded">
                        Manter desmarcado
                      </span>
                    </td>
                    <td className="py-2 px-3 text-right">4,80 GB</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <span className="inline-block bg-blue-600 text-white text-xs font-bold px-3.5 py-2 rounded-md shadow-sm">
                Remover arquivos (4,46 GB)
              </span>
            </div>
          </div>
          <div className="bg-stone-100 px-4 py-2 text-xs text-stone-500 italic border-t border-stone-200">
            Ilustração da tela de limpeza de armazenamento do Windows, com dados
            de exemplo.
          </div>
        </div>
      );

    case "POP-003":
      return (
        <div className="mt-6 border border-stone-300 rounded-xl overflow-hidden bg-slate-50 shadow-sm">
          <div className="bg-slate-200 px-4 py-2 flex items-center justify-between border-b border-slate-300 text-xs font-semibold text-slate-700">
            <span>Gerenciador de Tarefas — Aplicativos de inicialização</span>
            <span className="tracking-widest text-slate-500">— □ ×</span>
          </div>
          <div className="p-4 sm:p-5 bg-white overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100 text-slate-600 border-b border-slate-300">
                  <th className="py-2 px-3">Nome do aplicativo</th>
                  <th className="py-2 px-3">Status</th>
                  <th className="py-2 px-3">Impacto na inicialização</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2 px-3 font-medium">
                    Windows Security / Antivírus Corporativo
                  </td>
                  <td className="py-2 px-3">
                    <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[11px] font-bold px-2 py-0.5 rounded">
                      Habilitado
                    </span>
                  </td>
                  <td className="py-2 px-3 text-slate-600">
                    Baixo (Manter ativo)
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-medium">Microsoft OneDrive</td>
                  <td className="py-2 px-3">
                    <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[11px] font-bold px-2 py-0.5 rounded">
                      Habilitado
                    </span>
                  </td>
                  <td className="py-2 px-3 text-slate-600">
                    Médio (Manter ativo)
                  </td>
                </tr>
                <tr className="bg-rose-50/70 font-semibold">
                  <td className="py-2 px-3 text-slate-900">
                    Aplicativo Pessoal / Chat não utilizado
                  </td>
                  <td className="py-2 px-3">
                    <span className="bg-amber-100 text-amber-800 border border-amber-300 text-[11px] font-bold px-2 py-0.5 rounded">
                      Habilitado
                    </span>
                  </td>
                  <td className="py-2 px-3 text-crimson">
                    Alto → Botão direito &gt; Desabilitar
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-stone-100 px-4 py-2 text-xs text-stone-500 italic border-t border-stone-200">
            Ilustração da aba de inicialização do Gerenciador de Tarefas, com
            dados de exemplo.
          </div>
        </div>
      );

    case "POP-004":
      return (
        <div className="mt-6 border border-stone-300 rounded-xl overflow-hidden bg-slate-50 shadow-sm">
          <div className="bg-slate-200 px-4 py-2 flex items-center justify-between border-b border-slate-300 text-xs font-semibold text-slate-700">
            <span>Gerenciador de Tarefas — Desempenho</span>
            <span className="tracking-widest text-slate-500">— □ ×</span>
          </div>
          <div className="p-4 sm:p-5 bg-white grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
              <div className="font-bold text-slate-700">CPU</div>
              <div className="text-xl font-extrabold text-blue-600 mt-1">
                24%
              </div>
              <div className="text-slate-500 mt-0.5">
                Normal (abaixo de 85%)
              </div>
            </div>
            <div className="border border-rose-300 rounded-lg p-3 bg-rose-50/70">
              <div className="font-bold text-crimson">Memória (RAM)</div>
              <div className="text-xl font-extrabold text-crimson mt-1">
                94%
              </div>
              <div className="text-crimson font-semibold mt-0.5">
                Alerta: fechar abas abertas
              </div>
            </div>
            <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
              <div className="font-bold text-slate-700">Disco 0 (C: SSD)</div>
              <div className="text-xl font-extrabold text-emerald-700 mt-1">
                12%
              </div>
              <div className="text-slate-500 mt-0.5">
                Normal (abaixo de 85%)
              </div>
            </div>
          </div>
          <div className="bg-stone-100 px-4 py-2 text-xs text-stone-500 italic border-t border-stone-200">
            Ilustração dos indicadores de CPU, Memória e Disco na aba
            Desempenho.
          </div>
        </div>
      );

    case "POP-006":
      return (
        <div className="mt-6 border border-stone-300 rounded-xl overflow-hidden bg-slate-50 shadow-sm">
          <div className="bg-slate-200 px-4 py-2 flex items-center justify-between border-b border-slate-300 text-xs font-semibold text-slate-700">
            <span>Explorador de Arquivos — Este Computador</span>
            <span className="tracking-widest text-slate-500">— □ ×</span>
          </div>
          <div className="p-4 sm:p-5 bg-white">
            <div className="border border-slate-200 rounded-lg p-3.5 bg-slate-50 max-w-md">
              <div className="text-sm font-bold text-slate-800">
                Disco Local (C:)
              </div>
              <div className="w-full h-4 bg-slate-200 rounded overflow-hidden my-2">
                <div className="h-full bg-blue-600 w-[68%]" />
              </div>
              <div className="text-xs text-slate-600 font-medium">
                76,0 GB livres de 237 GB{" "}
                <span className="text-emerald-700 font-bold">
                  (Saudável: manter acima de 15% livre)
                </span>
              </div>
            </div>
          </div>
          <div className="bg-stone-100 px-4 py-2 text-xs text-stone-500 italic border-t border-stone-200">
            Ilustração da barra de espaço disponível no Explorador de Arquivos.
          </div>
        </div>
      );

    case "POP-008":
      return (
        <div className="mt-6 border border-stone-300 rounded-xl overflow-hidden bg-slate-50 shadow-sm">
          <div className="bg-slate-200 px-4 py-2 flex items-center justify-between border-b border-slate-300 text-xs font-semibold text-slate-700">
            <span>Configurações — Windows Update</span>
            <span className="tracking-widest text-slate-500">— □ ×</span>
          </div>
          <div className="p-4 sm:p-5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-sm font-bold text-slate-900">
                Você está atualizado
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Gerenciado pela política de TI da ECOVIS BPO
              </div>
            </div>
            <span className="inline-block bg-blue-600 text-white text-xs font-bold px-3.5 py-2 rounded-md text-center">
              Verificar se há atualizações
            </span>
          </div>
          <div className="bg-stone-100 px-4 py-2 text-xs text-stone-500 italic border-t border-stone-200">
            Ilustração do painel Windows Update nas Configurações do Windows.
          </div>
        </div>
      );

    case "POP-009":
      return (
        <div className="mt-6 border border-stone-200 rounded-xl overflow-hidden bg-white shadow-sm">
          <div className="bg-stone-100 px-4 py-2 border-b border-stone-200 text-xs font-bold uppercase tracking-wider text-stone-600">
            Guia Rápido de Materiais para Tela
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-stone-50 text-stone-600 border-b border-stone-200">
                  <th className="py-2.5 px-4">Material / Produto</th>
                  <th className="py-2.5 px-4">Pode usar?</th>
                  <th className="py-2.5 px-4">Motivo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr>
                  <td className="py-2.5 px-4 font-semibold">
                    Pano de microfibra limpo
                  </td>
                  <td className="py-2.5 px-4">
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded">
                      Recomendado
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-stone-600">
                    Não solta fiapos e não risca a película.
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold">
                    Álcool comum ou álcool em gel
                  </td>
                  <td className="py-2.5 px-4">
                    <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-0.5 rounded">
                      Proibido
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-stone-600">
                    Mancha e corrói o revestimento antirreflexo.
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-semibold">
                    Papel toalha ou guardanapo
                  </td>
                  <td className="py-2.5 px-4">
                    <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-0.5 rounded">
                      Proibido
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-stone-600">
                    Fibras rígidas provocam micro-riscos no visor.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );

    case "POP-016":
      return (
        <div className="mt-6 border border-stone-300 rounded-xl overflow-hidden bg-slate-50 shadow-sm">
          <div className="bg-slate-200 px-4 py-2 flex items-center justify-between border-b border-slate-300 text-xs font-semibold text-slate-700">
            <span>Exemplo Visual de E-mail Suspeito (Phishing)</span>
            <span className="text-crimson font-bold">Alerta de Segurança</span>
          </div>
          <div className="p-4 sm:p-5 bg-white text-xs sm:text-sm space-y-2">
            <div className="bg-rose-50 border border-rose-200 text-crimson font-bold px-3 py-2 rounded-lg">
              Sinal de golpe: Remetente externo imitando domínio da empresa +
              ameaça de bloqueio imediato
            </div>
            <div>
              <strong className="text-stone-700">De:</strong> Suporte TI &lt;
              <code className="inline-code">
                suporte@ecov1s-bpo-alerta.com
              </code>
              &gt;
            </div>
            <div>
              <strong className="text-stone-700">Assunto:</strong> URGENTE: Sua
              senha expira em 30 minutos — clique para validar
            </div>
          </div>
          <div className="bg-stone-100 px-4 py-2 text-xs text-stone-500 italic border-t border-stone-200">
            Nunca clique em links desse tipo; encaminhe a mensagem suspeita para
            a equipe de TI validar.
          </div>
        </div>
      );

    case "POP-022":
      return (
        <div className="mt-6 border border-stone-200 rounded-xl overflow-hidden bg-white shadow-sm">
          <div className="bg-stone-100 px-4 py-2 border-b border-stone-200 text-xs font-bold uppercase tracking-wider text-stone-600">
            Tabela Rápida de Atalhos do Windows
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-stone-50 text-stone-600 border-b border-stone-200">
                  <th className="py-2.5 px-4 w-44">Atalho</th>
                  <th className="py-2.5 px-4">O que faz no Windows</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr>
                  <td className="py-2.5 px-4">
                    <kbd>Win</kbd> + <kbd>L</kbd>
                  </td>
                  <td className="py-2.5 px-4">
                    Bloqueia a tela imediatamente ao levantar da mesa.
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4">
                    <kbd>Win</kbd> + <kbd>E</kbd>
                  </td>
                  <td className="py-2.5 px-4">
                    Abre o Explorador de Arquivos (suas pastas e discos).
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4">
                    <kbd>Alt</kbd> + <kbd>Tab</kbd>
                  </td>
                  <td className="py-2.5 px-4">
                    Alterna rapidamente entre os programas e janelas abertas.
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4">
                    <kbd>Win</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd>
                  </td>
                  <td className="py-2.5 px-4">
                    Abre a Ferramenta de Captura para recortar um trecho da
                    tela.
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4">
                    <kbd>Win</kbd> + <kbd>V</kbd>
                  </td>
                  <td className="py-2.5 px-4">
                    Abre o histórico de itens copiados recentemente.
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4">
                    <kbd>Win</kbd> + <kbd>D</kbd>
                  </td>
                  <td className="py-2.5 px-4">
                    Minimiza todas as janelas e exibe a Área de Trabalho.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );

    case "POP-025":
      return (
        <div className="mt-6 border border-stone-300 rounded-xl overflow-hidden bg-slate-50 shadow-sm">
          <div className="bg-slate-200 px-4 py-2 flex items-center justify-between border-b border-slate-300 text-xs font-semibold text-slate-700">
            <span>Configurações — Sistema &gt; Tela</span>
            <span className="tracking-widest text-slate-500">— □ ×</span>
          </div>
          <div className="p-5 bg-white text-center">
            <div className="inline-flex items-end gap-3 my-2">
              <div className="w-24 h-16 border-2 border-slate-500 rounded-md flex items-center justify-center text-xs font-bold bg-slate-100 text-slate-700">
                1 (Notebook)
              </div>
              <div className="w-36 h-24 border-2 border-blue-600 rounded-md flex items-center justify-center text-xs font-bold bg-blue-50 text-blue-700">
                2 (Monitor Externo)
              </div>
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-xs">
              <span className="bg-white border border-slate-400 px-3 py-1 rounded font-semibold text-slate-800">
                Identificar
              </span>
              <span className="text-slate-600">
                Modo selecionado: <strong>Estender estes vídeos</strong>
              </span>
            </div>
          </div>
          <div className="bg-stone-100 px-4 py-2 text-xs text-stone-500 italic border-t border-stone-200">
            Ilustração do arranjo de múltiplos monitores nas Configurações de
            Tela do Windows.
          </div>
        </div>
      );

    case "POP-036":
      return (
        <div className="mt-6 border border-stone-300 rounded-xl overflow-hidden bg-slate-50 shadow-sm">
          <div className="bg-slate-200 px-4 py-2 flex items-center justify-between border-b border-slate-300 text-xs font-semibold text-slate-700">
            <span>Microsoft OneDrive — Bandeja do Sistema</span>
            <span className="text-crimson font-bold">
              ✕ Erro de sincronização
            </span>
          </div>
          <div className="p-4 sm:p-5 bg-white space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-rose-50 border border-rose-200 rounded-lg p-3">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-crimson text-white font-extrabold text-xs flex items-center justify-center">
                  ✕
                </span>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900">
                    1 erro de sincronização — ECOVIS BPO
                  </div>
                  <div className="text-xs text-slate-600">
                    Verifique se há caracteres inválidos ou se a sincronização
                    está pausada
                  </div>
                </div>
              </div>
              <span className="bg-white border border-slate-300 text-slate-800 text-xs font-bold px-2.5 py-1 rounded shadow-sm">
                ⚙ Ajuda e Configurações
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
                <div className="font-bold text-slate-800 mb-1">
                  1. Menu da Engrenagem (⚙)
                </div>
                <div className="text-slate-600">
                  Clique em{" "}
                  <strong className="text-blue-700">
                    Retomar sincronização
                  </strong>{" "}
                  caso esteja pausada, ou em <strong>Fechar o OneDrive</strong>{" "}
                  para reiniciar o cliente.
                </div>
              </div>
              <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
                <div className="font-bold text-slate-800 mb-1">
                  2. Configurações &gt; Aba Conta
                </div>
                <div className="text-slate-600">
                  Se o erro continuar, clique em{" "}
                  <strong className="text-crimson">
                    Desvincular este computador
                  </strong>{" "}
                  e entre novamente com seu e-mail corporativo.
                </div>
              </div>
            </div>
          </div>
          <div className="bg-stone-100 px-4 py-2 text-xs text-stone-500 italic border-t border-stone-200">
            Ilustração do painel de status e menu de engrenagem do OneDrive na
            barra de tarefas.
          </div>
        </div>
      );

    case "POP-037":
      return (
        <div className="mt-6 border border-stone-300 rounded-xl overflow-hidden bg-slate-50 shadow-sm">
          <div className="bg-slate-200 px-4 py-2 flex items-center justify-between border-b border-slate-300 text-xs font-semibold text-slate-700">
            <span>Configurações do OneDrive — Sincronização e backup</span>
            <span className="tracking-widest text-slate-500">— □ ×</span>
          </div>
          <div className="p-4 sm:p-5 bg-white space-y-3 text-xs sm:text-sm">
            <div className="flex items-center justify-between border border-emerald-200 bg-emerald-50/70 rounded-lg p-3">
              <div>
                <div className="font-bold text-slate-900">
                  Arquivos Sob Demanda (Files On-Demand)
                </div>
                <div className="text-xs text-slate-600">
                  Economiza espaço no SSD e reduz uso contínuo de internet
                </div>
              </div>
              <span className="bg-emerald-600 text-white text-xs font-extrabold px-2.5 py-1 rounded-full">
                Ativado
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
                <div className="font-bold text-slate-800">
                  Explorador de Arquivos
                </div>
                <div className="text-slate-600 mt-1">
                  Botão direito na pasta &gt;{" "}
                  <strong className="text-blue-700">Liberar espaço</strong>{" "}
                  (mantém o arquivo apenas na nuvem).
                </div>
              </div>
              <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
                <div className="font-bold text-slate-800">
                  Durante reuniões ou lentidão
                </div>
                <div className="text-slate-600 mt-1">
                  Engrenagem &gt;{" "}
                  <strong className="text-amber-700">
                    Pausar sincronização &gt; 2 horas
                  </strong>{" "}
                  ou limitar taxa de upload.
                </div>
              </div>
            </div>
          </div>
          <div className="bg-stone-100 px-4 py-2 text-xs text-stone-500 italic border-t border-stone-200">
            Ilustração das opções de Arquivos Sob Demanda e controle de banda
            nas Configurações do OneDrive.
          </div>
        </div>
      );

    case "POP-038":
      return (
        <div className="mt-6 border border-stone-300 rounded-xl overflow-hidden bg-slate-50 shadow-sm">
          <div className="bg-slate-200 px-4 py-2 flex items-center justify-between border-b border-slate-300 text-xs font-semibold text-slate-700">
            <span>Configurações — Sistema &gt; Tela &gt; Exibição avançada</span>
            <span className="tracking-widest text-slate-500">— □ ×</span>
          </div>
          <div className="p-4 sm:p-5 bg-white space-y-3 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  1. Escala e layout
                </div>
                <div className="font-bold text-slate-900 mt-1">
                  Resolução de tela
                </div>
                <div className="mt-1.5 bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs font-semibold text-slate-800 flex justify-between items-center">
                  <span>1600 × 900 (ou 1366 × 768)</span>
                  <span>▾</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Reduzida para eliminar erro de escala
                </div>
              </div>

              <div className="border-2 border-crimson rounded-lg p-3 bg-rose-50/50">
                <div className="text-[11px] font-bold uppercase tracking-wider text-crimson">
                  2. Exibição avançada
                </div>
                <div className="font-bold text-slate-900 mt-1">
                  Escolher uma taxa de atualização
                </div>
                <div className="mt-1.5 bg-white border border-crimson rounded px-2.5 py-1.5 text-xs font-extrabold text-crimson flex justify-between items-center">
                  <span>50 Hz (abaixo de 59Hz)</span>
                  <span>▾</span>
                </div>
                <div className="text-[11px] text-crimson font-semibold mt-1">
                  Obrigatório para estabilizar o monitor
                </div>
              </div>
            </div>
          </div>
          <div className="bg-stone-100 px-4 py-2 text-xs text-stone-500 italic border-t border-stone-200">
            Ilustração do ajuste conjunto de Resolução reduzida e Taxa de
            atualização abaixo de 59Hz (50 Hz).
          </div>
        </div>
      );

    case "POP-033":
      return (
        <div className="mt-6 border border-stone-200 rounded-xl overflow-hidden bg-white shadow-sm">
          <div className="bg-stone-100 px-4 py-2 border-b border-stone-200 text-xs font-bold uppercase tracking-wider text-stone-600">
            Checklist para Abertura Rápida de Chamado
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-stone-50 text-stone-600 border-b border-stone-200">
                  <th className="py-2.5 px-4 w-48">Informação</th>
                  <th className="py-2.5 px-4">
                    Por que acelera o atendimento técnico
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr>
                  <td className="py-2.5 px-4 font-bold">
                    Patrimônio / Hostname
                  </td>
                  <td className="py-2.5 px-4 text-stone-600">
                    Permite que o analista identifique e acesse remotamente seu
                    equipamento na hora.
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-bold">Print da tela de erro</td>
                  <td className="py-2.5 px-4 text-stone-600">
                    Mostra o código exato da falha sem necessidade de retrabalho
                    ou novas perguntas.
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 font-bold">Impacto no trabalho</td>
                  <td className="py-2.5 px-4 text-stone-600">
                    Ajuda a priorizar casos em que o colaborador está totalmente
                    impedido de trabalhar.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );

    default:
      return null;
  }
}
