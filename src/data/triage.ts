import type { TriageNodeKey, TriageQuestionNode } from "@/types/pop";

export const TRIAGE_NODES: Record<TriageNodeKey, TriageQuestionNode> = {
  start: {
    question: "O que está acontecendo ou o que você precisa fazer agora?",
    subtitle:
      "Escolha a opção que melhor descreve sua situação atual para irmos direto ao procedimento certo.",
    options: [
      {
        label: "Meu notebook, OneDrive ou sistema está lento ou travando",
        desc: "Demora para ligar, lentidão no OneDrive/nuvem, programas congelando ou disco cheio.",
        next: "slow_branch",
      },
      {
        label: "Estou com erro no OneDrive, monitor externo, Wi-Fi ou áudio",
        desc: "Falha de sincronização no OneDrive, erro de escala no monitor (Hz/resolução), rede ou som.",
        next: "hardware_conn_branch",
      },
      {
        label: "Recebi algo suspeito ou preciso proteger meus dados",
        desc: "E-mail estranho, suspeita de vírus, uso de pendrive, senhas ou Wi-Fi externo.",
        next: "security_branch",
      },
      {
        label: "Quero organizar meu trabalho, telas ou limpar o equipamento",
        desc: "Segundo monitor, atalhos, pastas, limpeza de tela/teclado ou cuidados físicos.",
        next: "productivity_care_branch",
      },
      {
        label: "Preciso registrar um erro e abrir chamado para a TI",
        desc: "Já tentei resolver ou preciso encaminhar evidências para atendimento técnico.",
        pops: ["POP-034", "POP-033", "POP-026"],
        summary:
          "Para agilizar o atendimento da TI, colete o print completo do erro e abra o chamado com os dados do equipamento.",
        actionLink: {
          label: "Abrir chamado de TI (ti.ecobpoti.cloud/abrir)",
          url: "https://ti.ecobpoti.cloud/abrir",
        },
      },
    ],
  },

  slow_branch: {
    question: "Como essa lentidão ou travamento está acontecendo?",
    subtitle: "Selecione o comportamento mais parecido com o que você vê na tela.",
    options: [
      {
        label: "Lentidão causada pelo OneDrive ou serviços em nuvem",
        desc: "Sincronização pesada consumindo internet/disco e deixando o sistema devagar.",
        pops: ["POP-037", "POP-036", "POP-030"],
        summary:
          "Ative os Arquivos Sob Demanda, libere espaço de pastas pesadas e pause ou limite a banda do OneDrive.",
      },
      {
        label: "O notebook demora muito logo ao ligar",
        desc: "Vários programas abrem sozinhos e travam o início do expediente.",
        pops: ["POP-003", "POP-005"],
        summary:
          "Desabilitar aplicativos desnecessários na inicialização reduz drasticamente o tempo até o Windows ficar pronto.",
      },
      {
        label: "Está lento durante o uso geral no dia a dia",
        desc: "Tudo demora para abrir, mas o mouse e as janelas ainda respondem.",
        pops: ["POP-030", "POP-002", "POP-004", "POP-005"],
        summary:
          "Execute o checklist rápido de desempenho, identifique os programas pesados e reinicie o Windows corretamente.",
      },
      {
        label: "O Disco C: está cheio ou com pouco espaço livre",
        desc: "Preciso liberar armazenamento com segurança sem apagar meus arquivos.",
        pops: ["POP-001", "POP-006"],
        summary:
          "Verifique o percentual livre no SSD e remova arquivos temporários mantendo a pasta Downloads desmarcada.",
      },
      {
        label: "Apenas um aplicativo (ex.: Excel, navegador) congelou",
        desc: 'O restante do Windows funciona, mas um programa está "Não respondendo".',
        pops: ["POP-031", "POP-007"],
        summary:
          "Use o Gerenciador de Tarefas para encerrar apenas o programa travado sem perder o restante do trabalho.",
      },
      {
        label: "A tela inteira congelou e nem o mouse se mexe",
        desc: "O sistema parou completamente de responder.",
        pops: ["POP-035", "POP-005"],
        summary:
          "Tente reiniciar o driver de vídeo (Win + Ctrl + Shift + B) antes de recorrer ao desligamento forçado.",
      },
    ],
  },

  hardware_conn_branch: {
    question: "Qual falha técnica você está enfrentando?",
    subtitle: "Escolha o item afetado para abrir o roteiro de verificação.",
    options: [
      {
        label: "Erro de sincronização no OneDrive (X vermelho ou pausado)",
        desc: "Arquivos não sobem para a nuvem ou o OneDrive exibe alerta de erro.",
        pops: ["POP-036", "POP-028"],
        summary:
          "Verifique se a sincronização está pausada, corrija caracteres inválidos ou reinicie/reconecte o cliente do OneDrive.",
      },
      {
        label: "Monitor externo com erro de escala, tela cortada ou distorcida",
        desc: "Imagem desproporcional que precisa reduzir resolução e taxa de atualização abaixo de 59Hz.",
        pops: ["POP-038", "POP-025"],
        summary:
          "Reduza a resolução do monitor afetado e altere obrigatoriamente a taxa de atualização para 50 Hz (abaixo de 59Hz).",
      },
      {
        label: "O notebook não conecta ao Wi-Fi ou está sem internet",
        desc: "Rede não aparece, pede senha novamente ou fica sem acesso.",
        pops: ["POP-029", "POP-005"],
        summary:
          "Siga o diagnóstico inicial de Wi-Fi e Modo Avião antes de acionar o suporte.",
      },
      {
        label: "Estou sem áudio ou meu microfone não funciona na reunião",
        desc: "Ninguém me ouve no Teams/Zoom ou não escuto os participantes.",
        pops: ["POP-027"],
        summary:
          "Ajuste os dispositivos de entrada e saída tanto no Windows quanto nas configurações da reunião.",
      },
      {
        label: "O notebook não liga ou está superaquecendo",
        desc: "Aparelho sem sinal de energia ao apertar ligar ou ventoinha muito quente.",
        pops: ["POP-032", "POP-014", "POP-013"],
        summary:
          "Realize as verificações de carregador, descarga residual de 15 segundos e desobstrução das saídas de ar.",
      },
    ],
  },

  security_branch: {
    question: "Qual assunto de segurança digital você precisa consultar?",
    subtitle: "Selecione o cenário correspondente.",
    options: [
      {
        label: "Recebi um e-mail suspeito ou cliquei em algo estranho",
        desc: "Quero validar se é phishing ou suspeito que o notebook pegou vírus.",
        pops: ["POP-016", "POP-020"],
        summary:
          "Se já clicou ou baixou algo suspeito, desconecte a internet imediatamente e siga o protocolo de incidente.",
      },
      {
        label: "Vou trabalhar fora do escritório (hotel, aeroporto, café)",
        desc: "Preciso conectar em redes Wi-Fi externas com segurança.",
        pops: ["POP-021", "POP-015"],
        summary:
          "Prefira rotear o 4G/5G do celular ou conecte obrigatoriamente a VPN corporativa.",
      },
      {
        label: "Quero proteger minhas senhas, arquivos ou usar pendrive",
        desc: "Boas práticas de senha, bloqueio de tela, backup e dispositivos USB.",
        pops: ["POP-017", "POP-015", "POP-018", "POP-019"],
        summary:
          "Confira os padrões corporativos de senhas, bloqueio rápido (Win + L) e armazenamento seguro.",
      },
    ],
  },

  productivity_care_branch: {
    question: "O que você gostaria de configurar ou cuidar hoje?",
    subtitle:
      "Escolha entre recursos de produtividade no Windows ou conservação física do notebook.",
    options: [
      {
        label: "Configurar monitor externo, corrigir escala ou dividir janelas",
        desc: "Estender telas, ajustar resolução/taxa abaixo de 59Hz e organizar janelas lado a lado.",
        pops: ["POP-025", "POP-038", "POP-024", "POP-022"],
        summary:
          "Configure o modo Estender (Win + P), ajuste a escala/Hz se necessário e organize suas janelas.",
      },
      {
        label: "Usar o OneDrive, resolver sincronização e organizar pastas",
        desc: "Corrigir falhas de sincronização, aliviar lentidão na nuvem e padronizar documentos.",
        pops: ["POP-028", "POP-036", "POP-037", "POP-023"],
        summary:
          "Verifique o status da nuvem do OneDrive, ative Arquivos Sob Demanda e mantenha seus arquivos nos repositórios oficiais.",
      },
      {
        label: "Tirar print da tela ou aprender atalhos rápidos",
        desc: "Capturar telas para enviar por e-mail/Teams e ganhar agilidade.",
        pops: ["POP-026", "POP-022"],
        summary:
          "Use Win + Shift + S para recortar qualquer área da tela e colar diretamente nas mensagens.",
      },
      {
        label: "Limpar tela/teclado, cuidar da bateria ou transportar o notebook",
        desc: "Evitar riscos no display, desgaste de bateria e danos na mochila.",
        pops: ["POP-009", "POP-010", "POP-011", "POP-012", "POP-013"],
        summary:
          "Siga os cuidados físicos recomendados para preservar a vida útil do seu notebook.",
      },
    ],
  },
};
