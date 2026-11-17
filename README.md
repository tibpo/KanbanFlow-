# 📋 KanbanFlow - Quadro Kanban de Projetos Colaborativo em Tempo Real

Uma aplicação de quadro Kanban leve, moderna e altamente modular projetada para organizar múltiplos projetos e fluxos de tarefas com **colaboração e sincronização em tempo real**.

Quando qualquer membro da equipe cria, edita, move ou exclui uma tarefa ou projeto, **todos os outros usuários conectados veem as alterações instantaneamente na tela sem precisar recarregar a página**.

---

## ⚡ Como Funciona a Colaboração em Tempo Real

1. **Servidor Centralizado Zero-Dependências ([server.js](file:///c:/Users/HP/Documents/Dev/kanban-app/server.js))**:
   - Utiliza exclusivamente os módulos nativos do Node.js (`http`, `fs`, `os`, `path`).
   - Mantém um canal ativo de **Server-Sent Events (SSE)** em `/api/events` com todos os navegadores abertos.
   - Salva automaticamente as alterações no arquivo compartilhado [data/kanban.json](file:///c:/Users/HP/Documents/Dev/kanban-app/data/kanban.json).

2. **Propagação Instantânea ([sync.js](file:///c:/Users/HP/Documents/Dev/kanban-app/src/js/sync.js))**:
   - Quando um usuário move um cartão ou altera uma tarefa, o cliente atualiza o servidor via `POST /api/state`.
   - O servidor imediatamente transmite o evento para todos os clientes conectados.
   - Os navegadores dos outros usuários atualizam o quadro imediatamente e exibem uma notificação de sincronização.

3. **Indicador de Conexão ao Vivo**:
   - Cabeçalho com indicador de status em tempo real:
     - 🟢 **Ao vivo / X online**: Conectado e sincronizado com os outros usuários.
     - 🟡 **Conectando...**: Tentando reconectar ao servidor.
     - ⚪ **Modo Local**: Fallback offline caso o servidor esteja inacessível.

---

## 🧭 Landing Page, LEDs e Pastas dos Módulos

A landing page mantém o título **"Organize suas Ideias com Precisão em Tempo Real"** e o seletor circular orbital de projetos, agora dentro de um **ambiente 3D imersivo de universo**:

- **Fundo de universo em 3D**: campo de estrelas em perspectiva real (`src/js/universe.js`) com parallax de mouse, rastros de velocidade e estrelas cadentes, sobre nebulosas em degradê azul, roxo e vermelho.
- **LEDs laterais**: dois trilhos fixos nas laterais da landing com LEDs pulsantes em degradê **azul → roxo → vermelho**, além dos LEDs já existentes no cabeçalho e no painel de telemetria.
- **Deck lado a lado**: em telas grandes o seletor orbital fica à esquerda e a telemetria à direita; em telas menores o painel sobe para cima do seletor.

Os seis botões/LEDs — **Servidor, Nuvem, Motion, Fila, Urgente e Reativo** — atualizam a telemetria **no próprio painel, sem rolar a página**. O clique destaca o painel com uma pulsação e atualiza o hash para `#mod-<módulo>`.

Cada módulo também possui uma pasta-ponte local que redireciona de volta para a landing já aberta na seção correta:

| Botão | Pasta local | Destino |
| --- | --- | --- |
| Servidor | `modulos/servidor/` | `index.html#mod-servidor` |
| Nuvem | `modulos/nuvem/` | `index.html#mod-nuvem` |
| Motion | `modulos/motion/` | `index.html#mod-motion` |
| Fila | `modulos/fila/` | `index.html#mod-fila` |
| Urgente | `modulos/urgente/` | `index.html#mod-urgente` |
| Reativo | `modulos/reativo/` | `index.html#mod-reativo` |

- **Clique normal** no LED/aba: atualiza a telemetria do módulo no painel, sem tirar o usuário da posição.
- **Ctrl/Cmd/Shift+Clique** ou **clique do meio**: abre a pasta real do módulo no Explorer/Finder.

Ações do painel de telemetria:

| Botão | O que faz |
| --- | --- |
| **Acessar no Quadro** | Fecha a apresentação e abre o Kanban já posicionado no módulo: **Urgente** aplica o filtro de prioridade urgente e destaca a coluna da primeira tarefa urgente; **Fila** abre destacando a coluna "A Fazer"; **Nuvem** ressincroniza o estado com o servidor. |
| **📁 Abrir Diretório Local** | Abre a pasta física `modulos/<módulo>/` no gerenciador de arquivos do sistema através do endpoint local `POST /api/open-directory`. Em hospedagem estática (sem servidor Node) o caminho absoluto é copiado para a área de transferência. |
| **Testar Pulso de Sinal** | Envia um ping real para `GET /api/ping` e mede a latência de ida e volta do canal de tempo real. O resultado aparece no próprio botão (ex.: `Pulso OK · 23 ms · 3 online`), com onda de LEDs e toast explicativo. Em modo offline, informa que não há sinal. |

---

## 🏗️ Estrutura e Arquitetura dos Arquivos

```text
kanban-app/
├── index.html                  # Estrutura semântica e interface da aplicação
├── package.json                # Manifesto do projeto e scripts npm (start, build)
├── server.js                   # Servidor HTTP + SSE em tempo real (sem dependências)
├── start.bat                   # Inicializador 1-clique para Windows
├── README.md                   # Documentação completa
│
├── data/
│   └── kanban.json             # Banco de dados JSON centralizado compartilhado
│
├── modulos/                    # Pastas-ponte dos módulos (redirecionam para a landing)
│   ├── module-redirect.css     # Estilo compartilhado das páginas de redirecionamento
│   ├── servidor/index.html     # Redireciona para index.html#mod-servidor
│   ├── nuvem/index.html        # Redireciona para index.html#mod-nuvem
│   ├── motion/index.html       # Redireciona para index.html#mod-motion
│   ├── fila/index.html         # Redireciona para index.html#mod-fila
│   ├── urgente/index.html      # Redireciona para index.html#mod-urgente
│   └── reativo/index.html      # Redireciona para index.html#mod-reativo
│
├── scripts/
│   └── build-bundle.js         # Gerador de bundle para execução local file://
│
└── src/
    ├── css/                    # Folhas de estilo modulares
    │   ├── variables.css       # Tokens de design (cores, temas, tipografia)
    │   ├── layout.css          # Janela, barra superior, sidebar, badge ao vivo
    │   ├── kanban.css          # Colunas, cartões, badges e drag-and-drop
    │   ├── landing.css         # Universo 3D, LEDs laterais, seletor orbital e telemetria
    │   └── modal.css           # Diálogos, formulários e notificações toast
    │
    └── js/                     # Camada reativa e lógica de negócios
        ├── config.js           # Definição de colunas e dados padrão
        ├── storage.js          # Cache e backup no LocalStorage
        ├── sync.js             # Gerenciador de sincronização em tempo real (SSE + API)
        ├── state.js            # Store reativo centralizado (Padrões State & Observer)
        ├── dragDrop.js         # Arrastar e soltar nativo (HTML5 Drag and Drop)
        ├── ui.js               # Renderizador DOM (projetos, colunas, métricas)
        ├── modal.js            # Ciclo de vida dos modais e formulários
        ├── universe.js         # Campo de estrelas 3D da landing (canvas + parallax)
        ├── landing.js          # Seletor orbital, LEDs laterais e telemetria dos módulos
        ├── cursor.js           # Cursor cibernético personalizado
        └── app.js              # Inicializador e atalhos de teclado
```

---

## 🚀 Como Executar e Trabalhar em Equipe

### 1. Iniciar o Servidor
Dê um duplo clique no arquivo **[start.bat](file:///c:/Users/HP/Documents/Dev/kanban-app/start.bat)** ou execute no terminal:
```powershell
node server.js
```

O terminal exibirá:
```text
=============================================================
🚀 KanbanFlow - Servidor em Tempo Real Ativo!
📡 Local:        http://localhost:3000
👥 Rede Local:   http://192.168.x.x:3000 (Compartilhe com a equipe)
📂 Armazenamento: ...\data\kanban.json
⚡ Sincronização em tempo real (SSE) ativada.
=============================================================
```

### 2. Testar a Sincronização em Tempo Real
1. Abra **http://localhost:3000** em duas abas ou navegadores diferentes (ex.: Chrome e Edge).
2. Em uma das abas, arraste uma tarefa de **A Fazer** para **Em Progresso** ou crie uma nova tarefa.
3. Observe a outra aba: **a alteração aparece instantaneamente na outra tela**!

### 3. Acessar em Outros Dispositivos na Mesma Rede (Wi-Fi/LAN)
Basta acessar pelo celular, tablet ou outro computador o endereço de **Rede Local** exibido no terminal (ex.: `http://192.168.1.15:3000`).
